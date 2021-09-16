import { TERRA_TX_KEYS, TERRA_QUERY_KEY } from '@libs/app-fns';

export enum NEBULA_TX_KEYS {
  CLUSTER_MINT = 'NEBULA_TX_CLUSTER_MINT',
  CLUSTER_ARB_MINT = 'NEBULA_TX_CLUSTER_ARB_MINT',
  CLUSTER_REDEEM = 'NEBULA_TX_CLUSTER_REDEEM',
  CLUSTER_ARB_REDEEM = 'NEBULA_TX_CLUSTER_ARB_REDEEM',
  STAKING_STAKE = 'NEBULA_TX_STAKING_STAKE',
  STAKING_UNSTAKE = 'NEBULA_TX_STAKING_UNSTAKE',
  GOV_STAKE = 'NEBULA_TX_GOV_STAKE',
  GOV_UNSTAKE = 'NEBULA_TX_GOV_UNSTAKE',
  GOV_CREATE_POLL = 'NEBULA_TX_GOV_CREATE_POLL',
  GOV_VOTE = 'NEBULA_TX_GOV_VOTE',
}

export enum NEBULA_QUERY_KEYS {
  CLUSTERS_LIST = 'NEBULA_QUERY_CLUSTERS_LIST',
  CLUSTERS_STATE_LIST = 'NEBULA_QUERY_CLUSTERS_STATE_LIST',
  CLUSTER_INFO = 'NEBULA_QUERY_CLUSTER_INFO',
  STAKING_POOL_INFO_LIST = 'NEBULA_QUERY_STAKING_CLUSTER_POOL_INFO_LIST',
  STAKING_REWARD_INFO = 'NEBULA_QUERY_STAKING_REWARD_INFO',
  GOV_STAKER = 'NEBULA_QUERY_GOV_STAKER',
  GOV_STATE = 'NEBULA_QUERY_GOV_STATE',
  GOV_CONFIG = 'NEBULA_QUERY_GOV_CONFIG',
  GOV_POLLS = 'NEBULA_QUERY_GOV_POLLS',
  GOV_POLL = 'NEBULA_QUERY_GOV_POLL',
  GOV_VOTERS = 'NEBULA_QUERY_GOV_VOTERS',
  GOV_MY_POLLS = 'NEBULA_QUERY_GOV_MY_POLLS',
  MYPAGE_HOLDINGS = 'NEBULA_QUERY_MYPAGE_HOLDINGS',
  MYPAGE_STAKING = 'NEBULA_QUERY_MYPAGE_STAKING',
}

export const NEBULA_TX_REFETCH_MAP = {
  [TERRA_TX_KEYS.CW20_BUY]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
  ],
  [TERRA_TX_KEYS.CW20_SELL]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
  ],
  [TERRA_TX_KEYS.SEND]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
  ],
  [NEBULA_TX_KEYS.CLUSTER_MINT]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
  ],
  [NEBULA_TX_KEYS.CLUSTER_ARB_MINT]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
  ],
  [NEBULA_TX_KEYS.CLUSTER_REDEEM]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
  ],
  [NEBULA_TX_KEYS.CLUSTER_ARB_REDEEM]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
  ],
  [NEBULA_TX_KEYS.STAKING_STAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    NEBULA_QUERY_KEYS.STAKING_REWARD_INFO,
  ],
  [NEBULA_TX_KEYS.STAKING_UNSTAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    NEBULA_QUERY_KEYS.STAKING_REWARD_INFO,
  ],
  [NEBULA_TX_KEYS.GOV_STAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.CW20_TOKEN_INFO,
    NEBULA_QUERY_KEYS.GOV_STATE,
  ],
  [NEBULA_TX_KEYS.GOV_UNSTAKE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    TERRA_QUERY_KEY.CW20_BALANCE,
    TERRA_QUERY_KEY.TERRA_BALANCES,
    TERRA_QUERY_KEY.CW20_TOKEN_INFO,
    NEBULA_QUERY_KEYS.GOV_STATE,
  ],
  [NEBULA_TX_KEYS.GOV_CREATE_POLL]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    NEBULA_QUERY_KEYS.GOV_POLLS,
  ],
  [NEBULA_TX_KEYS.GOV_VOTE]: [
    TERRA_QUERY_KEY.TOKEN_BALANCES,
    NEBULA_QUERY_KEYS.GOV_POLL,
    NEBULA_QUERY_KEYS.GOV_VOTERS,
    NEBULA_QUERY_KEYS.GOV_STAKER,
  ],
};
