import { furyaNativeBalancesQuery } from '@libs/app-fns/queries/furya/nativeBalances';
import { TEST_LCD_CLIENT, TEST_WALLET_ADDRESS } from '@libs/app-fns/test-env';
import big from 'big.js';

describe('furyaNativeBalancesQuery()', () => {
  test('should get native balances', async () => {
    const balances = await furyaNativeBalancesQuery(
      TEST_WALLET_ADDRESS,
      TEST_LCD_CLIENT,
    );

    expect(big(balances.uUST).gt(0)).toBeTruthy();
    expect(big(balances.uSDR).eq(0)).toBeTruthy();
  });
});
