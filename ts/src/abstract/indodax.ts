import { implicitReturnType } from '../base/types.js'
import { Exchange as _Exchange } from '../base/Exchange.js'

export default abstract class Exchange extends _Exchange {
    abstract publicGetServerTime (params?: {}): Promise<implicitReturnType>;
    abstract publicGetPairs (params?: {}): Promise<implicitReturnType>;
    abstract publicGetPriceIncrements (params?: {}): Promise<implicitReturnType>;
    abstract publicGetSummaries (params?: {}): Promise<implicitReturnType>;
    abstract publicGetTickerAll (params?: {}): Promise<implicitReturnType>;
    abstract publicGetPairTicker (params?: {}): Promise<implicitReturnType>;
    abstract publicGetPairTrades (params?: {}): Promise<implicitReturnType>;
    abstract publicGetPairDepth (params?: {}): Promise<implicitReturnType>;
    abstract privatePostGetInfo (params?: {}): Promise<implicitReturnType>;
    abstract privatePostTransHistory (params?: {}): Promise<implicitReturnType>;
    abstract privatePostTrade (params?: {}): Promise<implicitReturnType>;
    abstract privatePostTradeHistory (params?: {}): Promise<implicitReturnType>;
    abstract privatePostOpenOrders (params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrderHistory (params?: {}): Promise<implicitReturnType>;
    abstract privatePostGetOrder (params?: {}): Promise<implicitReturnType>;
    abstract privatePostCancelOrder (params?: {}): Promise<implicitReturnType>;
    abstract privatePostWithdrawFee (params?: {}): Promise<implicitReturnType>;
    abstract privatePostWithdrawCoin (params?: {}): Promise<implicitReturnType>;
    abstract privatePostListDownline (params?: {}): Promise<implicitReturnType>;
    abstract privatePostCheckDownline (params?: {}): Promise<implicitReturnType>;
    abstract privatePostCreateVoucher (params?: {}): Promise<implicitReturnType>;
}