import { QueryClient } from '@libs/query-client';
import { NebulaContractAddress } from '@nebula-js/app-provider';
import { CW20Addr, gov, HumanAddr, OrderBy } from '@nebula-js/types';
import { ParsedPoll } from '../../logics/gov/parseGovPollResponse';
import { govPollsQuery } from './polls';
import { govStakerQuery } from './staker';

export type GovMyPolls = Array<{ poll: ParsedPoll; voterInfo?: gov.VoterInfo }>;

export async function govMyPollsQuery(
  walletAddr: HumanAddr | undefined,
  govAddr: HumanAddr,
  nebTokenAddr: CW20Addr,
  contractAddress: NebulaContractAddress,
  lastSyncedHeight: () => Promise<number>,
  queryClient: QueryClient,
): Promise<GovMyPolls> {
  const { parsedPolls } = await govPollsQuery(
    govAddr,
    {
      limit: 20,
      filter: gov.PollStatus.InProgress,
      order_by: OrderBy.Desc,
    },
    nebTokenAddr,
    contractAddress,
    lastSyncedHeight,
    queryClient,
  );

  if (parsedPolls.length === 0) {
    return [];
  }

  const polls: GovMyPolls = parsedPolls.map((poll) => ({ poll }));

  if (!walletAddr) {
    return polls;
  }

  const stakerResult = await govStakerQuery(walletAddr, govAddr, queryClient);

  if (stakerResult && (stakerResult.govStaker.locked_balance.length ?? 0) > 0) {
    for (const poll of polls) {
      const lockedBalance = stakerResult.govStaker.locked_balance.find(
        ([targetPollId]) => targetPollId === poll.poll.poll.id,
      );

      if (lockedBalance) {
        poll.voterInfo = lockedBalance[1];
      }
    }
  }

  return polls;
}
