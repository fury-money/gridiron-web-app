import {
  FuryaBalancesWithTokenInfo,
  furyaBalancesWithTokenInfoQuery,
} from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { HumanAddr, terraswap } from '@libs/types';
import { useConnectedWallet } from '@terra-money/use-wallet';
import { useQuery, UseQueryResult } from 'react-query';
import { useApp } from '../../contexts/app';
import { FURYA_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(furyaBalancesWithTokenInfoQuery);

export function useFuryaBalancesWithTokenInfoQuery(
  assets: terraswap.AssetInfo[],
  walletAddress?: HumanAddr,
): UseQueryResult<FuryaBalancesWithTokenInfo | undefined> {
  const { queryClient, queryErrorReporter } = useApp();

  const connectedWallet = useConnectedWallet();

  const result = useQuery(
    [
      FURYA_QUERY_KEY.FURYA_BALANCES_WITH_TOKEN_INFO,
      walletAddress ?? connectedWallet?.walletAddress,
      assets,
      queryClient,
    ],
    queryFn,
    {
      refetchInterval: !!connectedWallet && 1000 * 60 * 5,
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return result;
}
