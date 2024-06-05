namespace ccxt.pro;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


public partial class probit { public probit(object args = null) : base(args) { } }
public partial class probit : ccxt.probit
{
    public override object describe()
    {
        return this.deepExtend(base.describe(), new Dictionary<string, object>() {
            { "has", new Dictionary<string, object>() {
                { "ws", true },
                { "watchBalance", true },
                { "watchTicker", true },
                { "watchTickers", false },
                { "watchTrades", true },
                { "watchMyTrades", true },
                { "watchOrders", true },
                { "watchOrderBook", true },
                { "watchOHLCV", false },
            } },
            { "urls", new Dictionary<string, object>() {
                { "api", new Dictionary<string, object>() {
                    { "ws", "wss://api.probit.com/api/exchange/v1/ws" },
                } },
                { "test", new Dictionary<string, object>() {
                    { "ws", "wss://demo-api.probit.com/api/exchange/v1/ws" },
                } },
            } },
            { "options", new Dictionary<string, object>() {
                { "watchOrderBook", new Dictionary<string, object>() {
                    { "filter", "order_books_l2" },
                    { "interval", 100 },
                } },
                { "watchTrades", new Dictionary<string, object>() {
                    { "filter", "recent_trades" },
                } },
                { "watchTicker", new Dictionary<string, object>() {
                    { "filter", "ticker" },
                } },
                { "watchOrders", new Dictionary<string, object>() {
                    { "channel", "open_order" },
                } },
            } },
            { "streaming", new Dictionary<string, object>() {} },
            { "exceptions", new Dictionary<string, object>() {} },
        });
    }

    public async override Task<object> watchBalance(object parameters = null)
    {
        /**
        * @method
        * @name probit#watchBalance
        * @description watch balance and get the amount of funds available for trading or funds locked in orders
        * @see https://docs-en.probit.com/reference/balance-1
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
        */
        parameters ??= new Dictionary<string, object>();
        await this.authenticate(parameters);
        object messageHash = "balance";
        object url = getValue(getValue(this.urls, "api"), "ws");
        object subscribe = new Dictionary<string, object>() {
            { "type", "subscribe" },
            { "channel", "balance" },
        };
        object request = this.extend(subscribe, parameters);
        return await this.watch(url, messageHash, request, messageHash);
    }

    public virtual void handleBalance(WebSocketClient client, object message)
    {
        //
        //     {
        //         "channel": "balance",
        //         "reset": false,
        //         "data": {
        //             "USDT": {
        //                 "available": "15",
        //                 "total": "15"
        //             }
        //         }
        //     }
        //
        object messageHash = "balance";
        this.parseWSBalance(message);
        callDynamically(client as WebSocketClient, "resolve", new object[] {this.balance, messageHash});
    }

    public virtual void parseWSBalance(object message)
    {
        //
        //     {
        //         "channel": "balance",
        //         "reset": false,
        //         "data": {
        //             "USDT": {
        //                 "available": "15",
        //                 "total": "15"
        //             }
        //         }
        //     }
        //
        object reset = this.safeBool(message, "reset", false);
        object data = this.safeValue(message, "data", new Dictionary<string, object>() {});
        object currencyIds = new List<object>(((IDictionary<string,object>)data).Keys);
        if (isTrue(reset))
        {
            this.balance = new Dictionary<string, object>() {};
        }
        for (object i = 0; isLessThan(i, getArrayLength(currencyIds)); postFixIncrement(ref i))
        {
            object currencyId = getValue(currencyIds, i);
            object entry = getValue(data, currencyId);
            object code = this.safeCurrencyCode(currencyId);
            object account = this.account();
            ((IDictionary<string,object>)account)["free"] = this.safeString(entry, "available");
            ((IDictionary<string,object>)account)["total"] = this.safeString(entry, "total");
            ((IDictionary<string,object>)this.balance)[(string)code] = account;
        }
        this.balance = this.safeBalance(this.balance);
    }

