import { implicitReturnType } from '../base/types.js'
import { Exchange as _Exchange } from '../base/Exchange.js'

export default abstract class Exchange extends _Exchange {
    abstract v2PublicGetCurrencies (params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetTime (params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetExchangeRates (params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetUsersUserId (params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetPricesSymbolBuy (params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetPricesSymbolSell (params?: {}): Promise<implicitReturnType>;
    abstract v2PublicGetPricesSymbolSpot (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccounts (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccountsAccountId (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccountsAccountIdAddresses (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccountsAccountIdAddressesAddressId (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccountsAccountIdAddressesAddressIdTransactions (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccountsAccountIdTransactions (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccountsAccountIdTransactionsTransactionId (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccountsAccountIdBuys (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccountsAccountIdBuysBuyId (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccountsAccountIdSells (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccountsAccountIdSellsSellId (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccountsAccountIdDeposits (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccountsAccountIdDepositsDepositId (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccountsAccountIdWithdrawals (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetAccountsAccountIdWithdrawalsWithdrawalId (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetPaymentMethods (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetPaymentMethodsPaymentMethodId (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetUser (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateGetUserAuth (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostAccounts (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostAccountsAccountIdPrimary (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostAccountsAccountIdAddresses (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostAccountsAccountIdTransactions (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostAccountsAccountIdTransactionsTransactionIdComplete (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostAccountsAccountIdTransactionsTransactionIdResend (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostAccountsAccountIdBuys (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostAccountsAccountIdBuysBuyIdCommit (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostAccountsAccountIdSells (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostAccountsAccountIdSellsSellIdCommit (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostAccountsAccountIdDeposits (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostAccountsAccountIdDepositsDepositIdCommit (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostAccountsAccountIdWithdrawals (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePostAccountsAccountIdWithdrawalsWithdrawalIdCommit (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePutAccountsAccountId (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivatePutUser (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateDeleteAccountsId (params?: {}): Promise<implicitReturnType>;
    abstract v2PrivateDeleteAccountsAccountIdTransactionsTransactionId (params?: {}): Promise<implicitReturnType>;
    abstract v3PrivateGetBrokerageAccounts (params?: {}): Promise<implicitReturnType>;
    abstract v3PrivateGetBrokerageAccountsAccountUuid (params?: {}): Promise<implicitReturnType>;
    abstract v3PrivateGetBrokerageOrdersHistoricalBatch (params?: {}): Promise<implicitReturnType>;
    abstract v3PrivateGetBrokerageOrdersHistoricalFills (params?: {}): Promise<implicitReturnType>;
    abstract v3PrivateGetBrokerageOrdersHistoricalOrderId (params?: {}): Promise<implicitReturnType>;
    abstract v3PrivateGetBrokerageProducts (params?: {}): Promise<implicitReturnType>;
    abstract v3PrivateGetBrokerageProductsProductId (params?: {}): Promise<implicitReturnType>;
    abstract v3PrivateGetBrokerageProductsProductIdCandles (params?: {}): Promise<implicitReturnType>;
    abstract v3PrivateGetBrokerageProductsProductIdTicker (params?: {}): Promise<implicitReturnType>;
    abstract v3PrivateGetBrokerageTransactionSummary (params?: {}): Promise<implicitReturnType>;
    abstract v3PrivatePostBrokerageOrders (params?: {}): Promise<implicitReturnType>;
    abstract v3PrivatePostBrokerageOrdersBatchCancel (params?: {}): Promise<implicitReturnType>;
}