import big, { Big } from 'big.js';
import { getTargetColor, AssetTokenInfo } from '@nebula-js/app-fns';
import { terraswap, UST, Token, cw20, u, cluster } from '@nebula-js/types';
import { sum, divWithDefault } from '@libs/big-math';
import { partitionColor } from '@nebula-js/ui';

export interface AssetView {
  asset: terraswap.Asset<Token>;
  oraclePrice: UST<Big>;
  token: cw20.TokenInfoResponse<Token>;
  amount: u<Token<string>>;
  targetRatio: number;
  portfolioRatio: number;
  color: string;
  targetColor: string;
  targetAmount: u<Token<Big>>;
}

export function toAssetView(
  clusterState: cluster.ClusterStateResponse,
  assetTokenInfos: AssetTokenInfo[],
): AssetView[] {
  const targetSum = sum(...clusterState.target.map(({ amount }) => amount));
  const invSum = sum(...clusterState.inv);

  return clusterState.target.map((asset, j) => {
    const targetRatio = divWithDefault(asset.amount, targetSum, 0);
    const portfolioRatio = divWithDefault(clusterState.inv[j], invSum, 0);

    return {
      asset,
      oraclePrice: big(clusterState.prices[j]) as UST<Big>,
      token: assetTokenInfos[j].tokenInfo,
      amount: clusterState.inv[j],
      targetRatio: targetRatio.toNumber(),
      portfolioRatio: portfolioRatio.toNumber(),
      color: partitionColor[j % partitionColor.length],
      targetColor: getTargetColor(targetRatio, portfolioRatio),
      targetAmount: invSum.mul(targetRatio) as u<Token<Big>>,
    };
  });
}
