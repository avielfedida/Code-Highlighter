<p align="center">
	<img height="135" width="387" src="http://i.imgur.com/vbcjpkX.png">
</p>

---

> Highlights your code, markup and stylesheet

## Installation

```
bower install code-highlighter
```

Or would you prefer a cdn: `//cdn.jsdelivr.net/code-highlighter/2.1.0/code-highlighter.min.js`

## Usage

Include `code-highlighter.min.js` anywhere within your page, then:

```html
<textarea data-syntax="javascript" class="code-highlighter">
	
	HIGHLIGHTED CODE

</textarea>
```

**DON'T REMOVE "CODE-HIGHLIGHTER" CLASS**

To keep things simple the color schemes are built-in(no need for furture css files), there are 
8 color schemes for the moment, to specify a color scheme use `data-color-scheme` attribute:

```html
<textarea data-syntax="javascript" data-color-scheme="apple" class="code-highlighter">
	"APPLE" HIGHLIGHTED CODE
</textarea>
```

**NOT SPECIFYING A COLOR SCHEME WILL RESULT THE "APPLE" TO BE APPLIED**

For convenience purposes use `data-url` to load `html/css/js` files:

```html
<textarea data-syntax="javascript" data-url="code.js" class="code-highlighter"></textarea>
```

## Attributes

This highlighter is mainly controlled by attributes, there are 5 attributes with only 1 required.

#### data-syntax(required)

Supported values are `javascript` for `JS`, `markup` for `HTML`, `stylesheet` for `CSS` and `*` is used for `HTML` pages with embedded `JS` and `CSS`, `JS` code will be highlighted under `<script>` and `CSS` under `<style>` respectively.

#### data-url(optional)

For convenience purposes use `data-url` to load `html/css/js` files:

```html
<textarea data-syntax="javascript" data-url="code.js" class="code-highlighter"></textarea>
```

#### data-abs-width(optional, default "true")

Styling attribute, as default `.code-highlighter` is given `box-sizing: border-box`, to undo:

```html
<textarea data-syntax="javascript" data-abs-width="false" class="code-highlighter"></textarea>
```

#### data-lines(optional, default "1em" IF EMPTY ATTRIBUTE IS DELIVERED)

Is used to add line numbers, you can additionally add a padding value to the lines column to override the color scheme default lines column left/right padding, for example: `data-lines="1.2em"`, you don't have to supply a unit(px is the default), you can even use the **E notation**, for example `data-lines="2e1"` is `20x10^1px = 20px`.


#### data-color-scheme(optional, default "apple")

Used to choose a color scheme, to keep things simple the color schemes are built-in(no need for furture css files), there are 8 color schemes for the moment:

```html
<textarea data-syntax="javascript" data-color-scheme="olive" class="code-highlighter">
	"APPLE" HIGHLIGHTED CODE
</textarea>
```

## Adjust CSS

There is no specific `font-family`, `font-size`, `letter-spacing` nor `padding` applied, those rules are left for you to adjust.

## Highlighter.lateInit()

Single page aplication tendency is to load partials, the problem is that once the page loads the framework will 
lookup for `textarea` elements with class name of `code-highlighter`, if a partial loads asynchronously you need 
to manually initiate the process by using `Highlighter.lateInit()`.

## Limitations

1. No support for IE8, don't ask me why it's a limitation.
2. Regex based, so there may be some edge cases.
4. Support only `JS`, `HTML` and `CSS` for the moment.

## Supported color schemes:

1. Apple, white background color scheme.
2. Banana, black background color scheme.
3. Peach, black background color scheme.
4. Melon, white background color scheme.
5. Mango, white background color scheme.
6. Olive, black background color scheme.
7. Orange, white background color scheme.
8. Papaya, black background color scheme.

## Contact

Feel free to contact me via my email: `avielfedida@gmail.com`.

###### Version: `2.1.0`

###### License: `MIT`