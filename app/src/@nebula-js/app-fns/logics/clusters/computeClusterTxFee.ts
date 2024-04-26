import { GasPrice } from '@libs/app-fns';
import { Gas, u, UST } from '@libs/types';
import big from 'big.js';
import { ClusterFeeMultipliers } from '../../types';

export function computeClusterTxFee(
  gasPrice: GasPrice,
  multiplier: ClusterFeeMultipliers,
  inventory: number,
  assetCount: number,
): u<UST> {
  return big(multiplier.txFeeBase)
    .plus(big(inventory).mul(multiplier.txFeePerInventory))
    .plus(big(assetCount).mul(multiplier.txFeePerAsset))
    .mul(gasPrice.uusd)
    .toFixed() as u<UST>;
}

export function computeClusterGasWanted(
  multiplier: ClusterFeeMultipliers,
  inventory: number,
  assetCount: number,
): Gas {
  console.log(
    'computeClusterTxFee.ts..computeClusterGasWanted()',
    multiplier,
    inventory,
    assetCount,
  );
  return big(multiplier.gasWantedBase)
    .plus(big(inventory).mul(multiplier.gasWantedPerInventory))
    .plus(big(assetCount).mul(multiplier.gasWantedPerAsset))
    .toNumber() as Gas;
}
