<?php

namespace ccxt;

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

use Exception; // a common import
use ccxt\abstract\bequant as hitbtc;

class bequant extends hitbtc {

    public function describe() {
        return $this->deep_extend(parent::describe(), array(
            'id' => 'bequant',
            'name' => 'Bequant',
            'countries' => array( 'MT' ), // Malta
            'pro' => true,
            'urls' => array(
                'logo' => 'https://user-images.githubusercontent.com/1294454/55248342-a75dfe00-525a-11e9-8aa2-05e9dca943c6.jpg',
                'api' => array(
                    'public' => 'https://api.bequant.io/api/3',
                    'private' => 'https://api.bequant.io/api/3',
                ),
                'www' => 'https://bequant.io',
                'doc' => array(
                    'https://api.bequant.io/',
                ),
                'fees' => array(
                    'https://bequant.io/fees-and-limits',
                ),
                'referral' => 'https://bequant.io',
            ),
        ));
    }
}
