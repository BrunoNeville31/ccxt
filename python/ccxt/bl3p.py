# -*- coding: utf-8 -*-

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

from ccxt.base.exchange import Exchange
import hashlib
from ccxt.base.precise import Precise


class bl3p(Exchange):

    def describe(self):
        return self.deep_extend(super(bl3p, self).describe(), {
            'id': 'bl3p',
            'name': 'BL3P',
            'countries': ['NL', 'EU'],  # Netherlands, EU
            'rateLimit': 1000,
            'version': '1',
            'comment': 'An exchange market by BitonicNL',
            'has': {
                'CORS': False,
                'cancelOrder': True,
                'createOrder': True,
                'fetchBalance': True,
                'fetchOrderBook': True,
                'fetchTicker': True,
                'fetchTrades': True,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/28501752-60c21b82-6feb-11e7-818b-055ee6d0e754.jpg',
                'api': 'https://api.bl3p.eu',
                'www': 'https://bl3p.eu',  # 'https://bitonic.nl'
                'doc': [
                    'https://github.com/BitonicNL/bl3p-api/tree/master/docs',
                    'https://bl3p.eu/api',
                    'https://bitonic.nl/en/api',
                ],
            },
            'api': {
                'public': {
                    'get': [
                        '{market}/ticker',
                        '{market}/orderbook',
                        '{market}/trades',
                    ],
                },
                'private': {
                    'post': [
                        '{market}/money/depth/full',
                        '{market}/money/order/add',
                        '{market}/money/order/cancel',
                        '{market}/money/order/result',
                        '{market}/money/orders',
                        '{market}/money/orders/history',
                        '{market}/money/trades/fetch',
                        'GENMKT/money/info',
                        'GENMKT/money/deposit_address',
                        'GENMKT/money/new_deposit_address',
                        'GENMKT/money/wallet/history',
                        'GENMKT/money/withdraw',
                    ],
                },
            },
            'markets': {
                'BTC/EUR': {'id': 'BTCEUR', 'symbol': 'BTC/EUR', 'base': 'BTC', 'quote': 'EUR', 'baseId': 'BTC', 'quoteId': 'EUR', 'maker': 0.0025, 'taker': 0.0025},
                'LTC/EUR': {'id': 'LTCEUR', 'symbol': 'LTC/EUR', 'base': 'LTC', 'quote': 'EUR', 'baseId': 'LTC', 'quoteId': 'EUR', 'maker': 0.0025, 'taker': 0.0025},
            },
        })

    def fetch_balance(self, params={}):
        self.load_markets()
        response = self.privatePostGENMKTMoneyInfo(params)
        data = self.safe_value(response, 'data', {})
        wallets = self.safe_value(data, 'wallets')
        result = {'info': data}
        codes = list(self.currencies.keys())
        for i in range(0, len(codes)):
            code = codes[i]
            currency = self.currency(code)
            currencyId = currency['id']
            wallet = self.safe_value(wallets, currencyId, {})
            available = self.safe_value(wallet, 'available', {})
            balance = self.safe_value(wallet, 'balance', {})
            account = self.account()
            account['free'] = self.safe_number(available, 'value')
            account['total'] = self.safe_number(balance, 'value')
            result[code] = account
        return self.parse_balance(result)

    def parse_bid_ask(self, bidask, priceKey=0, amountKey=1):
        price = self.safe_number(bidask, priceKey)
        size = self.safe_number(bidask, amountKey)
        return [
            price / 100000.0,
            size / 100000000.0,
        ]

    def fetch_order_book(self, symbol, limit=None, params={}):
        market = self.market(symbol)
        request = {
            'market': market['id'],
        }
        response = self.publicGetMarketOrderbook(self.extend(request, params))
        orderbook = self.safe_value(response, 'data')
        return self.parse_order_book(orderbook, None, 'bids', 'asks', 'price_int', 'amount_int')

    def fetch_ticker(self, symbol, params={}):
        request = {
            'market': self.market_id(symbol),
        }
        ticker = self.publicGetMarketTicker(self.extend(request, params))
        timestamp = self.safe_timestamp(ticker, 'timestamp')
        last = self.safe_number(ticker, 'last')
        return {
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': self.iso8601(timestamp),
            'high': self.safe_number(ticker, 'high'),
            'low': self.safe_number(ticker, 'low'),
            'bid': self.safe_number(ticker, 'bid'),
            'bidVolume': None,
            'ask': self.safe_number(ticker, 'ask'),
            'askVolume': None,
            'vwap': None,
            'open': None,
            'close': last,
            'last': last,
            'previousClose': None,
            'change': None,
            'percentage': None,
            'average': None,
            'baseVolume': self.safe_number(ticker['volume'], '24h'),
            'quoteVolume': None,
            'info': ticker,
        }

    def parse_trade(self, trade, market=None):
        id = self.safe_string(trade, 'trade_id')
        timestamp = self.safe_integer(trade, 'date')
        priceString = self.safe_string(trade, 'price_int')
        priceString = Precise.string_div(priceString, '100000')
        amountString = self.safe_string(trade, 'amount_int')
        amountString = Precise.string_div(amountString, '100000000')
        price = self.parse_number(priceString)
        amount = self.parse_number(amountString)
        cost = self.parse_number(Precise.string_mul(priceString, amountString))
        symbol = None
        if market is not None:
            symbol = market['symbol']
        return {
            'id': id,
            'info': trade,
            'timestamp': timestamp,
            'datetime': self.iso8601(timestamp),
            'symbol': symbol,
            'type': None,
            'side': None,
            'order': None,
            'takerOrMaker': None,
            'price': price,
            'amount': amount,
            'cost': cost,
            'fee': None,
        }

    def fetch_trades(self, symbol, since=None, limit=None, params={}):
        market = self.market(symbol)
        response = self.publicGetMarketTrades(self.extend({
            'market': market['id'],
        }, params))
        result = self.parse_trades(response['data']['trades'], market, since, limit)
        return result

    def create_order(self, symbol, type, side, amount, price=None, params={}):
        market = self.market(symbol)
        order = {
            'market': market['id'],
            'amount_int': int(amount * 100000000),
            'fee_currency': market['quote'],
            'type': 'bid' if (side == 'buy') else 'ask',
        }
        if type == 'limit':
            order['price_int'] = int(price * 100000.0)
        response = self.privatePostMarketMoneyOrderAdd(self.extend(order, params))
        orderId = self.safe_string(response['data'], 'order_id')
        return {
            'info': response,
            'id': orderId,
        }

    def cancel_order(self, id, symbol=None, params={}):
        request = {
            'order_id': id,
        }
        return self.privatePostMarketMoneyOrderCancel(self.extend(request, params))

    def sign(self, path, api='public', method='GET', params={}, headers=None, body=None):
        request = self.implode_params(path, params)
        url = self.urls['api'] + '/' + self.version + '/' + request
        query = self.omit(params, self.extract_params(path))
        if api == 'public':
            if query:
                url += '?' + self.urlencode(query)
        else:
            self.check_required_credentials()
            nonce = self.nonce()
            body = self.urlencode(self.extend({'nonce': nonce}, query))
            secret = self.base64_to_binary(self.secret)
            # eslint-disable-next-line quotes
            auth = request + "\0" + body
            signature = self.hmac(self.encode(auth), secret, hashlib.sha512, 'base64')
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Rest-Key': self.apiKey,
                'Rest-Sign': signature,
            }
        return {'url': url, 'method': method, 'body': body, 'headers': headers}
