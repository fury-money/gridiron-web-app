import { Luna, u, UST } from '@libs/types';

export function stripUUSD(uusd: string): u<UST> {
  return uusd.substring(0, uusd.length - 4) as u<UST>;
}

export function stripULuna(ufury: string): u<Luna> {
  return ufury.substring(0, ufury.length - 5) as u<Luna>;
}
