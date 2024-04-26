import { FuryaBalances, furyaBalancesQuery } from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { HumanAddr, terraswap } from '@libs/types';
import { useConnectedWallet } from '@terra-money/use-wallet';
import { useQuery, UseQueryResult } from 'react-query';
import { useApp } from '../../contexts/app';
import { FURYA_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(furyaBalancesQuery);

export function useFuryaBalancesQuery(
  assets: terraswap.AssetInfo[],
  walletAddress?: HumanAddr,
): UseQueryResult<FuryaBalances | undefined> {
  const { queryClient, queryErrorReporter } = useApp();

  const connectedWallet = useConnectedWallet();

  const result = useQuery(
    [
      FURYA_QUERY_KEY.FURYA_BALANCES,
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
