import { implicitReturnType } from '../base/types.js'
import { Exchange as _Exchange } from '../base/Exchange.js'

export default abstract class Exchange extends _Exchange {
    abstract publicGetPairs (params?: {}): Promise<implicitReturnType>;
    abstract publicGetMarkets (params?: {}): Promise<implicitReturnType>;
    abstract publicGetCurrencies (params?: {}): Promise<implicitReturnType>;
    abstract publicGetMarketsMarket (params?: {}): Promise<implicitReturnType>;
    abstract publicGetMarketsMarketTicker (params?: {}): Promise<implicitReturnType>;
    abstract publicGetMarketsMarketVolume (params?: {}): Promise<implicitReturnType>;
    abstract publicGetMarketsMarketOrderBook (params?: {}): Promise<implicitReturnType>;
    abstract publicGetMarketsMarketTrades (params?: {}): Promise<implicitReturnType>;
    abstract publicGetCurrenciesCurrencyFeesDeposit (params?: {}): Promise<implicitReturnType>;
    abstract publicGetCurrenciesCurrencyFeesWithdrawal (params?: {}): Promise<implicitReturnType>;
    abstract publicGetTvHistory (params?: {}): Promise<implicitReturnType>;
    abstract publicPostMarketsMarketQuotations (params?: {}): Promise<implicitReturnType>;
    abstract privateGetBalances (params?: {}): Promise<implicitReturnType>;
    abstract privateGetBalancesCurrency (params?: {}): Promise<implicitReturnType>;
    abstract privateGetCurrenciesCurrencyBalances (params?: {}): Promise<implicitReturnType>;
    abstract privateGetOrders (params?: {}): Promise<implicitReturnType>;
    abstract privateGetOrdersId (params?: {}): Promise<implicitReturnType>;
    abstract privateGetMarketsMarketOrders (params?: {}): Promise<implicitReturnType>;
    abstract privateGetDeposits (params?: {}): Promise<implicitReturnType>;
    abstract privateGetCurrenciesCurrencyDeposits (params?: {}): Promise<implicitReturnType>;
    abstract privateGetWithdrawals (params?: {}): Promise<implicitReturnType>;
    abstract privateGetCurrenciesCurrencyWithdrawals (params?: {}): Promise<implicitReturnType>;
    abstract privateGetCurrenciesCurrencyReceiveAddresses (params?: {}): Promise<implicitReturnType>;
    abstract privateGetCurrenciesCurrencyReceiveAddressesId (params?: {}): Promise<implicitReturnType>;
    abstract privatePostMarketsMarketOrders (params?: {}): Promise<implicitReturnType>;
    abstract privatePostCurrenciesCurrencyDeposits (params?: {}): Promise<implicitReturnType>;
    abstract privatePostCurrenciesCurrencyWithdrawals (params?: {}): Promise<implicitReturnType>;
    abstract privatePostCurrenciesCurrencySimulatedWithdrawals (params?: {}): Promise<implicitReturnType>;
    abstract privatePostCurrenciesCurrencyReceiveAddresses (params?: {}): Promise<implicitReturnType>;
    abstract privatePutOrdersId (params?: {}): Promise<implicitReturnType>;
}