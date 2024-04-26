import { furyaTreasuryTaxRateQuery } from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { Rate } from '@libs/types';
import { useQuery, UseQueryResult } from 'react-query';
import { useApp } from '../../contexts/app';
import { FURYA_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(furyaTreasuryTaxRateQuery);

export function useFuryaTreasuryTaxRateQuery(): UseQueryResult<Rate> {
  const { lcdQueryClient, queryErrorReporter } = useApp();

  const result = useQuery(
    [FURYA_QUERY_KEY.FURYA_TREASURY_TAX_RATE, lcdQueryClient],
    queryFn,
    {
      keepPreviousData: true,
      onError: queryErrorReporter,
    },
  );

  return result;
}
