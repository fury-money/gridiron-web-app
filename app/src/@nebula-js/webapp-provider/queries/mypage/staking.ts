import { MypageStaking, mypageStakingQuery } from '@nebula-js/webapp-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { useBrowserInactive } from '@libs/use-browser-inactive';
import { useConnectedWallet } from '@terra-money/wallet-provider';
import { useTerraWebapp } from '@libs/app-provider';
import { useQuery, UseQueryResult } from 'react-query';
import { useNebulaWebapp } from '../../contexts/webapp';
import { NEBULA_QUERY_KEYS } from '../../env';

const queryFn = createQueryFn(mypageStakingQuery);

export function useMypageStakingQuery(): UseQueryResult<
  MypageStaking | undefined
> {
  const connectedWallet = useConnectedWallet();

  const { mantleFetch, mantleEndpoint, queryErrorReporter } = useTerraWebapp();

  const {
    contractAddress: { terraswap, staking },
  } = useNebulaWebapp();

  const { browserInactive } = useBrowserInactive();

  const result = useQuery(
    [
      NEBULA_QUERY_KEYS.MYPAGE_STAKING,
      connectedWallet?.walletAddress,
      staking,
      terraswap.factory,
      mantleEndpoint,
      mantleFetch,
    ],
    queryFn,
    {
      refetchInterval: browserInactive && 1000 * 60 * 5,
      enabled: !browserInactive,
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return result;
}
