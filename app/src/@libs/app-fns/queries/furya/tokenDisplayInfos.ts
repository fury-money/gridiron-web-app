import { TokenDisplayInfo } from '../../models/tokenDisplayInfo';
import { cw20TokenDisplayInfosQuery } from '../cw20/tokenDisplayInfos';

const NATIVE_TOKEN_DISPLAY_INFOS: TokenDisplayInfo[] = [
  {
    protocol: 'Furya',
    symbol: 'UST',
    asset: { native_token: { denom: 'uusd' } },
    icon: 'https://assets.terra.money/icon/60/UST.png',
  },
  {
    protocol: 'Furya',
    symbol: 'Luna',
    asset: { native_token: { denom: 'ufury' } },
    icon: 'https://assets.terra.money/icon/60/Luna.png',
  },
  {
    protocol: 'Furya',
    symbol: 'AUT',
    asset: { native_token: { denom: 'uaud' } },
    icon: 'https://assets.terra.money/icon/60/AUT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'CAT',
    asset: { native_token: { denom: 'ucad' } },
    icon: 'https://assets.terra.money/icon/60/CAT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'CHT',
    asset: { native_token: { denom: 'uchf' } },
    icon: 'https://assets.terra.money/icon/60/CHT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'CNT',
    asset: { native_token: { denom: 'ucny' } },
    icon: 'https://assets.terra.money/icon/60/CNT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'DKT',
    asset: { native_token: { denom: 'udkk' } },
    icon: 'https://assets.terra.money/icon/60/DKT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'EUT',
    asset: { native_token: { denom: 'ueur' } },
    icon: 'https://assets.terra.money/icon/60/EUT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'GBT',
    asset: { native_token: { denom: 'ugbp' } },
    icon: 'https://assets.terra.money/icon/60/GBT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'HKT',
    asset: { native_token: { denom: 'uhkd' } },
    icon: 'https://assets.terra.money/icon/60/HKT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'IDT',
    asset: { native_token: { denom: 'uidr' } },
    icon: 'https://assets.terra.money/icon/60/IDT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'INT',
    asset: { native_token: { denom: 'uinr' } },
    icon: 'https://assets.terra.money/icon/60/INT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'JPT',
    asset: { native_token: { denom: 'ujpy' } },
    icon: 'https://assets.terra.money/icon/60/JPT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'MNT',
    asset: { native_token: { denom: 'umnt' } },
    icon: 'https://assets.terra.money/icon/60/MNT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'NOT',
    asset: { native_token: { denom: 'unok' } },
    icon: 'https://assets.terra.money/icon/60/NOT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'PHT',
    asset: { native_token: { denom: 'uphp' } },
    icon: 'https://assets.terra.money/icon/60/PHT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'SDT',
    asset: { native_token: { denom: 'usdr' } },
    icon: 'https://assets.terra.money/icon/60/SDT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'SET',
    asset: { native_token: { denom: 'usek' } },
    icon: 'https://assets.terra.money/icon/60/SET.png',
  },
  {
    protocol: 'Furya',
    symbol: 'SGT',
    asset: { native_token: { denom: 'usgd' } },
    icon: 'https://assets.terra.money/icon/60/SGT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'THT',
    asset: { native_token: { denom: 'uthb' } },
    icon: 'https://assets.terra.money/icon/60/THT.png',
  },
  {
    protocol: 'Furya',
    symbol: 'KRT',
    asset: { native_token: { denom: 'ukrt' } },
    icon: 'https://assets.terra.money/icon/60/KRT.png',
  },
];

const cache: Map<string, TokenDisplayInfo[]> = new Map();

export async function tokenDisplayInfosQuery(
  networkName: string,
): Promise<TokenDisplayInfo[]> {
  if (cache.has(networkName)) {
    return cache.get(networkName)!;
  }

  const cw20TokenDisplayInfos = await cw20TokenDisplayInfosQuery();

  const cw20DisplayInfos =
    cw20TokenDisplayInfos[networkName] ?? cw20TokenDisplayInfos['mainnet'];

  const result: TokenDisplayInfo[] = [
    ...NATIVE_TOKEN_DISPLAY_INFOS,
    ...Object.values(cw20DisplayInfos)
      .filter(({ symbol }) => symbol.toLowerCase().indexOf('delisted') === -1)
      .filter(
        ({ symbol, protocol }) =>
          symbol === 'MIR' ||
          (!!protocol && protocol.toLowerCase() !== 'mirror'),
      )
      .map(({ token, symbol, protocol, icon }) => {
        return {
          protocol,
          symbol,
          icon,
          asset: {
            token: {
              contract_addr: token,
            },
          },
        };
      }),
  ];

  cache.set(networkName, result);

  return result;
}
