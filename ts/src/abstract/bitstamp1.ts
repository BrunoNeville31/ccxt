import { implicitReturnType } from '../base/types.js'
import { Exchange as _Exchange } from '../base/Exchange.js'

export default abstract class Exchange extends _Exchange {
    abstract publicGetTicker (params?: {}): Promise<implicitReturnType>;
    abstract publicGetTickerHour (params?: {}): Promise<implicitReturnType>;
    abstract publicGetOrderBook (params?: {}): Promise<implicitReturnType>;
    abstract publicGetTransactions (params?: {}): Promise<implicitReturnType>;
    abstract publicGetEurUsd (params?: {}): Promise<implicitReturnType>;
    abstract privatePostBalance (params?: {}): Promise<implicitReturnType>;
    abstract privatePostUserTransactions (params?: {}): Promise<implicitReturnType>;
    abstract privatePostOpenOrders (params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrderStatus (params?: {}): Promise<implicitReturnType>;
    abstract privatePostCancelOrder (params?: {}): Promise<implicitReturnType>;
    abstract privatePostCancelAllOrders (params?: {}): Promise<implicitReturnType>;
    abstract privatePostBuy (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSell (params?: {}): Promise<implicitReturnType>;
    abstract privatePostBitcoinDepositAddress (params?: {}): Promise<implicitReturnType>;
    abstract privatePostUnconfirmedBtc (params?: {}): Promise<implicitReturnType>;
    abstract privatePostRippleWithdrawal (params?: {}): Promise<implicitReturnType>;
    abstract privatePostRippleAddress (params?: {}): Promise<implicitReturnType>;
    abstract privatePostWithdrawalRequests (params?: {}): Promise<implicitReturnType>;
    abstract privatePostBitcoinWithdrawal (params?: {}): Promise<implicitReturnType>;
}