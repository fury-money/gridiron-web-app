import { furyaTokenInfoQuery } from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { cw20, terraswap, Token } from '@libs/types';
import { useQuery, UseQueryResult } from 'react-query';
import { useApp } from '../../contexts/app';
import { FURYA_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(furyaTokenInfoQuery);

export function useFuryaTokenInfo<T extends Token>(
  asset: terraswap.AssetInfo,
): UseQueryResult<cw20.TokenInfoResponse<T> | undefined> {
  const { queryClient, queryErrorReporter } = useApp();

  const result = useQuery(
    [FURYA_QUERY_KEY.FURYA_TOKEN_INFO, asset, queryClient],
    queryFn as any,
    {
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return result as any;
}
