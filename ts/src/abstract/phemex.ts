import { implicitReturnType } from '../base/types.js'
import { Exchange as _Exchange } from '../base/Exchange.js'

export default abstract class Exchange extends _Exchange {
    abstract publicGetCfgV2Products (params?: {}): Promise<implicitReturnType>;
    abstract publicGetCfgFundingRates (params?: {}): Promise<implicitReturnType>;
    abstract publicGetProducts (params?: {}): Promise<implicitReturnType>;
    abstract publicGetNomicsTrades (params?: {}): Promise<implicitReturnType>;
    abstract publicGetMdKline (params?: {}): Promise<implicitReturnType>;
    abstract publicGetMdV2KlineList (params?: {}): Promise<implicitReturnType>;
    abstract publicGetMdV2Kline (params?: {}): Promise<implicitReturnType>;
    abstract publicGetMdV2KlineLast (params?: {}): Promise<implicitReturnType>;
    abstract v1GetMdOrderbook (params?: {}): Promise<implicitReturnType>;
    abstract v1GetMdTrade (params?: {}): Promise<implicitReturnType>;
    abstract v1GetMdTicker24hr (params?: {}): Promise<implicitReturnType>;
    abstract v1GetMdTicker24hrAll (params?: {}): Promise<implicitReturnType>;
    abstract v1GetMdSpotTicker24hr (params?: {}): Promise<implicitReturnType>;
    abstract v1GetMdSpotTicker24hrAll (params?: {}): Promise<implicitReturnType>;
    abstract v1GetExchangePublicProducts (params?: {}): Promise<implicitReturnType>;
    abstract v2GetMdV2Orderbook (params?: {}): Promise<implicitReturnType>;
    abstract v2GetMdV2Trade (params?: {}): Promise<implicitReturnType>;
    abstract v2GetMdV2Ticker24hr (params?: {}): Promise<implicitReturnType>;
    abstract v2GetMdV2Ticker24hrAll (params?: {}): Promise<implicitReturnType>;
    abstract privateGetSpotOrdersActive (params?: {}): Promise<implicitReturnType>;
    abstract privateGetSpotOrders (params?: {}): Promise<implicitReturnType>;
    abstract privateGetSpotWallets (params?: {}): Promise<implicitReturnType>;
    abstract privateGetExchangeSpotOrder (params?: {}): Promise<implicitReturnType>;
    abstract privateGetExchangeSpotOrderTrades (params?: {}): Promise<implicitReturnType>;
    abstract privateGetExchangeOrderV2OrderList (params?: {}): Promise<implicitReturnType>;
    abstract privateGetExchangeOrderV2TradingList (params?: {}): Promise<implicitReturnType>;
    abstract privateGetAccountsAccountPositions (params?: {}): Promise<implicitReturnType>;
    abstract privateGetGAccountsAccountPositions (params?: {}): Promise<implicitReturnType>;
    abstract privateGetAccountsPositions (params?: {}): Promise<implicitReturnType>;
    abstract privateGetApiDataFuturesFundingFees (params?: {}): Promise<implicitReturnType>;
    abstract privateGetApiDataGFuturesFundingFees (params?: {}): Promise<implicitReturnType>;
    abstract privateGetApiDataFuturesOrders (params?: {}): Promise<implicitReturnType>;
    abstract privateGetApiDataGFuturesOrders (params?: {}): Promise<implicitReturnType>;
    abstract privateGetApiDataFuturesOrdersByOrderId (params?: {}): Promise<implicitReturnType>;
    abstract privateGetApiDataGFuturesOrdersByOrderId (params?: {}): Promise<implicitReturnType>;
    abstract privateGetApiDataFuturesTrades (params?: {}): Promise<implicitReturnType>;
    abstract privateGetApiDataGFuturesTrades (params?: {}): Promise<implicitReturnType>;
    abstract privateGetApiDataFuturesTradingFees (params?: {}): Promise<implicitReturnType>;
    abstract privateGetApiDataGFuturesTradingFees (params?: {}): Promise<implicitReturnType>;
    abstract privateGetGOrdersActiveList (params?: {}): Promise<implicitReturnType>;
    abstract privateGetOrdersActiveList (params?: {}): Promise<implicitReturnType>;
    abstract privateGetExchangeOrderList (params?: {}): Promise<implicitReturnType>;
    abstract privateGetExchangeOrder (params?: {}): Promise<implicitReturnType>;
    abstract privateGetExchangeOrderTrade (params?: {}): Promise<implicitReturnType>;
    abstract privateGetPhemexUserUsersChildren (params?: {}): Promise<implicitReturnType>;
    abstract privateGetPhemexUserWalletsV2DepositAddress (params?: {}): Promise<implicitReturnType>;
    abstract privateGetPhemexUserWalletsTradeAccountDetail (params?: {}): Promise<implicitReturnType>;
    abstract privateGetPhemexUserOrderClosedPositionList (params?: {}): Promise<implicitReturnType>;
    abstract privateGetExchangeMarginsTransfer (params?: {}): Promise<implicitReturnType>;
    abstract privateGetExchangeWalletsConfirmWithdraw (params?: {}): Promise<implicitReturnType>;
    abstract privateGetExchangeWalletsWithdrawList (params?: {}): Promise<implicitReturnType>;
    abstract privateGetExchangeWalletsDepositList (params?: {}): Promise<implicitReturnType>;
    abstract privateGetExchangeWalletsV2DepositAddress (params?: {}): Promise<implicitReturnType>;
    abstract privateGetApiDataSpotsFunds (params?: {}): Promise<implicitReturnType>;
    abstract privateGetAssetsConvert (params?: {}): Promise<implicitReturnType>;
    abstract privateGetAssetsTransfer (params?: {}): Promise<implicitReturnType>;
    abstract privateGetAssetsSpotsSubAccountsTransfer (params?: {}): Promise<implicitReturnType>;
    abstract privateGetAssetsFuturesSubAccountsTransfer (params?: {}): Promise<implicitReturnType>;
    abstract privateGetAssetsQuote (params?: {}): Promise<implicitReturnType>;
    abstract privatePostSpotOrders (params?: {}): Promise<implicitReturnType>;
    abstract privatePostOrders (params?: {}): Promise<implicitReturnType>;
    abstract privatePostGOrders (params?: {}): Promise<implicitReturnType>;
    abstract privatePostPositionsAssign (params?: {}): Promise<implicitReturnType>;
    abstract privatePostExchangeWalletsTransferOut (params?: {}): Promise<implicitReturnType>;
    abstract privatePostExchangeWalletsTransferIn (params?: {}): Promise<implicitReturnType>;
    abstract privatePostExchangeMargins (params?: {}): Promise<implicitReturnType>;
    abstract privatePostExchangeWalletsCreateWithdraw (params?: {}): Promise<implicitReturnType>;
    abstract privatePostExchangeWalletsCancelWithdraw (params?: {}): Promise<implicitReturnType>;
    abstract privatePostExchangeWalletsCreateWithdrawAddress (params?: {}): Promise<implicitReturnType>;
    abstract privatePostAssetsTransfer (params?: {}): Promise<implicitReturnType>;
    abstract privatePostAssetsSpotsSubAccountsTransfer (params?: {}): Promise<implicitReturnType>;
    abstract privatePostAssetsFuturesSubAccountsTransfer (params?: {}): Promise<implicitReturnType>;
    abstract privatePostAssetsUniversalTransfer (params?: {}): Promise<implicitReturnType>;
    abstract privatePostAssetsConvert (params?: {}): Promise<implicitReturnType>;
    abstract privatePutSpotOrders (params?: {}): Promise<implicitReturnType>;
    abstract privatePutOrdersReplace (params?: {}): Promise<implicitReturnType>;
    abstract privatePutGOrdersReplace (params?: {}): Promise<implicitReturnType>;
    abstract privatePutPositionsLeverage (params?: {}): Promise<implicitReturnType>;
    abstract privatePutGPositionsLeverage (params?: {}): Promise<implicitReturnType>;
    abstract privatePutGPositionsSwitchPosModeSync (params?: {}): Promise<implicitReturnType>;
    abstract privatePutPositionsRiskLimit (params?: {}): Promise<implicitReturnType>;
    abstract privateDeleteSpotOrders (params?: {}): Promise<implicitReturnType>;
    abstract privateDeleteSpotOrdersAll (params?: {}): Promise<implicitReturnType>;
    abstract privateDeleteOrdersCancel (params?: {}): Promise<implicitReturnType>;
    abstract privateDeleteOrders (params?: {}): Promise<implicitReturnType>;
    abstract privateDeleteOrdersAll (params?: {}): Promise<implicitReturnType>;
    abstract privateDeleteGOrdersCancel (params?: {}): Promise<implicitReturnType>;
    abstract privateDeleteGOrders (params?: {}): Promise<implicitReturnType>;
    abstract privateDeleteGOrdersAll (params?: {}): Promise<implicitReturnType>;
}