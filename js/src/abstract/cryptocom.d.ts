import { implicitReturnType } from '../base/types.js';
import { Exchange as _Exchange } from '../base/Exchange.js';
export default abstract class Exchange extends _Exchange {
    abstract v1PublicGetPublicAuth(params?: {}): Promise<implicitReturnType>;
    abstract v1PublicGetPublicGetInstruments(params?: {}): Promise<implicitReturnType>;
    abstract v1PublicGetPublicGetBook(params?: {}): Promise<implicitReturnType>;
    abstract v1PublicGetPublicGetCandlestick(params?: {}): Promise<implicitReturnType>;
    abstract v1PublicGetPublicGetTrades(params?: {}): Promise<implicitReturnType>;
    abstract v1PublicGetPublicGetTickers(params?: {}): Promise<implicitReturnType>;
    abstract v1PublicGetPublicGetValuations(params?: {}): Promise<implicitReturnType>;
    abstract v1PublicGetPublicGetExpiredSettlementPrice(params?: {}): Promise<implicitReturnType>;
    abstract v1PublicGetPublicGetInsurance(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateSetCancelOnDisconnect(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateGetCancelOnDisconnect(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateUserBalance(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateUserBalanceHistory(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateGetPositions(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateCreateOrder(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateCreateOrderList(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateCancelOrder(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateCancelOrderList(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateCancelAllOrders(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateClosePosition(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateGetOrderHistory(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateGetOpenOrders(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateGetOrderDetail(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateGetTrades(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateChangeAccountLeverage(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateGetTransactions(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateCreateSubaccountTransfer(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateGetSubaccountBalances(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateGetOrderList(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateCreateWithdrawal(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateGetCurrencyNetworks(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateGetDepositAddress(params?: {}): Promise<implicitReturnType>;
    abstract v1PrivatePostPrivateGetAccounts(params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetPublicAuth(params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetPublicGetInstruments(params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetPublicGetBook(params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetPublicGetCandlestick(params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetPublicGetTicker(params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetPublicGetTrades(params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetPublicMarginGetTransferCurrencies(params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetPublicMarginGetLoadCurrenices(params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetPublicRespondHeartbeat(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateSetCancelOnDisconnect(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateGetCancelOnDisconnect(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateCreateWithdrawal(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateGetWithdrawalHistory(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateGetCurrencyNetworks(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateGetDepositHistory(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateGetDepositAddress(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateGetAccountSummary(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateCreateOrder(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateCancelOrder(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateCancelAllOrders(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateCreateOrderList(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateGetOrderHistory(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateGetOpenOrders(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateGetOrderDetail(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateGetTrades(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginGetUserConfig(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginGetAccountSummary(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginTransfer(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginBorrow(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginRepay(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginGetTransferHistory(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginGetBorrowHistory(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginGetInterestHistory(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginGetRepayHistory(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginGetLiquidationHistory(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginGetLiquidationOrders(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginCreateOrder(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginCancelOrder(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginCancelAllOrders(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginGetOrderHistory(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginGetOpenOrders(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginGetOrderDetail(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateMarginGetTrades(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateDerivTransfer(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateDerivGetTransferHistory(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateGetAccounts(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateGetSubaccountBalances(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateCreateSubaccountTransfer(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateOtcGetOtcUser(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateOtcGetInstruments(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateOtcRequestQuote(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateOtcAcceptQuote(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateOtcGetQuoteHistory(params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostPrivateOtcGetTradeHistory(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPublicGetPublicAuth(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPublicGetPublicGetInstruments(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPublicGetPublicGetBook(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPublicGetPublicGetCandlestick(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPublicGetPublicGetTrades(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPublicGetPublicGetTickers(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPublicGetPublicGetValuations(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPublicGetPublicGetExpiredSettlementPrice(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPublicGetPublicGetInsurance(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateSetCancelOnDisconnect(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateGetCancelOnDisconnect(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateUserBalance(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateUserBalanceHistory(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateGetPositions(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateCreateOrder(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateCreateOrderList(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateCancelOrder(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateCancelOrderList(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateCancelAllOrders(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateClosePosition(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateConvertCollateral(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateGetOrderHistory(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateGetOpenOrders(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateGetOrderDetail(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateGetTrades(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateChangeAccountLeverage(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateGetTransactions(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateCreateSubaccountTransfer(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateGetSubaccountBalances(params?: {}): Promise<implicitReturnType>;
    abstract derivativesPrivatePostPrivateGetOrderList(params?: {}): Promise<implicitReturnType>;
}
