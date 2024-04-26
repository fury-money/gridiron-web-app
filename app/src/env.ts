import { FURYA_QUERY_KEY, FURYA_TX_KEYS } from '@libs/app-provider';
import { CW20Addr, Gas, HumanAddr, Rate } from '@libs/types';
import {
  NEBULA_QUERY_KEYS,
  NEBULA_TX_KEYS,
  NebulaContants,
  NebulaContractAddress,
} from '@nebula-js/app-provider';
import { NetworkInfo } from '@terra-money/use-wallet';

export function NEBULA_DEFAULT_WASM_CLIENT(
  network: NetworkInfo,
): 'lcd' | 'hive' {
  return 'lcd';
  //return network.chainID.startsWith('testnet') ? 'hive' : 'lcd';
}

export function NEBULA_CONTRACT_ADDRESS(
  network: NetworkInfo,
): NebulaContractAddress {
  if (network.chainID.startsWith('bombay')) {
    // testnet
    return {
      airdrop:
        'furya1dvfn0qlktnxm8r4jdgle79acjzz362rqmecm46gvegazn6a52g8qtpr2yw' as HumanAddr,
      collector:
        'furya1pe2rchy28js5jsa0zhf5txw43angdlu7wsjhlyv5rdarfeu86jgsacpakq' as HumanAddr,
      community:
        'furya1k0adkfms59z47qkevh805x4qa9ywsn754g46jc3ae533s4mdph3qxwdt58' as HumanAddr,
      clusterFactory:
        'furya1lmkxe7dykfqttgdc3uwwre57e83uc4qmaj3njke2a08ethzwsu8swx0d33' as HumanAddr,
      gov: 'furya1rn5ypjx0zfcmnxncy0p0zz8farwmvamum6uz2lp5k3c8tjktp9wssmep8m' as HumanAddr,
      incentives:
        'furya1atvvqtgaev035c7epgs80dnpqnx0gjum32rtzn3rpe9gaveth0ks0yk5kw' as HumanAddr,
      incentivesCustody:
        'furya1hp78c9ma7gcg698z7wyhm2mvjgk7k7e4l0x2gwswsgkdpqqzea4s3m0vhv' as HumanAddr,
      staking:
        'furya1kedjsh0tm7af64s5xyu9gr4vtf9lz7eyykpmcs765pnchwhj54rsu8e50s' as HumanAddr,
      oracle:
        'furya1yxlcexs5v37nz75z3qjr6ygrvf0uxlwlp0ngzzscf4ut4a24vc8qz3q6m3' as HumanAddr,
      terraswap: {
        factory:
          'furya1as0dr6pqg2xufa8jmadxejwrzs44cjc4ak8uzkt55zhcn6pm329sm30wml' as HumanAddr,
        nebUstPair:
          'furya15fzrwdllv9x3vkartykjf4gqgg40fsv90cfxt4t27058eeqs8jgs04pd7j' as HumanAddr,
      },
      cw20: {
        NEB: 'furya1s786sa67veppvzj5fe7kzve8tz82ujs3cuxhyt5d5usk3ffcwwrq38kksa' as CW20Addr,
        aUST: 'furya1062jkn73ew8gzmrhyr4dc7nhl4q2na4y5d2s720szfdlzzj344dqu67e3g' as CW20Addr,
      },
      anchor: {
        proxy: 'furya1hhgrnyq3gl78aqwn6hw2p0dena0lrkuq9ndfuu' as HumanAddr,
        market: 'furya1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s' as HumanAddr,
      },
    };
  } else {
    // mainnet
    return {
      airdrop:
        'furya1dvfn0qlktnxm8r4jdgle79acjzz362rqmecm46gvegazn6a52g8qtpr2yw' as HumanAddr,
      collector:
        'furya1pe2rchy28js5jsa0zhf5txw43angdlu7wsjhlyv5rdarfeu86jgsacpakq' as HumanAddr,
      community:
        'furya1k0adkfms59z47qkevh805x4qa9ywsn754g46jc3ae533s4mdph3qxwdt58' as HumanAddr,
      clusterFactory:
        'furya1lmkxe7dykfqttgdc3uwwre57e83uc4qmaj3njke2a08ethzwsu8swx0d33' as HumanAddr,
      gov: 'furya1rn5ypjx0zfcmnxncy0p0zz8farwmvamum6uz2lp5k3c8tjktp9wssmep8m' as HumanAddr,
      incentives:
        'furya1atvvqtgaev035c7epgs80dnpqnx0gjum32rtzn3rpe9gaveth0ks0yk5kw' as HumanAddr,
      incentivesCustody:
        'furya1hp78c9ma7gcg698z7wyhm2mvjgk7k7e4l0x2gwswsgkdpqqzea4s3m0vhv' as HumanAddr,
      staking:
        'furya1kedjsh0tm7af64s5xyu9gr4vtf9lz7eyykpmcs765pnchwhj54rsu8e50s' as HumanAddr,
      oracle:
        'furya1yxlcexs5v37nz75z3qjr6ygrvf0uxlwlp0ngzzscf4ut4a24vc8qz3q6m3' as HumanAddr,
      terraswap: {
        factory:
          'furya1as0dr6pqg2xufa8jmadxejwrzs44cjc4ak8uzkt55zhcn6pm329sm30wml' as HumanAddr,
        nebUstPair:
          'furya15fzrwdllv9x3vkartykjf4gqgg40fsv90cfxt4t27058eeqs8jgs04pd7j' as HumanAddr,
      },
      cw20: {
        NEB: 'furya1s786sa67veppvzj5fe7kzve8tz82ujs3cuxhyt5d5usk3ffcwwrq38kksa' as CW20Addr,
        aUST: 'furya1062jkn73ew8gzmrhyr4dc7nhl4q2na4y5d2s720szfdlzzj344dqu67e3g' as CW20Addr,
      },
      anchor: {
        proxy: 'furya1hhgrnyq3gl78aqwn6hw2p0dena0lrkuq9ndfuu' as HumanAddr,
        market: 'furya1sepfj7s0aeg5967uxnfk4thzlerrsktkpelm5s' as HumanAddr,
      },
    };
  }
}