    public async override Task<object> watchTicker(object symbol, object parameters = null)
    {
        /**
        * @method
        * @name probit#watchTicker
        * @description watches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
        * @see https://docs-en.probit.com/reference/marketdata
        * @param {string} symbol unified symbol of the market to fetch the ticker for
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @param {int} [params.interval] Unit time to synchronize market information (ms). Available units: 100, 500
        * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
        */
        parameters ??= new Dictionary<string, object>();
        object filter = null;
        var filterparametersVariable = this.handleOptionAndParams(parameters, "watchTicker", "filter", "ticker");
        filter = ((IList<object>)filterparametersVariable)[0];
        parameters = ((IList<object>)filterparametersVariable)[1];
        return await this.subscribeOrderBook(symbol, "ticker", filter, parameters);
    }

    public virtual void handleTicker(WebSocketClient client, object message)
    {
        //
        //     {
        //         "channel": "marketdata",
        //         "market_id": "BTC-USDT",
        //         "status": "ok",
        //         "lag": 0,
        //         "ticker": {
        //             "time": "2022-07-21T14:18:04.000Z",
        //             "last": "22591.3",
        //             "low": "22500.1",
        //             "high": "39790.7",
        //             "change": "-1224",
        //             "base_volume": "1002.32005445",
        //             "quote_volume": "23304489.385351021"
        //         },
        //         "reset": true
        //     }
        //
        object marketId = this.safeString(message, "market_id");
        object symbol = this.safeSymbol(marketId);
        object ticker = this.safeValue(message, "ticker", new Dictionary<string, object>() {});
        object market = this.safeMarket(marketId);
        object parsedTicker = this.parseTicker(ticker, market);
        object messageHash = add("ticker:", symbol);
        ((IDictionary<string,object>)this.tickers)[(string)symbol] = parsedTicker;
        callDynamically(client as WebSocketClient, "resolve", new object[] {parsedTicker, messageHash});
    }

    public async override Task<object> watchTrades(object symbol, object since = null, object limit = null, object parameters = null)
    {
        /**
        * @method
        * @name probit#watchTrades
        * @description get the list of most recent trades for a particular symbol
        * @see https://docs-en.probit.com/reference/trade_history
        * @param {string} symbol unified symbol of the market to fetch trades for
        * @param {int} [since] timestamp in ms of the earliest trade to fetch
        * @param {int} [limit] the maximum amount of trades to fetch
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @param {int} [params.interval] Unit time to synchronize market information (ms). Available units: 100, 500
        * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
        */
        parameters ??= new Dictionary<string, object>();
        object filter = null;
        var filterparametersVariable = this.handleOptionAndParams(parameters, "watchTrades", "filter", "recent_trades");
        filter = ((IList<object>)filterparametersVariable)[0];
        parameters = ((IList<object>)filterparametersVariable)[1];
        object trades = await this.subscribeOrderBook(symbol, "trades", filter, parameters);
        if (isTrue(this.newUpdates))
        {
            limit = callDynamically(trades, "getLimit", new object[] {symbol, limit});
        }
        return this.filterBySymbolSinceLimit(trades, symbol, since, limit, true);
    }

    public virtual void handleTrades(WebSocketClient client, object message)
    {
        //
        //     {
        //         "channel": "marketdata",
        //         "market_id": "BTC-USDT",
        //         "status": "ok",
        //         "lag": 0,
        //         "recent_trades": [
        //             {
        //                 "id": "BTC-USDT:8010233",
        //                 "price": "22701.4",
        //                 "quantity": "0.011011",
        //                 "time": "2022-07-21T13:40:40.983Z",
        //                 "side": "buy",
        //                 "tick_direction": "up"
        //             }
        //             ...
        //         ]
        //         "reset": true
        //     }
        //
        object marketId = this.safeString(message, "market_id");
        object symbol = this.safeSymbol(marketId);
        object market = this.safeMarket(marketId);
        object trades = this.safeValue(message, "recent_trades", new List<object>() {});
        object reset = this.safeBool(message, "reset", false);
        object messageHash = add("trades:", symbol);
        object stored = this.safeValue(this.trades, symbol);
        if (isTrue(isTrue(isEqual(stored, null)) || isTrue(reset)))
        {
            object limit = this.safeInteger(this.options, "tradesLimit", 1000);
            stored = new ArrayCache(limit);
            ((IDictionary<string,object>)this.trades)[(string)symbol] = stored;
        }
        for (object i = 0; isLessThan(i, getArrayLength(trades)); postFixIncrement(ref i))
        {
            object trade = getValue(trades, i);
            object parsed = this.parseTrade(trade, market);
            callDynamically(stored, "append", new object[] {parsed});
        }
        ((IDictionary<string,object>)this.trades)[(string)symbol] = stored;
        callDynamically(client as WebSocketClient, "resolve", new object[] {getValue(this.trades, symbol), messageHash});
    }

