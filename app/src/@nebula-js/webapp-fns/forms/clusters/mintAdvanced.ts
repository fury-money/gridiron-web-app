import { microfy } from '@nebula-js/notation';
import { cluster, CT, terraswap, Token, u, UST } from '@nebula-js/types';
import { clusterTxFeeQuery } from '@nebula-js/webapp-fns/queries/clusters/clusterTxFee';
import { max, min } from '@terra-dev/big-math';
import { MantleFetch } from '@terra-dev/mantle';
import big, { Big, BigSource } from 'big.js';
import { clusterMintQuery } from '../../queries/clusters/mint';
import { TerraBalances } from '../../queries/terra/balances';
import { ClusterFee, NebulaTax } from '../../types';

export interface ClusterMintAdvancedFormInput {
  addedAssets: Set<terraswap.Asset<Token>>;
  amounts: Token[];
}

export interface ClusterMintAdvancedFormDependency {
  mantleEndpoint: string;
  mantleFetch: MantleFetch;
  requestInit?: Omit<RequestInit, 'method' | 'body'>;
  balances: TerraBalances | undefined;
  lastSyncedHeight: () => Promise<number>;
  clusterState: cluster.ClusterStateResponse;
  gasPriceEndpoint: string;
  clusterFee: ClusterFee;
  fixedGas: u<UST<BigSource>>;
  tax: NebulaTax;
}

export interface ClusterMintAdvancedFormStates
  extends ClusterMintAdvancedFormInput {
  invalidAmounts: (string | null)[];
  remainAssets: terraswap.Asset<Token>[];
  balances: TerraBalances | undefined;
  txFee: u<UST> | null;
}

export interface ClusterMintAdvancedFormAsyncStates {
  mintedAmount: u<CT> | undefined;
}

export const clusterMintAdvancedForm = (
  dependency: ClusterMintAdvancedFormDependency,
  prevDependency: ClusterMintAdvancedFormDependency | undefined,
) => {
  let invalidAmounts: (string | null)[];
  let remainAssets: terraswap.Asset<Token>[];
  let asyncStates: Promise<ClusterMintAdvancedFormAsyncStates>;

  return (
    input: ClusterMintAdvancedFormInput,
    prevInput: ClusterMintAdvancedFormInput | undefined,
  ): [
    ClusterMintAdvancedFormStates,
    Promise<ClusterMintAdvancedFormAsyncStates>,
  ] => {
    if (
      !invalidAmounts ||
      dependency.clusterState !== prevDependency?.clusterState ||
      dependency.balances !== prevDependency?.balances ||
      input.amounts !== prevInput?.amounts
    ) {
      invalidAmounts = dependency.clusterState.target.map(({ info }, i) => {
        const amount = input.amounts[i];
        const balance = dependency.balances?.balances[i].balance ?? 0;

        return balance && amount.length > 0 && microfy(amount).gt(balance)
          ? 'Not enough assets'
          : null;
      });
    }

    if (
      !remainAssets ||
      dependency.clusterState !== prevDependency?.clusterState ||
      input.addedAssets !== prevInput?.addedAssets
    ) {
      remainAssets = dependency.clusterState.target.filter((asset) => {
        return !input.addedAssets.has(asset);
      });
    }

    //if (
    //  !txFee ||
    //  dependency.clusterState !== prevDependency?.clusterState ||
    //  dependency.fixedGas !== prevDependency?.fixedGas ||
    //  dependency.tax !== prevDependency?.tax ||
    //  input.addedAssets !== prevInput?.addedAssets ||
    //  input.amounts !== prevInput?.amounts
    //) {
    //  if (input.addedAssets.size > 0) {
    //    const ustIndex = dependency.clusterState.target.findIndex(
    //      ({ info }) => {
    //        return (
    //          'native_token' in info &&
    //          (info.native_token.denom === 'uusd' ||
    //            info.native_token.denom === 'uust')
    //        );
    //      },
    //    );
    //
    //    if (ustIndex === -1 || input.amounts[ustIndex].length === 0) {
    //      txFee = big(dependency.fixedGas).toFixed() as u<UST>;
    //    } else {
    //      const uust = microfy(input.amounts[ustIndex]) as u<UST<Big>>;
    //      const ratioTxFee = big(uust.minus(dependency.fixedGas))
    //        .div(big(1).plus(dependency.tax.taxRate))
    //        .mul(dependency.tax.taxRate);
    //
    //      txFee = max(min(ratioTxFee, dependency.tax.maxTaxUUSD), 0)
    //        .plus(dependency.fixedGas)
    //        .toFixed() as u<UST>;
    //    }
    //  } else {
    //    txFee = null;
    //  }
    //}

    if (
      !asyncStates ||
      dependency.mantleEndpoint !== prevDependency?.mantleEndpoint ||
      dependency.lastSyncedHeight !== prevDependency?.lastSyncedHeight ||
      dependency.clusterState !== prevDependency?.clusterState ||
      dependency.clusterFee !== prevDependency?.clusterFee ||
      input.amounts !== prevInput?.amounts
    ) {
      const hasAmounts = input.amounts.some((amount) => amount.length > 0);

      asyncStates = hasAmounts
        ? Promise.all([
            clusterMintQuery(
              input.amounts,
              dependency.clusterState,
              dependency.lastSyncedHeight,
              dependency.mantleEndpoint,
              dependency.mantleFetch,
              dependency.requestInit,
            ),
            clusterTxFeeQuery(
              dependency.gasPriceEndpoint,
              dependency.clusterFee,
              dependency.clusterState.target.length,
              dependency.requestInit,
            ),
          ]).then(([{ mint }, clusterTxFee]) => {
            let txFee: u<UST> | null;

            if (input.addedAssets.size > 0) {
              const ustIndex = dependency.clusterState.target.findIndex(
                ({ info }) => {
                  return (
                    'native_token' in info &&
                    (info.native_token.denom === 'uusd' ||
                      info.native_token.denom === 'uust')
                  );
                },
              );

              if (ustIndex === -1 || input.amounts[ustIndex].length === 0) {
                txFee = clusterTxFee.toFixed() as u<UST>;
              } else {
                const uust = microfy(input.amounts[ustIndex]) as u<UST<Big>>;
                const ratioTxFee = big(uust.minus(dependency.fixedGas))
                  .div(big(1).plus(dependency.tax.taxRate))
                  .mul(dependency.tax.taxRate);

                txFee = max(min(ratioTxFee, dependency.tax.maxTaxUUSD), 0)
                  .plus(clusterTxFee)
                  .toFixed() as u<UST>;
              }
            } else {
              txFee = null;
            }

            return { mintedAmount: mint.mint_tokens as u<CT>, txFee };
          })
        : Promise.resolve({ mintedAmount: undefined, txFee: null });
    }

    return [
      {
        ...input,
        invalidAmounts,
        remainAssets,
        balances: dependency.balances,
        txFee: null,
      },
      asyncStates,
    ];
  };
};
