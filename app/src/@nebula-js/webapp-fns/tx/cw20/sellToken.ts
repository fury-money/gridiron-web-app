import { createHookMsg } from '@anchor-protocol/anchor.js/dist/utils/cw20/create-hook-msg';
import {
  formatTokenIntegerWithPostfixUnits,
  formatUTokenIntegerWithPostfixUnits,
  stripUUSD,
} from '@nebula-js/notation';
import { CW20Addr, HumanAddr, Rate, Token, u, UST } from '@nebula-js/types';
import { pipe } from '@rx-stream/pipe';
import { floor } from '@terra-dev/big-math';
import { MsgExecuteContract, StdFee } from '@terra-money/terra.js';
import {
  pickAttributeValueByKey,
  pickEvent,
  pickRawLog,
  TxResultRendering,
  TxStreamPhase,
} from '@terra-money/webapp-fns';
import big, { Big } from 'big.js';
import { Observable } from 'rxjs';
import { NebulaTax } from '../../types';
import { _catchTxError } from '../internal/_catchTxError';
import { _createTxOptions } from '../internal/_createTxOptions';
import { _pollTxInfo } from '../internal/_pollTxInfo';
import { _postTx } from '../internal/_postTx';
import { TxHelper } from '../internal/TxHelper';
import { TxCommonParams } from '../TxCommonParams';

export function cw20SellTokenTx<T extends Token>(
  $: {
    sellerAddr: HumanAddr;
    sellAmount: u<T>;
    tokenAddr: CW20Addr;
    tokenUstPairAddr: HumanAddr;
    tokenSymbol: string;
    beliefPrice: T;
    maxSpread: Rate;
    tax: NebulaTax;
    onTxSucceed?: () => void;
  } & TxCommonParams,
): Observable<TxResultRendering> {
  const helper = new TxHelper($);

  return pipe(
    _createTxOptions({
      msgs: [
        new MsgExecuteContract($.sellerAddr, $.tokenAddr, {
          send: {
            contract: $.tokenUstPairAddr,
            amount: $.sellAmount,
            msg: createHookMsg({
              swap: {
                belief_price: $.beliefPrice,
                max_spread: $.maxSpread,
              },
            }),
          },
        }),
      ],
      fee: new StdFee($.gasFee, floor($.txFee) + 'uusd'),
      gasAdjustment: $.gasAdjustment,
    }),
    _postTx({ helper, ...$ }),
    _pollTxInfo({ helper, ...$ }),
    ({ value: txInfo }) => {
      const rawLog = pickRawLog(txInfo, 0);

      if (!rawLog) {
        return helper.failedToFindRawLog();
      }

      const fromContract = pickEvent(rawLog, 'from_contract');
      const transfer = pickEvent(rawLog, 'transfer');

      if (!fromContract || !transfer) {
        return helper.failedToFindEvents('from_contract', 'transfer');
      }

      try {
        // sold
        const offer_amount = pickAttributeValueByKey<u<UST>>(
          fromContract,
          'offer_amount',
        );
        // earned
        const return_amount = pickAttributeValueByKey<u<Token>>(
          fromContract,
          'return_amount',
        );
        const spread_amount = pickAttributeValueByKey<u<UST>>(
          fromContract,
          'spread_amount',
        );
        const commission_amount = pickAttributeValueByKey<u<UST>>(
          fromContract,
          'commission_amount',
        );
        const transfer_amount = stripUUSD(
          pickAttributeValueByKey<u<UST>>(
            transfer,
            'amount',
            (attrs) => attrs[0],
          ) ?? '0uusd',
        );

        const pricePerToken =
          return_amount && offer_amount
            ? (big(return_amount).div(offer_amount) as UST<Big>)
            : undefined;
        const tradingFee =
          spread_amount && commission_amount
            ? (big(spread_amount).plus(commission_amount) as u<UST<Big>>)
            : undefined;
        const txFee = big($.fixedGas).plus(transfer_amount) as u<UST<Big>>;

        return {
          value: null,

          phase: TxStreamPhase.SUCCEED,
          receipts: [
            offer_amount && {
              name: 'Sold',
              value: `${formatUTokenIntegerWithPostfixUnits(offer_amount)} ${
                $.tokenSymbol
              }`,
            },
            return_amount && {
              name: 'Earned',
              value: `${formatUTokenIntegerWithPostfixUnits(
                return_amount,
              )} UST`,
            },
            pricePerToken && {
              name: `Price per ${$.tokenSymbol}`,
              value: `${formatTokenIntegerWithPostfixUnits(pricePerToken)} UST`,
            },
            tradingFee && {
              name: 'Trading Fee',
              value: `${formatUTokenIntegerWithPostfixUnits(tradingFee)} UST`,
            },
            helper.txHashReceipt(),
            helper.txFeeReceipt(txFee),
          ],
        } as TxResultRendering;
      } catch (error) {
        return helper.failedToParseTxResult();
      }
    },
  )().pipe(_catchTxError({ helper, ...$ }));
}
