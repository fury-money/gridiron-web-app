import { createQueryFn } from '@libs/react-query-utils';
import { StakingRewardInfo, stakingRewardInfoQuery } from '@nebula-js/app-fns';
import { CW20Addr } from '@nebula-js/types';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useQuery, UseQueryResult } from 'react-query';
import { NEBULA_QUERY_KEYS } from '../../env';
import { useNebulaApp } from '../../hooks/useNebulaApp';

const queryFn = createQueryFn(stakingRewardInfoQuery);

export function useStakingRewardInfoQuery(
  tokenAddr?: CW20Addr | undefined,
): UseQueryResult<StakingRewardInfo | undefined> {
  const connectedWallet = useConnectedWallet();

  const { queryClient, queryErrorReporter, contractAddress } = useNebulaApp();

  const result = useQuery(
    [
      NEBULA_QUERY_KEYS.STAKING_REWARD_INFO,
      connectedWallet?.walletAddress,
      contractAddress.staking,
      tokenAddr,
      queryClient,
    ],
    queryFn,
    {
      refetchInterval: 1000 * 60 * 5,
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return result;
}