    public async override Task<object> watchMyTrades(object symbol = null, object since = null, object limit = null, object parameters = null)
    {
        /**
        * @method
        * @name probit#watchMyTrades
        * @description get the list of trades associated with the user
        * @param {string} symbol unified symbol of the market to fetch trades for
        * @param {int} [since] timestamp in ms of the earliest trade to fetch
        * @param {int} [limit] the maximum amount of trades to fetch
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
        */
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        await this.authenticate(parameters);
        object messageHash = "myTrades";
        if (isTrue(!isEqual(symbol, null)))
        {
            object market = this.market(symbol);
            symbol = getValue(market, "symbol");
            messageHash = add(add(messageHash, ":"), symbol);
        }
        object url = getValue(getValue(this.urls, "api"), "ws");
        object channel = "trade_history";
        object message = new Dictionary<string, object>() {
            { "type", "subscribe" },
            { "channel", channel },
        };
        object request = this.extend(message, parameters);
        object trades = await this.watch(url, messageHash, request, channel);
        if (isTrue(this.newUpdates))
        {
            limit = callDynamically(trades, "getLimit", new object[] {symbol, limit});
        }
        return this.filterBySymbolSinceLimit(trades, symbol, since, limit, true);
    }

    public virtual void handleMyTrades(WebSocketClient client, object message)
    {
        //
        //     {
        //         "channel": "trade_history",
        //         "reset": false,
        //         "data": [{
        //             "id": "BTC-USDT:8010722",
        //             "order_id": "4124999207",
        //             "side": "buy",
        //             "fee_amount": "0.0134999868096",
        //             "fee_currency_id": "USDT",
        //             "status": "settled",
        //             "price": "23136.7",
        //             "quantity": "0.00032416",
        //             "cost": "7.499992672",
        //             "time": "2022-07-21T17:09:33.056Z",
        //             "market_id": "BTC-USDT"
        //         }]
        //     }
        //
        object rawTrades = this.safeValue(message, "data", new List<object>() {});
        object length = getArrayLength(rawTrades);
        if (isTrue(isEqual(length, 0)))
        {
            return;
        }
        object reset = this.safeBool(message, "reset", false);
        object messageHash = "myTrades";
        object stored = this.myTrades;
        if (isTrue(isTrue((isEqual(stored, null))) || isTrue(reset)))
        {
            object limit = this.safeInteger(this.options, "tradesLimit", 1000);
            stored = new ArrayCacheBySymbolById(limit);
            this.myTrades = stored;
        }
        object trades = this.parseTrades(rawTrades);
        object tradeSymbols = new Dictionary<string, object>() {};
        for (object j = 0; isLessThan(j, getArrayLength(trades)); postFixIncrement(ref j))
        {
            object trade = getValue(trades, j);
            ((IDictionary<string,object>)tradeSymbols)[(string)getValue(trade, "symbol")] = true;
            callDynamically(stored, "append", new object[] {trade});
        }
        object unique = new List<object>(((IDictionary<string,object>)tradeSymbols).Keys);
        for (object i = 0; isLessThan(i, getArrayLength(unique)); postFixIncrement(ref i))
        {
            object symbol = getValue(unique, i);
            object symbolSpecificMessageHash = add(add(messageHash, ":"), symbol);
            callDynamically(client as WebSocketClient, "resolve", new object[] {stored, symbolSpecificMessageHash});
        }
        callDynamically(client as WebSocketClient, "resolve", new object[] {stored, messageHash});
    }

