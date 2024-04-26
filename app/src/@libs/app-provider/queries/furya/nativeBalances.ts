import {
  EMPTY_NATIVE_BALANCES,
  NativeBalances,
  pickNativeBalance,
  furyaNativeBalancesQuery,
} from '@libs/app-fns';
import { createQueryFn } from '@libs/react-query-utils';
import { HumanAddr, NativeDenom, Token, u, UST } from '@libs/types';
import { useConnectedWallet } from '@terra-money/use-wallet';
import { useMemo } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { useApp } from '../../contexts/app';
import { FURYA_QUERY_KEY } from '../../env';

const queryFn = createQueryFn(furyaNativeBalancesQuery);

export function useFuryaNativeBalancesQuery(
  walletAddr?: HumanAddr,
): UseQueryResult<NativeBalances | undefined> {
  const { queryClient, queryErrorReporter } = useApp();

  const connectedWallet = useConnectedWallet();

  const result = useQuery(
    [
      FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
      walletAddr ?? connectedWallet?.walletAddress,
      queryClient,
    ],
    queryFn,
    {
      refetchInterval: !!connectedWallet && 1000 * 60 * 5,
      keepPreviousData: true,
      onError: queryErrorReporter,
      placeholderData: () => EMPTY_NATIVE_BALANCES,
    },
  );

  return result;
}

export function useFuryaNativeBalances(walletAddr?: HumanAddr): NativeBalances {
  const { data: nativeBalances = EMPTY_NATIVE_BALANCES } =
    useFuryaNativeBalancesQuery(walletAddr);

  return nativeBalances;
}

export function useFuryaNativeBalanceQuery<T extends Token>(
  denom: NativeDenom,
  walletAddr?: HumanAddr,
): u<T> {
  const { data: nativeBalances = EMPTY_NATIVE_BALANCES } =
    useFuryaNativeBalancesQuery(walletAddr);

  return useMemo<u<T>>(() => {
    return pickNativeBalance(denom, nativeBalances);
  }, [denom, nativeBalances]);
}

export function useUstBalance(walletAddr?: HumanAddr | undefined): u<UST> {
  return useFuryaNativeBalanceQuery<UST>('uusd', walletAddr);
}