export function NEBULA_CONSTANTS(network: NetworkInfo): NebulaContants {
  return {
    gasWanted: 1_000_000 as Gas,
    fixedGas: 1_671_053 as Gas,
    blocksPerYear: 4_656_810,
    gasAdjustment: 1.6 as Rate<number>,
    govGas: 500_000 as Gas,
    swapGasWantedPerAsset: 600_000 as Gas,
    airdropGasWanted: 300_000 as Gas,
    airdropGas: 334_211 as Gas,
    nebula: {
      clusterFee: {
        default: {
          txFeeBase: 10_000_000 as Gas,
          txFeePerInventory: 800_000 as Gas,
          txFeePerAsset: 400_000 as Gas,
          gasWantedBase: 10_000_000 as Gas,
          gasWantedPerInventory: 600_000 as Gas,
          gasWantedPerAsset: 300_000 as Gas,
        },
        arbMint: {
          txFeeBase: 15_000_000 as Gas,
          txFeePerInventory: 800_000 as Gas,
          txFeePerAsset: 400_000 as Gas,
          gasWantedBase: 15_000_000 as Gas,
          gasWantedPerInventory: 600_000 as Gas,
          gasWantedPerAsset: 300_000 as Gas,
        },
        arbRedeem: {
          txFeeBase: 15_000_000 as Gas,
          txFeePerInventory: 800_000 as Gas,
          txFeePerAsset: 400_000 as Gas,
          gasWantedBase: 15_000_000 as Gas,
          gasWantedPerInventory: 600_000 as Gas,
          gasWantedPerAsset: 300_000 as Gas,
        },
      },
    },
  };
}

