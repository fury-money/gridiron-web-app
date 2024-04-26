import { LcdQueryClient } from '@libs/query-client';
import { Rate } from '@libs/types';

export async function furyaTreasuryTaxRateQuery(
  lcdClient: LcdQueryClient,
): Promise<Rate> {
  return lcdClient
    .lcdFetcher<{ result: Rate }>(
      `${lcdClient.lcdEndpoint}/treasury/tax_rate`,
      lcdClient.requestInit,
    )
    .then(({ result }) => result);
}
