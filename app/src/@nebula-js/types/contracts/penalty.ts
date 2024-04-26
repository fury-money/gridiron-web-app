import { Num, rs, Token, u } from '@libs/types';
import { CT } from '../tokens';

export namespace penalty {
  // ---------------------------------------------
  // HandleMsg
  // ---------------------------------------------
  export interface PenaltyCreate {
    block_height: rs.u64;
    // TODO is this token type?
    cluster_token_supply: rs.Uint128;
    // TODO is this token type?
    inventory: rs.Uint128[];
    // TODO set token type to mint_asset_amounts
    create_asset_amounts: u<Token<rs.Uint128>>[];
    // TODO ??? is this string?
    asset_prices: string[];
    // TODO is this type correct?
    target_weights: u<Token<rs.Uint128>>[];
  }

  export interface PenaltyRedeem {
    block_height: rs.u64;
    // TODO is this token type?
    cluster_token_supply: rs.Uint128;
    // TODO is this token type?
    inventory: rs.Uint128[];
    max_tokens: u<CT<rs.Uint128>>[];
    // TODO set token type to redeem_asset_amounts
    redeem_asset_amounts: rs.Uint128[];
    // TODO ??? is this string?
    asset_prices: string[];
    // TODO is this type correct?
    target_weights: u<Token<rs.Uint128>>[];
  }

  // ---------------------------------------------
  // QueryMsg
  // ---------------------------------------------
  export interface PenaltyQueryCreate {
    penalty_query_create: {
      block_height: rs.u64;
      // TODO is this token type?
      cluster_token_supply: rs.Uint128;
      // TODO is this token type?
      inventory: rs.Uint128[];
      // TODO set token type to mint_asset_amounts
      create_asset_amounts: u<Token<rs.Uint128>>[];
      // TODO ??? is this string?
      asset_prices: string[];
      // TODO is this type correct?
      target_weights: u<Token<rs.Uint128>>[];
    };
  }

  export interface PenaltyQueryCreateResponse {
    create_tokens: rs.Uint128;
    // TODO is this token type?
    penalty: rs.Uint128;
    attributes: unknown[]; //Attribute[],
  }

  // FIXME this type is HandleMsg and QueryMsg both
  export interface PenaltyQueryRedeem {
    penalty_query_redeem: {
      block_height: rs.u64;
      // TODO is this token type?
      cluster_token_supply: rs.Uint128;
      // TODO is this token type?
      inventory: rs.Uint128[];
      max_tokens: u<CT<rs.Uint128>>;
      // TODO set token type to redeem_asset_amounts
      redeem_asset_amounts: rs.Uint128[];
      // TODO ??? is this string?
      asset_prices: string[];
      // TODO is this type correct?
      target_weights: u<Token<rs.Uint128>>[];
    };
  }

  export interface PenaltyQueryRedeemResponse {
    redeem_assets: u<Token<rs.Uint128>>[];
    // TODO is this token type?
    penalty: rs.Uint128;
    // TODO is this token type?
    token_cost: u<CT<rs.Uint128>>;
    attributes: unknown[]; //Attribute[],
  }

  export interface Params {
    params: {};
  }

  export interface ParamsResponse {
    penalty_params: PenaltyParams;
    last_block: rs.u64;
    ema: Num;
  }

  export interface PenaltyParams {
    // penalty_amt_lo -> amount of penalty when imbalance <= penalty_cutoff_lo * E
    penalty_amt_lo: rs.FPDecimal;
    penalty_cutoff_lo: rs.FPDecimal;

    // penalty_amt_hi -> amount of penalty when imbalance >= penalty_cutoff_hi * E
    penalty_amt_hi: rs.FPDecimal;
    penalty_cutoff_hi: rs.FPDecimal;
    // in between penalty_cutoff_hi and penalty_cutoff_lo, the amount of penalty increases linearly

    // reward_amt -> amount of reward when imbalance >= reward_cutoff * E
    // no reward everywhere else
    reward_amt: rs.FPDecimal;
    reward_cutoff: rs.FPDecimal;
  }
}
