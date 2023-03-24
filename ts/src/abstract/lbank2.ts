import { implicitReturnType } from '../base/types.js'
import { Exchange as _Exchange } from '../base/Exchange.js'

export default abstract class Exchange extends _Exchange {
    abstract publicGetCurrencyPairs (params?: {}): Promise<implicitReturnType>;
    abstract publicGetAccuracy (params?: {}): Promise<implicitReturnType>;
    abstract publicGetUsdToCny (params?: {}): Promise<implicitReturnType>;
    abstract publicGetWithdrawConfigs (params?: {}): Promise<implicitReturnType>;
    abstract publicGetTimestamp (params?: {}): Promise<implicitReturnType>;
    abstract publicGetTicker24hr (params?: {}): Promise<implicitReturnType>;
    abstract publicGetTicker (params?: {}): Promise<implicitReturnType>;
    abstract publicGetDepth (params?: {}): Promise<implicitReturnType>;
    abstract publicGetIncrDepth (params?: {}): Promise<implicitReturnType>;
    abstract publicGetTrades (params?: {}): Promise<implicitReturnType>;
    abstract publicGetKline (params?: {}): Promise<implicitReturnType>;
    abstract publicGetSupplementSystemPing (params?: {}): Promise<implicitReturnType>;
    abstract publicGetSupplementIncrDepth (params?: {}): Promise<implicitReturnType>;
    abstract publicGetSupplementTrades (params?: {}): Promise<implicitReturnType>;
    abstract publicGetSupplementTickerPrice (params?: {}): Promise<implicitReturnType>;
    abstract publicGetSupplementTickerBookTicker (params?: {}): Promise<implicitReturnType>;
    abstract publicPostSupplementSystemStatus (params?: {}): Promise<implicitReturnType>;
    abstract privatePostUserInfo (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSubscribeGetKey (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSubscribeRefreshKey (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSubscribeDestroyKey (params?: {}): Promise<implicitReturnType>;
    abstract privatePostGetDepositAddress (params?: {}): Promise<implicitReturnType>;
    abstract privatePostDepositHistory (params?: {}): Promise<implicitReturnType>;
    abstract privatePostCreateOrder (params?: {}): Promise<implicitReturnType>;
    abstract privatePostBatchCreateOrder (params?: {}): Promise<implicitReturnType>;
    abstract privatePostCancelOrder (params?: {}): Promise<implicitReturnType>;
    abstract privatePostCancelClientOrders (params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrdersInfo (params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrdersInfoHistory (params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrderTransactionDetail (params?: {}): Promise<implicitReturnType>;
    abstract privatePostTransactionHistory (params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrdersInfoNoDeal (params?: {}): Promise<implicitReturnType>;
    abstract privatePostWithdraw (params?: {}): Promise<implicitReturnType>;
    abstract privatePostWithdrawCancel (params?: {}): Promise<implicitReturnType>;
    abstract privatePostWithdraws (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementUserInfo (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementWithdraw (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementDepositHistory (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementWithdraws (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementGetDepositAddress (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementAssetDetail (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementCustomerTradeFee (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementApiRestrictions (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementSystemPing (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementCreateOrderTest (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementCreateOrder (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementCancelOrder (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementCancelOrderBySymbol (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementOrdersInfo (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementOrdersInfoNoDeal (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementOrdersInfoHistory (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementUserInfoAccount (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSupplementTransactionHistory (params?: {}): Promise<implicitReturnType>;
}