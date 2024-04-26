import { TokenDisplayInfo } from '@libs/app-fns';
import { cw20, terraswap, Token } from '@libs/types';
import { useWallet } from '@terra-money/use-wallet';
import { useMemo } from 'react';
import { useTokenDisplayInfosQuery } from './tokenDisplayInfos';
import { useFuryaTokenInfo } from './tokenInfo';

interface DisplayInfo {
  tokenInfo: cw20.TokenInfoResponse<Token> | undefined;
  tokenDisplayInfo: TokenDisplayInfo | undefined;
}

export function useFuryaTokenDisplayInfo(
  assetInfo: terraswap.AssetInfo,
  networkName?: string,
): DisplayInfo {
  const { network } = useWallet();

  const { data: tokenInfo } = useFuryaTokenInfo(assetInfo);
  const { data: tokenDisplayInfos } = useTokenDisplayInfosQuery(
    networkName ?? network.name,
  );

  return useMemo(() => {
    return {
      tokenInfo,
      tokenDisplayInfo: tokenDisplayInfos?.find(({ asset }) => {
        return JSON.stringify(asset) === JSON.stringify(assetInfo);
      }),
    };
  }, [assetInfo, tokenDisplayInfos, tokenInfo]);
}
