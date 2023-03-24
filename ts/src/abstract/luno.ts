import { implicitReturnType } from '../base/types.js'
import { Exchange as _Exchange } from '../base/Exchange.js'

export default abstract class Exchange extends _Exchange {
    abstract exchangeGetMarkets (params?: {}): Promise<implicitReturnType>;
    abstract publicGetOrderbook (params?: {}): Promise<implicitReturnType>;
    abstract publicGetOrderbookTop (params?: {}): Promise<implicitReturnType>;
    abstract publicGetTicker (params?: {}): Promise<implicitReturnType>;
    abstract publicGetTickers (params?: {}): Promise<implicitReturnType>;
    abstract publicGetTrades (params?: {}): Promise<implicitReturnType>;
    abstract privateGetAccountsIdPending (params?: {}): Promise<implicitReturnType>;
    abstract privateGetAccountsIdTransactions (params?: {}): Promise<implicitReturnType>;
    abstract privateGetBalance (params?: {}): Promise<implicitReturnType>;
    abstract privateGetBeneficiaries (params?: {}): Promise<implicitReturnType>;
    abstract privateGetFeeInfo (params?: {}): Promise<implicitReturnType>;
    abstract privateGetFundingAddress (params?: {}): Promise<implicitReturnType>;
    abstract privateGetListorders (params?: {}): Promise<implicitReturnType>;
    abstract privateGetListtrades (params?: {}): Promise<implicitReturnType>;
    abstract privateGetOrdersId (params?: {}): Promise<implicitReturnType>;
    abstract privateGetQuotesId (params?: {}): Promise<implicitReturnType>;
    abstract privateGetWithdrawals (params?: {}): Promise<implicitReturnType>;
    abstract privateGetWithdrawalsId (params?: {}): Promise<implicitReturnType>;
    abstract privateGetTransfers (params?: {}): Promise<implicitReturnType>;
    abstract privatePostAccounts (params?: {}): Promise<implicitReturnType>;
    abstract privatePostAccountsIdName (params?: {}): Promise<implicitReturnType>;
    abstract privatePostPostorder (params?: {}): Promise<implicitReturnType>;
    abstract privatePostMarketorder (params?: {}): Promise<implicitReturnType>;
    abstract privatePostStoporder (params?: {}): Promise<implicitReturnType>;
    abstract privatePostFundingAddress (params?: {}): Promise<implicitReturnType>;
    abstract privatePostWithdrawals (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSend (params?: {}): Promise<implicitReturnType>;
    abstract privatePostQuotes (params?: {}): Promise<implicitReturnType>;
    abstract privatePostOauth2Grant (params?: {}): Promise<implicitReturnType>;
    abstract privatePutAccountsIdName (params?: {}): Promise<implicitReturnType>;
    abstract privatePutQuotesId (params?: {}): Promise<implicitReturnType>;
    abstract privateDeleteQuotesId (params?: {}): Promise<implicitReturnType>;
    abstract privateDeleteWithdrawalsId (params?: {}): Promise<implicitReturnType>;
}