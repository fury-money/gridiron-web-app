import { CT, CW20Addr, HumanAddr, u, UST } from '@nebula-js/types';
import { clusterRedeemTx } from '@nebula-js/webapp-fns';
import { NEBULA_TX_KEYS } from '@nebula-js/webapp-provider/env';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import {
  useRefetchQueries,
  useTerraWebapp,
} from '@terra-money/webapp-provider';
import { useCallback } from 'react';
import { useNebulaWebapp } from '../../contexts/webapp';

export interface ClusterRedeemTxParams {
  amount: u<CT>;

  onTxSucceed?: () => void;
}

export function useClusterRedeemTx(
  clusterAddr: HumanAddr,
  clusterTokenAddr: CW20Addr,
) {
  const connectedWallet = useConnectedWallet();

  const { mantleFetch, mantleEndpoint, txErrorReporter } = useTerraWebapp();

  const refetchQueries = useRefetchQueries();

  const {
    constants: { fixedGas, gasFee, gasAdjustment },
    contractAddress,
  } = useNebulaWebapp();

  const stream = useCallback(
    ({ amount, onTxSucceed }: ClusterRedeemTxParams) => {
      if (!connectedWallet || !connectedWallet.availablePost) {
        throw new Error(`Can't post!`);
      }

      return clusterRedeemTx({
        txFee: fixedGas.toFixed() as u<UST>,
        walletAddr: connectedWallet.walletAddress,
        incentivesAddr: contractAddress.incentives,
        clusterAddr,
        clusterTokenAddr,
        amount,
        fixedGas,
        gasFee,
        gasAdjustment,
        mantleEndpoint,
        mantleFetch,
        txErrorReporter,
        onTxSucceed: () => {
          onTxSucceed?.();
          refetchQueries(NEBULA_TX_KEYS.CLUSTER_REDEEM);
        },
        network: connectedWallet.network,
        post: connectedWallet.post,
      });
    },
    [
      clusterAddr,
      clusterTokenAddr,
      connectedWallet,
      contractAddress.incentives,
      fixedGas,
      gasAdjustment,
      gasFee,
      mantleEndpoint,
      mantleFetch,
      refetchQueries,
      txErrorReporter,
    ],
  );

  return connectedWallet ? stream : null;
}