    public async override Task<object> watchOrders(object symbol = null, object since = null, object limit = null, object parameters = null)
    {
        /**
        * @method
        * @name probit#watchOrders
        * @description watches information on an order made by the user
        * @see https://docs-en.probit.com/reference/open_order
        * @param {string} symbol unified symbol of the market the order was made in
        * @param {int} [since] timestamp in ms of the earliest order to watch
        * @param {int} [limit] the maximum amount of orders to watch
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @param {string} [params.channel] choose what channel to use. Can open_order or order_history.
        * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
        */
        parameters ??= new Dictionary<string, object>();
        await this.authenticate(parameters);
        object url = getValue(getValue(this.urls, "api"), "ws");
        object messageHash = "orders";
        if (isTrue(!isEqual(symbol, null)))
        {
            object market = this.market(symbol);
            symbol = getValue(market, "symbol");
            messageHash = add(add(messageHash, ":"), symbol);
        }
        object channel = null;
        var channelparametersVariable = this.handleOptionAndParams(parameters, "watchOrders", "channel", "open_order");
        channel = ((IList<object>)channelparametersVariable)[0];
        parameters = ((IList<object>)channelparametersVariable)[1];
        object subscribe = new Dictionary<string, object>() {
            { "type", "subscribe" },
            { "channel", channel },
        };
        object request = this.extend(subscribe, parameters);
        object orders = await this.watch(url, messageHash, request, channel);
        if (isTrue(this.newUpdates))
        {
            limit = callDynamically(orders, "getLimit", new object[] {symbol, limit});
        }
        return this.filterBySymbolSinceLimit(orders, symbol, since, limit, true);
    }

    public virtual void handleOrders(WebSocketClient client, object message)
    {
        //
        //     {
        //         "channel": "order_history",
        //         "reset": true,
        //         "data": [{
        //                 "id": "4124999207",
        //                 "user_id": "633dc56a-621b-4680-8a4e-85a823499b6d",
        //                 "market_id": "BTC-USDT",
        //                 "type": "market",
        //                 "side": "buy",
        //                 "limit_price": "0",
        //                 "time_in_force": "ioc",
        //                 "filled_cost": "7.499992672",
        //                 "filled_quantity": "0.00032416",
        //                 "open_quantity": "0",
        //                 "status": "filled",
        //                 "time": "2022-07-21T17:09:33.056Z",
        //                 "client_order_id": '',
        //                 "cost": "7.5"
        //             },
        //             ...
        //         ]
        //     }
        //
        object rawOrders = this.safeValue(message, "data", new List<object>() {});
        object length = getArrayLength(rawOrders);
        if (isTrue(isEqual(length, 0)))
        {
            return;
        }
        object messageHash = "orders";
        object reset = this.safeBool(message, "reset", false);
        object stored = this.orders;
        if (isTrue(isTrue(isEqual(stored, null)) || isTrue(reset)))
        {
            object limit = this.safeInteger(this.options, "ordersLimit", 1000);
            stored = new ArrayCacheBySymbolById(limit);
            this.orders = stored;
        }
        object orderSymbols = new Dictionary<string, object>() {};
        for (object i = 0; isLessThan(i, getArrayLength(rawOrders)); postFixIncrement(ref i))
        {
            object rawOrder = getValue(rawOrders, i);
            object order = this.parseOrder(rawOrder);
            ((IDictionary<string,object>)orderSymbols)[(string)getValue(order, "symbol")] = true;
            callDynamically(stored, "append", new object[] {order});
        }
        object unique = new List<object>(((IDictionary<string,object>)orderSymbols).Keys);
        for (object i = 0; isLessThan(i, getArrayLength(unique)); postFixIncrement(ref i))
        {
            object symbol = getValue(unique, i);
            object symbolSpecificMessageHash = add(add(messageHash, ":"), symbol);
            callDynamically(client as WebSocketClient, "resolve", new object[] {stored, symbolSpecificMessageHash});
        }
        callDynamically(client as WebSocketClient, "resolve", new object[] {stored, messageHash});
    }

    public async override Task<object> watchOrderBook(object symbol, object limit = null, object parameters = null)
    {
        /**
        * @method
        * @name probit#watchOrderBook
        * @description watches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
        * @see https://docs-en.probit.com/reference/marketdata
        * @param {string} symbol unified symbol of the market to fetch the order book for
        * @param {int} [limit] the maximum amount of order book entries to return
        * @param {object} [params] extra parameters specific to the exchange API endpoint
        * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
        */
        parameters ??= new Dictionary<string, object>();
        object filter = null;
        var filterparametersVariable = this.handleOptionAndParams(parameters, "watchOrderBook", "filter", "order_books");
        filter = ((IList<object>)filterparametersVariable)[0];
        parameters = ((IList<object>)filterparametersVariable)[1];
        object orderbook = await this.subscribeOrderBook(symbol, "orderbook", filter, parameters);
        return (orderbook as IOrderBook).limit();
    }

