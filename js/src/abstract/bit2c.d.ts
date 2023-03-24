import { implicitReturnType } from '../base/types.js';
import { Exchange as _Exchange } from '../base/Exchange.js';
export default abstract class Exchange extends _Exchange {
    abstract publicGetExchangesPairTicker(params?: {}): Promise<implicitReturnType>;
    abstract publicGetExchangesPairOrderbook(params?: {}): Promise<implicitReturnType>;
    abstract publicGetExchangesPairTrades(params?: {}): Promise<implicitReturnType>;
    abstract publicGetExchangesPairLasttrades(params?: {}): Promise<implicitReturnType>;
    abstract privatePostMerchantCreateCheckout(params?: {}): Promise<implicitReturnType>;
    abstract privatePostFundsAddCoinFundsRequest(params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrderAddFund(params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrderAddOrder(params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrderGetById(params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrderAddOrderMarketPriceBuy(params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrderAddOrderMarketPriceSell(params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrderCancelOrder(params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrderAddCoinFundsRequest(params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrderAddStopOrder(params?: {}): Promise<implicitReturnType>;
    abstract privatePostPaymentGetMyId(params?: {}): Promise<implicitReturnType>;
    abstract privatePostPaymentSend(params?: {}): Promise<implicitReturnType>;
    abstract privatePostPaymentPay(params?: {}): Promise<implicitReturnType>;
    abstract privateGetAccountBalance(params?: {}): Promise<implicitReturnType>;
    abstract privateGetAccountBalanceV2(params?: {}): Promise<implicitReturnType>;
    abstract privateGetOrderMyOrders(params?: {}): Promise<implicitReturnType>;
    abstract privateGetOrderGetById(params?: {}): Promise<implicitReturnType>;
    abstract privateGetOrderAccountHistory(params?: {}): Promise<implicitReturnType>;
    abstract privateGetOrderOrderHistory(params?: {}): Promise<implicitReturnType>;
}
