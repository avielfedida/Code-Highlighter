(function(window, document, undefined){

    'use strict';

    /* About the following object, it contain key:function pairs, each key may contain comma separated schemes
     * names, the bgSelection property will contain the selection styles for the entire element while the bgKeywordsSelection
     * property will contain the selection rules only for the keywords.
     *
     * The lines property will contain rules for the lines.
     *
     * And finally the selectors property will contain selectors with rules appended to each selector, the idea
     * is so I can style internal elements inside the valuables.codeClassName
     * */
    var schemesOverallStyles = {

      'apple,orange,melon,mango': function() {

        this.bgSelection = { 'text-shadow': 'none', 'background': '#b3d4fc' };
        this.bgKeywordsSelection = { 'background': '#282c34', 'color': '#fff' };

        this.lines = {
          'border-right': '1px solid #ccc',
          'background-color': '#fff',
          'color': 'rgb(88, 110, 117)',
          'opacity': 0.3,
          'padding': '1em'
        }

        this.selectors = {

          '::selection': this.bgSelection,
          '::-moz-selection': this.bgSelection,


          ' span::selection': this.bgSelection,
          ' span::-moz-selection': this.bgSelection,


          ' span[data-keyword-fc]::selection': this.bgKeywordsSelection,
          ' span[data-keyword-fc]::-moz-selection': this.bgKeywordsSelection,

          ' span[data-keyword-sc]::selection': this.bgKeywordsSelection,
          ' span[data-keyword-sc]::-moz-selection': this.bgKeywordsSelection,

          ' span[data-keyword-tc]::selection': this.bgKeywordsSelection,
          ' span[data-keyword-tc]::-moz-selection': this.bgKeywordsSelection

        }

      },

      'papaya,olive,peach,banana': function() {

        this.bgSelection = { 'text-shadow': 'none', 'background': 'rgba(62, 68, 81, 0.5)' };
        this.bgKeywordsSelection = { 'background': 'transparent', 'color': '#fff' };

        this.lines = {
          'border-right': '1px solid rgba(204, 204, 204, 0.1)',
          'background-color': '#3e4451',
          'color': '#666F78',
          'padding': '1em'
        }

        this.selectors = {

          '::selection': this.bgSelection,
          '::-moz-selection': this.bgSelection,


          ' span::selection': this.bgSelection,
          ' span::-moz-selection': this.bgSelection,


          ' span[data-keyword-fc]::selection': this.bgKeywordsSelection,
          ' span[data-keyword-fc]::-moz-selection': this.bgKeywordsSelection,

          ' span[data-keyword-sc]::selection': this.bgKeywordsSelection,
          ' span[data-keyword-sc]::-moz-selection': this.bgKeywordsSelection,

          ' span[data-keyword-tc]::selection': this.bgKeywordsSelection,
          ' span[data-keyword-tc]::-moz-selection': this.bgKeywordsSelection

        }

      }

    }

    var valuables = {

        nativePattern: /^[^{]+\{\s*\[native \w/,

        stringEndsWith: function(str, endsWith) {
        
            return (str.indexOf(endsWith, str.length - endsWith.length) !== -1);

        },

        linesClassName: null, //Will be set outside of this object as it depends upon valuables.codeClassName

        codeClassName: 'code-highlighter',

        validSyntaxes: ['javascript', 'markup', 'stylesheet', '*'],

        // Color schemes names that their rules was already inserted into the page.
        insertedColorSchemes: {},

        dataPatt: /^data\-/,

        // Single initiation is required.
        sheet: null,

        /* withMeaning is used to change specific Keywords pattern, for example, the in keyword in javascript
         * must have spaces before and after(' in '), each change should be explained.
         * */
        withMeaning: {

           /* A short notice about the below objects, if you decide you don't need them, don't leave them empty,
            * they are better be removed than empty, if empty then there will iteration over all the keywords
            * related to the below object, even if empty so for example if javascriptKeywords is empty but existed, even than
            * all javascript keywords will be iterated.
            *
            * Rules appear in all the javascript/multi keywords either deny formation or restrict formation.
            *
            * To understand it, the class rule from the multi keywords add a restriction that determine that there must be a space
            * after the class keyword.
            *
            * The function keyword from multi keywords was originaly placed at javascriptKeywords object
            * and added a deny formation where after the function keyword there must be __
            * if posible always try restrict formation because with deny formation you may deny formation
            * for a single syntax, after I replaced the function keyword from deny to restrict I was able to move it from
            * the javascriptKeywords object to the multiMeaning object.
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
            * Only IE < 9 have a problem with object keys that are javascript special keywords like(in or function),
            * I don't support IE < 9 so I don't have to wrap the keys, but for any case some other browser I haven't
            * tested with have the same propblem I wrap the keys with single quotation marks('key').
            * */
            javascriptKeywords: {

                'array': /\sarray/, // There must be space because there is new before the array keyword.
                'in': /\sin\s/,
                'with': /with\s*\(/,
                'default': /(\;|\s)default(\s*\:|\s)/, // The 1st(at the end) alternative is for default inside switch, the 2st(at the end) alternative is for ecmascript 6 module system
                'from': /\sfrom\s/ // For ECMAScript 6 module system { $ as jQuery } from 'jquery', can't be }from'

            },

           /* The rules in here must be legitimate for all supported programming languages.
            * For now the only supported language is Javascript, but there are some keywords here
            * to show that this feature available.
            * */
            multiMeaning: {

                'new': /new\s/,
                'eval': /eval\s*\(/,
                'class': /class\s/, // There must be space before the class name
                'if': /if\s*\(/,
                'for': /for\s*\(/,
                'case': /case\s/,
                'return': /return(\s|\;)/,
                'do': /do\s*\{/,
                'as': /\sas\s/ // Can't be called $arrayas$key must be $array as $key, for ECMAScript 6 module system $ as jQuery, can't be $asjQuery

            }

        }

    };

    // The following valuables.x(valuables.linesClassName and more...) must be set outside of valuables as they use valuables properties/methods.
    valuables.linesClassName = valuables.codeClassName + '-lines';

   /* There is a small standard about objects like codeElementStyles.absWidth below.
    *
    * Each of the objects must implement required and empty properties, the required property indicates
    * whether the attribute related to this object must be implemented, the empty property indicates
    * whether or not that propertie can be empty, the user may enter a value but the value will be ignored.
    *
    * Due to the fact that I can't use multiple object properties with the same name to achive:
    *
    * 'white-space': 'pre-wrap',
    * 'white-space': '-moz-pre-wrap', and so on...
    *
    * I'm using an array to include few values under a specific rule, the mechanism apply the rules will
    * check the value, if it's an array it will iterate it.
    * */
    var codeElementStyles = {

        absWidth: {

            required: false,
            empty: true,

            '-webkit-box-sizing': 'border-box', // Safari/Chrome, other WebKit
            '-moz-box-sizing': 'border-box', // Firefox, other Gecko
            'box-sizing': 'border-box' // Opera/IE 8+

        }

    };

    var colorSchemes = {

        apple: { // White background, Apple

            'background-color': '#f5f7fa',

            'data-rest': '#586e75',
            'data-string': '#9500FF',
            'data-keyword-fc': '#cb4b16',
            'data-keyword-sc': '#9500FF',
            'data-keyword-tc': '#dc322f',
            'data-comment': '#586e75',
            'data-markup': '#268bd2',
            'data-attribute': '#b58900',
            'data-selector': '#cb4b16',
            'data-identifier': '#dc322f',
            'data-method': '#590BE8',
            'data-property': '#003DFF',
            'data-object': '#9500FF',
            'data-number': '#b58900',
            'data-rule': '#268bd2',
            'data-hex': '#9500FF',
            'data-unit': '#cb4b16',
            'data-named-value': '#b58900',
            'data-import': '#268bd2',
            'data-doctype': '#586e75'

        },

        papaya: { // Black background, Papaya

            'background-color': '#282c34',

            'data-rest': '#ffffff',
            'data-string': '#99dfbd',
            'data-keyword-fc': '#99dfbd',
            'data-keyword-sc': '#bcf4d4',
            'data-keyword-tc': '#ffffff',
            'data-comment': '#586e75',
            'data-markup': '#33ab72',
            'data-attribute': '#ffffff',
            'data-selector': '#33ab72',
            'data-identifier': '#33ab72',
            'data-method': '#ffffff',
            'data-property': '#ffffff',
            'data-object': '#bcf4d4',
            'data-number': '#99dfbd',
            'data-rule': '#7dd8ad',
            'data-hex': '#33ab72',
            'data-unit': '#ffffff',
            'data-named-value': '#ffffff',
            'data-import': '#33ab72',
            'data-doctype': '#bcf4d4'

        },

        orange: { // White background, Orange

            'background-color': '#ffffff',

            'data-rest': '#333333',
            'data-string': '#56982D',
            'data-keyword-fc': '#56982D',
            'data-keyword-sc': '#859900',
            'data-keyword-tc': '#006F78',
            'data-comment': '#586e75',
            'data-markup': '#006F78',
            'data-attribute': '#3BA05E',
            'data-selector': '#3BA05E',
            'data-identifier': '#006F78',
            'data-method': '#56982D',
            'data-property': '#859900',
            'data-object': '#56982D',
            'data-number': '#56982D',
            'data-rule': '#006F78',
            'data-hex': '#56982D',
            'data-unit': '#3BA05E',
            'data-named-value': '#3BA05E',
            'data-import': '#006F78',
            'data-doctype': '#586e75'

        },

        olive: { // Black background, Olive

            'background-color': '#282c34',

            'data-rest': '#ffffff',
            'data-string': '#94DA2C',
            'data-keyword-fc': '#00CA61',
            'data-keyword-sc': '#FFF600',
            'data-keyword-tc': '#FFF600',
            'data-comment': '#586e75',
            'data-markup': '#00CA61',
            'data-attribute': '#FFF600',
            'data-selector': '#00CA61',
            'data-identifier': '#00E8A3',
            'data-method': '#CFE805',
            'data-property': '#CFE805',
            'data-object': '#FFF600',
            'data-number': '#CFE805',
            'data-rule': '#FFF600',
            'data-hex': '#CFE805',
            'data-unit': '#CFE805',
            'data-named-value': '#00CA61',
            'data-import': '#FFF600',
            'data-doctype': '#FFF600'

        },

        peach: { // Black background, Peach

            'background-color': '#282c34',

            'data-rest': '#b6b6b6',
            'data-string': '#979fff',
            'data-keyword-fc': '#00c26f',
            'data-keyword-sc': '#379DE8',
            'data-keyword-tc': '#0096ff',
            'data-comment': '#b6b6b6',
            'data-markup': '#0096ff',
            'data-attribute': '#00c26f',
            'data-selector': '#00bfe5',
            'data-identifier': '#00bfe5',
            'data-method': '#00c26f',
            'data-property': '#00bfe5',
            'data-object': '#379DE8',
            'data-number': '#00c26f',
            'data-rule': '#0096ff',
            'data-hex': '#00bfe5',
            'data-unit': '#02916a',
            'data-named-value': '#02916a',
            'data-import': '#0096ff',
            'data-doctype': '#b6b6b6'

        },

        banana: { // Black background, Banana

            'background-color': '#282c34',

            'data-rest': '#B6B6B6',
            'data-string': '#588ba4',
            'data-keyword-fc': '#A57A9E',
            'data-keyword-sc': '#00a4be',
            'data-keyword-tc': '#45a989',
            'data-comment': '#515F6A',
            'data-markup': '#7D8FA3',
            'data-attribute': '#85A7A5',
            'data-selector': '#A57A9E',
            'data-identifier': '#8081b8',
            'data-method': '#00a4be',
            'data-property': '#00a4be',
            'data-object': '#A57A9E',
            'data-number': '#00a4be',
            'data-rule': '#8081b8',
            'data-hex': '#45a989',
            'data-unit': '#00a4be',
            'data-named-value': '#7D8FA3',
            'data-import': '#45a989',
            'data-doctype': '#405d6a'

        },

        mango: { // White background, Mango

            'background-color': '#f8f1e9',

            'data-rest': '#044C29',
            'data-string': '#8B56BF',
            'data-keyword-fc': '#cb4b16',
            'data-keyword-sc': '#dd2222',
            'data-keyword-tc': '#ba1925',
            'data-comment': '#DBA69D',
            'data-markup': '#f92672',
            'data-attribute': '#dd2222',
            'data-selector': '#f92672',
            'data-identifier': '#f92672',
            'data-method': '#FF7D00',
            'data-property': '#dd2222',
            'data-object': '#FF7D00',
            'data-number': '#FF7D00',
            'data-rule': '#8B56BF',
            'data-hex': '#dd2222',
            'data-unit': '#471454',
            'data-named-value': '#f92672',
            'data-import': '#8B56BF',
            'data-doctype': '#044C29'

        },

        melon: { // White background, Melon

            'background-color': '#f0f0f0',

            'data-rest': '#404850',
            'data-string': '#00c26f',
            'data-keyword-fc': '#007020',
            'data-keyword-sc': '#4070a0',
            'data-keyword-tc': '#4070a0',
            'data-comment': '#a8b6c4',
            'data-markup': '#007020',
            'data-attribute': '#4070a0',
            'data-selector': '#4070a0',
            'data-identifier': '#4c8f2f',
            'data-method': '#007020',
            'data-property': '#007020',
            'data-object': '#4070a0',
            'data-number': '#007020',
            'data-rule': '#4070a0',
            'data-hex': '#4c8f2f',
            'data-unit': '#40a070',
            'data-named-value': '#979fff',
            'data-import': '#4070a0',
            'data-doctype': '#404850'

        }

    };

    var utils = {

        addListener: function(el, type, fn) {

            el.addEventListener(type, fn, false);

        },

        removeListener: function(el, type, fn) {

            el.removeEventListener(type, fn, false);

        },

        getLastLineWidth: function(element, linesContainer, lastLine) {

            var textNodeFromContent = document.createTextNode(lastLine),
                spanElement = document.createElement('span'),
                width = null;

                spanElement.appendChild(textNodeFromContent);

                linesContainer.appendChild(spanElement);

                element.appendChild(linesContainer);

                // Will include padding + border + lastLine width
                width = linesContainer.offsetWidth;

                element.removeChild(linesContainer);

                return width;

        },

        // Transform strStr to str-str
        uncamelize: function(str) {

            return str.replace(/[A-Z]/g, function(match) {

                return '-' + match.toLowerCase();

            });

        },

        // Transform str-str to strStr
        camelize: function(str) {

            return str.replace(/\-(\w)/g, function(match, letter){

              return letter.toUpperCase();

            });

        },

        getStyle: function(element, styleProp) {

            var camilized = utils.camelize(styleProp),
                returnedStyle = null;

            if (document.defaultView && document.defaultView.getComputedStyle) {

                returnedStyle = document.defaultView.getComputedStyle(element, null).getPropertyValue(styleProp);

            } else {

                returnedStyle = element.style[camilized];

            }

            return returnedStyle;

        },

        getNumberOfLines: function(element, linesContainer, paddingTop, paddingBot, paddingLeft) {

           /* The first phase is getting the number of lines, the lastLineWidth variable will
            * contain the width for the biggest line number inside valuables.linesClassName, it will
            * be calculated with padding and border.
            *
            * After I have the lastLineWidth set, I know how much I have to "push" the padding-left of
            * valuables.codeClassName.
            *
            * About how I set the padding-left, I'm using element.style to make it element specific,
            * the more appropriate way is to get inside this function the color scheme(colorScheme['schemeName']) and
            * apply the padding-left to that specific color scheme, I also have to check if the rules was
            * already added so I won't add them if there are more than one element with lines set and same
            * color scheme, anyway this function is intended to be really simple, I don't need another
            * parameter and another "already added rules" checks, so I just set element.style, it's simple
            * and easy to understand, there is no need for further complexity.
            * */

            var numberOfLines = element.innerHTML.match(/\n/g).length + 1,
                lastLineWidth = utils.getLastLineWidth(element, linesContainer, numberOfLines);

            element.style.setProperty('padding-left', ( paddingLeft + lastLineWidth ) + 'px', 'important');

            return numberOfLines;

        },

        isNative: function(checkMe) {

            return valuables.nativePattern.test(checkMe);

        },

        shortArray: function(arrayToShort) {

            arrayToShort.sort(function(a, b) {

                return b.length - a.length; // ASC -> a - b; DESC -> b - a

            });

        },

        addCSSRule: function(sheet, selector, rules, index) {

            if(index === undefined) {

                // sheet.cssRules used for Gecko.
                index = sheet.rules ? sheet.rules.length : sheet.cssRules.length;

            }

            if('cssRules' in sheet) { // IE >= 9

               /* As far As I know Chrome have a problem with ::-moz-selection, I assume that Chrome
                * think it's invalid pseudo element, maybe other WebKit browsers have the problem, and
                * the reason I wrap the insertRule with a try block is that Chrome(maybe other WebKit) will
                * generate an error and break the code.
                *
                * Another problem is when I supply multiple rules to the rules parameters as:
                *
                * 'border-right: 0;' +
                * 'border-top: 0;' +
                * 'border-left: 0;';
                *
                * If the one of the rules above would be written as: 'border-right: 0' without
                * the ';' at the end the will be an infinite loading on chrome(as far as I checked).
                * */
                try {

                    sheet.insertRule(selector + "{" + rules + "}", index);

                } catch(e) {}

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
            style.appendChild(document.createTextNode(""));

           /* Append the style element to the head element.
            *
            * I wanted to use document.head but document.head is only supported by IE >= 9
            * */
            document.getElementsByTagName('head')[0].appendChild(style);

            // style.sheet is for IE >= 9
            return style.sheet;

        }

    };

   /* Different keywords are separated just because it looks better(their highlight colors are different).
    * If another language will be supported, for the key should be called rubyKeywords for example.
    * I decided to put the keywords variable as local to this function because they won't change between pre tags.
    * */
    var Keywords = {

        javascriptKeywords: {

            FC: ['from', 'arguments', 'boolean', 'break', 'byte', 'case', 'char', 'const', 'continue', 'debugger', 'default', 'delete', 'double', 'enum', 'eval', 'extends', 'false', 'finally', 'float', 'goto', 'implements', 'instanceof', 'int', 'long', 'native', 'new', 'null', 'package', 'private', 'protected', 'public', 'return', 'short', 'static', 'super', 'synchronized', 'this', 'throw', 'throws', 'transient', 'true', 'typeof', 'void', 'volatile', 'with', 'yield'],

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

        }

    }

    var units = ['em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', '%', 'px', 'cm', 'mm', 'in', 'pt', 'pc'];

   /* I'm not really have to sort this array but just in case a future update will have for example 'pxer', that will
    * cause the 'px' unit if it comes befor the 'pxer' unit to 'steal' the characters 'px' from 'pxer' and hence
    * the 'pxer' will never be found.
    * */
    utils.shortArray(units);

    function init() {

        // Once the page has loaded I insert the sheet(style element) into the page.
        valuables.sheet = utils.getSheet();

        // After I set the sheet above I set up some basic css rules.

        // Default '.' + valuables.codeClassName rules
        utils.addCSSRule(valuables.sheet, '.' + valuables.codeClassName,

       /* The code element is an inline level element, the background color is applied to valuables.codeClassName
        * and since this element is the code element(inline level) I must set it to block level element
        * so the full block will get the background color and not only code lines(span elements within
        * this code element).
        *
        * The text-align and direction are used so the web page direction/text-align won't mess up the code.
        * */
        'display: block;' +
        'overflow-y: auto;' +
        'overflow-x: auto;' +
        'direction: ltr;' +
        'text-align: left;');

        // Default '.' + valuables.codeClassName + ' .' + valuables.linesClassName rules.
        utils.addCSSRule(valuables.sheet, '.' + valuables.codeClassName + ' .' + valuables.linesClassName,

        // Users may decide to set some div borders, I can't let this affect on this specific div.
        'border-top: 0;' +
        'border-bottom: 0;' +
        'border-left: 0;' +

        'position: absolute;' +
        'left: 0;' +
        'top: 0;' +
        'margin: 0;' +

        // Disable selection to preven selecting lines when selecting code.
        '-webkit-touch-callout: none;' +
        '-webkit-user-select: none;' +
        '-khtml-user-select: none;' +
        '-moz-user-select: none;' +
        '-o-user-select: none;' +
        '-ms-user-select: none;' +
        'user-select: none;');

        // Default '.' + valuables.codeClassName + ' .' + valuables.linesClassName + ' span' rules
        utils.addCSSRule(valuables.sheet, '.' + valuables.codeClassName + ' .' + valuables.linesClassName + ' span',

        'display: block;' +
        'text-align: center;' +

       /* utils.getLastLineWidth functioning depend upon bot padding left/right
        * to be 0 since utils.getLastLineWidth won't calculate the span padding but
        * only the valuables.linesClassName, so the user may set paddings via valuables.linesClassName
        * for a specific scheme padding: .schemName .linesClassName
        * */
        'padding-left: 0 !important;' +
        'padding-right: 0 !important;');

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
        * there are only 2 categories, if valuables.withMeaning also have javascriptKeywords, javascriptKeywords have
        * 3 categories, so the for(multiMeaningInnerKey in valuables.withMeaning.multiMeaning) will run 3 times,
        * and for case where both javascriptKeywords and javascriptKeywords exists it will run 5 times and that
        * is unnecessary and performance downer.
        *
        * The following iteration system must appear before the below iterations system to allow each
        * javascript keywords to override the "common to all" multiMeaning.
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

            // Are there Keywords objects(javascriptKeywords, etc) that matches this meaning key?
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

            if(utils.hasClass(textAreaElements[i], valuables.codeClassName)) {

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
                    return { 'schemeName': schemeKey, 'scheme': defaultColorScheme, 'validScheme': validScheme };

                })();

                var syntaxAttribute = textAreaElements[i].getAttribute('data-syntax');

                if(syntaxAttribute) {

                    var urlAttribute = textAreaElements[i].getAttribute('data-url'),
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

                        if(colorScheme['validScheme']) {

                           /* This if statement is used to prevent multiple elements with the same scheme to add the same
                            * color scheme over and over into the style element at the head element.
                            *
                            * The idea is that each color scheme have some overall styles and data-x styles, overall styles
                            * can be applied to multiple color schemes while data-x are scheme specific.
                            *
                            * Both overall and data-x rules are added per scheme, if the scheme rules were already added there
                            * is no need to add it again.
                            * The idea is to keep an object where this object keys are the scheme(that already included) names and
                            * the values are always true, when I check for valuables.insertedColorSchemes[colorScheme['schemeName']]
                            * and the scheme is already included in the page, the scheme won't be reloaded(styles will be
                            * included again).
                            * */
                            if( valuables.insertedColorSchemes[colorScheme['schemeName']] !== true ) {

                              valuables.insertedColorSchemes[colorScheme['schemeName']] = true;

                              // Each color scheme of multiple color schemes have some defaults(overall styles).
                              for(var schemesKey in schemesOverallStyles) {

                                if(schemesKey.indexOf(colorScheme['schemeName']) > -1) {

                                  var stylesObject = new schemesOverallStyles[schemesKey];

                                  for(var linesRuleName in stylesObject.lines) {

                                      utils.addCSSRule(valuables.sheet,
                                     /* Selector, for example: .codeClassName.schemeName .linesClassName
                                      * it can't just be .linesClassName as multiple scheme within one
                                      * page may override each other scheme lines rules, or add rules
                                      * that does not exists inside another scheme lines rules object.
                                      * */
                                      '.' + valuables.codeClassName +
                                      '.' + colorScheme['schemeName'] +
                                      ' .' // The lines class is inside the code element(reason for space before dot(' .'))
                                      + valuables.linesClassName,
                                      linesRuleName + ':' + stylesObject.lines[linesRuleName]); // Rule

                                  }


                                  for(var selector in stylesObject.selectors) {

                                      var rulesCollection = '';

                                      for(var queryRuleName in stylesObject.selectors[selector]) {

                                          rulesCollection += queryRuleName + ':' + stylesObject.selectors[selector][queryRuleName] + ';';

                                      }

                                      utils.addCSSRule(valuables.sheet,
                                      '.' + valuables.codeClassName +
                                      '.' + colorScheme['schemeName'] +
                                      selector,
                                      rulesCollection);

                                  }

                                  // If the currect schemesKey was found, and the rules loops above have finished lets break the loop.
                                  break;

                                }

                              }

                                // colorScheme['scheme'] is the color scheme object.
                                for(var ruleName in colorScheme['scheme']) {

                                   /* The dataPatt is used to check if the ruleName starts with data-
                                    * the idea is not having to check for specific rules, for example:
                                    * ruleName === 'background-color', what if I decide to add another
                                    * rule, well I will have to remember to add the rule here, hence I decided
                                    * to check with a pattern, I know there is a small chance to have a "standard" rule
                                    * that starts with data-, it's should be rare because the "standard" rules should
                                    * be minimal and what are the chances that those minimal rules will also contain rule
                                    * that starts with data-
                                    * */
                                    if( ! valuables.dataPatt.test(ruleName)) {

                                      utils.addCSSRule(valuables.sheet,
                                      // Selector, for example: .codeClass.schemeName
                                      '.' + valuables.codeClassName + '.' + colorScheme['schemeName'],
                                      ruleName + ':' + colorScheme['scheme'][ruleName]); // Rule

                                    } else {

                                        utils.addCSSRule(valuables.sheet,
                                        // Selector, for example: .codeClass.schemeName [data-rest]
                                        '.' + valuables.codeClassName + '.' + colorScheme['schemeName'] + ' ' + '[' + ruleName + ']',
                                        'color' + ':' + colorScheme['scheme'][ruleName]);

                                    }

                                }

                            }

                          /* Before I replace the element I must to "save" the content, if I won't save it and the content
                           * will be wrapped by the new element(not textarea) there may be problem because I must avoid any kind of markup
                           * as described by formatContent function.
                           * */
                            var savedContent = textAreaElements[i].innerHTML,
                                newPreElement = document.createElement('pre'),
                                newCodeElement = newPreElement.appendChild(document.createElement('code'));

                           /* I reset the margin for each pre element, the reason is that I don't want the user
                            * to interact with anything other than valuables.codeClassName, and valuables.codeClassName is applied
                            * to the code element but there is a default margin applied to the pre element, and that is why
                            * I reset it.
                            * */
                            newPreElement.style.setProperty('margin', '0', 'important');

                           /* I want the user the style the element via valuables.codeClassName and not for
                            * some reason decide to decrease the width of the pre, or maybe he/she decreases some
                            * other pre elements, I don't want it to affect this pre element.
                            * */
                            newPreElement.style.setProperty('width', '100%', 'important');


                            // colorScheme['schemeName'] is the color scheme name, must appear before the element replacement.
                            newCodeElement.className = textAreaElements[i].className + ' ' + colorScheme['schemeName'];

                            if(textAreaElements[i].hasAttribute('data-lines')) {

                                // I "drag" the data-lines into the newCodeElement for the ajax callback to identify it.
                                newCodeElement.setAttribute('data-lines', textAreaElements[i].getAttribute('data-lines'));

                            }

                            if(textAreaElements[i].hasAttribute('id')) {

                                // I also want to save any id attribute the user may or may not given to the textarea element.
                                newCodeElement.setAttribute('id', textAreaElements[i].getAttribute('id'));

                            }


                           /* Default rules added via the codeElementStyles
                            * system are placed here, those rules are contained 
                            * within the else statements(the else statements state the default).
                            *
                            * It is important to notice the the skeleton for the following
                            * if/else statements is fixed, what that means is that for example
                            * data-abs-width is an attribute that don't accept any value at all
                            * but to keep a working scheme I send textAreaElements[i].getAttribute('data-abs-width')
                            * even though I don't care about a value at all.
                            *
                            * There is only on exception and that is when the value is 'false',
                            * this is the user opportunity to disable a specific codeElementStyles
                            * system rules(there are permanent css rules which does not added via this system).
                            * */
                            if(textAreaElements[i].hasAttribute('data-abs-width')) {

                                if(textAreaElements[i].getAttribute('data-abs-width') !== 'false') {
                               
                                    newCodeElement.setAttribute('data-abs-width', textAreaElements[i].getAttribute('data-abs-width'));

                                }

                            } else {

                                newCodeElement.setAttribute('data-abs-width', '');

                            }

                            textAreaElements[i].parentNode.replaceChild(newPreElement, textAreaElements[i]);

                            if(urlAttribute) {

                                // Gets content, the callback function will use formatContent to format it and then innerHTML it.
                                getByAjax(urlAttribute, newCodeElement, syntax, function(responseText, syntax, element, xhr) {

                                    buildElement(element, responseText, syntax);

                                }, function(element) {

                                    element.innerHTML = '<span data-rest>Loading content...</span>';

                                });

                            } else {

                                buildElement(newCodeElement, savedContent, syntax);

                            }

                        } else {

                            consoleLog('Invalid color scheme, check data-color-scheme attribute.', true)

                        }

                    } else {

                        consoleLog('Invalid syntax, check data-syntax attribute.', true);

                    }

                } else {

                    consoleLog('You must pick a syntax using data-syntax attribute.', true);

                }

            }

        }

    }

    function buildElement(element, content, syntax) {

        for(var elementStyle in codeElementStyles) {

            if( codeElementStyles[elementStyle]['empty'] === undefined ||
                codeElementStyles[elementStyle]['required'] === undefined ) {

                /* The standard state for codeElementStyles[elementStyle] determine
                 * it must contain empty and required properties, if one of them
                 * isn't exist, it must be created.
                 * */
                 consoleLog( elementStyle + ' within codeElementStyles object is missing empty or required property', true);

            }

            // From strStr to str-str
            var uncamelize = utils.uncamelize(elementStyle),
                // Then I add 'data-' infront of uncamelize variable.
                attr = 'data-' + uncamelize;

            if(element.hasAttribute(attr)) {

                var attrVal = element.getAttribute(attr).toLowerCase();

               /* The first condition checks if the current attribute can be empty,
                * if it is empty then attrVal may be 'someContent' or more likely '',
                * the required can be false/true, but at this point I only care that the
                * empty is true, that means I can start iterate over rules.
                *
                * What about required?, well
                *
                * Presented only attribute, applied when presented with empty/default value it is 
                * important to remember to set the attribute to empty string or default value, I
                * do it inside the switch right before I replace the textarea with the
                * pre element.
                * */
                if(codeElementStyles[elementStyle].empty === true) {

                    for(var ruleName in codeElementStyles[elementStyle]) {

                        // I only want rules iterations, the required/empty should be skipped.
                        if(ruleName === 'required' || ruleName === 'empty') {

                            continue;

                        }

                       /* The rules value may be arrays if a specific rules have
                        * several rule values to support several browsers.
                        * */
                        if(typeof codeElementStyles[elementStyle][ruleName] === 'array') {

                            for(var ruleValueKey in codeElementStyles[elementStyle][ruleName]) {

                                element.style.setProperty(ruleName, codeElementStyles[elementStyle][ruleName][ruleValueKey], 'important');

                            }

                        } else {

                            element.style.setProperty(ruleName, codeElementStyles[elementStyle][ruleName], 'important');

                        }


                    }

                } else { // empty === false

                    if(attrVal === '') { // What if empty === false but attrVal is ''

                        consoleLog('You must pick ' + attr + ' value', true);

                    }

                   /* I could combine the following if with the
                    * attrVal === 'empty' || attrVal === 'required' if, and response
                    * with invalid value, but I love precision.
                    * */
                    if(codeElementStyles[elementStyle][attrVal]) {

                        // The empty/required keys are exceptionals keys, for the small chance the attribute value is empty nor required I must check.
                        if(attrVal === 'empty' || attrVal === 'required') {

                            consoleLog('Reserved attribute value: ' + attrVal, true);

                        }

                        for(var ruleName in codeElementStyles[elementStyle][attrVal]) {

                           /* The rules value may be arrays if a specific rules have
                            * several rule values to support several browsers.
                            * */
                            if(typeof codeElementStyles[elementStyle][attrVal][ruleName] === 'array') {

                                for(var ruleValueKey in codeElementStyles[elementStyle][attrVal][ruleName]) {

                                    element.style.setProperty(ruleName, codeElementStyles[elementStyle][attrVal][ruleName][ruleValueKey], 'important');

                                }

                            } else {

                                element.style.setProperty(ruleName, codeElementStyles[elementStyle][attrVal][ruleName], 'important');

                            }

                        }

                    } else {

                        // If the attribute value is not exists.
                        consoleLog('Nonexistent attribute value: ' + attrVal, true);

                    }

                }

            } else {

                if(codeElementStyles[elementStyle].required === true) {

                    consoleLog('You must pick ' + attr + ' value', true);

                }

            }

        }

        // Before I calculate the lines I have to insert the content.
        element.innerHTML = formatContent(content, syntax, true);

        // Check whether the current(ajax related) code requested lines.
        if(element.hasAttribute('data-lines')) {

            var paddingTop = parseInt( utils.getStyle(element, 'padding-top') ),
                paddingBot = parseInt( utils.getStyle(element, 'padding-bottom') ),
                paddingLeft = parseInt( utils.getStyle(element, 'padding-left') ),
                attrVal = element.getAttribute('data-lines'),
                linesContainer = document.createElement('div');

            linesContainer.className = valuables.linesClassName;

           /* Some of the below calculations may assume the rules for specific
            * elements(the defaults) were already applied, hence I add the rules before I do
            * the below calculations, for now, all of the rules that the below
            * calculations depend upon are applied at the start of the init function
            * but, I think it's a good idea that any not defaults, but rules that needs a special
            * treatment like the position should be applied here.
            * */

           /* The color scheme or the user may decide to put some padding to valuables.linesClassName
            * the idea is that the top/bottom padding for valubales.linesClassName is determined by
            * valuables.codeClassName, I can't let the user define top/bottom padding as the top/bottom
            * padding reflect the code top/bottom padding, the lines
            * container should start('padding-top') where the code starts, and
            * the padding-bottom, if it will be really big it will
            * make the code element higher than the code made it(the lines container determine
            * the code element height instead of the code inside the code element).
            *
            * Below when I define valuables.linesClassName element I use the style attribute
            * because the padding can be specific for example if the user
            * adds an id to valuables.codeClassName element and at the css the user define some
            * padding to this id.
            *
            * I also allow the user to send a padding value(in pixels), that value will be
            * assign as the padding left/right.
            * */
            linesContainer.style.setProperty('padding-top', paddingTop + 'px', 'important');
            linesContainer.style.setProperty('padding-bottom', paddingBot + 'px', 'important');

            if(attrVal !== '') {

                var defaultUnit = 'px'; // Default

                for(var u in units) {

                    var unitIndex = attrVal.indexOf(units[u]);

                    if(unitIndex > -1) {

                        // Override the default unit(px).
                        defaultUnit = units[u];

                        // There is no reason to keep the iteration.
                        break;

                    }
                }

                if(unitIndex  > -1) {

                    var unitCoefficient = parseFloat(attrVal.slice(0, unitIndex));

                } else {

                    var unitCoefficient = parseFloat(attrVal);

                }

                // No negative values
                if(unitCoefficient >= 0) {

                    linesContainer.style.setProperty('padding-left', ( unitCoefficient + defaultUnit ), 'important');
                    linesContainer.style.setProperty('padding-right', ( unitCoefficient + defaultUnit ), 'important');

                } else {

                    consoleLog('Invalid data-lines attribute value.', true);

                }

            }

           /* I need the element position to be relative/absolute or fixed to
            * allow me to top/left position the valuables.linesClassName container
            * so if the position is static I may set it to be relative, if not, well
            * there are fixed or absolute and both will do the job.
            *
            * I use element.style because each code element can be differently positioned
            * and and depending on each code element position I want to decide whether to
            * apply relative positon or not.
            * */
            if(utils.getStyle(element, 'position') === 'static') {

                element.style.setProperty('position', 'relative', 'important');

            }

            var numberOfLines = utils.getNumberOfLines(element, linesContainer, paddingTop, paddingBot, paddingLeft),
                lines = '';

            while(numberOfLines--) {

               /* numberOfLines + 1, the + 1 is because that loop will decrease
                * the numberOfLines by 1 before the entering the loop and it will
                * end with 0, hence I use + 1.
                * */
                lines = '<span>' + ( numberOfLines + 1 ) + '</span>' + lines;

            }

            linesContainer.innerHTML = lines;

        }

        // I check linesContainer existence because it's only defined inside the above if statement
        if(linesContainer && linesContainer.innerHTML !== '') {

            element.appendChild(linesContainer);

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

            console.log(valuables.codeClassName + ': ' + msg);

        } else {

            throw (valuables.codeClassName + ': ' + msg)

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

            // I could skip the hasOwnProperty check but I'm using it just in case there is a problem with some browser.
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

                // The order isn't important except getStrings must appear first.
                var callbacksArray = [getStrings, getNamedValues];

               /* The only reason I won't wrap ; with span here is because getRules
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

        if(type === 'Javascript') {

          /* Support for ECMAScript 6 template syntax.
           * Must always come first on strings steps, stringsJavascript then stringsGeneral.
           * Explanation about [^\\] is given under the else statement.
           * */
           return fullRest.replace(/\`([\s\S]*?[^\\])\`/g, function(match) {

               return '<span data-string>' + match + '</span>';

           });

        } else { // type === 'General'

           /* For general '' or "" strings, must always be the last strings step so it won't interrupt the others string steps.
            *
            * About the pattern, the old pattern had a problem with 'aaaa\'aaa' strings, so this pattern consider escaped quotes.
            *
            * There is a problem with that pattern, something like: \'asdasda' is considered a valid string, the problem is that
            * javascript regexp engine don't supports negative lookbehind so I don't know if there is a backslash before the first
            * quote, but something like that: \'aad\'asda\' wouldn't be found.
            *
            * The [^\\] is inside the ([\s\S]*?[^\\]) because [^\\] must consume character, if no backslahses were found it will
            * consume the character, so instead of start using subpatterns arguments I include it within the match argument.
            * */
            return fullRest.replace(/(\'|\")([\s\S]*?[^\\])\1/g, function(match) {

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

            // For javascript block comments.
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

    function getMethods(fullRest) {

        return fullRest.replace(/(\.\s*)([\$a-z\_][\$a-z\_\d]*)(\s*\()/gi, function(match, before, method, after) {

            return before + '<span data-method>' + method + '</span>' + after;

        });

    }

    function getProperties(fullRest) {

        return fullRest.replace(/(\.\s*)([\$a-z\_][\$a-z\_\d]*)(\s*\=)/gi, function(match, before, property, after) {

            return before + '<span data-property>' + property + '</span>' + after;

        });

    }

    function getObjects(fullRest) {

       /* The following regexp require an explanation... for the explanations I will use: this.test.subject.name
        * The regexp must much 'test' and 'subject' but if I use (\.\s*)([\$a-z\_][\$a-z\_\d]*)(\s*\.) with before, after
        * and object sub patterns,  I won't be able to match multiple objects('test' and 'subject') I will only match
        * 'test', the regexp after the match consumed the dot(.) before 'subject', so the next lookup will have 'before.' instead
        * of '.before.' so I must disable this character consumption by using (?=), so about the pattern:
        *
        * (\s*\.\s*)([\$a-z\_][\$a-z\_\d]*)(?=\s*\.)
        *
        * The unconsumed spaces+dot -> (?=\s*\.) will be captured by the next -> (\s*\.\s*)
        * */
        return fullRest.replace(/(\s*\.\s*)([\$a-z\_][\$a-z\_\d]*)(?=\s*\.)/gi, function(match, before, object) {

            return before + '<span data-object>' + object + '</span>';

        });

    }

    function getIdentifiers(fullRest) {

       /* Important to note that the regexp will not count for every identifier, there are many weird
        * identifiers with ECMAScript 5/6/7, but for most identifiers I'v ever saw the pattern will count.
        * */
        return fullRest.replace(/\&?([\$a-z\_][\$a-z\_\d]*)\;?/gi, function(match, identifier) {


           /* &lt; or &gt; the gt/lt part can be identify by the pattern as identifiers hence I get:
            *
            * &<span data-identifier>lt</span>;
            *
            * And instead of having for example:
            *
            * for(var i = 0; i < 20; i++) I get: for(var i = 0; i &lt; 20; i++)
            *
            * So the first step to fix that problem is by adding to the pattern above conditional( using ? ) & and ;
            *
            * There are 3 conditions to return the match, the first is that the match starts with &, the second is
            * that the match ends with ';' and the third is that the identifier is 'lt' or 'gt'.
            *
            * If 1 of the above is false I act regularly, but if they all true I return the match(do nothing).           *
            *
            * If I will find out that there are problems with other escaped characters as with < or > I can
            * instead of doing ( identifier === 'lt' || identifier === 'gt' ) to use an array with
            * ['lt', 'gt', 'so on...'] and use ( arr.indexOf(identifier) > -1 ) but for now I won't 
            * complicate anything.
            * */

            var escaped = {
                before: match.indexOf('&') === 0 ? true : false,
                after: valuables.stringEndsWith(match, ';') ? true : false 
            };


            if(( escaped.before && escaped.after ) && ( identifier === 'lt' || identifier === 'gt' )) {

                return match;

            }

            return ( escaped.before ? '&' : '' ) + '<span data-identifier>' + identifier + '</span>' + ( escaped.after ? ';' : '' );

        });

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

    function getInsideStylesheet(fullRest) {

        return fullRest.replace(/\&lt\;style(\s+[\s\S]*?)?\&gt\;([\s\S]+?)\&lt\;\/style\&gt\;/gi, function(match, attributes, stylesheetContent) {

            // The attributes parameter may be undefined, for that kind of case I set it to empty string('').
            if( ! attributes) {
                attributes = '';
            }

            return '&lt;' + 'style' + attributes + '&gt;' + formatContent(stylesheetContent, 'stylesheet') + '&lt;' + '/' + 'style' + '&gt;';

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

                        if(trimedTypeSearch !== 'javascript' && trimedTypeSearch !== 'text/javascript' && trimedTypeSearch !== 'module') { // Nor javascript, text/javascript or module(for ecmascript 6 modules)

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
                        ? formatContent(scriptContent, 'javascript')
                        : scriptContent) + closeScriptTag;

            });

        }

        return returnedContent;

    }

    function replacement(subPattern, type, defaultType, syntax) {

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

        // Notice there are no break statements because the cases use return statements.
        switch(type) {

            case 'methods':

                return before + getMethods(subPattern) + after;

            case 'properties':

                return before + getProperties(subPattern) + after;

            case 'objects':

                return before + getObjects(subPattern) + after;

            case 'identifiers':

                return before + getIdentifiers(subPattern) + after;

            case 'numbers':

                return before + getNumbers(subPattern) + after;

            case 'stylesheetImport':

                return before + getImport(subPattern) + after;

            case 'docType':

                return before + getDocType(subPattern) + after;

            case 'insideJavascript':

                return before + getInsideJavascript(subPattern) + after;

            case 'insideStylesheet':

                return before + getInsideStylesheet(subPattern) + after;

            case 'stylesheetRules':

                return before + getRules(subPattern) + after;

            case 'stylesheetSelectors':

                return before + getSelectors(subPattern) + after;

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
                     * Javascript(capital J) or General(capital G), for example from 'stringsGeneral' get 'General'
                     * */
                    return before + getStrings(subPattern, type.slice(7)) + after;

                } else { // Default is rest, I didn't think about making function just so it returnes strings so:

                    return before + '<span data-rest>' + subPattern + '</span>' + after;

                }

        }

    }

    function inBetweenAllSteps(content, type, syntax) {

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

                return replacement(subPattern, type, 'before', syntax);

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

                return replacement(subPattern, type, 'inBetween', syntax);

             }

            // In case there is only spaces I will return the match as it is to keep the code structure intact.
            return match;

        });

        // I must use + and not * in the pattern so the pattern won't wrap '' inside a span(<span data-rest></span>).
        var after = inBetween.replace(/<\/span>((?:(?!<\/span>)[\s\S])+)$/, function(match, subPattern) {

            if(subPattern.trim().length > 0) {

                return replacement(subPattern, type, 'after', syntax);

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
        return noSpans ? after : replacement(after, type, null, syntax);
    }

    function formatContent(content, syntax, rootCall) {

        /* About .replace(/</g, '&lt;').replace(/>/g, '&gt;')
         *
         * First let me say that I know that textarea element will auto escape < and > and I don't have to do it
         * myself, but for any case where there is a browser that doesn't auto escapes < and > I do it and I have reasons...
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
         * 5. Depending on the place where <span> will be placed we will know what content will be skiped, the
         *    last problem is that when innerHTML'd the browser will autocomplete the <span> closing tag, the
         *    order is: <span>skiped code<span data-x>x-content</span><span data-y>y-content</span></span>
         *    as you can see the skiped code along with the special spans(keywords, strings) will be contained inside the <span>
         * */

        content = content.replace(/</g, '&lt;').replace(/>/g, '&gt;');

       /* The reason for the rootCall parameter is to limit the following actions only to root call to this function(formatContent).
        *
        * When data-syntax="*" there will be internal calls to formatContent function, but the actions inside the following if
        * statements MUST run over the full content and not content inside <style></style> or <script></script> and so on.
        *
        * The first action is lines removal, empty lines that appears before and after the actual content.
        * The second action is indentetion of the content, the indentetion should be trimed equally among all the content lines.
        * */
        if(rootCall) {

           /* The following content that is inside this if statement is intended to cut empty lines before and after the content,
            * the user might decide to drop the SOURCE CODE inside the valubles.codeClassName and don't care about the empty lines
            * before and after the SOURCE CODE, I need to remove them for 2 reasons:
            *
            * 1. If this system won't exist, the user will have to break the indentetion hierarchy so it won't have an empty line,
            *    for example here is what the user might do:
            *
            *    <body>
            *      valuables.codeClassName
            *        SOURCE CODE
            *    /valuables.codeClassName <<<<<<<<<<<<<<<<<< Take a look how the user MUST align the closing tag to the body
            *    </body>
            *
            * If the user won't align the closing tag to the body the empty spaces/tabs will create a new line.
            *
            * Now we face another problem, what about this case:
            *
            *    <body>
            *      valuables.codeClassName
            *
            *        SOURCE CODE
            *
            *      /valuables.codeClassName <<<<<<<<<<<<<<<<<< Take a look how the user MUST align the closing tag to the body
            *    </body>
            *
            * The user might decide just to drop the code even due it will couse empty lines to appear.
            *
            * 2. The second reason is because the next system that removes tabs/spaces before the SOURCE CODE itself relay upon
            *    that system to remove the new lines before the beginning of the first SOURCE CODE line, read the second system
            *    explanation to understand why.
            *
            * Let me first explain the before cutter code:
            *
            * To understand the first line '\n' + content you first need to understand the second line...
            * The second line is used to remove all of the spaces(tabs, new lines and spaces) from the beginning of the content,
            * the first part of the pattern is ^\s*$ with the /m modifier is used to match the beginning and end of a line BUT
            * and here is a big BUT as you can see the match is greedy meaning even if there are few lines before the content
            * starts their all picked up by the use of * without ? after.
            *
            * The use of * and not + is explained later...
            *
            * After the regexp engine finds the first non \s character it will retreat and match the \n, you might ask well why
            * do you match the \n?, well the reason is because if I will just replace /^\s*$/m with '' the content will have
            * an empty line before the actual content starts(source code), the reason is that each line starts with \n and
            * not because content = '\n' + content, no the reason is because the empty spaces/tabs or what even we have cleaned-up
            * had a \n at the end of their final line, for example:
            *
            * ' clean-this-up
            *        more spaces
            *     \n
            * ACTUAL CONTENT'
            *
            * So after we get the actual content we need to go back and pick the final line \n, you might ask why don't you just
            * use /^\s*$/m, well I could but there is a problem with indented actual content, here is an example:
            *
            * 'clean-me-up-spaces
            *          ACTUAL CODE'
            *
            * What will happed is that the ACTUAL CODE indentetion will be removed.
            *
            * Now to the '\n' + content, the match is not global, meaning after the first match there will be no more looking around.
            * But what if we have just ACTUAL CONTENT:
            *
            * 'ACTUAL CONTENT
            *  an empty line
            *  SOME MORE ACTUAL CONTENT'
            *
            * The problem is with that empty line, this empty line is inside the actual content and not before it, so to ensure that
            * the pattern will match only from the beginning I prepend the '\n'.
            *
            * Finally the reason for * and not + as promised, If there is only ACTUAL CODE, there are no new lines or spaces before,
            * well except '\n' I manually prepend, for that kind of case, if I used +, well the '\n' I added would be captured by
            * the ^\s*$ portion of the pattern while the \n after the $ will not be able to match anything hence the match will fail
            * and the ACTUAL CODE will be left with prepended '\n'.
            *
            * And now let me explain the after cutter code:
            *
            * This time the story is extremly easy to understand, the pattern /\s+$/ is used to get all the
            * spaces/tabs at the end of the entire content, for example(the following SPACES will be removed):
            *
            * 'CODE
            *  CODE SPACES SPACES
            *  SPACES SPACES'
            *
            * Notice that I don't care the the spaces after the last line CODE is removed.
            * */

            // The following 2 lines is used to cut the before spaces.
            content = '\n' + content;
            content = content.replace(/^\s*$\n/m, '');

            // The following line is used to cut the after spaces.
            content = content.replace(/\s+$/, '');

           /* The following tmpContent is the full content with all empty lines removed, well why do I do that?,
            * the next system is used to iterate over all the lines and find the line with the lowest number of
            * tabs/spaces, this lowest number will be used in a pattern later to remove unwanted indentetion, the long
            * story with examples is explained below, but the following system problem that require the content without
            * any empty lines at all is as follows:
            *----------------
            *   CODE
            *
            *       CODE
            *
            *   CODE
            *----------------
            *
            * There are 5 lines of content above, 3 of the lines above need 2 tabs removed infront of them, BUT there are 2
            * empty lines and those empty lines will affect how the following system finds the lowest number of tabs/spaces.
            *
            * So to make the following system to fetch the lowest number of tabs/spaces correctly I temporarily and restricted
            * to tmpContent variable remove all empty lines.
            *
            * You might ask, why the following system pattern is using * and not +, if I replace the * with + it will solve the
            * problem but there is one case the explained below that won't let me use +.
            * */
            var tmpContent = content.replace(/^\s*$\n/gm, '');

            /* The below system that includes 2 callback replacements is used to remove unwanted spaces/tabs that appended
             * to their source code they intended to highlight after they past the code inside the valuables.codeClassName element.
             *
             * If you take a code and past it inside an element within a text editor you might have prepended that content with some
             * spaces or tabs, even if you don't, you might want to because its shouldn't interrupt the indentetion hierarchy for example:
             *
             * <body>
             *   valuables.codeClassName
             *     SOURCE CODE
             *   /valuables.codeClassName
             * </body>
             *
             * With the above user markup the result will be something like:
             *
             * 1|     SOURCE CODE
             * 2|      SOURCE CODE
             * 3|    SOURCE CODE
             *
             * The unwanted spaces are between the first line | to the first line S(SOURCE CODE), why the first line?, well thats because
             * the first line should be without indentetion at all(not including valuables.codeClassName paddings off course).
             *
             * The first line can equal to a global in programming language, well globals don't have indentetion, same for css imports
             * or html doctype.
             *
             * Anyway, the ideal case is to have something like:
             *
             * 1|SOURCE CODE
             * 2| SOURCE CODE
             * 3|SOURCE CODE
             *
             * To achive that without this system the user had to do something like:
             *
             * <body>
             *   valuables.codeClassName
             *SOURCE CODE
             *   /valuables.codeClassName
             * </body>
             *
             * Well we don't want that right?, so lets explain how the system works...
             *
             * The first replacement callback is used to find the line with the lowest number of spaces and tabs including 0 and that
             * is why * is used within the pattern, the idea is to find the "global indentetion", kind of like a globals in the text
             * editor, we don't indent them.
             *
             * If there isn't an indentetion at all, meaning 0, for example the user might have done something like that:
             *
             * <body>
             *   valuables.codeClassName
             *SOURCE CODE
             *   /valuables.codeClassName
             * </body>
             *
             * For that kind of case there will be no replacement at all due to the if statement below this replace callback,
             * the if surrounding the second replacement callback.
             *
             * That brings us to ask what is the second callback used for?, and why the pattern in there is using + and not *?
             *
             * The second callback is used to reiterate the lines as the first callback did, but if the if statement entered
             * that means that all the lines have tabs/spaces and that is why I know I can use +.
             *
             * Now after we are inside the if statement we build a pattern, the patter will capture tabs/spaces but only a
             * specific number of them, that will be the lowest number of tabs/spaces found after the first replace callback
             * iteration.
             *
             * Lets think about it, the code you about to past already have some indentetion but those are wanted indentetion.
             * After you past the code inside the valuables.codeClassName you indent all the code together, meaning that the unwanted
             * indentetion is equal in each and every line.
             *
             * So for example if the lowest line indentetion have 4 spaces then the unwanted indentetion are 4 spaces, and if the second
             * and third line have 8 spaces then only 4 will be removed.
             *
             * Problems with this system:
             *
             * 1. THERE ARE NO PROBLEMS UNLESS YOU COUSE THEM!, well if you read the "Lets think about it..." above you can understand
             *    what is the basic story, and for the basic story where all unwanted indentetion are equal everything works perfectly.
             *
             * 2. If for example you decide that you don't indent all your code the same, NOW THAT IS REALLY A RARE/WEIRD CASE, but
             *    lets say you did, it will affect the system, because if 1 line have no indentetion then the system will think that
             *    nothing needs indentetion removal, the if statement latestLen > 0 won't enter, if 1 line have some indentetion but
             *    the rest of the global indentetions are bigger then again it will affect the system because even the if statement
             *    will enter only the small number of spaces/tabs that 1 line had will be removed from the rest of the indentetions
             *    for all the lines.
             *
             * About problem number 2 you might ask why don't you compare for example the 2 smallest number of spaces/tabs, for example
             * there will be 2 groups, group A will represent that sinle problem maker line, and the rest of the globals indentetions
             * line will be presented as group B, I could check what group is bigger no?
             *
             * The answer is NO, the reason is because for example there are only 2 indentetions groups how can I decide,
             * if the group A will have no indentetions at all but group B have few spaces/tabs, if I pick group B then I destroy
             * group B spaces/tabs.
             * */

             var latestLen = null;

             tmpContent = tmpContent.replace(/^[\t ]*/gm, function(match) {

               // First time
               if(latestLen === null) {

                 latestLen = match.length;

               } else {

                 if(match.length < latestLen) latestLen = match.length;

               }

               return match;

             });

             if(latestLen > 0) {

               // Using double backslashes so that one escape the other to be used in the regexp to escape the t.
               var pattern = new RegExp('^[\\t ]{' + latestLen + '}');

               content = content.replace(/^[\t ]+/gm, function(match) {

                 return match.replace(pattern, '');

               });

            }

        }

        var steps = [];

        switch(syntax) {

            case 'markup':

                steps.push('commentsMarkup');
                steps.push('markupOpeningTags');
                steps.push('markupClosingTags');
                steps.push('docType');

            break;

            case 'javascript':

                steps.push('commentsBlock');
                steps.push('commentsSingle');

                // Special kind of strings must act before stringsGeneral, ECMAScript 6 template syntax `strings`.
                steps.push('stringsJavascript');
                steps.push('stringsGeneral');

                steps.push('keywordsFC');
                steps.push('keywordsSC');
                steps.push('keywordsTC');

               /* The following steps must be called before identifiers step because 
                * identifiers will count for all identifiers so it must be called last.
                * */
                steps.push('methods');
                steps.push('properties');
                steps.push('objects');

                // Must be called after methods/properties/objects as it count for all identifiers.
                steps.push('identifiers');

               /* The numbers step must appear after the identifiers step because identifiers can
                * contain numbers, hence using numbers step before identifiers may shorten identifiers name,
                * for example  with variable/function length, if within var name5 the name5 should be wrapped
                * only the name will be wrapped, or var name2name both 'name' will be wrapped without the 2 in between them.
                * */
                steps.push('numbers');

            break;

            case 'stylesheet':

                steps.push('commentsBlock');
                steps.push('stylesheetImport');
                steps.push('stylesheetRules');
                steps.push('stylesheetSelectors');

            break;

            case '*':

                steps.push('insideJavascript');
                steps.push('insideStylesheet');

               /* The following markup steps(functions) can't appear before insideJavascript/insideX steps
                * because if the steps(functions) appear before they won't know to recognize what is markup and what
                * is javascript/another supported syntax, the logic is simple, each insideFunction(javascript/etc) will
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

            content = inBetweenAllSteps(content, steps[key], syntax);

        }

        return content;

    }

    utils.addListener(window, 'load', init);

   /* There are cases with single page aplications where the page loads but only
    * particular partials have textarea elements, but it's to late because the load event
    * was already fired, so to restart the proccess I expose the highlight method.
    *
    * This method must be called after the textarea element.
    * */
    window.Highlighter = {
        lateInit: function(delay) {
            if(!delay) delay = 0;
            /* When single page aplication partial will load user may think that they can use
             * Highlighter.lateInit() immediately after the view was rendered but if you call
             * Highlighter.lateInit() and for some reason framework/anything the content hasn't loaded
             * yet, well Highlighter.lateInit() is being called immediately and expect to find the DOM 
             * populated with valuables.codeClassName, to solve that problem a setTimeout is used.
             *
             * For most cases when the user call Highlighter.lateInit right after the content is inserted 
             * into the DOM there should be no problem with setTimeout with 0 delay, but for users that 
             * can't or don't call Highlighter.lateInit that way I allow optional delay parameter, that way 
             * users may upper the delay to adjust the content loading to the actual init by setTimeout call.
             * */
            setTimeout(init, delay);
        }
    };

})(window, document);