    public async virtual Task<object> subscribeOrderBook(object symbol, object messageHash, object filter, object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        await this.loadMarkets();
        object market = this.market(symbol);
        symbol = getValue(market, "symbol");
        object url = getValue(getValue(this.urls, "api"), "ws");
        var client = this.client(url);
        object interval = null;
        var intervalparametersVariable = this.handleOptionAndParams(parameters, "watchOrderBook", "interval", 100);
        interval = ((IList<object>)intervalparametersVariable)[0];
        parameters = ((IList<object>)intervalparametersVariable)[1];
        object subscriptionHash = add("marketdata:", symbol);
        messageHash = add(add(messageHash, ":"), symbol);
        object filters = new Dictionary<string, object>() {};
        if (isTrue(inOp(((WebSocketClient)client).subscriptions, subscriptionHash)))
        {
            // already subscribed
            filters = getValue(((WebSocketClient)client).subscriptions, subscriptionHash);
            if (!isTrue((inOp(filters, filter))))
            {

            }
        }
        ((IDictionary<string,object>)filters)[(string)filter] = true;
        object keys = new List<object>(((IDictionary<string,object>)filters).Keys);
        object message = new Dictionary<string, object>() {
            { "channel", "marketdata" },
            { "interval", interval },
            { "market_id", getValue(market, "id") },
            { "type", "subscribe" },
            { "filter", keys },
        };
        object request = this.extend(message, parameters);
        return await this.watch(url, messageHash, request, messageHash, filters);
    }

    public virtual void handleOrderBook(WebSocketClient client, object message, object orderBook)
    {
        //
        //     {
        //         "channel": "marketdata",
        //         "market_id": "BTC-USDT",
        //         "status": "ok",
        //         "lag": 0,
        //         "order_books": [
        //           { side: "buy", price: '1420.7', quantity: "0.057" },
        //           ...
        //         ],
        //         "reset": true
        //     }
        //
        object marketId = this.safeString(message, "market_id");
        object symbol = this.safeSymbol(marketId);
        object dataBySide = this.groupBy(orderBook, "side");
        object messageHash = add("orderbook:", symbol);
        // let orderbook = this.safeValue (this.orderbooks, symbol);
        if (!isTrue((inOp(this.orderbooks, symbol))))
        {
            ((IDictionary<string,object>)this.orderbooks)[(string)symbol] = this.orderBook(new Dictionary<string, object>() {});
        }
        object orderbook = getValue(this.orderbooks, symbol);
        object reset = this.safeBool(message, "reset", false);
        if (isTrue(reset))
        {
            object snapshot = this.parseOrderBook(dataBySide, symbol, null, "buy", "sell", "price", "quantity");
            (orderbook as IOrderBook).reset(snapshot);
        } else
        {
            this.handleDelta(orderbook, dataBySide);
        }
        callDynamically(client as WebSocketClient, "resolve", new object[] {orderbook, messageHash});
    }

    public virtual void handleBidAsks(object bookSide, object bidAsks)
    {
        for (object i = 0; isLessThan(i, getArrayLength(bidAsks)); postFixIncrement(ref i))
        {
            object bidAsk = getValue(bidAsks, i);
            object parsed = this.parseBidAsk(bidAsk, "price", "quantity");
            (bookSide as IOrderBookSide).storeArray(parsed);
        }
    }

    public override void handleDelta(object orderbook, object delta)
    {
        object storedBids = getValue(orderbook, "bids");
        object storedAsks = getValue(orderbook, "asks");
        object asks = this.safeValue(delta, "sell", new List<object>() {});
        object bids = this.safeValue(delta, "buy", new List<object>() {});
        this.handleBidAsks(storedBids, bids);
        this.handleBidAsks(storedAsks, asks);
    }

