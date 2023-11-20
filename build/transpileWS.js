// ---------------------------------------------------------------------------
// Usage: npm run transpileWs
// ---------------------------------------------------------------------------

import fs from 'fs';
import log from 'ololog';
import ccxt from '../js/ccxt.js';
import ansi  from 'ansicolor'
import {
    replaceInFile,
    copyFile,
    overwriteFile,
    createFolder,
    createFolderRecursively,
} from './fsLocal.js';
import Exchange from '../js/src/base/Exchange.js';
import {  Transpiler, parallelizeTranspiling, isMainEntry } from './transpile.js';

const exchanges = JSON.parse (fs.readFileSync("./exchanges.json", "utf8"));
const wsExchangeIds = exchanges.ws;

const { unCamelCase, precisionConstants, safeString, unique } = ccxt;

ansi.nice
// ============================================================================

class CCXTProTranspiler extends Transpiler {

    getBaseClass () {
        return new Exchange ()
    }

    getPHPPreamble () {
        return [
            "<?php",
            "namespace ccxt\\pro;",
            "include_once __DIR__ . '/../../../vendor/autoload.php';",
            "// ----------------------------------------------------------------------------",
            "",
            "// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:",
            "// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code",
            "",
            "// -----------------------------------------------------------------------------",
            "",
        ].join ("\n")
    }

    getPythonPreamble () {
        return [
            "import os",
            "import sys",
            "",
            "root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))",
            "sys.path.append(root)",
            "",
            "# ----------------------------------------------------------------------------",
            "",
            "# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:",
            "# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code",
            "",
            "# ----------------------------------------------------------------------------",
            "",
        ].join ("\n")
    }


    createPythonClassDeclaration (className, baseClass) {
        const baseClasses = (baseClass.indexOf ('Rest') >= 0) ?
            [ 'ccxt.async_support.' + baseClass.replace('Rest', '') ] :
            [ baseClass ]
        return 'class ' + className + '(' +  baseClasses.join (', ') + '):'
    }

    createPythonClassImports (baseClass, async = false) {

        const baseClasses = {
            'Exchange': 'base.exchange',
        }

        async = (async ? '.async_support' : '')

        if (baseClass.indexOf ('Rest') >= 0) {
            return [
                // 'from ccxt.async_support' + ' import ' + baseClass,
                "import ccxt.async_support"
            ]
        } else {
            return [
                'from ccxt.pro.' + baseClass + ' import ' + baseClass // on the JS side we add to append `Rest` to the base class name
            ]
        }
        // return [
        //     (baseClass.indexOf ('ccxt.') === 0) ?
        //         ('import ccxt' + async + ' as ccxt') :
        //         ('from ccxtpro.' + safeString (baseClasses, baseClass, baseClass) + ' import ' + baseClass)
        // ]
    }

    createPythonClassHeader (ccxtImports, bodyAsString) {
        const imports = [
            ... ccxtImports,
        ]
        const arrayCacheClasses = bodyAsString.match (/\bArrayCache(?:[A-Z][A-Za-z]+)?\b/g)
        if (arrayCacheClasses) {
            const uniqueArrayCacheClasses = unique (arrayCacheClasses).sort ()
            const arrayCacheImport = 'from ccxt.async_support.base.ws.cache import ' + uniqueArrayCacheClasses.join (', ')
            imports.push (arrayCacheImport)
        }
        return [
            "# -*- coding: utf-8 -*-",
            "",
            "# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:",
            "# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code",
            "",
            ... imports,
        ]
    }

    createPHPClassDeclaration (className, baseClass) {
        let lines = []
        if (baseClass.indexOf ('Rest') >= 0) {
            //     lines = lines.concat ([
            //         '',
            //         // '    use ClientTrait;'
            //     ])
            lines.push('class ' + className + ' extends ' + '\\ccxt\\async\\' +  baseClass.replace ('Rest', '') + ' {')
        } else {
            lines.push('class ' + className + ' extends ' + '\\ccxt\\pro\\' +  baseClass + ' {')
        }
        return lines.join ("\n")
    }

    createPHPClassHeader (className, baseClass, bodyAsString) {
        return [
            "<?php",
            "",
            "namespace ccxt\\pro;",
            "",
            "// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:",
            "// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code",
            "",
            "use Exception; // a common import",
        ]
    }

    sortExchangeCapabilities (code) {
        return false
    }

    // ------------------------------------------------------------------------

    transpileOrderBookTest () {
        const jsFile = './ts/src/pro/test/base/test.OrderBook.ts'
        const pyFile = './python/ccxt/pro/test/test_order_book.py'
        const phpFile = './php/pro/test/OrderBook.php'
        const pyImports = [
            '',
            'from ccxt.async_support.base.ws.order_book import OrderBook, IndexedOrderBook, CountedOrderBook  # noqa: F402',
            '',
        ].join ('\n')
        this.transpileTest (jsFile, pyFile, phpFile, pyImports)
    }

    // ------------------------------------------------------------------------

