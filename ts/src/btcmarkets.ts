
//  ---------------------------------------------------------------------------

import { Exchange } from './base/Exchange.js';
import { ArgumentsRequired, ExchangeError, OrderNotFound, InvalidOrder, InsufficientFunds, DDoSProtection, BadRequest } from './base/errors.js';
import { TICK_SIZE } from './base/functions/number.js';
import { Precise } from './base/Precise.js';

//  ---------------------------------------------------------------------------

export default class btcmarkets extends Exchange {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': 'btcmarkets',
            'name': 'BTC Markets',
            'countries': [ 'AU' ], // Australia
            'rateLimit': 1000, // market data cached for 1 second (trades cached for 2 seconds)
            'version': 'v3',
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'addMargin': false,
                'cancelOrder': true,
                'cancelOrders': true,
                'createOrder': true,
                'createReduceOnlyOrder': false,
                'fetchBalance': true,
                'fetchBorrowRate': false,
                'fetchBorrowRateHistories': false,
                'fetchBorrowRateHistory': false,
                'fetchBorrowRates': false,
                'fetchBorrowRatesPerSymbol': false,
                'fetchClosedOrders': 'emulated',
                'fetchDeposits': true,
                'fetchFundingHistory': false,
                'fetchFundingRate': false,
                'fetchFundingRateHistory': false,
                'fetchFundingRates': false,
                'fetchIndexOHLCV': false,
                'fetchLeverage': false,
                'fetchMarginMode': false,
                'fetchMarkets': true,
                'fetchMarkOHLCV': false,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenInterestHistory': false,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrders': true,
                'fetchPosition': false,
                'fetchPositionMode': false,
                'fetchPositions': false,
                'fetchPositionsRisk': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchTicker': true,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchTransactions': true,
                'fetchWithdrawals': true,
                'reduceMargin': false,
                'setLeverage': false,
                'setMarginMode': false,
                'setPositionMode': false,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/51840849/89731817-b3fb8480-da52-11ea-817f-783b08aaf32b.jpg',
                'api': {
                    'public': 'https://api.btcmarkets.net',
                    'private': 'https://api.btcmarkets.net',
                },
                'www': 'https://btcmarkets.net',
                'doc': [
                    'https://api.btcmarkets.net/doc/v3',
                    'https://github.com/BTCMarkets/API',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        'markets',
                        'markets/{marketId}/ticker',
                        'markets/{marketId}/trades',
                        'markets/{marketId}/orderbook',
                        'markets/{marketId}/candles',
                        'markets/tickers',
                        'markets/orderbooks',
                        'time',
                    ],
                },
                'private': {
                    'get': [
                        'orders',
                        'orders/{id}',
                        'batchorders/{ids}',
                        'trades',
                        'trades/{id}',
                        'withdrawals',
                        'withdrawals/{id}',
                        'deposits',
                        'deposits/{id}',
                        'transfers',
                        'transfers/{id}',
                        'addresses',
                        'withdrawal-fees',
                        'assets',
                        'accounts/me/trading-fees',
                        'accounts/me/withdrawal-limits',
                        'accounts/me/balances',
                        'accounts/me/transactions',
                        'reports/{id}',
                    ],
                    'post': [
                        'orders',
                        'batchorders',
                        'withdrawals',
                        'reports',
                    ],
                    'delete': [
                        'orders',
                        'orders/{id}',
                        'batchorders/{ids}',
                    ],
                    'put': [
                        'orders/{id}',
                    ],
                },
            },
            'timeframes': {
                '1m': '1m',
                '1h': '1h',
                '1d': '1d',
            },
            'precisionMode': TICK_SIZE,
            'exceptions': {
                '3': InvalidOrder,
                '6': DDoSProtection,
                'InsufficientFund': InsufficientFunds,
                'InvalidPrice': InvalidOrder,
                'InvalidAmount': InvalidOrder,
                'MissingArgument': InvalidOrder,
                'OrderAlreadyCancelled': InvalidOrder,
                'OrderNotFound': OrderNotFound,
                'OrderStatusIsFinal': InvalidOrder,
                'InvalidPaginationParameter': BadRequest,
            },
            'fees': {
                'percentage': true,
                'tierBased': true,
                'maker': this.parseNumber ('-0.0005'),
                'taker': this.parseNumber ('0.0020'),
            },
            'options': {
                'fees': {
                    'AUD': {
                        'maker': this.parseNumber ('0.0085'),
                        'taker': this.parseNumber ('0.0085'),
                    },
                },
            },
        });
    }

    async fetchTransactionsWithMethod (method, code = undefined, since: any = undefined, limit: any = undefined, params = {}) {
        await this.loadMarkets ();
        const request = {};
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        if (since !== undefined) {
            request['after'] = since;
        }
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency (code);
        }
        const response = await this[method] (this.extend (request, params));
        return this.parseTransactions (response, currency, since, limit);
    }

    async fetchTransactions (code: string = undefined, since: any = undefined, limit: any = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchTransactions
         * @description fetch history of deposits and withdrawals
         * @param {string|undefined} code unified currency code for the currency of the transactions, default is undefined
         * @param {int|undefined} since timestamp in ms of the earliest transaction, default is undefined
         * @param {int|undefined} limit max number of transactions to return, default is undefined
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {object} a list of [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        return await this.fetchTransactionsWithMethod ('privateGetTransfers', code, since, limit, params);
    }

    async fetchDeposits (code: string = undefined, since: any = undefined, limit: any = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchDeposits
         * @description fetch all deposits made to an account
         * @param {string|undefined} code unified currency code
         * @param {int|undefined} since the earliest time in ms to fetch deposits for
         * @param {int|undefined} limit the maximum number of deposits structures to retrieve
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {[object]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        return await this.fetchTransactionsWithMethod ('privateGetDeposits', code, since, limit, params);
    }

    async fetchWithdrawals (code: string = undefined, since: any = undefined, limit: any = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchWithdrawals
         * @description fetch all withdrawals made from an account
         * @param {string|undefined} code unified currency code
         * @param {int|undefined} since the earliest time in ms to fetch withdrawals for
         * @param {int|undefined} limit the maximum number of withdrawals structures to retrieve
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {[object]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        return await this.fetchTransactionsWithMethod ('privateGetWithdrawals', code, since, limit, params);
    }

    parseTransactionStatus (status) {
        const statuses = {
            'Accepted': 'pending',
            'Pending Authorization': 'pending',
            'Complete': 'ok',
            'Cancelled': 'cancelled',
            'Failed': 'failed',
        };
        return this.safeString (statuses, status, status);
    }

    parseTransactionType (type) {
        const statuses = {
            'Withdraw': 'withdrawal',
            'Deposit': 'deposit',
        };
        return this.safeString (statuses, type, type);
    }

    parseTransaction (transaction, currency = undefined) {
        //
        //    {
        //         "id": "6500230339",
        //         "assetName": "XRP",
        //         "amount": "500",
        //         "type": "Deposit",
        //         "creationTime": "2020-07-27T07:52:08.640000Z",
        //         "status": "Complete",
        //         "description": "RIPPLE Deposit, XRP 500",
        //         "fee": "0",
        //         "lastUpdate": "2020-07-27T07:52:08.665000Z",
        //         "paymentDetail": {
        //             "txId": "lsjflsjdfljsd",
        //             "address": "kjasfkjsdf?dt=873874545"
        //         }
        //    }
        //
        //    {
        //         "id": "500985282",
        //         "assetName": "BTC",
        //         "amount": "0.42570126",
        //         "type": "Withdraw",
        //         "creationTime": "2017-07-29T12:49:03.931000Z",
        //         "status": "Complete",
        //         "description": "BTC withdraw from [nick-btcmarkets@snowmonkey.co.uk] to Address: 1B9DsnSYQ54VMqFHVJYdGoLMCYzFwrQzsj amount: 0.42570126 fee: 0.00000000",
        //         "fee": "0.0005",
        //         "lastUpdate": "2017-07-29T12:52:20.676000Z",
        //         "paymentDetail": {
        //             "txId": "fkjdsfjsfljsdfl",
        //             "address": "a;daddjas;djas"
        //         }
        //    }
        //
        //    {
        //         "id": "505102262",
        //         "assetName": "XRP",
        //         "amount": "979.836",
        //         "type": "Deposit",
        //         "creationTime": "2017-07-31T08:50:01.053000Z",
        //         "status": "Complete",
        //         "description": "Ripple Deposit, X 979.8360",
        //         "fee": "0",
        //         "lastUpdate": "2017-07-31T08:50:01.290000Z"
        //     }
        //
        const timestamp = this.parse8601 (this.safeString (transaction, 'creationTime'));
        const lastUpdate = this.parse8601 (this.safeString (transaction, 'lastUpdate'));
        let type = this.parseTransactionType (this.safeStringLower (transaction, 'type'));
        if (type === 'withdraw') {
            type = 'withdrawal';
        }
        const cryptoPaymentDetail = this.safeValue (transaction, 'paymentDetail', {});
        const txid = this.safeString (cryptoPaymentDetail, 'txId');
        let address = this.safeString (cryptoPaymentDetail, 'address');
        let tag = undefined;
        if (address !== undefined) {
            const addressParts = address.split ('?dt=');
            const numParts = addressParts.length;
            if (numParts > 1) {
                address = addressParts[0];
                tag = addressParts[1];
            }
        }
        const addressTo = address;
        const tagTo = tag;
        const addressFrom = undefined;
        const tagFrom = undefined;
        const fee = this.safeNumber (transaction, 'fee');
        const status = this.parseTransactionStatus (this.safeString (transaction, 'status'));
        const currencyId = this.safeString (transaction, 'assetName');
        const code = this.safeCurrencyCode (currencyId);
        let amount = this.safeNumber (transaction, 'amount');
        if (fee) {
            amount -= fee;
        }
        return {
            'id': this.safeString (transaction, 'id'),
            'txid': txid,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'network': undefined,
            'address': address,
            'addressTo': addressTo,
            'addressFrom': addressFrom,
            'tag': tag,
            'tagTo': tagTo,
            'tagFrom': tagFrom,
            'type': type,
            'amount': amount,
            'currency': code,
            'status': status,
            'updated': lastUpdate,
            'comment': undefined,
            'fee': {
                'currency': code,
                'cost': fee,
                'rate': undefined,
            },
            'info': transaction,
        };
    }

    async fetchMarkets (params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchMarkets
         * @description retrieves data on all markets for btcmarkets
         * @param {object} params extra parameters specific to the exchange api endpoint
         * @returns {[object]} an array of objects representing market data
         */
        const response = await (this as any).publicGetMarkets (params);
        //
        //     [
        //         {
        //             "marketId":"COMP-AUD",
        //             "baseAssetName":"COMP",
        //             "quoteAssetName":"AUD",
        //             "minOrderAmount":"0.00007",
        //             "maxOrderAmount":"1000000",
        //             "amountDecimals":"8",
        //             "priceDecimals":"2"
        //         }
        //     ]
        //
        const result = [];
        for (let i = 0; i < response.length; i++) {
            const market = response[i];
            const baseId = this.safeString (market, 'baseAssetName');
            const quoteId = this.safeString (market, 'quoteAssetName');
            const id = this.safeString (market, 'marketId');
            const base = this.safeCurrencyCode (baseId);
            const quote = this.safeCurrencyCode (quoteId);
            const symbol = base + '/' + quote;
            const fees = this.safeValue (this.safeValue (this.options, 'fees', {}), quote, this.fees);
            const pricePrecision = this.parseNumber (this.parsePrecision (this.safeString (market, 'priceDecimals')));
            const minAmount = this.safeNumber (market, 'minOrderAmount');
            const maxAmount = this.safeNumber (market, 'maxOrderAmount');
            let minPrice = undefined;
            if (quote === 'AUD') {
                minPrice = pricePrecision;
            }
            result.push ({
                'id': id,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'settle': undefined,
                'baseId': baseId,
                'quoteId': quoteId,
                'settleId': undefined,
                'type': 'spot',
                'spot': true,
                'margin': false,
                'swap': false,
                'future': false,
                'option': false,
                'active': undefined,
                'contract': false,
                'linear': undefined,
                'inverse': undefined,
                'taker': fees['taker'],
                'maker': fees['maker'],
                'contractSize': undefined,
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': this.parseNumber (this.parsePrecision (this.safeString (market, 'amountDecimals'))),
                    'price': pricePrecision,
                },
                'limits': {
                    'leverage': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'amount': {
                        'min': minAmount,
                        'max': maxAmount,
                    },
                    'price': {
                        'min': minPrice,
                        'max': undefined,
                    },
                    'cost': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
                'info': market,
            });
        }
        return result;
    }

    async fetchTime (params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchTime
         * @description fetches the current integer timestamp in milliseconds from the exchange server
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {int} the current integer timestamp in milliseconds from the exchange server
         */
        const response = await (this as any).publicGetTime (params);
        //
        //     {
        //         "timestamp": "2019-09-01T18:34:27.045000Z"
        //     }
        //
        return this.parse8601 (this.safeString (response, 'timestamp'));
    }

    parseBalance (response) {
        const result = { 'info': response };
        for (let i = 0; i < response.length; i++) {
            const balance = response[i];
            const currencyId = this.safeString (balance, 'assetName');
            const code = this.safeCurrencyCode (currencyId);
            const account = this.account ();
            account['used'] = this.safeString (balance, 'locked');
            account['total'] = this.safeString (balance, 'balance');
            result[code] = account;
        }
        return this.safeBalance (result);
    }

    async fetchBalance (params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchBalance
         * @description query for balance and get the amount of funds available for trading or funds locked in orders
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {object} a [balance structure]{@link https://docs.ccxt.com/en/latest/manual.html?#balance-structure}
         */
        await this.loadMarkets ();
        const response = await (this as any).privateGetAccountsMeBalances (params);
        return this.parseBalance (response);
    }

    parseOHLCV (ohlcv, market = undefined) {
        //
        //     [
        //         "2020-09-12T18:30:00.000000Z",
        //         "14409.45", // open
        //         "14409.45", // high
        //         "14403.91", // low
        //         "14403.91", // close
        //         "0.01571701" // volume
        //     ]
        //
        return [
            this.parse8601 (this.safeString (ohlcv, 0)),
            this.safeNumber (ohlcv, 1), // open
            this.safeNumber (ohlcv, 2), // high
            this.safeNumber (ohlcv, 3), // low
            this.safeNumber (ohlcv, 4), // close
            this.safeNumber (ohlcv, 5), // volume
        ];
    }

    async fetchOHLCV (symbol, timeframe = '1m', since: any = undefined, limit: any = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchOHLCV
         * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
         * @param {string} symbol unified symbol of the market to fetch OHLCV data for
         * @param {string} timeframe the length of time each candle represents
         * @param {int|undefined} since timestamp in ms of the earliest candle to fetch
         * @param {int|undefined} limit the maximum amount of candles to fetch
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {[[int]]} A list of candles ordered as timestamp, open, high, low, close, volume
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'marketId': market['id'],
            'timeWindow': this.safeString (this.timeframes, timeframe, timeframe),
            // 'from': this.iso8601 (since),
            // 'to': this.iso8601 (this.milliseconds ()),
            // 'before': 1234567890123,
            // 'after': 1234567890123,
            // 'limit': limit, // default 10, max 200
        };
        if (since !== undefined) {
            request['from'] = this.iso8601 (since);
        }
        if (limit !== undefined) {
            request['limit'] = limit; // default is 10, max 200
        }
        const response = await (this as any).publicGetMarketsMarketIdCandles (this.extend (request, params));
        //
        //     [
        //         ["2020-09-12T18:30:00.000000Z","14409.45","14409.45","14403.91","14403.91","0.01571701"],
        //         ["2020-09-12T18:21:00.000000Z","14409.45","14409.45","14409.45","14409.45","0.0035"],
        //         ["2020-09-12T18:03:00.000000Z","14361.37","14361.37","14361.37","14361.37","0.00345221"],
        //     ]
        //
        return this.parseOHLCVs (response, market, timeframe, since, limit);
    }

    async fetchOrderBook (symbol, limit = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchOrderBook
         * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
         * @param {string} symbol unified symbol of the market to fetch the order book for
         * @param {int|undefined} limit the maximum amount of order book entries to return
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'marketId': market['id'],
        };
        const response = await (this as any).publicGetMarketsMarketIdOrderbook (this.extend (request, params));
        //
        //     {
        //         "marketId":"BTC-AUD",
        //         "snapshotId":1599936148941000,
        //         "asks":[
        //             ["14459.45","0.00456475"],
        //             ["14463.56","2"],
        //             ["14470.91","0.98"],
        //         ],
        //         "bids":[
        //             ["14421.01","0.52"],
        //             ["14421","0.75"],
        //             ["14418","0.3521"],
        //         ]
        //     }
        //
        const timestamp = this.safeIntegerProduct (response, 'snapshotId', 0.001);
        const orderbook = this.parseOrderBook (response, symbol, timestamp);
        orderbook['nonce'] = this.safeInteger (response, 'snapshotId');
        return orderbook;
    }

    parseTicker (ticker, market = undefined) {
        //
        // fetchTicker
        //
        //     {
        //         "marketId":"BAT-AUD",
        //         "bestBid":"0.3751",
        //         "bestAsk":"0.377",
        //         "lastPrice":"0.3769",
        //         "volume24h":"56192.97613335",
        //         "volumeQte24h":"21179.13270465",
        //         "price24h":"0.0119",
        //         "pricePct24h":"3.26",
        //         "low24h":"0.3611",
        //         "high24h":"0.3799",
        //         "timestamp":"2020-08-09T18:28:23.280000Z"
        //     }
        //
        const marketId = this.safeString (ticker, 'marketId');
        market = this.safeMarket (marketId, market, '-');
        const symbol = market['symbol'];
        const timestamp = this.parse8601 (this.safeString (ticker, 'timestamp'));
        const last = this.safeString (ticker, 'lastPrice');
        const baseVolume = this.safeString (ticker, 'volume24h');
        const quoteVolume = this.safeString (ticker, 'volumeQte24h');
        const change = this.safeString (ticker, 'price24h');
        const percentage = this.safeString (ticker, 'pricePct24h');
        return this.safeTicker ({
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'high': this.safeString (ticker, 'high24h'),
            'low': this.safeString (ticker, 'low'),
            'bid': this.safeString (ticker, 'bestBid'),
            'bidVolume': undefined,
            'ask': this.safeString (ticker, 'bestAsk'),
            'askVolume': undefined,
            'vwap': undefined,
            'open': undefined,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': change,
            'percentage': percentage,
            'average': undefined,
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
            'info': ticker,
        }, market);
    }

    async fetchTicker (symbol, params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchTicker
         * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
         * @param {string} symbol unified symbol of the market to fetch the ticker for
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'marketId': market['id'],
        };
        const response = await (this as any).publicGetMarketsMarketIdTicker (this.extend (request, params));
        //
        //     {
        //         "marketId":"BAT-AUD",
        //         "bestBid":"0.3751",
        //         "bestAsk":"0.377",
        //         "lastPrice":"0.3769",
        //         "volume24h":"56192.97613335",
        //         "volumeQte24h":"21179.13270465",
        //         "price24h":"0.0119",
        //         "pricePct24h":"3.26",
        //         "low24h":"0.3611",
        //         "high24h":"0.3799",
        //         "timestamp":"2020-08-09T18:28:23.280000Z"
        //     }
        //
        return this.parseTicker (response, market);
    }

    async fetchTicker2 (symbol, params = {}) {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'id': market['id'],
        };
        const response = await (this as any).publicGetMarketIdTick (this.extend (request, params));
        return this.parseTicker (response, market);
    }

    parseTrade (trade, market = undefined) {
        //
        // public fetchTrades
        //
        //     {
        //         "id":"6191646611",
        //         "price":"539.98",
        //         "amount":"0.5",
        //         "timestamp":"2020-08-09T15:21:05.016000Z",
        //         "side":"Ask"
        //     }
        //
        // private fetchMyTrades
        //
        //     {
        //         "id": "36014819",
        //         "marketId": "XRP-AUD",
        //         "timestamp": "2019-06-25T16:01:02.977000Z",
        //         "price": "0.67",
        //         "amount": "1.50533262",
        //         "side": "Ask",
        //         "fee": "0.00857285",
        //         "orderId": "3648306",
        //         "liquidityType": "Taker",
        //         "clientOrderId": "48"
        //     }
        //
        const timestamp = this.parse8601 (this.safeString (trade, 'timestamp'));
        const marketId = this.safeString (trade, 'marketId');
        market = this.safeMarket (marketId, market, '-');
        const feeCurrencyCode = (market['quote'] === 'AUD') ? market['quote'] : market['base'];
        let side = this.safeString (trade, 'side');
        if (side === 'Bid') {
            side = 'buy';
        } else if (side === 'Ask') {
            side = 'sell';
        }
        const id = this.safeString (trade, 'id');
        const priceString = this.safeString (trade, 'price');
        const amountString = this.safeString (trade, 'amount');
        const orderId = this.safeString (trade, 'orderId');
        let fee = undefined;
        const feeCostString = this.safeString (trade, 'fee');
        if (feeCostString !== undefined) {
            fee = {
                'cost': feeCostString,
                'currency': feeCurrencyCode,
            };
        }
        const takerOrMaker = this.safeStringLower (trade, 'liquidityType');
        return this.safeTrade ({
            'info': trade,
            'id': id,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'order': orderId,
            'symbol': market['symbol'],
            'type': undefined,
            'side': side,
            'price': priceString,
            'amount': amountString,
            'cost': undefined,
            'takerOrMaker': takerOrMaker,
            'fee': fee,
        }, market);
    }

    async fetchTrades (symbol, since: any = undefined, limit: any = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchTrades
         * @description get the list of most recent trades for a particular symbol
         * @param {string} symbol unified symbol of the market to fetch trades for
         * @param {int|undefined} since timestamp in ms of the earliest trade to fetch
         * @param {int|undefined} limit the maximum amount of trades to fetch
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {[object]} a list of [trade structures]{@link https://docs.ccxt.com/en/latest/manual.html?#public-trades}
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            // 'since': 59868345231,
            'marketId': market['id'],
        };
        const response = await (this as any).publicGetMarketsMarketIdTrades (this.extend (request, params));
        //
        //     [
        //         {"id":"6191646611","price":"539.98","amount":"0.5","timestamp":"2020-08-09T15:21:05.016000Z","side":"Ask"},
        //         {"id":"6191646610","price":"539.99","amount":"0.5","timestamp":"2020-08-09T15:21:05.015000Z","side":"Ask"},
        //         {"id":"6191646590","price":"540","amount":"0.00233785","timestamp":"2020-08-09T15:21:04.171000Z","side":"Bid"},
        //     ]
        //
        return this.parseTrades (response, market, since, limit);
    }

    async createOrder (symbol, type, side, amount, price = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#createOrder
         * @description create a trade order
         * @param {string} symbol unified symbol of the market to create an order in
         * @param {string} type 'market' or 'limit'
         * @param {string} side 'buy' or 'sell'
         * @param {float} amount how much of currency you want to trade in units of base currency
         * @param {float|undefined} price the price at which the order is to be fullfilled, in units of the quote currency, ignored in market orders
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        const market = this.market (symbol);
        const request = {
            'marketId': market['id'],
            // 'price': this.priceToPrecision (symbol, price),
            'amount': this.amountToPrecision (symbol, amount),
            // 'type': 'Limit', // "Limit", "Market", "Stop Limit", "Stop", "Take Profit"
            'side': (side === 'buy') ? 'Bid' : 'Ask',
            // 'triggerPrice': this.priceToPrecision (symbol, triggerPrice), // required for Stop, Stop Limit, Take Profit orders
            // 'targetAmount': this.amountToPrecision (symbol, targetAmount), // target amount when a desired target outcome is required for order execution
            // 'timeInForce': 'GTC', // GTC, FOK, IOC
            // 'postOnly': false, // boolean if this is a post-only order
            // 'selfTrade': 'A', // A = allow, P = prevent
            // 'clientOrderId': this.uuid (),
        };
        const lowercaseType = type.toLowerCase ();
        const orderTypes = this.safeValue (this.options, 'orderTypes', {
            'limit': 'Limit',
            'market': 'Market',
            'stop': 'Stop',
            'stop limit': 'Stop Limit',
            'take profit': 'Take Profit',
        });
        request['type'] = this.safeString (orderTypes, lowercaseType, type);
        let priceIsRequired = false;
        let triggerPriceIsRequired = false;
        if (lowercaseType === 'limit') {
            priceIsRequired = true;
        // } else if (lowercaseType === 'market') {
        //     ...
        // }
        } else if (lowercaseType === 'stop limit') {
            triggerPriceIsRequired = true;
            priceIsRequired = true;
        } else if (lowercaseType === 'take profit') {
            triggerPriceIsRequired = true;
        } else if (lowercaseType === 'stop') {
            triggerPriceIsRequired = true;
        }
        if (priceIsRequired) {
            if (price === undefined) {
                throw new ArgumentsRequired (this.id + ' createOrder() requires a price argument for a ' + type + 'order');
            } else {
                request['price'] = this.priceToPrecision (symbol, price);
            }
        }
        if (triggerPriceIsRequired) {
            const triggerPrice = this.safeNumber (params, 'triggerPrice');
            params = this.omit (params, 'triggerPrice');
            if (triggerPrice === undefined) {
                throw new ArgumentsRequired (this.id + ' createOrder() requires a triggerPrice parameter for a ' + type + 'order');
            } else {
                request['triggerPrice'] = this.priceToPrecision (symbol, triggerPrice);
            }
        }
        const clientOrderId = this.safeString (params, 'clientOrderId');
        if (clientOrderId !== undefined) {
            request['clientOrderId'] = clientOrderId;
        }
        params = this.omit (params, 'clientOrderId');
        const response = await (this as any).privatePostOrders (this.extend (request, params));
        //
        //     {
        //         "orderId": "7524",
        //         "marketId": "BTC-AUD",
        //         "side": "Bid",
        //         "type": "Limit",
        //         "creationTime": "2019-08-30T11:08:21.956000Z",
        //         "price": "100.12",
        //         "amount": "1.034",
        //         "openAmount": "1.034",
        //         "status": "Accepted",
        //         "clientOrderId": "1234-5678",
        //         "timeInForce": "IOC",
        //         "postOnly": false,
        //         "selfTrade": "P",
        //         "triggerAmount": "105",
        //         "targetAmount": "1000"
        //     }
        //
        return this.parseOrder (response, market);
    }

    async cancelOrders (ids, symbol: string = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#cancelOrders
         * @description cancel multiple orders
         * @param {[string]} ids order ids
         * @param {string|undefined} symbol not used by btcmarkets cancelOrders ()
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {object} an list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        for (let i = 0; i < ids.length; i++) {
            ids[i] = parseInt (ids[i]);
        }
        const request = {
            'ids': ids,
        };
        return await (this as any).privateDeleteBatchordersIds (this.extend (request, params));
    }

    async cancelOrder (id, symbol: string = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#cancelOrder
         * @description cancels an open order
         * @param {string} id order id
         * @param {string|undefined} symbol not used by btcmarket cancelOrder ()
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        const request = {
            'id': id,
        };
        return await (this as any).privateDeleteOrdersId (this.extend (request, params));
    }

    calculateFee (symbol, type, side, amount, price, takerOrMaker = 'taker', params = {}) {
        const market = this.markets[symbol];
        let currency = undefined;
        let cost = undefined;
        if (market['quote'] === 'AUD') {
            currency = market['quote'];
            const amountString = this.numberToString (amount);
            const priceString = this.numberToString (price);
            const otherUnitsAmount = Precise.stringMul (amountString, priceString);
            cost = this.costToPrecision (symbol, otherUnitsAmount);
        } else {
            currency = market['base'];
            cost = this.amountToPrecision (symbol, amount);
        }
        const rate = market[takerOrMaker];
        const rateCost = Precise.stringMul (this.numberToString (rate), cost);
        return {
            'type': takerOrMaker,
            'currency': currency,
            'rate': rate,
            'cost': parseFloat (this.feeToPrecision (symbol, rateCost)),
        };
    }

    parseOrderStatus (status) {
        const statuses = {
            'Accepted': 'open',
            'Placed': 'open',
            'Partially Matched': 'open',
            'Fully Matched': 'closed',
            'Cancelled': 'canceled',
            'Partially Cancelled': 'canceled',
            'Failed': 'rejected',
        };
        return this.safeString (statuses, status, status);
    }

    parseOrder (order, market = undefined) {
        //
        // createOrder
        //
        //     {
        //         "orderId": "7524",
        //         "marketId": "BTC-AUD",
        //         "side": "Bid",
        //         "type": "Limit",
        //         "creationTime": "2019-08-30T11:08:21.956000Z",
        //         "price": "100.12",
        //         "amount": "1.034",
        //         "openAmount": "1.034",
        //         "status": "Accepted",
        //         "clientOrderId": "1234-5678",
        //         "timeInForce": "IOC",
        //         "postOnly": false,
        //         "selfTrade": "P",
        //         "triggerAmount": "105",
        //         "targetAmount": "1000"
        //     }
        //
        const timestamp = this.parse8601 (this.safeString (order, 'creationTime'));
        const marketId = this.safeString (order, 'marketId');
        market = this.safeMarket (marketId, market, '-');
        let side = this.safeString (order, 'side');
        if (side === 'Bid') {
            side = 'buy';
        } else if (side === 'Ask') {
            side = 'sell';
        }
        const type = this.safeStringLower (order, 'type');
        const price = this.safeString (order, 'price');
        const amount = this.safeString (order, 'amount');
        const remaining = this.safeString (order, 'openAmount');
        const status = this.parseOrderStatus (this.safeString (order, 'status'));
        const id = this.safeString (order, 'orderId');
        const clientOrderId = this.safeString (order, 'clientOrderId');
        const timeInForce = this.safeString (order, 'timeInForce');
        const stopPrice = this.safeNumber (order, 'triggerPrice');
        const postOnly = this.safeValue (order, 'postOnly');
        return this.safeOrder ({
            'info': order,
            'id': id,
            'clientOrderId': clientOrderId,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'lastTradeTimestamp': undefined,
            'symbol': market['symbol'],
            'type': type,
            'timeInForce': timeInForce,
            'postOnly': postOnly,
            'side': side,
            'price': price,
            'stopPrice': stopPrice,
            'triggerPrice': stopPrice,
            'cost': undefined,
            'amount': amount,
            'filled': undefined,
            'remaining': remaining,
            'average': undefined,
            'status': status,
            'trades': undefined,
            'fee': undefined,
        }, market);
    }

    async fetchOrder (id, symbol: string = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchOrder
         * @description fetches information on an order made by the user
         * @param {string|undefined} symbol not used by btcmarkets fetchOrder
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        const request = {
            'id': id,
        };
        const response = await (this as any).privateGetOrdersId (this.extend (request, params));
        return this.parseOrder (response);
    }

    async fetchOrders (symbol: string = undefined, since: any = undefined, limit: any = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchOrders
         * @description fetches information on multiple orders made by the user
         * @param {string|undefined} symbol unified market symbol of the market orders were made in
         * @param {int|undefined} since the earliest time in ms to fetch orders for
         * @param {int|undefined} limit the maximum number of  orde structures to retrieve
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {[object]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        await this.loadMarkets ();
        const request = {
            'status': 'all',
        };
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
            request['marketId'] = market['id'];
        }
        if (since !== undefined) {
            request['after'] = since;
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await (this as any).privateGetOrders (this.extend (request, params));
        return this.parseOrders (response, market, since, limit);
    }

    async fetchOpenOrders (symbol: string = undefined, since: any = undefined, limit: any = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchOpenOrders
         * @description fetch all unfilled currently open orders
         * @param {string|undefined} symbol unified market symbol
         * @param {int|undefined} since the earliest time in ms to fetch open orders for
         * @param {int|undefined} limit the maximum number of  open orders structures to retrieve
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {[object]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        const request = { 'status': 'open' };
        return await this.fetchOrders (symbol, since, limit, this.extend (request, params));
    }

    async fetchClosedOrders (symbol: string = undefined, since: any = undefined, limit: any = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchClosedOrders
         * @description fetches information on multiple closed orders made by the user
         * @param {string|undefined} symbol unified market symbol of the market orders were made in
         * @param {int|undefined} since the earliest time in ms to fetch orders for
         * @param {int|undefined} limit the maximum number of  orde structures to retrieve
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {[object]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
         */
        const orders = await this.fetchOrders (symbol, since, limit, params);
        return this.filterBy (orders, 'status', 'closed');
    }

    async fetchMyTrades (symbol: string = undefined, since: any = undefined, limit: any = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#fetchMyTrades
         * @description fetch all trades made by the user
         * @param {string|undefined} symbol unified market symbol
         * @param {int|undefined} since the earliest time in ms to fetch trades for
         * @param {int|undefined} limit the maximum number of trades structures to retrieve
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {[object]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
         */
        await this.loadMarkets ();
        const request = {};
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market (symbol);
            request['marketId'] = market['id'];
        }
        if (since !== undefined) {
            request['after'] = since;
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await (this as any).privateGetTrades (this.extend (request, params));
        //
        //     [
        //         {
        //             "id": "36014819",
        //             "marketId": "XRP-AUD",
        //             "timestamp": "2019-06-25T16:01:02.977000Z",
        //             "price": "0.67",
        //             "amount": "1.50533262",
        //             "side": "Ask",
        //             "fee": "0.00857285",
        //             "orderId": "3648306",
        //             "liquidityType": "Taker",
        //             "clientOrderId": "48"
        //         },
        //         {
        //             "id": "3568960",
        //             "marketId": "GNT-AUD",
        //             "timestamp": "2019-06-20T08:44:04.488000Z",
        //             "price": "0.1362",
        //             "amount": "0.85",
        //             "side": "Bid",
        //             "fee": "0.00098404",
        //             "orderId": "3543015",
        //             "liquidityType": "Maker"
        //         }
        //     ]
        //
        return this.parseTrades (response, market, since, limit);
    }

    async withdraw (code, amount, address, tag = undefined, params = {}) {
        /**
         * @method
         * @name btcmarkets#withdraw
         * @description make a withdrawal
         * @param {string} code unified currency code
         * @param {float} amount the amount to withdraw
         * @param {string} address the address to withdraw to
         * @param {string|undefined} tag
         * @param {object} params extra parameters specific to the btcmarkets api endpoint
         * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
         */
        [ tag, params ] = this.handleWithdrawTagAndParams (tag, params);
        await this.loadMarkets ();
        const currency = this.currency (code);
        const request = {
            'currency_id': currency['id'],
            'amount': this.currencyToPrecision (code, amount),
        };
        if (code !== 'AUD') {
            this.checkAddress (address);
            request['toAddress'] = address;
        }
        if (tag !== undefined) {
            request['toAddress'] = address + '?dt=' + tag;
        }
        const response = await (this as any).privatePostWithdrawals (this.extend (request, params));
        //
        //      {
        //          "id": "4126657",
        //          "assetName": "XRP",
        //          "amount": "25",
        //          "type": "Withdraw",
        //          "creationTime": "2019-09-04T00:04:10.973000Z",
        //          "status": "Pending Authorization",
        //          "description": "XRP withdraw from [me@test.com] to Address: abc amount: 25 fee: 0",
        //          "fee": "0",
        //          "lastUpdate": "2019-09-04T00:04:11.018000Z",
        //          "paymentDetail": {
        //              "address": "abc"
        //          }
        //      }
        //
        return this.parseTransaction (response, currency);
    }

    nonce () {
        return this.milliseconds ();
    }

    sign (path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let request = '/' + this.version + '/' + this.implodeParams (path, params);
        const query = this.keysort (this.omit (params, this.extractParams (path)));
        if (api === 'private') {
            this.checkRequiredCredentials ();
            const nonce = this.nonce ().toString ();
            const secret = this.base64ToBinary (this.encode (this.secret));
            let auth = method + request + nonce;
            if ((method === 'GET') || (method === 'DELETE')) {
                if (Object.keys (query).length) {
                    request += '?' + this.urlencode (query);
                }
            } else {
                body = this.json (query);
                auth += body;
            }
            const signature = this.hmac (this.encode (auth), secret, 'sha512', 'base64');
            headers = {
                'Accept': 'application/json',
                'Accept-Charset': 'UTF-8',
                'Content-Type': 'application/json',
                'BM-AUTH-APIKEY': this.apiKey,
                'BM-AUTH-TIMESTAMP': nonce,
                'BM-AUTH-SIGNATURE': signature,
            };
        } else if (api === 'public') {
            if (Object.keys (query).length) {
                request += '?' + this.urlencode (query);
            }
        }
        const url = this.urls['api'][api] + request;
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }

    handleErrors (code, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (response === undefined) {
            return; // fallback to default error handler
        }
        if ('success' in response) {
            if (!response['success']) {
                const error = this.safeString (response, 'errorCode');
                const feedback = this.id + ' ' + body;
                this.throwExactlyMatchedException (this.exceptions, error, feedback);
                throw new ExchangeError (feedback);
            }
        }
        // v3 api errors
        if (code >= 400) {
            const errorCode = this.safeString (response, 'code');
            const message = this.safeString (response, 'message');
            const feedback = this.id + ' ' + body;
            this.throwExactlyMatchedException (this.exceptions, errorCode, feedback);
            this.throwExactlyMatchedException (this.exceptions, message, feedback);
            throw new ExchangeError (feedback);
        }
    }
}