    public virtual void handleErrorMessage(WebSocketClient client, object message)
    {
        //
        //     {
        //         "errorCode": "INVALID_ARGUMENT",
        //         "message": '',
        //         "details": {
        //             "interval": "invalid"
        //         }
        //     }
        //
        object code = this.safeString(message, "errorCode");
        object errMessage = this.safeString(message, "message", "");
        object details = this.safeValue(message, "details");
        throw new ExchangeError ((string)add(add(add(add(add(add(this.id, " "), code), " "), errMessage), " "), this.json(details))) ;
    }

    public virtual void handleAuthenticate(WebSocketClient client, object message)
    {
        //
        //     { type: "authorization", result: "ok" }
        //
        object result = this.safeString(message, "result");
        var future = getValue(((WebSocketClient)client).subscriptions, "authenticated");
        if (isTrue(isEqual(result, "ok")))
        {
            (future as Future).resolve(true);
        } else
        {
            ((Future)future).reject(message);

        }
    }

    public virtual void handleMarketData(WebSocketClient client, object message)
    {
        object ticker = this.safeValue(message, "ticker");
        if (isTrue(!isEqual(ticker, null)))
        {
            this.handleTicker(client as WebSocketClient, message);
        }
        object trades = this.safeValue(message, "recent_trades", new List<object>() {});
        if (isTrue(getArrayLength(trades)))
        {
            this.handleTrades(client as WebSocketClient, message);
        }
        object orderBook = this.safeValueN(message, new List<object>() {"order_books", "order_books_l1", "order_books_l2", "order_books_l3", "order_books_l4"}, new List<object>() {});
        if (isTrue(getArrayLength(orderBook)))
        {
            this.handleOrderBook(client as WebSocketClient, message, orderBook);
        }
    }

    public override void handleMessage(WebSocketClient client, object message)
    {
        //
        //     {
        //         "errorCode": "INVALID_ARGUMENT",
        //         "message": '',
        //         "details": {
        //             "interval": "invalid"
        //         }
        //     }
        //
        object errorCode = this.safeString(message, "errorCode");
        if (isTrue(!isEqual(errorCode, null)))
        {
            this.handleErrorMessage(client as WebSocketClient, message);
            return;
        }
        object type = this.safeString(message, "type");
        if (isTrue(isEqual(type, "authorization")))
        {
            this.handleAuthenticate(client as WebSocketClient, message);
            return;
        }
        object handlers = new Dictionary<string, object>() {
            { "marketdata", this.handleMarketData },
            { "balance", this.handleBalance },
            { "trade_history", this.handleMyTrades },
            { "open_order", this.handleOrders },
            { "order_history", this.handleOrders },
        };
        object channel = this.safeString(message, "channel");
        object handler = this.safeValue(handlers, channel);
        if (isTrue(!isEqual(handler, null)))
        {
            DynamicInvoker.InvokeMethod(handler, new object[] { client, message});
            return;
        }
        var error = new NotSupported(add(add(this.id, " handleMessage: unknown message: "), this.json(message)));
        ((WebSocketClient)client).reject(error);
    }

    public async virtual Task<object> authenticate(object parameters = null)
    {
        parameters ??= new Dictionary<string, object>();
        object url = getValue(getValue(this.urls, "api"), "ws");
        var client = this.client(url);
        object messageHash = "authenticated";
        object expires = this.safeInteger(this.options, "expires", 0);
        var future = this.safeValue(((WebSocketClient)client).subscriptions, messageHash);
        if (isTrue(isTrue((isEqual(future, null))) || isTrue((isGreaterThan(this.milliseconds(), expires)))))
        {
            object response = await this.signIn();
            //
            //     {
            //         "access_token": "0ttDv/2hTTn3bLi8GP1gKaneiEQ6+0hOBenPrxNQt2s=",
            //         "token_type": "bearer",
            //         "expires_in": 900
            //     }
            //
            object accessToken = this.safeString(response, "access_token");
            object request = new Dictionary<string, object>() {
                { "type", "authorization" },
                { "token", accessToken },
            };
            future = await this.watch(url, messageHash, this.extend(request, parameters), messageHash);
            ((IDictionary<string,object>)((WebSocketClient)client).subscriptions)[(string)messageHash] = future;
        }
        return future;
    }
}