    transpileCacheTest () {
        const jsFile = './ts/src/pro/test/base/test.Cache.ts'
        const pyFile = './python/ccxt/pro/test/test_cache.py'
        const phpFile = './php/pro/test/Cache.php'
        const pyImports = [
            '',
            'from ccxt.async_support.base.ws.cache import ArrayCache, ArrayCacheByTimestamp, ArrayCacheBySymbolById, ArrayCacheBySymbolBySide  # noqa: F402',
            '',
        ].join ('\n')
        this.transpileTest (jsFile, pyFile, phpFile, pyImports)
    }

    // ------------------------------------------------------------------------

    transpileTest (jsFile, pyFile, phpFile, pyImports) {

        log.magenta ('Transpiling WS from', jsFile.yellow)

        let js = fs.readFileSync (jsFile).toString ()

        js = this.regexAll (js, [
            [ /\'use strict\';?\s+/g, '' ],
            //[ /[^\n]+require[^\n]+\n/g, '' ],
            [ /[^\n]+from[^\n]+\n/g, '' ],
            [ /\/\* eslint-disable \*\/\n*/g, '' ],
            [ /export default\s+[^\n]+;*\n*/g, '' ],
            [ /function equals \([\S\s]+?return true;?\n}\n/g, '' ],
        ])

        const options = { js, removeEmptyLines: false }
        const transpiled = this.transpileJavaScriptToPythonAndPHP (options)
        const { python3Body, python2Body, phpBody } = transpiled
        const pythonHeader = [
            '',
            '',
            'def equals(a, b):',
            '    return a == b',
            '',
        ].join ('\n')

        const phpHeader = [
            '',
            'function equals($a, $b) {',
            '    return json_encode($a) === json_encode($b);',
            '}',
        ].join ('\n')

        const python = this.getPythonPreamble () + pyImports + pythonHeader + python2Body
        const php = this.getPHPPreamble () + phpHeader + phpBody

        log.magenta ('→', pyFile.yellow)
        log.magenta ('→', phpFile.yellow)

        overwriteFile (pyFile, python)
        overwriteFile (phpFile, php)
    }

    // ------------------------------------------------------------------------

    exportTypeScriptClassNames (file, classes) {

        log.bright.cyan ('Exporting WS TypeScript class names →', file.yellow)

        const commonImports = [
            '        export const exchanges: string[]',
            '        class Exchange  extends ExchangePro {}'
        ]

        const replacements = [
            {
                file:file,
                regex: /\n\n\s+export\snamespace\spro\s{\n\s+[\s\S]+}/,
                replacement: "\n\n    export namespace pro {\n" + commonImports.join('\n') + '\n' + Object.keys (classes).map (className => {
                    return '        class ' + className + ' extends Exchange {}'
                }).join ("\n") + "\n    }\n}"
            }
        ]

        replacements.forEach (({ file, regex, replacement }) => {
            replaceInFile (file, regex, replacement)
        })

    }

    // -----------------------------------------------------------------------

    async transpileEverything (force = false, child = false) {

        // default pattern is '.js'
        // const [ /* node */, /* script */, pattern ] = process.argv.filter (x => !x.startsWith ('--'))
        const exchanges = process.argv.slice (2).filter (x => !x.startsWith ('--'))
            // , python2Folder = './python/ccxtpro/', // CCXT Pro does not support Python 2
            , python3Folder = './python/ccxt/pro/'
            , phpAsyncFolder = './php/pro/'
            , jsFolder = './js/src/pro/'
            , tsFolder = './ts/src/pro/'
            , options = { /* python2Folder, */ python3Folder, phpAsyncFolder, jsFolder, exchanges }

        // createFolderRecursively (python2Folder)
        createFolderRecursively (python3Folder)
        createFolderRecursively (phpAsyncFolder)

        const classes = this.transpileDerivedExchangeFiles (tsFolder, options, '.ts', force, child || exchanges.length)

        if (child) {
            return
        }

        this.transpileCacheTest ()
        this.transpileOrderBookTest ()


        if (classes === null) {
            log.bright.yellow ('0 files transpiled.')
            return;
        }

        //*/

        // this.transpileErrorHierarchy ({ tsFilename })

        // transpilePrecisionTests ()
        // transpileDateTimeTests ()
        // transpileCryptoTests ()

        log.bright.green ('Transpiled successfully.')
    }
}

// ============================================================================
// main entry point
if (isMainEntry(import.meta.url)) { // called directly like `node module`
    const transpiler = new CCXTProTranspiler ()
    const force = process.argv.includes ('--force')
    const multiprocess = process.argv.includes ('--multiprocess') || process.argv.includes ('--multi')
    const child = process.argv.includes ('--child')
    if (!child && !multiprocess) {
        log.bright.green ({ force })
    }
    if (multiprocess) {
        parallelizeTranspiling (exchanges.ws)
    } else {
        (async () => {
            await transpiler.transpileEverything (force, child)
        })()
    }

} else {

    // do nothing if required as a module
}

// ============================================================================

export default CCXTProTranspiler
