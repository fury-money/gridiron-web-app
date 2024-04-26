import {
  defaultHiveFetcher,
  defaultLcdFetcher,
  HiveQueryClient,
  LcdQueryClient,
} from '@libs/query-client';
import { HumanAddr } from '@libs/types';

export const TEST_HIVE_CLIENT: HiveQueryClient = {
  hiveEndpoint: 'https://api.furya.xyz',
  hiveFetcher: defaultHiveFetcher,
};

export const TEST_LCD_CLIENT: LcdQueryClient = {
  lcdEndpoint: 'https://api.furya.xyz',
  lcdFetcher: defaultLcdFetcher,
};

export const TEST_WALLET_ADDRESS =
  'furya12hnhh5vtyg5juqnzm43970nh4fw42pt27nw9g9' as HumanAddr;

export const TEST_CONTRACT_ADDRESS = {
  terraswap: {
    factory: 'furya18qpjm4zkvqnpjpw0zn0tdr8gdzvt8au35v45xf' as HumanAddr,
  },
};
