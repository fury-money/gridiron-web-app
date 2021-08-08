import { TERRA_QUERY_KEY } from '@terra-money/webapp-provider';

export enum NEBULA_TX_KEYS {
  CW20_BUY = 'NEBULA_TX_CW20_BUY',
  CW20_SELL = 'NEBULA_TX_CW20_SELL',
  CLUSTER_MINT = 'NEBULA_TX_CLUSTER_MINT',
  CLUSTER_ARB_MINT = 'NEBULA_TX_CLUSTER_ARB_MINT',
  CLUSTER_REDEEM = 'NEBULA_TX_CLUSTER_REDEEM',
  CLUSTER_ARB_REDEEM = 'NEBULA_TX_CLUSTER_ARB_REDEEM',
  STAKING_STAKE = 'NEBULA_TX_STAKING_STAKE',
  STAKING_UNSTAKE = 'NEBULA_TX_STAKING_UNSTAKE',
  GOV_STAKE = 'NEBULA_TX_GOV_STAKE',
  GOV_UNSTAKE = 'NEBULA_TX_GOV_UNSTAKE',
}

export enum NEBULA_QUERY_KEYS {
  BAR = 'NEBULA_QUERY_BAR',
  CW20_BALANCE = 'NEBULA_QUERY_CW20_BALANCE',
  CLUSTERS_LIST = 'NEBULA_QUERY_CLUSTERS_LIST',
  CLUSTER_INFO = 'NEBULA_QUERY_CLUSTER_INFO',
  TERRASWAP_PAIR = 'NEBULA_QUERY_TERRASWAP_PAIR',
  TERRASWAP_POOL = 'NEBULA_QUERY_TERRASWAP_POOL',
  TERRA_BALANCES = 'NEBULA_QUERY_TERRA_BALANCES',
  STAKING_CLUSTER_POOL_INFO_LIST = 'NEBULA_QUERY_STAKING_CLUSTER_POOL_INFO_LIST',
  STAKING_REWARD_INFO = 'NEBULA_QUERY_STAKING_REWARD_INFO',
  GOV_STAKER = 'NEBULA_QUERY_GOV_STAKER',
}

export const NEBULA_TX_REFETCH_MAP = {
  [NEBULA_TX_KEYS.CW20_BUY]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    NEBULA_QUERY_KEYS.CW20_BALANCE,
    NEBULA_QUERY_KEYS.TERRA_BALANCES,
  ],
  [NEBULA_TX_KEYS.CW20_SELL]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    NEBULA_QUERY_KEYS.CW20_BALANCE,
    NEBULA_QUERY_KEYS.TERRA_BALANCES,
  ],
  [NEBULA_TX_KEYS.CLUSTER_MINT]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    NEBULA_QUERY_KEYS.CW20_BALANCE,
    NEBULA_QUERY_KEYS.TERRA_BALANCES,
  ],
  [NEBULA_TX_KEYS.CLUSTER_ARB_MINT]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    NEBULA_QUERY_KEYS.CW20_BALANCE,
    NEBULA_QUERY_KEYS.TERRA_BALANCES,
  ],
  [NEBULA_TX_KEYS.CLUSTER_REDEEM]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    NEBULA_QUERY_KEYS.CW20_BALANCE,
    NEBULA_QUERY_KEYS.TERRA_BALANCES,
  ],
  [NEBULA_TX_KEYS.CLUSTER_ARB_REDEEM]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    NEBULA_QUERY_KEYS.CW20_BALANCE,
    NEBULA_QUERY_KEYS.TERRA_BALANCES,
  ],
  [NEBULA_TX_KEYS.STAKING_STAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    NEBULA_QUERY_KEYS.CW20_BALANCE,
    NEBULA_QUERY_KEYS.TERRA_BALANCES,
    NEBULA_QUERY_KEYS.STAKING_REWARD_INFO,
  ],
  [NEBULA_TX_KEYS.STAKING_UNSTAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    NEBULA_QUERY_KEYS.CW20_BALANCE,
    NEBULA_QUERY_KEYS.TERRA_BALANCES,
    NEBULA_QUERY_KEYS.STAKING_REWARD_INFO,
  ],
  [NEBULA_TX_KEYS.GOV_STAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    NEBULA_QUERY_KEYS.CW20_BALANCE,
    NEBULA_QUERY_KEYS.TERRA_BALANCES,
  ],
  [NEBULA_TX_KEYS.GOV_UNSTAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    NEBULA_QUERY_KEYS.CW20_BALANCE,
    NEBULA_QUERY_KEYS.TERRA_BALANCES,
  ],
};
