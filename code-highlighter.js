(function(window, document){

    'use strict';

    // trim polyfill by(http://blog.stevenlevithan.com/archives/faster-trim-javascript)
    if(typeof String.prototype.trim !== 'function') {

        String.prototype.trim = function() {

            return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

        }

    }

   /* indexOf polyfill by(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
    *
    * Production steps of ECMA-262, Edition 5, 15.4.4.14
    * Reference: http://es5.github.io/#x15.4.4.14
    * */
    if ( ! Array.prototype.indexOf) {

        Array.prototype.indexOf = function(searchElement, fromIndex) {

        var k;

        // 1. Let O be the result of calling ToObject passing the this value as the argument.
        if (this == null) {

          throw new TypeError('"this" is null or not defined');

        }

        var O = Object(this);

       /* 2. Let lenValue be the result of calling the Get internal method of O with the argument "length".
        * 3. Let len be ToUint32(lenValue).
        * */
        var len = O.length >>> 0;

        // 4. If len is 0, return -1.
        if (len === 0) {

            return -1;

        }

        // 5. If argument fromIndex was passed let n be ToInteger(fromIndex); else let n be 0.
        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {

            n = 0;

        }

        // 6. If n >= len, return -1.
        if (n >= len) {

            return -1;

        }

       /* 7. If n >= 0, then Let k be n.
        * 8. Else, n<0, Let k be len - abs(n).
        *    If k is less than 0, then let k be 0.
        * */  
        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        // 9. Repeat, while k < len
        while (k < len) {

           /* a. Let Pk be ToString(k).
            *    This is implicit for LHS operands of the in operator
            * b. Let kPresent be the result of calling the HasProperty internal method of O with argument Pk.
            *    This step can be combined with c
            * c. If kPresent is true, then
            *
            *      i.  Let elementK be the result of calling the Get
            *          internal method of O with the argument ToString(k).
            *     ii.  Let same be the result of applying the
            *          Strict Equality Comparison Algorithm to
            *          searchElement and elementK.
            *    iii.  If same is true, return k.
            * */
            if (k in O && O[k] === searchElement) {

                return k;

            }

            k++;

        }

        return -1;

      };

    }

    var colorSchemes = {

        summer: { // White background, Summer

            'background-color': '#f5f7fa',

            'data-rest': '#586e75',
            'data-string': '#2aa198',
            'data-keyword-fc': '#cb4b16',
            'data-keyword-sc': '#859900',
            'data-keyword-tc': '#dc322f',
            'data-comment': '#586e75',
            'data-markup': '#268bd2',
            'data-attribute': '#b58900',
            'data-selector': '#cb4b16',
            'data-variable': '#b58900',
            'data-function': '#268bd2',
            'data-number': '#2aa198',
            'data-rule': '#268bd2',
            'data-hex': '#2aa198',
            'data-unit': '#cb4b16',
            'data-named-value': '#b58900',
            'data-import': '#268bd2',
            'data-doctype': '#586e75'

        },

        elda: { // Black background, Elda(https://github.com/lxmzhv/vim), color scheme by https://github.com/lxmzhv

            'background-color': '#171717',

            'data-rest': '#b6b6b6',
            'data-string': '#02916a',
            'data-keyword-fc': '#00c26f',
            'data-keyword-sc': '#00c26f',
            'data-keyword-tc': '#02916a',
            'data-comment': '#b6b6b6',
            'data-markup': '#0096ff',
            'data-attribute': '#00c26f',
            'data-selector': '#00bfe5',
            'data-variable': '#00bfe5',
            'data-function': '#0096ff',
            'data-number': '#00c26f',
            'data-rule': '#0096ff',
            'data-hex': '#00bfe5',
            'data-unit': '#02916a',
            'data-named-value': '#02916a',
            'data-import': '#0096ff',
            'data-doctype': '#b6b6b6'

        },

        spacegrey: { // Black background, Spacegrey(https://github.com/ajh17/Spacegray.vim), color scheme by https://github.com/ajh17

            'background-color': '#101112',

            'data-rest': '#515F6A',
            'data-string': '#588ba4',
            'data-keyword-fc': '#A57A9E',
            'data-keyword-sc': '#00a4be',
            'data-keyword-tc': '#C5735E',
            'data-comment': '#515F6A',
            'data-markup': '#7D8FA3',
            'data-attribute': '#85A7A5',
            'data-selector': '#A57A9E',
            'data-variable': '#8081b8',
            'data-function': '#45a989',
            'data-number': '#00a4be',
            'data-rule': '#8081b8',
            'data-hex': '#45a989',
            'data-unit': '#85A7A5',
            'data-named-value': '#7D8FA3',
            'data-import': '#45a989',
            'data-doctype': '#405d6a'

        },

        sweater: { // White background, Sweater(https://github.com/nice/sweater), color scheme by https://github.com/nice

            'background-color': '#f8f1e9',

            'data-rest': '#044C29',
            'data-string': '#3f5238',
            'data-keyword-fc': '#b72231',
            'data-keyword-sc': '#6470a3',
            'data-keyword-tc': '#ba1925',
            'data-comment': '#DBA69D',
            'data-markup': '#f92672',
            'data-attribute': '#258bd3',
            'data-selector': '#f92672',
            'data-variable': '#8B56BF',
            'data-function': '#f92672',
            'data-number': '#3b3f58',
            'data-rule': '#8B56BF',
            'data-hex': '#b72231',
            'data-unit': '#3f5238',
            'data-named-value': '#f92672',
            'data-import': '#8B56BF',
            'data-doctype': '#044C29'

        },

        pyte: { // White background, Pyte(http://www.vim.org/scripts/script.php?script_id=1492), color scheme by http://www.vim.org/account/profile.php?user_id=8893

            'background-color': '#f0f0f0',

            'data-rest': '#404850',
            'data-string': '#4c8f2f',
            'data-keyword-fc': '#007020',
            'data-keyword-sc': '#e5a00d',
            'data-keyword-tc': '#d0b0b0',
            'data-comment': '#a8b6c4',
            'data-markup': '#007020',
            'data-attribute': '#4070a0',
            'data-selector': '#5b3674',
            'data-variable': '#5b3674',
            'data-function': '#4070a0',
            'data-number': '#007020',
            'data-rule': '#4070a0',
            'data-hex': '#4c8f2f',
            'data-unit': '#40a070',
            'data-named-value': '#5b3674',
            'data-import': '#4070a0',
            'data-doctype': '#404850'

        }

    };

    var utils = {

        addListener: null,
        
        removeListener: null,

        isNative: function(checkMe) {

            return valuables.nativePattern.test(checkMe);

        },

        shortArray: function(arrayToShort) {

            arrayToShort.sort(function(a, b) {

                return b.length - a.length; // ASC -> a - b; DESC -> b - a

            });

        },

        addCSSRule: function(sheet, selector, rules, index) {

            if('insertRule' in sheet) { // IE >= 9

                sheet.insertRule(selector + "{" + rules + "}", index);

            } else if('addRule' in sheet) { // IE < 9

                sheet.addRule(selector, rules, index);

            }

        },

        hasClass: function(element, classToCheck) {

            var patt = new RegExp('(\\s|^)'+ classToCheck +'(\\s|$)');

            return patt.test(element.className);

        },

        getSheet: function() {
        
            // Create the style tag.
            var style = document.createElement("style");

           /* Add a media (and/or media query) here if you'd like!
            * style.setAttribute("media", "screen")
            * style.setAttribute("media", "only screen and (max-width : 1024px)")
            * */

            // WebKit hack.
            if(style['sheet']) { // If it's not IE8 or below.

                style.appendChild(document.createTextNode(""));
            
            }

           /* Append the style element to the head element.
            *
            * I wanted to use document.head but document.head is only supported by IE >= 9
            * */
            document.getElementsByTagName('head')[0].appendChild(style);

            // style.styleSheet is for IE < 9
            return style['sheet'] ? style.sheet : style.styleSheet;

        }

    };

    var valuables = {

        nativePattern: /^[^{]+\{\s*\[native \w/,

        codeClass: 'code-highlighter',

        validSyntaxes: ['php', 'javascript', 'markup', 'stylesheet', '*'],

        // Color schemes names that their styles was already inserted into the page.
        insertedColorSchemes: {},

        dataPatt: /^data\-/,

        // Single initiation is required.
        sheet: utils.getSheet(),

        /* withMeaning is used to change specific Keywords pattern, for example, the or php operator
         * must have spaces before and after(' or '), each change is explained.
         * */
        withMeaning: {

           /* Both below javascriptKeywords and phpKeywords can be deleted, and actualy when empty even
            * a performance downer because for(outerKey in valuables.withMeaning), even if the object is empty, there
            * will still iterations(performance downer), I mean that for each valuables.withMeaning key that have a matching Keywords(object)
            * key there will be iterations over each of the Keywords(object) key categories, for example if only javascriptKeywords
            * was present and empty, even empty there will be 2 unnecessary iterations.
            *
            * Rules appear in all the javascript/php/multi keywords either deny formation or restrict formation.
            * 
            * To understand it, the class rule from the multi keywords add a restriction that determine that there must be a space
            * after the class keyword.
            *
            * The function keyword from multi keywords was originaly placed at phpKeywords object
            * and added a deny formation where after the function keyword there must be __
            * if posible always try restrict formation because with deny formation you may deny formation
            * for a single syntax, after I replaced the function keyword from deny to restrict I was able to move it from
            * the phpKeywords object to the multiMeaning object.
            *
            * IMPORTANT NOTICE:
            * There are restrictions that restrict VALID format, for example 'return': /return(\s|\;)/ inside
            * multiMeaning, return'string' is a valid combination, yet if I remove it I tend to think
            * that there will be more chance to "run into" a none keyword(comments, strings, etc) 'return'
            * than "run into" a none formatted code return'string', below when I describe the fix patterns
            * I say things like can't be, etc, some things are code doable be but what I really mean is that
            * the wrong syntax can't be highlighter.
            *
            * The system is helping you behind the scenes with writing the below regexp, the problem is that
            * the getKeywords system require '(\\=\\s)array' to become '(?:\\=\\s)(array)', the fixFixer
            * function fixes your patterns that should fix the keyword matching, so now instead of writing
            * '(?:\\=\\s)(array)' manually you write '(\\=\\s)array' and fixFixer will convert it into
            * '(?:\\=\\s)(array)' for getKeywords system.
            *
            * IE 8 have a problem with object keys that are javascript special keywords like(in or function) so
            * I must wrap the keys with single quotation marks('key').
            * */
            javascriptKeywords: {

                'array': /\sarray/, // There must be space because there is new before the array keyword.
                'in': /\sin\s/,
                'let': /let\s/,
                'default': /(\;|\s)default(\s*\:|\s)/, // The 1st(at the end) alternative is for default inside switch, the 2st(at the end) alternative is for ecmascript 6 module system
                'from': /\sfrom\s/ // For ECMAScript 6 module system { $ as jQuery } from 'jquery', can't be }from'
            
            },

            phpKeywords: {
                
                'implements': /\simplements\s/, // Must be something like: class Template implements iTemplate
                'or': /\sor\s/, // Can't be called: trueorfalse, must be true or false
                'array': /(\=\s?)array/, // There may be space but there must be = sign.
                'clone': /(\=\s?)clone/, // There may be space but there must be = sign.
                'echo': /echo\s/,
                'default': /(\;|\s)default\s*\:/,
                'and': /\sand\s/
            
            },

            // The rules in here must be legitimate for all supported programming languages.
            multiMeaning: {

                'function': /function(\s|\()/, // For anonymous functions and named functions.
                'class': /class\s/, // There must be space before the class name
                'if': /if\s*\(/,
                'for': /for\s*\(/,
                'case': /case\s/,
                'var': /var\s/, // Depricated by php.
                'return': /return(\s|\;)/,
                'do': /do\s*\{/,
                'as': /\sas\s/ // Can't be called $arrayas$key must be $array as $key, for ECMAScript 6 module system $ as jQuery, can't be $asjQuery
            
            }

        }

    };

    if(typeof window.addEventListener === 'function') {
        
        utils.addListener = function (el, type, fn) {
        
            el.addEventListener(type, fn, false);
        
        };
        
        utils.removeListener = function (el, type, fn) {
        
            el.removeEventListener(type, fn, false);
        
        };

    } else if(typeof document.attachEvent === 'function') { // IE
        
        utils.addListener = function (el, type, fn) {
        
            el.attachEvent('on' + type, fn);
        
        };
        
        utils.removeListener = function (el, type, fn) {
        
            el.detachEvent('on' + type, fn);
        
        };

    } else { // Older browsers

        utils.addListener = function (el, type, fn) {
        
            el['on' + type] = fn;
        
        };
        
        utils.removeListener = function (el, type, fn) {
        
            el['on' + type] = null;
        
        };

    }

    utils.addCSSRule(valuables.sheet, '.' + valuables.codeClass,

       /* The code element is an inline level element, the background color is applied valuables.codeClass
        * and since this element is the code element(inline level) I must set it to block level element
        * so the full block will get the background color and not only code lines(span elements within
        * this code element).
        * */
        'display: block;' +

        // The following rules used to prevent padding affecting the width, won't work with IE < 8
       '-webkit-box-sizing: border-box;' + // Safari/Chrome, other WebKit
       '-moz-box-sizing: border-box;' + // Firefox, other Gecko
       'box-sizing: border-box;' + // Opera/IE 8+

        // If the user define fixed height for the code element, I don't need overflow-x because the text will break.
        'overflow-y: auto;' +

        // To ensure pre formatted text will breaks when line breaks.
        'word-wrap: break-word;' + // Internet Explorer 5.5+
        'overflow-wrap: break-word;' // Supported by stable builds of Google and Opera, check out https://developer.mozilla.org/en-US/docs/Web/CSS/word-wrap for more information

        );

   /* Different keywords are separated just because it looks better.
    * There are 3 categories:
    * 1. First category, mostly internal words.
    * 2. Second category, creators like class, final, for.
    * 3. Third category, php predefined constants.
    *
    * I decided to put the keywords variable as local to this function because they won't change between pre tags.
    * */
    var Keywords = {

        javascriptKeywords: {

            // Javascript Keywords.
            FC: ['from', 'arguments', 'boolean', 'break', 'byte', 'case', 'char', 'const', 'continue', 'debugger', 'default', 'delete', 'double', 'enum', 'eval', 'extends', 'false', 'finally', 'float', 'goto', 'implements', 'instanceof', 'int', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'typeof', 'void', 'volatile', 'with', 'yield'],

            // Javascript Keywords.
            SC: ['as', 'class', 'catch', 'abstract', 'do', 'else', 'final', 'for', 'function', 'if', 'in', 'interface', 'let', 'var', 'switch', 'try', 'while'],

           /* According to TC39, ECMAScript 6 modules, the final syntax uses the following keywords:
            * export, import, from, as, default
            *
            * There are many syntax combination for them and I was the syntaxes to appear with as many colors
            * as I can, 'default' already in FC, 'as' was added to SC, 'from' keyword will go with(syntax manner)
            * 'import' while 'default' will go with 'export' so it's safe to drop 'from' at FC, finally
            * 'export' and 'import' getting their own colors.
            * */
            TC: ['export', 'import']

        },

        phpKeywords: {

            // Php keywords.
            FC: ['__halt_compiler', 'and', 'array', 'as', 'break', 'callable', 'case', 'clone', 'const', 'continue', 'declare', 'default', 'die', 'echo', 'empty', 'enddeclare', 'endfor', 'endforeach', 'endif', 'endswitch', 'endwhile', 'eval', 'exit', 'extends', 'global', 'goto', 'include', 'include_once', 'instanceof', 'insteadof', 'interface', 'isset', 'list', 'namespace', 'new', 'or', 'print', 'private', 'protected', 'public', 'require', 'require_once', 'return', 'static', 'unset', 'use', 'xor', 'var_dump'],
            
            // Php keywords.
            SC: ['implements', 'abstract', 'catch', 'class', 'do', 'else', 'elseif', 'final', 'for', 'foreach', 'function', 'var', 'while', 'throw', 'try', 'trait', 'switch', 'if'],

            // PHP predefined constants.
            TC: ['__CLASS__', '__DIR__', '__FILE__', '__FUNCTION__', '__LINE__', '__METHOD__', '__NAMESPACE__', '__TRAIT__']
            
        }

    }

   /* Support for ECMAScript 5.1 and ECMAScript 6 / Unicode v7.0.0
    *
    * Explanation about the following pattern, the reason for using it and more can be found at: https://mothereff.in/js-variables
    *
    * The pattern was generated from: https://mathiasbynens.be/demo/javascript-identifier-regex
    *
    * There is a small different between the pattern for 5.1 and 6, 5.1 support \u2E2F and 6 not so
    * I'v used the 5.1 pattern to support both.
    *
    * I'v changed the pattern to suit my needs:
    *   - A-Z was replaced by i flag
    *   - 0-9 was replaced replaced by \d
    *   - \ was added before _
    *   - ^ and $ was removed because g flag is used
    *   - The (?!keyword|keyword) was removed because keywords will be already wrapped(won't appear inside fullRest parameter)
    *
    * I decided to insert the pattern into a variable here(globally) because it used by few functions.
    * */
    var javascriptIdentifierRegex = /(?:[\$\_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])(?:[\$\d\_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]*)/gi;
    
    var units = ['em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc'];

   /* I'm not really have to sort this array but just in case a future update will have for example 'pxer', that will
    * cause the 'px' unit if it comes befor the 'pxer' unit to 'steal' the characters 'px' from 'pxer' and hence
    * the 'pxer' will never be found.
    * */
    utils.shortArray(units);

    function init() {

        utils.removeListener(window, 'load', init);
        
       /* The reason for not combining the following iterations with one of the below iterations is because
        * the below iterations depends on the existence valuables.withMeaning objects(keys that contains objects,
        * javascriptKeywords, etc). 
        * */
        for(var outerKey in Keywords) {

           /* The reason to define categories is so the blow iterations systems won't have to redefine it.
            * If I won't define it each of the systems won't know if categories was defined because the
            * system phase where categories is defined is depends upon whether valuables.withMeaning
            * got key(specific ones(multiMeaning) or just iterate it there are any
            * keys at all(valuables.withMeaning)) or not.
            * */
            var categories = Keywords[outerKey];

            for(var innerKey in categories) {

                /* I must sort the array because for example if replace will iterate over this array: 
                 * ['var', 'var_dump'] and the code contains 'var_dump', but first as you can see
                 * replace will match 'var' to 'var'_dump and result with <span>var</span>_dump
                 * */
                utils.shortArray(categories[innerKey]);

            }

        }

       /* I know that the below(below this iteration there is another iteration system) iterations is very
        * simular to the following iterations but the required categories variable that is needed
        * for the following:
        *
        * var index = categories[innerKey].indexOf(multiMeaningInnerKey);
        *
        * Only set after the if(Keywords[outerKey]) from the below iterations, 
        * and the required innerKey(from the above var index) is only set after
        * the for(innerKey in categories) from the below iterations
        * that inside the if(Keywords[outerKey]) statement(again from the below iterations),
        * that means that for each of the valuables.withMeaning objects
        * the operation of the multiMeaning that should happen once, actualy happends as following:
        *
        * If the valuables.withMeaning contain javascriptKeywords only it will run over its categories and for now
        * there are only 2 categories, if valuables.withMeaning also have phpKeywords, phpKeywords have
        * 3 categories, so the for(multiMeaningInnerKey in valuables.withMeaning.multiMeaning) will run 3 times,
        * and for case where both javascriptKeywords and phpKeywords exists it will run 5 times and that
        * is unnecessary and performance downer.
        *
        * The following iteration system must appear before the below iterations system to allow each
        * javascript/php keywords to override the "common to all" multiMeaning.
        *
        * The reason for not redefine outerKey, innerKey and categories is that above iterations
        * system(sort) already define them and the sort iterations system will run all
        * the time(not depending for example on valuables.withMeaning objects),
        * and therefore I don't see a reason to redefine them.
        * */
        if(valuables.withMeaning.multiMeaning) { // First check if there is multiMeaning key.

            for(var multiMeaningInnerKey in valuables.withMeaning.multiMeaning) {

                for(outerKey in Keywords) {

                    categories = Keywords[outerKey];

                    for(innerKey in categories) {

                        var index = categories[innerKey].indexOf(multiMeaningInnerKey);

                        if(index > -1) {

                            categories[innerKey][index] = fixFixer(valuables.withMeaning.multiMeaning[multiMeaningInnerKey], categories[innerKey][index]);

                        }

                    }

                }

            }

        }

        // I don't need to redefine outerKey, innerKey and categories, reason is explained at above iterations system.
        for(outerKey in valuables.withMeaning) { // Iterate each valuables.withMeaning objects.

            // Are there Keywords objects(javascriptKeywords, phpKeywords, etc) that matches this meaning key?
            if(Keywords[outerKey]) {

                categories = Keywords[outerKey]; // Give me the categories.

                 for(innerKey in categories) { // Iterate over categories.

                     for(var meaningInnerKey in valuables.withMeaning[outerKey]) {

                        var index = categories[innerKey].indexOf(meaningInnerKey);

                        if(index > -1) {

                            categories[innerKey][index] = fixFixer(valuables.withMeaning[outerKey][meaningInnerKey], categories[innerKey][index]);

                        }

                    }

                }

            }

        }

        var textAreaElements = document.getElementsByTagName('textarea'),
            i = textAreaElements.length;

        while(i--) {

            if(utils.hasClass(textAreaElements[i], valuables.codeClass)) {

                var colorScheme = (function() {

                    var defaultColorScheme = null,

                        colorSchemeAttribute = textAreaElements[i].getAttribute('data-color-scheme'),
                        validScheme = false,
                        // I'm using j because textAreaElements[i] using i.
                        j = 0;

                    for(var schemeKey in colorSchemes) {

                        if(j === 0) { // First iteration to fetch first color scheme.

                            defaultColorScheme = colorSchemes[schemeKey];

                            if( ! colorSchemeAttribute) {

                                // The default color scheme is considered a valid color scheme.
                                validScheme = true;

                                consoleLog('No data-color-scheme attribute, default color scheme was chosen.');

                                break;

                            }

                        }

                       /* Trim is used if the user defined data-color-scheme=" schName", the space should be trimed.
                        * toLowerCase is used because the object keys are case sensitive and the user may define data-color-scheme="Schemename"
                        * */
                        if(colorSchemeAttribute.trim().toLowerCase() === schemeKey) {

                            validScheme = true;

                            defaultColorScheme = colorSchemes[schemeKey];

                            break;

                        }

                        j++;

                    }

                    // defaultColorScheme can be the default(the first color scheme inside the colorSchemes object) or overridden default(user choice).
                    return [schemeKey, defaultColorScheme, validScheme];

                })();

                var syntaxAttribute = textAreaElements[i].getAttribute('data-syntax') || '*',
                    urlAttribute = textAreaElements[i].getAttribute('data-url'),
                    syntax = null;

                for(var syntaxKey in valuables.validSyntaxes) {

                    var currentSyntax = valuables.validSyntaxes[syntaxKey];

                    // Trim is used if the user defined data-syntax=" javascript", the space should be trimed.
                    if(syntaxAttribute.trim() === currentSyntax) {

                        syntax = currentSyntax;

                        break;
                    }

                }

                if(syntax) {

                    if(colorScheme[2]) {

                       /* This if statement is used to prevent multiple elements with the same scheme to add the same
                        * color scheme over and over into the style element at the head element.
                        *
                        * The idea is similar to use array and each time push and new element and then check with some
                        * inArray(in the sence of javascript) function, I decided to do something that is a big more
                        * easy and doesn't require the need to include my own implementation of inArray, the idea is
                        * to keep an object where this object keys are the scheme(that already included) names and
                        * the values are always true, and when I check for valuables.insertedColorSchemes[colorScheme[0]]
                        * and if the scheme is already included in the page, the scheme won't be reloaded(styles will be
                        * included again), if there isn't a key or there is but the value is not true I will load the styles,
                        * keep in mind that all values should be true, I only care about the key existence, hence when the value
                        * is true then this value key should be a color scheme name.
                        * */
                        if( ! valuables.insertedColorSchemes[colorScheme[0]]) {

                            valuables.insertedColorSchemes[colorScheme[0]] = true;

                            // colorScheme[1] is the color scheme object.
                            for(var ruleName in colorScheme[1]) {

                               /* The pattern is use to check if the ruleName starts with data-
                                * the idea is not having to check for specific rules, for example:
                                * ruleName === 'background-color', what if I decide to add another
                                * rule, well I will have to remember to add the rule here, hence I decided
                                * to check with a pattern, I know there is a small chance to have a "permanent" rule
                                * that starts with data-, it's should be rare because the "permanent" rules should
                                * be minimal and what are the chances that those minimal rules will also contain rule
                                * that starts with data-
                                * */
                                if( ! valuables.dataPatt.test(ruleName)) {

                                    // colorScheme[0] is the color scheme name, colorScheme[1] is the color scheme object.
                                    utils.addCSSRule(valuables.sheet,
                                        // Selector, for example: .codeClass.schemeName
                                        '.' + valuables.codeClass + '.' + colorScheme[0],
                                        ruleName + ':' + colorScheme[1][ruleName]); // Rule

                                } else {

                                    // colorScheme[0] is the color scheme name, colorScheme[1] is the color scheme object.
                                    utils.addCSSRule(valuables.sheet,
                                        // Selector, for example: .codeClass.schemeName [data-rest]
                                        '.' + valuables.codeClass + '.' + colorScheme[0] + ' ' + '[' + ruleName + ']',
                                        'color' + ':' + colorScheme[1][ruleName]);
                                    
                                }

                            }

                        }

                      /* Before I replace the element I must to "save" the content, if I won't save it and the content
                       * will be wrapped by the new element(not textarea) there may be problem because I must avoid any kind of markup
                       * as described by formatContent function.
                       * */
                        var savedContent = textAreaElements[i].innerHTML,
                            savedId = textAreaElements[i].getAttribute('id'),
                            newPreElement = document.createElement('pre'),
                            newCodeElement = newPreElement.appendChild(document.createElement('code')),
                            preStyleAttribute = newPreElement.getAttribute('style') ? newPreElement.getAttribute('style') : '';

                       /* I reset the margin for each pre element, the reason is that I don't want the user
                        * to interact with anything other than valuables.codeClass, and valuables.codeClass is applied
                        * to the code element but there is a default margin applied to the pre element, and that is why
                        * I reset it.
                        * */
                        newPreElement.setAttribute('style', preStyleAttribute.length > 0 ? preStyleAttribute + ';margin: 0;' : 'margin: 0;');

                        // colorScheme[0] is the color scheme name, must appear before the element replacement.
                        newCodeElement.className = textAreaElements[i].className + ' ' + colorScheme[0];

                        // I also want to save any id attribute the user may or may not given to the textarea element.
                        if(savedId && savedId.length > 0) {

                            newCodeElement.setAttribute('id', savedId);

                        }

                        textAreaElements[i].parentNode.replaceChild(newPreElement, textAreaElements[i]);
                        
                        if(urlAttribute) {

                            // Gets content, the callback function will use formatContent to format it and then innerHTML it.
                            getByAjax(urlAttribute, newCodeElement, syntax, function(responseText, syntax, element, xhr) {

                                element.innerHTML = formatContent(responseText, syntax, urlAttribute);

                            }, function(element) {

                                element.innerHTML = '<span data-rest>Loading content...</span>';

                            });

                        } else {

                           /* For cases where there is no data-url, it means that the code is already inside the
                            * element(at least I hope so, but that is what I assumed by defaults).
                            *
                            * Also for those kind of cases I pass null instead of urlAttribute, the responsibility for
                            * taking care whether the urlAttribute is null or not is upon the functions that needs it.
                            * */
                            newCodeElement.innerHTML = formatContent(savedContent, syntax, null);

                        }

                    } else {

                        consoleLog('Invalid color scheme, check data-color-scheme attribute.', true)

                    }

                } else {

                    consoleLog('Invalid syntax, check data-syntax attribute.', true);

                }
                
            }

        }

    }

    function fixFixer(fixMePattern, keyword) {

       /* This function is used to help the user write a simpler regexp, for example the user(without this
        * system) had to write regexp like: /(function)(?:\s|\()/, the first part of this function
        * allow the user to write regexp like: /function(?:\s|\()/ and the second part allow the user
        * to write regexp like: /function(\s|\()/ instead of /function(?:\s|\()/
        *
        * This pattern is used to automatically add ?: inside fix sub patterns, for example the user
        * had to write /function(?:\s|\()/ but now the user can write /function(\s|\()/, as
        * you can see there is no need for ?:, also for special cases as above, the regexp will ignore
        * the internal \( it won't do something like: \(?: it will only add it to a valid sub pattern.
        *
        * There is a small problem with this regexp, if for example I have /(\=\s?)array/ the regexp will fail
        * to match the '(' at the begining of the regexp because its requires at least 1 character that is not
        * backslash(\) and then it would be able to find any opening parenthesis((), so I fixed it with a
        * small trick, I prepend a space(could have used any character) before the pattern and then remove it.
        *
        * Important note about the use of fixMePattern.source, the .source used to retrive the internal content of the
        * pattern for example from: /somePattern/ to retrive somePattern, also the type after using .source is string
        * rather then object, also the .source removes the slashes that wraps the pattern.
        * 
        * The reason why I want only the internal content of the pattern is that when using .join('|') to concat all
        * keywords patterns I don't want: keyword|/keyword/|keyword, the slashes CAN'T be there.
        * */
        fixMePattern = ' ' + fixMePattern.source;

        fixMePattern = fixMePattern.replace(/(\\*?)\(/g, function(match, subPattern) {

            // The subPattern for cases where there are no backslashes will be empty string, so I need to check the length.
            if(subPattern.length > 0) {

               /* This is the tricky part, if the number of backslashes is even we understand that each
                * backslashe escape the backslashe after him, hence no backslashe escapes the (
                *
                * If the number is odd, we understand that 1 backslash was left to escape the ( and
                * hence we ignore this match.
                * */
                if(subPattern.length % 2 === 0) {

                    return subPattern + '(' + '?:';

                } else { // Odd number of backslashes.

                    return match;

                }
                
            } else {

                return match + '?:';

            }

        });

        // Now remove the space, otherwise for example ' (class)\s' won't match 'class'(no space).
        fixMePattern = fixMePattern.slice(1);
      

       /* I get the before and after pattern parts and replace something like: 'function(\\s|\\()'
        * to something like '(function)(\\s|\\()'
        *
        * This part of the function must appear after the above replace, the reason is so I won't get
        * keywords wraped with (?:keyword) because if this part will operate first it
        * will add () around the keyword and then the second part will add ?: so we end up with (?:keyword)
        * */
        var index = fixMePattern.indexOf(keyword),

            before = fixMePattern.slice(0, index),

            after = fixMePattern.slice(index + keyword.length);

        fixMePattern = before + '(' + keyword + ')' + after;

        return fixMePattern;

    }

    function consoleLog(msg, isError) {

        if(window.console && ! isError) {

            console.log(valuables.codeClass + ': ' + msg);

        } else {

            throw (valuables.codeClass + ': ' + msg)

        }

    }

    // IE 5.5+, Firefox, Opera, Chrome, Safari XHR object
    function getByAjax(url, element, syntax, callbackSuccess, callbackUntilSuccess) {

        try {

            var xhr = new (XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');

                xhr.open('GET', url, 1);

                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

                xhr.onreadystatechange = function () {

                    if(xhr.readyState > 3 && callbackSuccess) {

                        if(xhr.status === 200) {

                            callbackSuccess(xhr.responseText, syntax, element, xhr);
                        
                        } else {

                            consoleLog('Loading: ' + url + ' failed with status: ' + xhr.status, true);

                        }

                    } else {

                        callbackUntilSuccess(element);

                    }

                };

                xhr.send();

        } catch (e) {
        
            consoleLog(e, true);
        
        }

    };

    function tinyInBetween(value, callback) {

       /* The patterns within the functions(that calls union) that is used to detemine the value parameter here using
        * like [\s\S]+ or [\s\S]* so spaces can be captured, for example getMarkups function can send
        * '' for elements with no attributes at all(<p> for example) or with just empty spaces like ' ' from <p >.
        *
        * Another example is where the getRules may send us: ' ' for background: ;
        * */
        if(value.trim().length === 0) {

            return value;
        
        }

       /* The following system is very similar to inBetweenAllSteps function and well explained there.
        * 
        * This system is used with multiple callback functions(getAttributes, getRuleValue, etc).
        *
        * I'm using subPattern.trim() before I call the callback(getAttributes) in both before and inBetween
        * phases because there may be cases where elements appears like: <header ' '"">(before phase) or
        * <header ""' '"">(inBetween phase) or just <header >(noSpan remain false) captured
        * spaces for both above cases denoted by single quotes '', what will happen is
        * that for example <header ""> will become <header  <span>""</span>> the spaces will be captured
        * inside the sub pattern to determine the value parameter also the second will capture
        * hence I check for subPattern.trim().length > 0, the funny thing
        * is that the callback(getAttributes) will not wrap the spaces with span because
        * it expect at least 1 character([a-z]+) but I don't even want callback function to be called.
        *
        * I don't want to send to any callback function empty spaces I was given by any kind of
        * funtion that uses union function(getRules, getMarkups, etc).
        * */
        var noSpans = false,

            before = value.replace(/([\s\S]*?)<span/, function(match, subPattern) {

            noSpans = true;

            if(subPattern.trim().length > 0) {

                return callback(subPattern) + '<span';

            }

            return match;

        });

        var inBetween = before.replace(/<\/span>([\s\S]*?)<span/g, function(match, subPattern) {

            if(subPattern.trim().length > 0) {

                return '</span>' + callback(subPattern) + '<span';

            }

            return match;

        });

        var after = inBetween.replace(/<\/span>((?:(?!<\/span>)[\s\S])+)$/, function(match, subPattern) {

            if(subPattern.trim().length > 0) {

                return '</span>' + callback(subPattern);

             }

            return match;

        });

        return noSpans ? after : callback(after);

    }

    // The union function used to callbacks for tinyInBetween to process.
    function union(value, callbacksArray) {

        for(var key in callbacksArray) {

           /* At this comments block when I say IE7 I refer to IE7 and maybe IE6 and below.
            *
            * This is a very funny story, the use of hasOwnProperty is because in IE7 there is a problem
            * when iterating arrays, the problem is that iteration will also numerate keys
            * up to the prototype chain even reaching the Array.prototype.indexOf
            * so I don't think there is a reason for supporting IE7 but this specific bug fascinates me
            * so I decided to fix and explain it...
            *
            * If you add else statement to the if statement below you will find out in IE7 that the else
            * statement is "activated" you key is indexOf and the value(callbacksArray[key]) is undefined,
            * the undefined I just a mask to disguise the actual function(the IE8 polyfill I added), I don't
            * know why IE7 disguise the function, but if you call(callbacksArray[key]()) this seemingly
            * undefined, you will see that you actually calling the function(actually the polyfill).
            *
            * At my specific case I call the polyfill when the context(the this keyword) is the window object,
            * the window object unlike literal object have length propery but it equals to 0, if you checkout
            * the polyfill you will find out that -1 is returned when the length of this(keyword) is 0
            *
            * Speaking of IE7, the pre element in IE7 will not preserve spaces(so the code structure 
            * is destroyed), only when I apply this rule specifically to the element that contains the
            * code(the <code> element), only then IE7 will preserve the spaces, by default the pre
            * wrap the code element and hence the code element inherit by default white-space: pre;
            * adding the white-space: pre; to the valuables.codeClass solves the problem when I tested
            * with IE11 Document mode 7, but when I tested with chrome IETab.net(also choose IE7) I found
            * out that the problem wasn't solved at all.
            *
            * And there is another problem with IE7, I'm using span's with data-string, data-number and so on
            * but what about data-keyword-fc or data-keyword-sc?, the css selectors data-keyword-fc or
            * data-keyword-sc are invalid all because the characters length after the second - is 2, for
            * example if I was using data-keyword-fcb/data-keyword-scb selectors(and of couse I would
            * change the element attributes to match those selectors) IE7 will not parse them as invalid selectors.
            * */
            if(callbacksArray.hasOwnProperty(key)) {

                value = tinyInBetween(value, callbacksArray[key]);

            }

        }

        return value;

    }

    function getHex(value) {

        return value.replace(/\#[a-z\d]{3,6}/gi, function(match) {

            return '<span data-hex>' + match + '</span>'

        });

    }

    function getUnits(value) {

        var joinedUnits = units.join('|');

        return value.replace(new RegExp('((' + joinedUnits + ')\\s+|(' + joinedUnits + ')$)', 'gi'), function(match) {

            return '<span data-unit>' + match + '</span>'

        });

    }

   // If for example there is a rule: font-family: 'Oswald', sans-serif; then it will wrap the sans-serif and not the ,
    function getNamedValues(value) {

        return value.replace(/[a-z]+(\-[a-z]+)?/ig, function(match) {

            return '<span data-named-value>' + match + '</span>';
            
        });

    }

    function getRules(rules) {

        return rules.replace(/([^\{\}]+?)\:([^\{]+?)\;/gi, function(match, rule, ruleValue) {

            var returnedRule =  '<span data-rule>' + rule + '</span>' + ':';

               /* Notice the the default for getStrings is 'General'.
                *
                * The order of the callbacksArray is important, why?, it is well explained inside getMarkups function.
                *
                * The getNumbers MUST appear last for any case where numbers appear inside getHex, getStrings, getUnits
                * or maybe getNamedValues.
                * */
                var callbacksArray = [getStrings, getHex, getUnits, getNamedValues, getNumbers];

                return (returnedRule + union(ruleValue, callbacksArray) + ';');

        });

    }

    function getSelectors(value) {

       /* The value parameter may contain unwanted characters like: ; , }  { : and spaces, I want
        * to filter out the selector or selector parts for example when the selector is: p:after the p and the after
        * will be wrapped but not the : and hence the following pattern.
        * */
        return value.replace(/[^\;\{\}\,\:\s]+/gi, function(match) {

            return '<span data-selector>' + match + '</span>';

        });

    }

    function getAttributes(attributes) {

        return attributes.replace(/[a-z]+(\-[a-z]+)*/gi, function(match) {

            return '<span data-attribute>' + match + '</span>';

        });

    }

    function getMarkups(fullRest, type) {

        if(type === 'O') { // Opening tags

            return fullRest.replace(/\&lt\;(\s*[a-z\d]+(?:\-[a-z\d]+)*?)(\s[\s\S]*?)?\&gt\;/gi, function(match, tagName, attributes) {

               /* The order of the callbacksArray is important, the reason is the callbacks regexp patterns.
                *
                * The idea is to separate concerns from each callback regex pattern,
                * each pattern within each callback is meant to take care a small piece of information, smaller the piece
                * better treatment the string gets.
                *
                * So the idea is that either the pattern take care of specific undeniable piece(such a strings) or
                * the pattern take care of a deniable strings that can appear for example within strings 'deniable string'
                * which result with: '<span>deniable string</span>' now the span's destroy any chance for
                * the string pattern to catch the string when the string pattern phase is arrived.
                *
                * In case you decided to add some new phases you should always think what phase(callback pattern) used
                * to extract deniable piece and what phase(callback pattern) is used to extract undeniable piece, the
                * undeniable callbacks patterns will NEVER OVERLAP EACH OTHER hence you MUST use them first and you may
                * change they order within the callbacksArray, BUT for deniable pieces you should think:
                *
                * 1. What pieces do I get after the undeniable callbacks executions?.
                * 2. Unlike undeniable callbacks, deniable callbacks must keep a specific order within the callbacksArray.
                *
                * Why they can't change their order like undeniable callbacks?, it's because as I have mentioned
                * undeniable callbacks patterns will NEVER OVERLAP EACH OTHER, but deniable callbacks patterns MAY OVERLAP.
                *
                * 3. With the above explanation you should think what piece I get from the last callback and adjust your pattern
                * to suit the specific LEFT OVER pieces from the last callback.
                *
                * Notice the the default for getStrings is 'General'.
                *
                * The attributes parameter may be undefined so when its not I will apply the union function else an empty string.
                * */
                var callbacksArray = [getStrings, getAttributes];

                attributes = attributes ? union(attributes, callbacksArray) : '';

                return '&lt;<span data-markup>' + tagName + '</span>' + attributes + '&gt;';

            });

        } else { // type === C, closing tags

            return fullRest.replace(/\&lt\;\/(\s*[a-z\d]+(?:\-[a-z\d]+)*\s*)\&gt\;/gi, function(match, subPattern) {

                return '&lt;/<span data-markup>' + subPattern + '</span>&gt;';

            });

        }

    }

    function getDocType(fullRest) {

       /* I'm not using the g modifier since doctype should appear once.
        *
        * Differents doc types can be found: http://www.htmlhelp.com/tools/validator/doctype.html
        * */
        return fullRest.replace(/\&lt\;\!DOCTYPE([\s\S]*?)\&gt\;/, function(match) {

           /* I'm using * and not + in the regexp pattern, because I want to capture invalid
            * doctypes like: <!DOCTYPE>, that is not really a doctype but I want to capture it
            * anyway, to highlight it, I'm also not using \s after the DOCTYPE in the pattern, again I don't
            * care if the doctype is valid.
            *
            * I don't need to check anything because I wrap the all match with the data-doctype span, the
            * reason for that is that I belive the doctype is a single unit, hence should be wrapped like one.
            * */
            return '<span data-doctype>' + match + '</span>';

        });

    }

    function getImport(fullRest) {

       /* I wanted to use /\@import\s([\s\S]*?)\;/gi with \s after the \@import but I decided that
        * I want to capture even when the there is no really importing, for that kind of case I will just
        * put the @import inside data-import span.
        * */
        return fullRest.replace(/\@import([\s\S]*?)\;/gi, function(match, subPattern) {

           /* The pattern is using * and not +, that is why I'm using trim(), the reason for using * and
            * not + is because if I use + and I have few imports like so:
            *
            * @import;
            * @import url("bluish.css") projection, tv;
            * 
            * The + will force the regexp engine to collect a character, now if we already collected the
            * @import, we only left with the ;, but wait, the + sign force us to collect at
            * least single character, so now we are unable to match the closing ;, we
            * actually can, we will match the ; that closes the this import:
            *
            * @import url("bluish.css") projection, tv;
            *
            * So the subPattern(when using + instead of *) will collect:
            * ';
            * @import url("bluish.css") projection, tv'
            *
            * And after we understood the use of *, because we are using * we must use trim()
            * */
            if(subPattern.trim().length > 0) {

                // The order is not that much important here, only the getStrings must appear first.
                var callbacksArray = [getStrings, getNamedValues];
                
               /* The only reason I won't wrap ; with span here is because getSelectors and getRules
                * won't pick up ; signs that are outside of the curly brackets.
                * */
                return ('<span data-import>@import</span>' + union(subPattern, callbacksArray) + ';');

            } else {

                // I include the subPattern to preserve spaces.
                return '<span data-import>@import</span>' + subPattern + ';';

            }

        });

    }

    function getKeywords(fullRest, category, syntax) {

       /* I use the toUpperCase before the properties names are in upperCase because
        * the keys inside the Keywords objects are FC, SC and so on, the idea is that
        * the key names represent words, FC = First Class, SC = Second Class.
        * */
        var currentKeywords = Keywords[(syntax + 'Keywords')][category.toUpperCase()];



       /* Above the below system:
        *
        * For start I iterate the arguments and collect all the parameters before the
        * offset parameter, I filter only none undefined parameters, the result is
        * the main match and all sub patterns, there must be top 3 elements, the second key
        * will always be the main sub pattern because I used unshift.
        *
        * The reason why there are top 3 elements is because when the user write a regexp like: '(\\=\\s)array'
        * the fixFixer function will transform it into '(?:\\=\\s)(array)', because I don't capture the fix and
        * capture the keyword I will always have 3 element(the match, the main sub pattern, the keyword sub pattern)
        * notice that because I use unshift they are in reversed order(only for convenience reasons).
        *
        * */
        return fullRest.replace(new RegExp('(' + currentKeywords.join('|') + ')', 'ig'), function() {

            // This variables should be reset per replace callback execution.
            var matchAndSubPatterns = [];

            for(var key in arguments) {

                var currentValue = arguments[key];

                if(currentValue === parseInt(currentValue, 10)) { // Must be integer.

                   /* About the subPattern variable below:
                    *
                    * There should always be at least 2 elements, if there is an
                    * extra sub pattern from the fix there will be 3 elements.
                    * 
                    * In case there is extra sub pattern due to fix this variable will represent the fix sub
                    * pattern(keyword only), otherwise it will represent the main sub
                    * pattern that wraps all keywords.
                    * */
                    var subPattern = matchAndSubPatterns[0],

                        // Key 1 will always contain the main sub pattern(that wraps all keywords).
                        match = matchAndSubPatterns[1],

                        indexOfSubPattern = match.indexOf(subPattern),

                        before = match.slice(0, indexOfSubPattern),

                        after = match.slice(indexOfSubPattern + subPattern.length);

                       /* The reason for using toLowerCase() is because I used above toUpperCase(),
                        * why use toUpperCase() is explained above, the use of toLowerCase() is for consistency
                        * the css rules using lower case, the browser is not case sensitive about it, but I love
                        * consistency.
                        * */
                    return before + '<span data-keyword-' + category.toLowerCase() + '>' + subPattern + '</span>' + after;

                } else {

                    // I don't want to push undefined values, I only want the match and sub patterns.
                    if(currentValue) {

                       /* I use unshift so I can reference the match or sub pattern with
                        * matchAndSubPatterns[0] instead of matchAndSubPatterns[matchAndSubPatterns.length - 1]
                        * */
                        matchAndSubPatterns.unshift(currentValue);
                    
                    }

                }

            }

        });

    }

    function getStrings(fullRest, type) {

        if(type === 'Php') {

           /* As you notice the sub pattern (\'|"\|), the reason for the empty alternative is to support
            * both php string syntaxes, the Nowdoc starts with <<<'EOT' and the
            * Heredoc using <<<EOT, so to support both, the first option is 'EOT', second
            * option is "EOT" and the third is just EOT.
            *
            * This pattern is a combination of the Nowdoc/Heredoc pattern and the ''/"" pattern, the reason for
            * the combination is so the user won't have to keep the order between the stringsGeneral step and
            * stringsPhp steps, if there is <<<'EOT' and stringsGeneral will act first it will break the stringsPhp
            * so with that pattern I always check first for <<<'EOT', the final result is that the pattern keeps
            * the order(the alternatives order), so intead the user have to keep the steps(stringsPhp then stringsGeneral)
            * I allow the user to ignore the order.
            *
            * Support for Nowdoc and Heredoc php string syntaxes and also the single quotes('') and double quotes("")
            * */
            return fullRest.replace(/(((\&lt\;){3}((\'|\"|)([a-z\_]+\d*?)\5)([\s\S]*?)\6\;)|((\'|\")([\s\S]*?)\9))/gi, function(match) {

                return '<span data-string>' + match + '</span>';

            });

        } else { // type === 'General'

            // For general '' or "" strings
            return fullRest.replace(/(\'|\")([\s\S]*?)\1/g, function(match) {

                return '<span data-string>' + match + '</span>';

            });

        }

    }

    function getComments(fullRest, type) {

        if(type === 'Single') {

            /* Single line comments:
             *
             * Important notice I'm not using ^ to allow comments like:
             *
             * echo $key // here I echo variable
             * or
             * echo 'string' // here I echo string
             *
             * $ is used with /m to find single line comments, when the /m causes the $ to fine the end of
             * the line.
             * */
            return fullRest.replace(/\/\/[\S\s]*?$/gm, function(match) {

                return '<span data-comment>' + match + '</span>';

            });

        } else if(type === 'Block') {

            // For php, javascript block comments.
            return fullRest.replace(/\/\*[\s\S]*?\*\//g, function(match) {

                return '<span data-comment>' + match + '</span>';

            });

        } else { // type === 'Markup'

            // used for <!-- comment --> markup comments
            return fullRest.replace(/(?:\&lt\;\!\-{2})([\s\S]*?)(?:\-{2}\&gt\;)/g, function(match) {

                return '<span data-comment>' + match + '</span>';

            });

        }

    }

    function getFunctions(fullRest, type) {

        // This function will always require a specific type, there is no default, for unknown type return the fullRest as is.
        if(type === 'php') {

            return fullRest.replace(/([a-z\_\x7f-\xff][a-z\d\_\x7f-\xff]*?)(\s*?\()/gi, function(match, subPattern, rest) {

                return '<span data-function>' + subPattern + '</span>' + rest;

            });

        } else if(type === 'javascript') {

            var appendedRegExp = /(?=\s*?\()/,
                finalRegExp = new RegExp(javascriptIdentifierRegex.source + appendedRegExp.source, 'gi');

            return fullRest.replace(finalRegExp, function(match) {

               // If the user source code contain > or < they will be replaced with &gt; or &lt; hence I must rule them out.
                if(match === 'gt' || match === 'lt') {

                    return match;

                }

                return '<span data-function>' + match + '</span>';

            });

        }

        return fullRest;

    }


    function getVariables(fullRest, type) {

        // This function will always require a specific type, there is no default, for unknown type return the fullRest as is.
        if(type === 'php') {

            // This pattern is a smaller version of the pattern form the php manual: http://php.net/manual/en/language.variables.basics.php
            return fullRest.replace(/(\$|public\s+|protected\s+|private\s+|static\s+)[a-z\_\x7f-\xff][a-z\d\_\x7f-\xff]*/gi, function(match) {

                return '<span data-variable>' + match + '</span>';
            
            });

        } else if(type === 'javascript') {

            return fullRest.replace(javascriptIdentifierRegex, function(match) {

               // If the user source code contain > or < they will be replaced with &gt; or &lt; hence I must rule them out.
                if(match === 'gt' || match === 'lt') {

                    return match;

                }

                return '<span data-variable>' + match + '</span>';

            });

        }

        return fullRest;

    }

    function getNumbers(fullRest) {

       /* The pattern supports: 3, 3.3, I could replace the ? with * to support 3.3.3,
        * but I don't see any need for 2 or more floating points.
        *
        * The pattern supports: -1, +1, --1, ++1, ---1, +++1 and so on, the +'s or -'s will also be wrapped.
        * */
        return fullRest.replace(/([-+]*\d+(\.\d+)?)/g, function(match) {

            return '<span data-number>' + match + '</span>';

        });

    }

    function getInsidePhp(fullRest, url) {

        var preservedSpaces = null;

       /* Valid php opening/closing tags:
        *
        *   <?php    ?>
        *   <?       ?>
        *   <%       %>
        *   <%=      %>
        *   <?=      ?>
        * */
        return fullRest.replace(/\&lt\;(\?|\%)(\=|php\s+|\s+)([\s\S]*?)\1\&gt\;/gi, function(match, openingClosingScriptTag, optionalPhpOrEqualSign, scriptContent) {

            /* There is a small problem with the regexp above, the problem is that the regexp will match <%php %>, now
             * I have 2 options:
             *
             * 1. Return the the fullRest, I think less prefered over the next option.
             * 2. Remove the 'php' after the % and alert the user about it.
             *
             * I choose option 2, let me explain how it works:
             *
             * I first check if the openingClosingScriptTag is '%', I then check optionalPhpOrEqualSign.trim().toLowerCase() === 'php'
             * if both conditions is true it means that the user mistakenly or none mistakenly used 'php' after '%', I want to
             * auto fix it and let him know about it, I have to keep in mind that I want to preserve the spaces for example
             * I use trim() because the optionalPhpOrEqualSign may contain '=' or 'php ' or ' '(only spaces for <? ?> or <% %>)
             * so those spaces I want to preserve so I will append them to the preservedSpaces, I also want to remove the 'php' string
             * if presented of course from the 'php ', so I will replace it by '' and then append the remaining spaces to preservedSpaces.
             * I'm using toLowerCase for cases where optionalPhpOrEqualSign may be 'PHP ', I also use i flag with /php/i pattern inside
             * the if statement to replace 'PHP ' or 'php ' with ''.
             *
             * You may have noticed that not as getInsideJavascript I'm using scriptContent.length > 0 instead of using
             * scriptContent.trim().length > 0 because the (\=|php\s+|\s+) third alternative is \s+ so when there is
             * no code the scriptContent be empty ''.
             * */
            if(openingClosingScriptTag === '%' && optionalPhpOrEqualSign.trim().toLowerCase() === 'php') {

                preservedSpaces = optionalPhpOrEqualSign.replace(/php/i, '');

                // The short if statement is used for cases where there is no data-url and hence there is no url, for that kind of case I will use different formulation.
                consoleLog('Invalid php opening tag found: <%php %>, the <%php was replaced with <%, check ' + (url ? (url + ' source file') : 'the syntax')  + ', replace <%php with <% or use <?php ?>');

            }

            // Reason for using ([\s\S]*?) with * and not + is well explained at getInsideJavascript function.
            return  '&lt;' +
                    openingClosingScriptTag +
                    (preservedSpaces ? preservedSpaces : optionalPhpOrEqualSign) +
                    (scriptContent.length > 0

                    // I can pass the url parameter but I pass null instead because there is no use for the url at this specific formatContent call.
                    ? formatContent(scriptContent, 'php', null)
                    : scriptContent) +
                    openingClosingScriptTag +
                    '&gt;';

        });

    }

    function getInsideStylesheet(fullRest) {

        return fullRest.replace(/\&lt\;style(\s+[\s\S]*?)?\&gt\;([\s\S]+?)\&lt\;\/style\&gt\;/gi, function(match, attributes, stylesheetContent) {

            // The attributes parameter may be undefined, for that kind of case I set it to empty string('').
            if( ! attributes) {
                attributes = '';
            }

            return '&lt;' + 'style' + attributes + '&gt;' + formatContent(stylesheetContent, 'stylesheet', null) + '&lt;' + '/' + 'style' + '&gt;';

        });

    }

    function getInsideJavascript(fullRest) {

        var runAgain = true,
            nextContent = fullRest,
            returnedContent = '',
            typeSearch = null;

        while(runAgain) {

            // Each iteration starts with false
            runAgain = false;

            returnedContent += nextContent.replace(/([\s\S]*?)(\&lt\;script(?:\s+[\s\S]*?)?\&gt\;)([\s\S]*?)(\&lt\;\/script\&gt\;)([\s\S]*)/i, function(match, before, openScriptTag, scriptContent, closeScriptTag, rest) {

               /* The if statement below and the nextContent = rest; must appear before both return
                * statements below because they are related with future iterations regardless the return value.
                *
                * The use of trim() at rest.trim().length > 0 is because the rest sub pattern is [\s\S]
                * */
                if(rest.trim().length > 0) {

                    // To avoid unnecessary entering into the while loop, the replace won't execute but why even enter the loop.
                    runAgain = true;

                }

                nextContent = rest;

               /* The if statement below is used to avoid parsing non javascript type scripts, typeSearch is using
                * a general pattern that consumes any content within the type attribute if there is type attribute.
                * 
                * The pattern require at least 1 character but it may be a space character and that is the reason for
                * the trim().
                *
                * I'm also using toLowerCase() because when I check trimedTypeSearch !== 'javascript' && trimedTypeSearch !== 'text/javascript'
                * I'm checking lower case characters only because I may get: 'JavaScript' or 'JAVASCRIPT' or 'TEXT/javascript' and so on.
                *
                * Example for script element that doesn't contain javascript code:
                *
                *   <script type="text/ng-template" id="/tpl1.html">
                *      <input ng-model="myPrimitive">
                *   </script>
                *
                * The above example is used in AngularJS framework.
                *
                * Please note that the language attribute was deprecated(http://www.w3.org/TR/html401/interact/scripts.html)
                * hence not supported.
                * */
                typeSearch = openScriptTag.match(/type\s*\=\s*('|")([\s\S]+?)\1/i);

                if(typeSearch) { // No type attribute at all.

                    var trimedTypeSearch = typeSearch[2] && typeSearch[2].trim().toLowerCase();

                    if(trimedTypeSearch && trimedTypeSearch.length > 0) { // Type attribute is empty.

                        if(trimedTypeSearch !== 'javascript' && trimedTypeSearch !== 'text/javascript') { // Nor javascript or text/javascript

                           /* I return all but the rest attribute, the idea is to "forget" the rest attribute because
                            * the rest attribute is assined into the nextContent variable, we always iterate and replace
                            * the nextContent variable, and we always return all but the rest attribute, regardless the return statement.
                            * */
                            return before + openScriptTag + scriptContent + closeScriptTag;

                        }

                    }

                }

               /* I'm using ([\s\S]*?), notice the *, I'm using * and not + because for empty scripts for
                * example: <script></script> the + will collect '<'/script> and because the ? it will then
                * check the (\&lt\;\/script\&gt\;) but we already skip the '<' so we will never match this
                * closing script tag but the next closing script tag on the code, so instead of scriptContent
                * contain the actual javascript content it will contain all the text from the first script
                * closing tag(including the script tag itself) and all the way down until the next closing
                * script tag, when using * it will first look for '' then check for <, so if there is empty
                * code inside script tags the * will not collect the < as the + did hence we able to match
                * the (\&lt\;\/script\&gt\;) after the empty scriptContent.
                * */
                return  before +
                        openScriptTag +
                        (scriptContent.trim().length > 0
                        ? formatContent(scriptContent, 'javascript', null)
                        : scriptContent) + closeScriptTag;

            });

        }

        return returnedContent;

    }

    function replacement(subPattern, type, defaultType, syntax, url) {

        // The defaultType is used the determine the return value because before,inBetween,after uses different patterns.
        var before = '',
            after = '',
            // The defaultType is checked for underfined for cases like noSpans that call this function manually without supplying value to this parameter.
            defaultType = defaultType ? defaultType.toLowerCase() : defaultType;

        if(defaultType === 'before') {

            before = '';
            after = '<span';

        } else if(defaultType === 'inbetween') {

            before = '</span>';
            after = '<span';
            
        } else if(defaultType === 'after') {

            before = '</span>';
            after = '';

        } else { // When noSpans inside inBetweenAllSteps remains false there is no default type hence null is the defaultType

            before = '';
            after = '';
        
        }

        switch(type) {

            case 'numbers':

                return before + getNumbers(subPattern) + after;

            break;

            case 'stylesheetImport':

                return before + getImport(subPattern) + after;

            break;

            case 'docType':

                return before + getDocType(subPattern) + after;

            break;

            case 'insideJavascript':

                return before + getInsideJavascript(subPattern) + after;

            break;

            case 'insidePhp':

                return before + getInsidePhp(subPattern, url) + after;

            break;

            case 'insideStylesheet':

                return before + getInsideStylesheet(subPattern) + after;

            break;

            case 'stylesheetRules':

                return before + getRules(subPattern) + after;

            break;

            case 'stylesheetSelectors':

                return before + getSelectors(subPattern) + after;

            break;

            default:

               /* A note about the order, you can change the order, even if you think about the following:
                * 
                * What if the type is 'commentsMarkup' and type.indexOf('markup') came first, what then?
                * well the indexOf is case sensitive so type.indexOf('markup') will return -1 for 'commentsMarkup'
                * */
                if(type.indexOf('keywords') > -1) {

                   /* slice(-2) is used to extract the last 2 characters as
                    * the categorie, for example from 'KeywordsFC' extract 'FC'
                    * */
                    return before + getKeywords(subPattern, type.slice(-2), syntax) + after;

                } else if(type.indexOf('comments') > -1) {

                    /* slice(8) is used to extract the characters after the 8 character to get
                     * Block(capital B) or Single(capital S), for example from 'commentsSingle' get 'Single'
                     * */
                    return before + getComments(subPattern, type.slice(8)) + after;

                } else if(type.indexOf('markup') > -1) {

                   /* substr(6, 1) is used to extract the last character to identify if it should
                    * replace opening or closing tag, for example from 'markupOpeningTags' extract 'O'
                    * */
                    return before + getMarkups(subPattern, type.substr(6, 1)) + after;

                } else if(type.indexOf('strings') > -1) {

                    /* slice(7) is used to extract the characters after the 7 character to get
                     * Php(capital P) or General(capital G), for example from 'stringsGeneral' get 'General'
                     * */
                    return before + getStrings(subPattern, type.slice(7)) + after;

                } else if(type.indexOf('Variables') > -1) {


                    /* type.slice(0, type.indexOf('Variables')) is used to extract the characters that
                     * before the 'Variables' string, for example extract 'php' from 'phpVariables'
                     * */
                    return before + getVariables(subPattern, type.slice(0, type.indexOf('Variables'))) + after;

                } else if(type.indexOf('Functions') > -1) {

                    /* type.slice(0, type.indexOf('Functions')) is used to extract the characters that
                     * before the 'Functions' string, for example extract 'php' from 'phpFunctions'
                     * */
                    return before + getFunctions(subPattern, type.slice(0, type.indexOf('Functions'))) + after;

                } else { // Default is rest, I didn't think about making function just so it returnes strings so:

                    return before + '<span data-rest>' + subPattern + '</span>' + after;

                }

        }

    }

    function inBetweenAllSteps(content, type, syntax, url) {

        // Explained below.
        var noSpans = false,

           /* About the type attribute:
            * There may be 2 types of call to this function, the first call is used to fetch
            * the content that in between spans and check if they are Keywords.
            * The second is to wrap the rest of the code with data-rest spans.
            * types can be rest for data-rest or Keyword for data-keyword-xc(x may be f for
            * first or s for second and so on).
            * */

            before = content.replace(/([\s\S]*?)<span/, function(match, subPattern) {

            // Explained below.
            noSpans = true;

            /* I can't use + instead of * the reason is:
             *
             * If i use + and i have nothing before the first span for example 'empty'<span>
             * The regex engine will first get the first character because + means 1 or more
             * so in our case where there is no characters before the first <span> the character that
             * will be captured is < and than the engine will check if <span reached, But the problem is that
             * we already passed < so the engine will try < against s which fail and the subPattern will
             * fetch all characters until the next <span.
             *
             * I must use * because:
             *
             * The regex engine in case i use * will first take nothing because * means nothing until infinite,
             * so after it takes nothing it checks for < and in case we don't have nothing before <span we have
             * a match.
             * */
            if(subPattern.trim().length > 0) {

                return replacement(subPattern, type, 'before', syntax, url);

            }

            // In case there is only spaces I will return the match as it is to keep the code structure intact.
            return match;

        });

        var inBetween = before.replace(/<\/span>([\s\S]*?)<span/g, function(match, subPattern) {

            /* The reason for the trim().length > 0 is because I want the wrap only text
             * between span's(closing to opening) for example '</span> <span',
             * I don't want this space between the span's(closing to opening) i only want text '</span>someText<span'
             * */
             if(subPattern.trim().length > 0) {

                return replacement(subPattern, type, 'inBetween', syntax, url);

             }

            // In case there is only spaces I will return the match as it is to keep the code structure intact.
            return match;

        });

        // I must use + and not * in the pattern so the pattern won't wrap '' inside a span(<span data-rest></span>).
        var after = inBetween.replace(/<\/span>((?:(?!<\/span>)[\s\S])+)$/, function(match, subPattern) {

            if(subPattern.trim().length > 0) {

                return replacement(subPattern, type, 'after', syntax, url);

             }

            // In case there is only spaces I will return the match as it is to keep the code structure intact.
            return match;

        });

        /* The short if below is used for:
         * 
         * This inBetweenAllSteps system will takes content that either from the begining of the content
         * until before the first opening span tag, between closing span tags to opening span tags,
         * after the last closing span tag until the end of the content.
         * 
         * The problem is that this system won't know how to face with no spans at all.
         * The first spans will be added after the first or second maybe third call to this function depending
         * whether there are Keywords or comments or what ever the order is, that is why I'm using the short
         * if statement below.
         *
         * Why I only set the noSpan inside the below phase?, the reason is because it will always
         * be called(not replacement() will be called but the replace callback).
         *
         * The inBetween phase won't be called unless there are 2 spans: <span></span><span></span>
         * The after phase will only be called if there is if there is at least 1 character after the
         * last span closing tag.
         * */
        return noSpans ? after : replacement(after, type, null, syntax, url);
    }

    function formatContent(content, syntax, url) {

        /* About .replace(/</g, '&lt;').replace(/>/g, '&gt;')
         *
         * First let me say that I know that textarea element will auto escape < and > and I don't have to do it
         * myself, I've also checked with IE8 and even IE8 textarea escapes < and >, but for any case where there is
         * a browser that doesn't auto escapes < and > I do it.
         *
         * Before I "return" the formated content back into the innerHTML I must avoid any kind of markup,
         * below I have listed few reasons why I must avoid any kind of markup:
         *
         * 1. If I add broken html for example: <a in front of my code the returned value from formatContent
         *    will be  <span data-rest><a</span> the problem is that when innerHTML'd the browser will treat
         *    <a</span> as tag opening for a element and it will also add closing </a> just before the end
         *    of the code, and finally the data-rest was remain without closing tag so it will also add right
         *    after the </a> closing tag another closing </span> tag for the data-rest.
         * 
         * 2. Blink and Gecko will change the flawed html to a comment.
         *    So for example <?adp> is considered flawed html because between < and > there
         *    must be only a-z characters, and because its flawed it will become <!--?adp--> and be wrapped
         *    unnecessary data-rest that will contain this comment and it also just take space(simular to padding,
         *    in our case top padding) inside the code element because the unnecessary but exist data-rest span.
         *
         * 3. If I just insert <p> before the code the browser will autocomplete the closing p tag just before
         *    the end of the code element, the problem is that now it wrapped the </span> tag for data-rest that
         *    from the start was wrapping the <p>, so the result is data-rest tag without closing tag so the
         *    browser will autocomplete this closing tag right after the p closing tag and right before the code element
         *    closing tag.
         *
         *
         * 4. Interesting case may happen in I add <span> into the code, it will depending on where I insert the
         *    opening <span> tag the problem may be different, for example if I insert the <span> somewhere
         *    in the code but before the first blockComment only the before phase inside inBetweenAllSteps
         *    will be triggered because the <span> tag in the middle of the code, now the replacement will
         *    not be called manually because the flag(noSpans) inside before phase was set to true, and now
         *    the problem is that blockComments only get content that is before the <span>, now if there is no
         *    blockComments before the <span> the inBetweenAllSteps for blockComments will pass away and
         *    continue to the next inBetweenAllSteps for singleLineComments, but wait
         *    it gets more funnier, its a chain problem, because the blockComments didn't change anything
         *    so singleLineComments will have the same problem as before, the result is that both block and single
         *    line comments will be left behind and gets broken by the other stations.
         *    
         *    In some cases where singleLineComments or blockComments are placed before the <span> and there
         *    is some code and then another singleLineComments(if before was blockComments it should
         *    also be blockComments) there will be a problem because the result is something like:
         *    
         *    <span>comment</span><span>some code<span>comment</span>
         *
         *    The problem is that only the comments(single, block) stations was reached, now when the rest of
         *    the stations will want to interact with the content they won't have the chance since the code
         *    'some code' is between <span>some code<span> its opening span tag and another opening span tag
         *    and there is no inBetweenAllSteps phase to fetch content inside <span><span>
         *
         *
         * 5. Depending on the place where <span> will be placed we will know what content will be skiped, the
         *    last problem is that when innerHTML'd the browser will autocomplete the <span> closing tag, the
         *    order is: <span>skiped code<span data-x>x-content</span><span data-y>y-content</span></span>
         *    as you can see the skiped code along with the special spans(keywords, strings) will be contained inside the <span>
         *
         * The url parameter will be passed to functions that alerts the user about syntax problems, so to help
         * the user identify the file I also pass the url, for cases where there is no data-url the function
         * that responsible for alerting the user about the syntax problem will take care for that kind of cases.
         * */

         // About .replace(/^[\r\n]*/, '').replace(/[\r\n]*$/, '')
       
       /* I remove \r and \n from the beginning and ending of codes, if the user have for convenience
        * purposes, some \r and \n I don't want it to affect the height of the code element(and I assume
        * the user didn't expect it to affect the height as I do), notice that
        * if the regexp for both beginning and ending will encounter any kind of character
        * that isn't a \r or \n it will finish the "triming" action, so for example:
        *
        * \r\n
        * ' '
        * \r\n
        * some code is here
        *
        * Notice that the first \r\n will be removed from the beginning but because the ' ', the regexp
        * will stop matching, hence we have:
        *
        * ' '
        * \r\n
        * some code is here
        *
        * As you can see only the \r\n before the ' ' was removed.
        * */
        content = content   .replace(/</g, '&lt;').replace(/>/g, '&gt;')
                            .replace(/^[\r\n]*/, '').replace(/[\r\n]*$/, '');

        var steps = [];

        switch(syntax) {

            case 'markup':

                steps.push('commentsMarkup');
                steps.push('markupOpeningTags');
                steps.push('markupClosingTags');
                steps.push('docType');

            break;

            case 'php':

                steps.push('commentsBlock');
                steps.push('commentsSingle');

               /* No need for stringsGeneral, read getStrings for more information.
                * The stringsPhp step must appear before the rest of the steps(keywords, numbers, etc).
                * */
                steps.push('stringsPhp');
                steps.push('keywordsFC');
                steps.push('keywordsSC');
                steps.push('keywordsTC');

               /* There is no reason for keeping any kind of order between the phpVariables and the phpFunctions steps,
                * not like the rule for keeping order between the two inside the 'javascript' case, the reason for
                * not keeping any order here is that php variables must start with $ or one of the
                * supported privileges(public, protected, private, static).
                * */
                steps.push('phpVariables');
                steps.push('phpFunctions');

               /* The numbers step must appear after the phpVariables and phpFunctions steps because identifiers can
                * contain numbers, hence using numbers step before each of the steps may shorten a variable name,
                * for example with $obj2 the output: <span data-variable>$obj</span><span data-number>2</span>
                *
                * With php functions its also a problem, with function mor3u() {} the 'mor' will be wrappe as span with
                * data-rest, 3 with data-number and u with data-function
                * */
                steps.push('numbers');

            break;

            case 'stylesheet':

                steps.push('commentsBlock');
                steps.push('stylesheetImport');
                steps.push('stylesheetRules');
                steps.push('stylesheetSelectors');

            break;

            case 'javascript':

                steps.push('commentsBlock');
                steps.push('commentsSingle');
                steps.push('stringsGeneral');
                steps.push('keywordsFC');
                steps.push('keywordsSC');

               /* Within this 'javascript' case the javascriptFunction step must appear before javascriptVariables
                * step, the reason is that in javascript variables identifiers are the same as function identifiers,
                * if I will use javascriptVariables before javascriptFunctions I will pick up any identifier, the
                * javascriptFunction step is more specific and won't interrupt the javascriptVariables step because
                * the requirement for ( after function identifier, I don't need to keep this order within the 'php' case
                * the reason is well explained there.
                * */
                steps.push('javascriptFunctions');
                steps.push('javascriptVariables');

               /* The numbers step must appear after the phpVariables and phpFunctions steps because identifiers can
                * contain numbers, hence using numbers step before each of the steps may shorten a variable name,
                * for example with function functionName9() {}, phpFunctions pattern will check for ( and if 9 will
                * be wrapped with span the functionName will be wrapped as variable and not as a function.
                * 
                * With variables it can shorten the variable length, if within var name5 the name5 should be wrapped
                * only the name will be wrapped, or var name2name both 'name' will be wrapped without the 2 in between them.
                * */
                steps.push('numbers');

            break;

            case '*':

                steps.push('insideJavascript');
                steps.push('insidePhp');
                steps.push('insideStylesheet');

               /* The following markup steps(functions) can't appear before insideJavascript/insidePhp/insideX steps
                * because if the steps(functions) appear before they won't know to recognize what is markup and what
                * is javascript or php, the logic is simple, each insideFunction(php/javascript/etc) will
                * know its boundaries(opening/closing tags) but with markup getting the
                * content before/inBetween/after EACH markup will be a maintenance problem as when any new
                * syntax be added the syntax should know its boundaries and the markup steps should also
                * know how to avoid getting content from those boundaries, the idea is simple, each syntax know its
                * boundaries and the markup gets the "left over" content, this way when I add new syntax I only need
                * to make the syntax insideFunction "familiar" with its own boundaries without having to edit the
                * markup functions.
                * */
                steps.push('commentsMarkup');
                steps.push('markupOpeningTags');
                steps.push('markupClosingTags');
                steps.push('docType');

            break;

        }

        // All syntaxes get rest.
        steps.push('rest');

        for(var key in steps) {

            content = inBetweenAllSteps(content, steps[key], syntax, url);

        }

        return content;

    }

    utils.addListener(window, 'load', init);

})(window, document);