# -*- coding: utf-8 -*-

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

import ccxt.async_support
from ccxt.async_support.base.ws.cache import ArrayCache, ArrayCacheBySymbolById, ArrayCacheByTimestamp
import hashlib
from ccxt.base.types import Int, Order, OrderBook, Str, Strings, Tickers, Trade
from ccxt.async_support.base.ws.client import Client
from typing import List
from ccxt.base.errors import ExchangeError
from ccxt.base.errors import NotSupported


class gemini(ccxt.async_support.gemini):

    def describe(self):
        return self.deep_extend(super(gemini, self).describe(), {
            'has': {
                'ws': True,
                'watchBalance': False,
                'watchTicker': False,
                'watchTickers': False,
                'watchBidsAsks': True,
                'watchTrades': True,
                'watchTradesForSymbols': True,
                'watchMyTrades': False,
                'watchOrders': True,
                'watchOrderBook': True,
                'watchOrderBookForSymbols': True,
                'watchOHLCV': True,
            },
            'hostname': 'api.gemini.com',
            'urls': {
                'api': {
                    'ws': 'wss://api.gemini.com',
                },
                'test': {
                    'ws': 'wss://api.sandbox.gemini.com',
                },
            },
        })

    async def watch_trades(self, symbol: str, since: Int = None, limit: Int = None, params={}) -> List[Trade]:
        """
        watch the list of most recent trades for a particular symbol
        :see: https://docs.gemini.com/websocket-api/#market-data-version-2
        :param str symbol: unified symbol of the market to fetch trades for
        :param int [since]: timestamp in ms of the earliest trade to fetch
        :param int [limit]: the maximum amount of trades to fetch
        :param dict [params]: extra parameters specific to the exchange API endpoint
        :returns dict[]: a list of `trade structures <https://docs.ccxt.com/#/?id=public-trades>`
        """
        await self.load_markets()
        market = self.market(symbol)
        messageHash = 'trades:' + market['symbol']
        marketId = market['id']
        request: dict = {
            'type': 'subscribe',
            'subscriptions': [
                {
                    'name': 'l2',
                    'symbols': [
                        marketId.upper(),
                    ],
                },
            ],
        }
        subscribeHash = 'l2:' + market['symbol']
        url = self.urls['api']['ws'] + '/v2/marketdata'
        trades = await self.watch(url, messageHash, request, subscribeHash)
        if self.newUpdates:
            limit = trades.getLimit(market['symbol'], limit)
        return self.filter_by_since_limit(trades, since, limit, 'timestamp', True)

    async def watch_trades_for_symbols(self, symbols: List[str], since: Int = None, limit: Int = None, params={}) -> List[Trade]:
        """
        :see: https://docs.gemini.com/websocket-api/#multi-market-data
        get the list of most recent trades for a list of symbols
        :param str[] symbols: unified symbol of the market to fetch trades for
        :param int [since]: timestamp in ms of the earliest trade to fetch
        :param int [limit]: the maximum amount of trades to fetch
        :param dict [params]: extra parameters specific to the exchange API endpoint
        :returns dict[]: a list of `trade structures <https://docs.ccxt.com/#/?id=public-trades>`
        """
        trades = await self.helper_for_watch_multiple_construct('trades', symbols, params)
        if self.newUpdates:
            first = self.safe_list(trades, 0)
            tradeSymbol = self.safe_string(first, 'symbol')
            limit = trades.getLimit(tradeSymbol, limit)
        return self.filter_by_since_limit(trades, since, limit, 'timestamp', True)

    def parse_ws_trade(self, trade, market=None) -> Trade:
        #
        # regular v2 trade
        #
        #     {
        #         "type": "trade",
        #         "symbol": "BTCUSD",
        #         "event_id": 122258166738,
        #         "timestamp": 1655330221424,
        #         "price": "22269.14",
        #         "quantity": "0.00004473",
        #         "side": "buy"
        #     }
        #
        # multi data trade
        #
        #    {
        #        "type": "trade",
        #        "symbol": "ETHUSD",
        #        "tid": "1683002242170204",  # self is not TS, but somewhat ID
        #        "price": "2299.24",
        #        "amount": "0.002662",
        #        "makerSide": "bid"
        #    }
        #
        timestamp = self.safe_integer(trade, 'timestamp')
        id = self.safe_string_2(trade, 'event_id', 'tid')
        priceString = self.safe_string(trade, 'price')
        amountString = self.safe_string_2(trade, 'quantity', 'amount')
        side = self.safe_string_lower(trade, 'side')
        if side is None:
            marketSide = self.safe_string_lower(trade, 'makerSide')
            if marketSide == 'bid':
                side = 'sell'
            elif marketSide == 'ask':
                side = 'buy'
        marketId = self.safe_string_lower(trade, 'symbol')
        symbol = self.safe_symbol(marketId, market)
        return self.safe_trade({
            'id': id,
            'order': None,
            'info': trade,
            'timestamp': timestamp,
            'datetime': self.iso8601(timestamp),
            'symbol': symbol,
            'type': None,
            'side': side,
            'takerOrMaker': None,
            'price': priceString,
            'cost': None,
            'amount': amountString,
            'fee': None,
        }, market)

    def handle_trade(self, client: Client, message):
        #
        #     {
        #         "type": "trade",
        #         "symbol": "BTCUSD",
        #         "event_id": 122278173770,
        #         "timestamp": 1655335880981,
        #         "price": "22530.80",
        #         "quantity": "0.04",
        #         "side": "buy"
        #     }
        #
        trade = self.parse_ws_trade(message)
        symbol = trade['symbol']
        tradesLimit = self.safe_integer(self.options, 'tradesLimit', 1000)
        stored = self.safe_value(self.trades, symbol)
        if stored is None:
            stored = ArrayCache(tradesLimit)
            self.trades[symbol] = stored
        stored.append(trade)
        messageHash = 'trades:' + symbol
        client.resolve(stored, messageHash)

    def handle_trades(self, client: Client, message):
        #
        #     {
        #         "type": "l2_updates",
        #         "symbol": "BTCUSD",
        #         "changes": [
        #             ["buy", '22252.37', "0.02"],
        #             ["buy", '22251.61', "0.04"],
        #             ["buy", '22251.60', "0.04"],
        #             # some asks
        #         ],
        #         "trades": [
        #             {type: 'trade', symbol: 'BTCUSD', event_id: 122258166738, timestamp: 1655330221424, price: '22269.14', quantity: "0.00004473", side: "buy"},
        #             {type: 'trade', symbol: 'BTCUSD', event_id: 122258141090, timestamp: 1655330213216, price: '22250.00', quantity: "0.00704098", side: "buy"},
        #             {type: 'trade', symbol: 'BTCUSD', event_id: 122258118291, timestamp: 1655330206753, price: '22250.00', quantity: "0.03", side: "buy"},
        #         ],
        #         "auction_events": [
        #             {
        #                 "type": "auction_result",
        #                 "symbol": "BTCUSD",
        #                 "time_ms": 1655323200000,
        #                 "result": "failure",
        #                 "highest_bid_price": "21590.88",
        #                 "lowest_ask_price": "21602.30",
        #                 "collar_price": "21634.73"
        #             },
        #             {
        #                 "type": "auction_indicative",
        #                 "symbol": "BTCUSD",
        #                 "time_ms": 1655323185000,
        #                 "result": "failure",
        #                 "highest_bid_price": "21661.90",
        #                 "lowest_ask_price": "21663.78",
        #                 "collar_price": "21662.845"
        #             },
        #         ]
        #     }
        #
        marketId = self.safe_string_lower(message, 'symbol')
        market = self.safe_market(marketId)
        trades = self.safe_value(message, 'trades')
        if trades is not None:
            symbol = market['symbol']
            tradesLimit = self.safe_integer(self.options, 'tradesLimit', 1000)
            stored = self.safe_value(self.trades, symbol)
            if stored is None:
                stored = ArrayCache(tradesLimit)
                self.trades[symbol] = stored
            for i in range(0, len(trades)):
                trade = self.parse_ws_trade(trades[i], market)
                stored.append(trade)
            messageHash = 'trades:' + symbol
            client.resolve(stored, messageHash)

    def handle_trades_for_multidata(self, client: Client, trades, timestamp: Int):
        if trades is not None:
            tradesLimit = self.safe_integer(self.options, 'tradesLimit', 1000)
            storesForSymbols: dict = {}
            for i in range(0, len(trades)):
                marketId = trades[i]['symbol']
                market = self.safe_market(marketId.lower())
                symbol = market['symbol']
                trade = self.parse_ws_trade(trades[i], market)
                trade['timestamp'] = timestamp
                trade['datetime'] = self.iso8601(timestamp)
                stored = self.safe_value(self.trades, symbol)
                if stored is None:
                    stored = ArrayCache(tradesLimit)
                    self.trades[symbol] = stored
                stored.append(trade)
                storesForSymbols[symbol] = stored
            symbols = list(storesForSymbols.keys())
            for i in range(0, len(symbols)):
                symbol = symbols[i]
                stored = storesForSymbols[symbol]
                messageHash = 'trades:' + symbol
                client.resolve(stored, messageHash)

    async def watch_ohlcv(self, symbol: str, timeframe='1m', since: Int = None, limit: Int = None, params={}) -> List[list]:
        """
        watches historical candlestick data containing the open, high, low, and close price, and the volume of a market
        :see: https://docs.gemini.com/websocket-api/#candles-data-feed
        :param str symbol: unified symbol of the market to fetch OHLCV data for
        :param str timeframe: the length of time each candle represents
        :param int [since]: timestamp in ms of the earliest candle to fetch
        :param int [limit]: the maximum amount of candles to fetch
        :param dict [params]: extra parameters specific to the exchange API endpoint
        :returns int[][]: A list of candles ordered, open, high, low, close, volume
        """
        await self.load_markets()
        market = self.market(symbol)
        timeframeId = self.safe_string(self.timeframes, timeframe, timeframe)
        request: dict = {
            'type': 'subscribe',
            'subscriptions': [
                {
                    'name': 'candles_' + timeframeId,
                    'symbols': [
                        market['id'].upper(),
                    ],
                },
            ],
        }
        messageHash = 'ohlcv:' + market['symbol'] + ':' + timeframeId
        url = self.urls['api']['ws'] + '/v2/marketdata'
        ohlcv = await self.watch(url, messageHash, request, messageHash)
        if self.newUpdates:
            limit = ohlcv.getLimit(symbol, limit)
        return self.filter_by_since_limit(ohlcv, since, limit, 0, True)

    def handle_ohlcv(self, client: Client, message):
        #
        #     {
        #         "type": "candles_15m_updates",
        #         "symbol": "BTCUSD",
        #         "changes": [
        #             [
        #                 1561054500000,
        #                 9350.18,
        #                 9358.35,
        #                 9350.18,
        #                 9355.51,
        #                 2.07
        #             ],
        #             [
        #                 1561053600000,
        #                 9357.33,
        #                 9357.33,
        #                 9350.18,
        #                 9350.18,
        #                 1.5900161
        #             ]
        #             ...
        #         ]
        #     }
        #
        type = self.safe_string(message, 'type', '')
        timeframeId = type[8:]
        timeframeEndIndex = timeframeId.find('_')
        timeframeId = timeframeId[0:timeframeEndIndex]
        marketId = self.safe_string(message, 'symbol', '').lower()
        market = self.safe_market(marketId)
        symbol = self.safe_symbol(marketId, market)
        changes = self.safe_value(message, 'changes', [])
        timeframe = self.find_timeframe(timeframeId)
        ohlcvsBySymbol = self.safe_value(self.ohlcvs, symbol)
        if ohlcvsBySymbol is None:
            self.ohlcvs[symbol] = {}
        stored = self.safe_value(self.ohlcvs[symbol], timeframe)
        if stored is None:
            limit = self.safe_integer(self.options, 'OHLCVLimit', 1000)
            stored = ArrayCacheByTimestamp(limit)
            self.ohlcvs[symbol][timeframe] = stored
        changesLength = len(changes)
        # reverse order of array to store candles in ascending order
        for i in range(0, changesLength):
            index = changesLength - i - 1
            parsed = self.parse_ohlcv(changes[index], market)
            stored.append(parsed)
        messageHash = 'ohlcv:' + symbol + ':' + timeframeId
        client.resolve(stored, messageHash)
        return message

    async def watch_order_book(self, symbol: str, limit: Int = None, params={}) -> OrderBook:
        """
        watches information on open orders with bid(buy) and ask(sell) prices, volumes and other data
        :see: https://docs.gemini.com/websocket-api/#market-data-version-2
        :param str symbol: unified symbol of the market to fetch the order book for
        :param int [limit]: the maximum amount of order book entries to return
        :param dict [params]: extra parameters specific to the exchange API endpoint
        :returns dict: A dictionary of `order book structures <https://docs.ccxt.com/#/?id=order-book-structure>` indexed by market symbols
        """
        await self.load_markets()
        market = self.market(symbol)
        messageHash = 'orderbook:' + market['symbol']
        marketId = market['id']
        request: dict = {
            'type': 'subscribe',
            'subscriptions': [
                {
                    'name': 'l2',
                    'symbols': [
                        marketId.upper(),
                    ],
                },
            ],
        }
        subscribeHash = 'l2:' + market['symbol']
        url = self.urls['api']['ws'] + '/v2/marketdata'
        orderbook = await self.watch(url, messageHash, request, subscribeHash)
        return orderbook.limit()

    def handle_order_book(self, client: Client, message):
        changes = self.safe_value(message, 'changes', [])
        marketId = self.safe_string_lower(message, 'symbol')
        market = self.safe_market(marketId)
        symbol = market['symbol']
        messageHash = 'orderbook:' + symbol
        # orderbook = self.safe_value(self.orderbooks, symbol)
        if not (symbol in self.orderbooks):
            self.orderbooks[symbol] = self.order_book()
        orderbook = self.orderbooks[symbol]
        for i in range(0, len(changes)):
            delta = changes[i]
            price = self.safe_number(delta, 1)
            size = self.safe_number(delta, 2)
            side = 'bids' if (delta[0] == 'buy') else 'asks'
            bookside = orderbook[side]
            bookside.store(price, size)
            orderbook[side] = bookside
        orderbook['symbol'] = symbol
        self.orderbooks[symbol] = orderbook
        client.resolve(orderbook, messageHash)

    async def watch_order_book_for_symbols(self, symbols: List[str], limit: Int = None, params={}) -> OrderBook:
        """
        watches information on open orders with bid(buy) and ask(sell) prices, volumes and other data
        :see: https://docs.gemini.com/websocket-api/#multi-market-data
        :param str[] symbols: unified array of symbols
        :param int [limit]: the maximum amount of order book entries to return
        :param dict [params]: extra parameters specific to the exchange API endpoint
        :returns dict: A dictionary of `order book structures <https://docs.ccxt.com/#/?id=order-book-structure>` indexed by market symbols
        """
        orderbook = await self.helper_for_watch_multiple_construct('orderbook', symbols, params)
        return orderbook.limit()

    async def watch_bids_asks(self, symbols: Strings = None, params={}) -> Tickers:
        """
        watches best bid & ask for symbols
        :see: https://docs.gemini.com/websocket-api/#multi-market-data
        :param str[] symbols: unified symbol of the market to fetch the ticker for
        :param dict [params]: extra parameters specific to the exchange API endpoint
        :returns dict: a `ticker structure <https://docs.ccxt.com/#/?id=ticker-structure>`
        """
        return await self.helper_for_watch_multiple_construct('bidsasks', symbols, params)

    def handle_bids_asks_for_multidata(self, client: Client, rawBidAskChanges, timestamp: Int, nonce: Int):
        #
        # {
        #     eventId: '1683002916916153',
        #     events: [
        #       {
        #         price: '50945.37',
        #         reason: 'top-of-book',
        #         remaining: '0.0',
        #         side: 'bid',
        #         symbol: 'BTCUSDT',
        #         type: 'change'
        #       },
        #       {
        #         price: '50947.75',
        #         reason: 'top-of-book',
        #         remaining: '0.11725',
        #         side: 'bid',
        #         symbol: 'BTCUSDT',
        #         type: 'change'
        #       }
        #     ],
        #     socket_sequence: 322,
        #     timestamp: 1708674495,
        #     timestampms: 1708674495174,
        #     type: 'update'
        # }
        #
        marketId = rawBidAskChanges[0]['symbol']
        market = self.safe_market(marketId.lower())
        symbol = market['symbol']
        if not (symbol in self.bidsasks):
            self.bidsasks[symbol] = self.parse_ticker({})
            self.bidsasks[symbol]['symbol'] = symbol
        currentBidAsk = self.bidsasks[symbol]
        messageHash = 'bidsasks:' + symbol
        # last update always overwrites the previous state and is the latest state
        for i in range(0, len(rawBidAskChanges)):
            entry = rawBidAskChanges[i]
            rawSide = self.safe_string(entry, 'side')
            price = self.safe_number(entry, 'price')
            size = self.safe_number(entry, 'remaining')
            if size == 0:
                continue
            if rawSide == 'bid':
                currentBidAsk['bid'] = price
                currentBidAsk['bidVolume'] = size
            else:
                currentBidAsk['ask'] = price
                currentBidAsk['askVolume'] = size
        currentBidAsk['timestamp'] = timestamp
        currentBidAsk['datetime'] = self.iso8601(timestamp)
        currentBidAsk['info'] = rawBidAskChanges
        self.bidsasks[symbol] = currentBidAsk
        client.resolve(currentBidAsk, messageHash)

    async def helper_for_watch_multiple_construct(self, itemHashName: str, symbols: List[str], params={}):
        await self.load_markets()
        symbols = self.market_symbols(symbols, None, False, True, True)
        firstMarket = self.market(symbols[0])
        if not firstMarket['spot'] and not firstMarket['linear']:
            raise NotSupported(self.id + ' watchMultiple supports only spot or linear-swap symbols')
        messageHashes = []
        marketIds = []
        for i in range(0, len(symbols)):
            symbol = symbols[i]
            messageHash = itemHashName + ':' + symbol
            messageHashes.append(messageHash)
            market = self.market(symbol)
            marketIds.append(market['id'])
        queryStr = ','.join(marketIds)
        url = self.urls['api']['ws'] + '/v1/multimarketdata?symbols=' + queryStr + '&heartbeat=true&'
        if itemHashName == 'orderbook':
            url += 'trades=false&bids=true&offers=true'
        elif itemHashName == 'bidsasks':
            url += 'trades=false&bids=true&offers=true&top_of_book=true'
        elif itemHashName == 'trades':
            url += 'trades=true&bids=false&offers=false'
        return await self.watch_multiple(url, messageHashes, None)

    def handle_order_book_for_multidata(self, client: Client, rawOrderBookChanges, timestamp: Int, nonce: Int):
        #
        # rawOrderBookChanges
        #
        # [
        #   {
        #     delta: "4105123935484.817624",
        #     price: "0.000000001",
        #     reason: "initial",  # initial|cancel|place
        #     remaining: "4105123935484.817624",
        #     side: "bid",  # bid|ask
        #     symbol: "SHIBUSD",
        #     type: "change",  # seems always change
        #   },
        #   ...
        #
        marketId = rawOrderBookChanges[0]['symbol']
        market = self.safe_market(marketId.lower())
        symbol = market['symbol']
        messageHash = 'orderbook:' + symbol
        if not (symbol in self.orderbooks):
            ob = self.order_book()
            self.orderbooks[symbol] = ob
        orderbook = self.orderbooks[symbol]
        bids = orderbook['bids']
        asks = orderbook['asks']
        for i in range(0, len(rawOrderBookChanges)):
            entry = rawOrderBookChanges[i]
            price = self.safe_number(entry, 'price')
            size = self.safe_number(entry, 'remaining')
            rawSide = self.safe_string(entry, 'side')
            if rawSide == 'bid':
                bids.store(price, size)
            else:
                asks.store(price, size)
        orderbook['bids'] = bids
        orderbook['asks'] = asks
        orderbook['symbol'] = symbol
        orderbook['nonce'] = nonce
        orderbook['timestamp'] = timestamp
        orderbook['datetime'] = self.iso8601(timestamp)
        self.orderbooks[symbol] = orderbook
        client.resolve(orderbook, messageHash)

    def handle_l2_updates(self, client: Client, message):
        #
        #     {
        #         "type": "l2_updates",
        #         "symbol": "BTCUSD",
        #         "changes": [
        #             ["buy", '22252.37', "0.02"],
        #             ["buy", '22251.61', "0.04"],
        #             ["buy", '22251.60', "0.04"],
        #             # some asks
        #         ],
        #         "trades": [
        #             {type: 'trade', symbol: 'BTCUSD', event_id: 122258166738, timestamp: 1655330221424, price: '22269.14', quantity: "0.00004473", side: "buy"},
        #             {type: 'trade', symbol: 'BTCUSD', event_id: 122258141090, timestamp: 1655330213216, price: '22250.00', quantity: "0.00704098", side: "buy"},
        #             {type: 'trade', symbol: 'BTCUSD', event_id: 122258118291, timestamp: 1655330206753, price: '22250.00', quantity: "0.03", side: "buy"},
        #         ],
        #         "auction_events": [
        #             {
        #                 "type": "auction_result",
        #                 "symbol": "BTCUSD",
        #                 "time_ms": 1655323200000,
        #                 "result": "failure",
        #                 "highest_bid_price": "21590.88",
        #                 "lowest_ask_price": "21602.30",
        #                 "collar_price": "21634.73"
        #             },
        #             {
        #                 "type": "auction_indicative",
        #                 "symbol": "BTCUSD",
        #                 "time_ms": 1655323185000,
        #                 "result": "failure",
        #                 "highest_bid_price": "21661.90",
        #                 "lowest_ask_price": "21663.79",
        #                 "collar_price": "21662.845"
        #             },
        #         ]
        #     }
        #
        self.handle_order_book(client, message)
        self.handle_trades(client, message)

    async def watch_orders(self, symbol: Str = None, since: Int = None, limit: Int = None, params={}) -> List[Order]:
        """
        watches information on multiple orders made by the user
        :see: https://docs.gemini.com/websocket-api/#order-events
        :param str symbol: unified market symbol of the market orders were made in
        :param int [since]: the earliest time in ms to fetch orders for
        :param int [limit]: the maximum number of order structures to retrieve
        :param dict [params]: extra parameters specific to the exchange API endpoint
        :returns dict[]: a list of `order structures <https://docs.ccxt.com/#/?id=order-structure>`
        """
        url = self.urls['api']['ws'] + '/v1/order/events?eventTypeFilter=initial&eventTypeFilter=accepted&eventTypeFilter=rejected&eventTypeFilter=fill&eventTypeFilter=cancelled&eventTypeFilter=booked'
        await self.load_markets()
        authParams: dict = {
            'url': url,
        }
        await self.authenticate(authParams)
        if symbol is not None:
            market = self.market(symbol)
            symbol = market['symbol']
        messageHash = 'orders'
        orders = await self.watch(url, messageHash, None, messageHash)
        if self.newUpdates:
            limit = orders.getLimit(symbol, limit)
        return self.filter_by_symbol_since_limit(orders, symbol, since, limit, True)

    def handle_heartbeat(self, client: Client, message):
        #
        #     {
        #         "type": "heartbeat",
        #         "timestampms": 1659740268958,
        #         "sequence": 7,
        #         "trace_id": "25b3d92476dd3a9a5c03c9bd9e0a0dba",
        #         "socket_sequence": 7
        #     }
        #
        client.lastPong = self.milliseconds()
        return message

    def handle_subscription(self, client: Client, message):
        #
        #     {
        #         "type": "subscription_ack",
        #         "accountId": 19433282,
        #         "subscriptionId": "orderevents-websocket-25b3d92476dd3a9a5c03c9bd9e0a0dba",
        #         "symbolFilter": [],
        #         "apiSessionFilter": [],
        #         "eventTypeFilter": []
        #     }
        #
        return message

    def handle_order(self, client: Client, message):
        #
        #     [
        #         {
        #             "type": "accepted",
        #             "order_id": "134150423884",
        #             "event_id": "134150423886",
        #             "account_name": "primary",
        #             "client_order_id": "1659739406916",
        #             "api_session": "account-pnBFSS0XKGvDamX4uEIt",
        #             "symbol": "batbtc",
        #             "side": "sell",
        #             "order_type": "exchange limit",
        #             "timestamp": "1659739407",
        #             "timestampms": 1659739407576,
        #             "is_live": True,
        #             "is_cancelled": False,
        #             "is_hidden": False,
        #             "original_amount": "1",
        #             "price": "1",
        #             "socket_sequence": 139
        #         }
        #     ]
        #
        messageHash = 'orders'
        if self.orders is None:
            limit = self.safe_integer(self.options, 'ordersLimit', 1000)
            self.orders = ArrayCacheBySymbolById(limit)
        orders = self.orders
        for i in range(0, len(message)):
            order = self.parse_ws_order(message[i])
            orders.append(order)
        client.resolve(self.orders, messageHash)

    def parse_ws_order(self, order, market=None):
        #
        #     {
        #         "type": "accepted",
        #         "order_id": "134150423884",
        #         "event_id": "134150423886",
        #         "account_name": "primary",
        #         "client_order_id": "1659739406916",
        #         "api_session": "account-pnBFSS0XKGvDamX4uEIt",
        #         "symbol": "batbtc",
        #         "side": "sell",
        #         "order_type": "exchange limit",
        #         "timestamp": "1659739407",
        #         "timestampms": 1659739407576,
        #         "is_live": True,
        #         "is_cancelled": False,
        #         "is_hidden": False,
        #         "original_amount": "1",
        #         "price": "1",
        #         "socket_sequence": 139
        #     }
        #
        timestamp = self.safe_integer(order, 'timestampms')
        status = self.safe_string(order, 'type')
        marketId = self.safe_string(order, 'symbol')
        typeId = self.safe_string(order, 'order_type')
        behavior = self.safe_string(order, 'behavior')
        timeInForce = 'GTC'
        postOnly = False
        if behavior == 'immediate-or-cancel':
            timeInForce = 'IOC'
        elif behavior == 'fill-or-kill':
            timeInForce = 'FOK'
        elif behavior == 'maker-or-cancel':
            timeInForce = 'PO'
            postOnly = True
        return self.safe_order({
            'id': self.safe_string(order, 'order_id'),
            'clientOrderId': self.safe_string(order, 'client_order_id'),
            'info': order,
            'timestamp': timestamp,
            'datetime': self.iso8601(timestamp),
            'lastTradeTimestamp': None,
            'status': self.parse_ws_order_status(status),
            'symbol': self.safe_symbol(marketId, market),
            'type': self.parse_ws_order_type(typeId),
            'timeInForce': timeInForce,
            'postOnly': postOnly,
            'side': self.safe_string(order, 'side'),
            'price': self.safe_number(order, 'price'),
            'stopPrice': None,
            'average': self.safe_number(order, 'avg_execution_price'),
            'cost': None,
            'amount': self.safe_number(order, 'original_amount'),
            'filled': self.safe_number(order, 'executed_amount'),
            'remaining': self.safe_number(order, 'remaining_amount'),
            'fee': None,
            'trades': None,
        }, market)

    def parse_ws_order_status(self, status):
        statuses: dict = {
            'accepted': 'open',
            'booked': 'open',
            'fill': 'closed',
            'cancelled': 'canceled',
            'cancel_rejected': 'rejected',
            'rejected': 'rejected',
        }
        return self.safe_string(statuses, status, status)

    def parse_ws_order_type(self, type):
        types: dict = {
            'exchange limit': 'limit',
            'market buy': 'market',
            'market sell': 'market',
        }
        return self.safe_string(types, type, type)

    def handle_error(self, client: Client, message):
        #
        #     {
        #         "reason": "NoValidTradingPairs",
        #         "result": "error"
        #     }
        #
        raise ExchangeError(self.json(message))

    def handle_message(self, client: Client, message):
        #
        #  public
        #     {
        #         "type": "trade",
        #         "symbol": "BTCUSD",
        #         "event_id": 122278173770,
        #         "timestamp": 1655335880981,
        #         "price": "22530.80",
        #         "quantity": "0.04",
        #         "side": "buy"
        #     }
        #
        #  private
        #     [
        #         {
        #             "type": "accepted",
        #             "order_id": "134150423884",
        #             "event_id": "134150423886",
        #             "account_name": "primary",
        #             "client_order_id": "1659739406916",
        #             "api_session": "account-pnBFSS0XKGvDamX4uEIt",
        #             "symbol": "batbtc",
        #             "side": "sell",
        #             "order_type": "exchange limit",
        #             "timestamp": "1659739407",
        #             "timestampms": 1659739407576,
        #             "is_live": True,
        #             "is_cancelled": False,
        #             "is_hidden": False,
        #             "original_amount": "1",
        #             "price": "1",
        #             "socket_sequence": 139
        #         }
        #     ]
        #
        isArray = isinstance(message, list)
        if isArray:
            self.handle_order(client, message)
            return
        reason = self.safe_string(message, 'reason')
        if reason == 'error':
            self.handle_error(client, message)
        methods: dict = {
            'l2_updates': self.handle_l2_updates,
            'trade': self.handle_trade,
            'subscription_ack': self.handle_subscription,
            'heartbeat': self.handle_heartbeat,
        }
        type = self.safe_string(message, 'type', '')
        if type.find('candles') >= 0:
            self.handle_ohlcv(client, message)
            return
        method = self.safe_value(methods, type)
        if method is not None:
            method(client, message)
        # handle multimarketdata
        if type == 'update':
            ts = self.safe_integer(message, 'timestampms', self.milliseconds())
            eventId = self.safe_integer(message, 'eventId')
            events = self.safe_list(message, 'events')
            orderBookItems = []
            bidaskItems = []
            collectedEventsOfTrades = []
            eventsLength = len(events)
            for i in range(0, len(events)):
                event = events[i]
                eventType = self.safe_string(event, 'type')
                isOrderBook = (eventType == 'change') and ('side' in event) and self.in_array(event['side'], ['ask', 'bid'])
                eventReason = self.safe_string(event, 'reason')
                isBidAsk = (eventReason == 'top-of-book') or (isOrderBook and (eventReason == 'initial') and eventsLength == 2)
                if isBidAsk:
                    bidaskItems.append(event)
                elif isOrderBook:
                    orderBookItems.append(event)
                elif eventType == 'trade':
                    collectedEventsOfTrades.append(events[i])
            lengthBa = len(bidaskItems)
            if lengthBa > 0:
                self.handle_bids_asks_for_multidata(client, bidaskItems, ts, eventId)
            lengthOb = len(orderBookItems)
            if lengthOb > 0:
                self.handle_order_book_for_multidata(client, orderBookItems, ts, eventId)
            lengthTrades = len(collectedEventsOfTrades)
            if lengthTrades > 0:
                self.handle_trades_for_multidata(client, collectedEventsOfTrades, ts)

    async def authenticate(self, params={}):
        url = self.safe_string(params, 'url')
        if (self.clients is not None) and (url in self.clients):
            return
        self.check_required_credentials()
        startIndex = len(self.urls['api']['ws'])
        urlParamsIndex = url.find('?')
        urlLength = len(url)
        endIndex = urlParamsIndex if (urlParamsIndex >= 0) else urlLength
        request = url[startIndex:endIndex]
        payload: dict = {
            'request': request,
            'nonce': self.nonce(),
        }
        b64 = self.string_to_base64(self.json(payload))
        signature = self.hmac(self.encode(b64), self.encode(self.secret), hashlib.sha384, 'hex')
        defaultOptions: dict = {
            'ws': {
                'options': {
                    'headers': {},
                },
            },
        }
        # self.options = self.extend(defaultOptions, self.options)
        self.extend_exchange_options(defaultOptions)
        originalHeaders = self.options['ws']['options']['headers']
        headers: dict = {
            'X-GEMINI-APIKEY': self.apiKey,
            'X-GEMINI-PAYLOAD': b64,
            'X-GEMINI-SIGNATURE': signature,
        }
        self.options['ws']['options']['headers'] = headers
        self.client(url)
        self.options['ws']['options']['headers'] = originalHeaders