export const ON_PRODUCTION = global.location.host === 'app.neb.money';

export const WALLETCONNECT_BRIDGE_SERVER = 'https://walletconnect.terra.dev/';

export const NEBULA_TX_REFETCH_MAP = {
  [FURYA_TX_KEYS.CW20_BUY]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
  ],
  [FURYA_TX_KEYS.CW20_SELL]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
  ],
  [FURYA_TX_KEYS.SEND]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
  ],
  [NEBULA_TX_KEYS.CLUSTER_MULTI_BUY]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
  ],
  [NEBULA_TX_KEYS.CLUSTER_MINT]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
    NEBULA_QUERY_KEYS.CLUSTER_INFO,
  ],
  [NEBULA_TX_KEYS.CLUSTER_ARB_MINT]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
    NEBULA_QUERY_KEYS.CLUSTER_INFO,
  ],
  [NEBULA_TX_KEYS.CLUSTER_REDEEM]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
    NEBULA_QUERY_KEYS.CLUSTER_INFO,
  ],
  [NEBULA_TX_KEYS.CLUSTER_ARB_REDEEM]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
    NEBULA_QUERY_KEYS.CLUSTER_INFO,
  ],
  [NEBULA_TX_KEYS.STAKING_STAKE]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
    NEBULA_QUERY_KEYS.STAKING_REWARD_INFO,
  ],
  [NEBULA_TX_KEYS.STAKING_UNSTAKE]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
    NEBULA_QUERY_KEYS.STAKING_REWARD_INFO,
  ],
  [NEBULA_TX_KEYS.GOV_STAKE]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
    FURYA_QUERY_KEY.CW20_TOKEN_INFO,
    NEBULA_QUERY_KEYS.GOV_STATE,
    NEBULA_QUERY_KEYS.GOV_STAKER,
  ],
  [NEBULA_TX_KEYS.GOV_UNSTAKE]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
    FURYA_QUERY_KEY.CW20_TOKEN_INFO,
    NEBULA_QUERY_KEYS.GOV_STATE,
    NEBULA_QUERY_KEYS.GOV_STAKER,
  ],
  [NEBULA_TX_KEYS.GOV_CREATE_POLL]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    NEBULA_QUERY_KEYS.GOV_POLLS,
  ],
  [NEBULA_TX_KEYS.GOV_VOTE]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    NEBULA_QUERY_KEYS.GOV_POLL,
    NEBULA_QUERY_KEYS.GOV_VOTERS,
    NEBULA_QUERY_KEYS.GOV_STAKER,
  ],
  [NEBULA_TX_KEYS.GOV_CLAIM_REWARD]: [NEBULA_QUERY_KEYS.GOV_STAKER],
  [NEBULA_TX_KEYS.GOV_RESTAKE_REWARD]: [NEBULA_QUERY_KEYS.GOV_STAKER],
  [NEBULA_TX_KEYS.CLAIM_INCENTIVE_REWARD]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
    NEBULA_QUERY_KEYS.INCENTIVE_REWARD,
  ],
  [NEBULA_TX_KEYS.CLAIM_ALL_REWARDS]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
    FURYA_QUERY_KEY.CW20_TOKEN_INFO,
    NEBULA_QUERY_KEYS.MYPAGE_HOLDINGS,
    NEBULA_QUERY_KEYS.MYPAGE_STAKING,
    NEBULA_QUERY_KEYS.GOV_STAKER,
    NEBULA_QUERY_KEYS.INCENTIVE_REWARD,
  ],
  [NEBULA_TX_KEYS.AIRDROP_CLAIM]: [
    FURYA_QUERY_KEY.TOKEN_BALANCES,
    FURYA_QUERY_KEY.CW20_BALANCE,
    FURYA_QUERY_KEY.FURYA_BALANCES,
    FURYA_QUERY_KEY.FURYA_NATIVE_BALANCES,
    NEBULA_QUERY_KEYS.AIRDROP_CHECK,
  ],
};
