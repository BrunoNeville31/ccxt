from ccxt.base.types import Entry


class ImplicitAPI:
    public_get_openapi_v1_ping = publicGetOpenapiV1Ping = Entry('openapi/v1/ping', 'public', 'GET', {'cost': 1})
    public_get_openapi_v1_time = publicGetOpenapiV1Time = Entry('openapi/v1/time', 'public', 'GET', {'cost': 1})
    public_get_openapi_quote_v1_ticker_24hr = publicGetOpenapiQuoteV1Ticker24hr = Entry('openapi/quote/v1/ticker/24hr', 'public', 'GET', {'cost': 1, 'noSymbolAndNoSymbols': 40, 'byNumberOfSymbols': [[101, 40], [21, 20], [0, 1]]})
    public_get_openapi_quote_v1_ticker_price = publicGetOpenapiQuoteV1TickerPrice = Entry('openapi/quote/v1/ticker/price', 'public', 'GET', {'cost': 1, 'noSymbol': 2})
    public_get_openapi_quote_v1_ticker_bookticker = publicGetOpenapiQuoteV1TickerBookTicker = Entry('openapi/quote/v1/ticker/bookTicker', 'public', 'GET', {'cost': 1, 'noSymbol': 2})
    public_get_openapi_v1_exchangeinfo = publicGetOpenapiV1ExchangeInfo = Entry('openapi/v1/exchangeInfo', 'public', 'GET', {'cost': 10})
    public_get_openapi_quote_v1_depth = publicGetOpenapiQuoteV1Depth = Entry('openapi/quote/v1/depth', 'public', 'GET', {'cost': 1, 'byLimit': [[101, 5], [0, 1]]})
    public_get_openapi_quote_v1_klines = publicGetOpenapiQuoteV1Klines = Entry('openapi/quote/v1/klines', 'public', 'GET', {'cost': 1})
    public_get_openapi_quote_v1_trades = publicGetOpenapiQuoteV1Trades = Entry('openapi/quote/v1/trades', 'public', 'GET', {'cost': 1})
    public_get_openapi_v1_pairs = publicGetOpenapiV1Pairs = Entry('openapi/v1/pairs', 'public', 'GET', {'cost': 1})
    public_get_openapi_quote_v1_avgprice = publicGetOpenapiQuoteV1AvgPrice = Entry('openapi/quote/v1/avgPrice', 'public', 'GET', {'cost': 1})
    private_get_openapi_wallet_v1_config_getall = privateGetOpenapiWalletV1ConfigGetall = Entry('openapi/wallet/v1/config/getall', 'private', 'GET', {'cost': 10})
    private_get_openapi_wallet_v1_deposit_address = privateGetOpenapiWalletV1DepositAddress = Entry('openapi/wallet/v1/deposit/address', 'private', 'GET', {'cost': 10})
    private_get_openapi_wallet_v1_deposit_history = privateGetOpenapiWalletV1DepositHistory = Entry('openapi/wallet/v1/deposit/history', 'private', 'GET', {'cost': 1})
    private_get_openapi_wallet_v1_withdraw_history = privateGetOpenapiWalletV1WithdrawHistory = Entry('openapi/wallet/v1/withdraw/history', 'private', 'GET', {'cost': 1})
    private_get_openapi_v1_account = privateGetOpenapiV1Account = Entry('openapi/v1/account', 'private', 'GET', {'cost': 10})
    private_get_openapi_v1_openorders = privateGetOpenapiV1OpenOrders = Entry('openapi/v1/openOrders', 'private', 'GET', {'cost': 3, 'noSymbol': 40})
    private_get_openapi_v1_asset_tradefee = privateGetOpenapiV1AssetTradeFee = Entry('openapi/v1/asset/tradeFee', 'private', 'GET', {'cost': 1})
    private_get_openapi_v1_order = privateGetOpenapiV1Order = Entry('openapi/v1/order', 'private', 'GET', {'cost': 2})
    private_get_openapi_v1_historyorders = privateGetOpenapiV1HistoryOrders = Entry('openapi/v1/historyOrders', 'private', 'GET', {'cost': 10, 'noSymbol': 40})
    private_get_openapi_v1_mytrades = privateGetOpenapiV1MyTrades = Entry('openapi/v1/myTrades', 'private', 'GET', {'cost': 10})
    private_get_openapi_v1_capital_deposit_history = privateGetOpenapiV1CapitalDepositHistory = Entry('openapi/v1/capital/deposit/history', 'private', 'GET', {'cost': 1})
    private_get_openapi_v1_capital_withdraw_history = privateGetOpenapiV1CapitalWithdrawHistory = Entry('openapi/v1/capital/withdraw/history', 'private', 'GET', {'cost': 1})
    private_get_openapi_v3_payment_request_get_payment_request = privateGetOpenapiV3PaymentRequestGetPaymentRequest = Entry('openapi/v3/payment-request/get-payment-request', 'private', 'GET', {'cost': 1})
    private_get_merchant_api_v1_get_invoices = privateGetMerchantApiV1GetInvoices = Entry('merchant-api/v1/get-invoices', 'private', 'GET', {'cost': 1})
    private_get_openapi_account_v3_crypto_accounts = privateGetOpenapiAccountV3CryptoAccounts = Entry('openapi/account/v3/crypto-accounts', 'private', 'GET', {'cost': 1})
    private_get_openapi_transfer_v3_transfers_id = privateGetOpenapiTransferV3TransfersId = Entry('openapi/transfer/v3/transfers/{id}', 'private', 'GET', {'cost': 1})
    private_post_openapi_wallet_v1_withdraw_apply = privatePostOpenapiWalletV1WithdrawApply = Entry('openapi/wallet/v1/withdraw/apply', 'private', 'POST', {'cost': 600})
    private_post_openapi_v1_order_test = privatePostOpenapiV1OrderTest = Entry('openapi/v1/order/test', 'private', 'POST', {'cost': 1})
    private_post_openapi_v1_order = privatePostOpenapiV1Order = Entry('openapi/v1/order', 'private', 'POST', {'cost': 1})
    private_post_openapi_v1_capital_withdraw_apply = privatePostOpenapiV1CapitalWithdrawApply = Entry('openapi/v1/capital/withdraw/apply', 'private', 'POST', {'cost': 1})
    private_post_openapi_v1_capital_deposit_apply = privatePostOpenapiV1CapitalDepositApply = Entry('openapi/v1/capital/deposit/apply', 'private', 'POST', {'cost': 1})
    private_post_openapi_v3_payment_request_payment_requests = privatePostOpenapiV3PaymentRequestPaymentRequests = Entry('openapi/v3/payment-request/payment-requests', 'private', 'POST', {'cost': 1})
    private_post_openapi_v3_payment_request_delete_payment_request = privatePostOpenapiV3PaymentRequestDeletePaymentRequest = Entry('openapi/v3/payment-request/delete-payment-request', 'private', 'POST', {'cost': 1})
    private_post_openapi_v3_payment_request_payment_request_reminder = privatePostOpenapiV3PaymentRequestPaymentRequestReminder = Entry('openapi/v3/payment-request/payment-request-reminder', 'private', 'POST', {'cost': 1})
    private_post_openapi_v1_userdatastream = privatePostOpenapiV1UserDataStream = Entry('openapi/v1/userDataStream', 'private', 'POST', {'cost': 1})
    private_post_merchant_api_v1_invoices = privatePostMerchantApiV1Invoices = Entry('merchant-api/v1/invoices', 'private', 'POST', {'cost': 1})
    private_post_merchant_api_v1_invoices_cancel = privatePostMerchantApiV1InvoicesCancel = Entry('merchant-api/v1/invoices-cancel', 'private', 'POST', {'cost': 1})
    private_post_openapi_convert_v1_get_supported_trading_pairs = privatePostOpenapiConvertV1GetSupportedTradingPairs = Entry('openapi/convert/v1/get-supported-trading-pairs', 'private', 'POST', {'cost': 1})
    private_post_openapi_convert_v1_get_quote = privatePostOpenapiConvertV1GetQuote = Entry('openapi/convert/v1/get-quote', 'private', 'POST', {'cost': 1})
    private_post_openapi_convert_v1_accpet_quote = privatePostOpenapiConvertV1AccpetQuote = Entry('openapi/convert/v1/accpet-quote', 'private', 'POST', {'cost': 1})
    private_post_openapi_fiat_v1_support_channel = privatePostOpenapiFiatV1SupportChannel = Entry('openapi/fiat/v1/support-channel', 'private', 'POST', {'cost': 1})
    private_post_openapi_fiat_v1_cash_out = privatePostOpenapiFiatV1CashOut = Entry('openapi/fiat/v1/cash-out', 'private', 'POST', {'cost': 1})
    private_post_openapi_fiat_v1_history = privatePostOpenapiFiatV1History = Entry('openapi/fiat/v1/history', 'private', 'POST', {'cost': 1})
    private_post_openapi_migration_v4_sellorder = privatePostOpenapiMigrationV4Sellorder = Entry('openapi/migration/v4/sellorder', 'private', 'POST', {'cost': 1})
    private_post_openapi_migration_v4_validate_field = privatePostOpenapiMigrationV4ValidateField = Entry('openapi/migration/v4/validate-field', 'private', 'POST', {'cost': 1})
    private_post_openapi_transfer_v3_transfers = privatePostOpenapiTransferV3Transfers = Entry('openapi/transfer/v3/transfers', 'private', 'POST', {'cost': 1})
    private_delete_openapi_v1_order = privateDeleteOpenapiV1Order = Entry('openapi/v1/order', 'private', 'DELETE', {'cost': 1})
    private_delete_openapi_v1_openorders = privateDeleteOpenapiV1OpenOrders = Entry('openapi/v1/openOrders', 'private', 'DELETE', {'cost': 1})
    private_delete_openapi_v1_userdatastream = privateDeleteOpenapiV1UserDataStream = Entry('openapi/v1/userDataStream', 'private', 'DELETE', {'cost': 1})
