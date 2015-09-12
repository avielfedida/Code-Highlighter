<p align="center">
	<img height="135" width="387" src="http://i.imgur.com/vbcjpkX.png">
</p>

---

> Highlights your code, markup and stylesheet

## Installation

```
bower install code-highlighter
```

Or would you prefer a cdn: `//cdn.jsdelivr.net/code-highlighter/1.3.0/code-highlighter.min.js`

After reading this brief installation, you should read the rest of the sections because the following examples **doesn't** reflect the full power this framework offers, moreover moreover you'll avoid any future misconceptions.

Simply include `code-highlighter.min.js` anywhere within your page and add:

```html
<textarea data-syntax="php" class="code-highlighter" data-url="code/location"></textarea>
```

There are 8 color schemes for the moment that you can add via `data-color-scheme="schemeName"`:

```html
<textarea data-syntax="php" data-color-scheme="apple" class="code-highlighter" data-url="code/location"></textarea>
```

The `data-url` is the location of the code you would like to highlight, but of course you can directly drop the code you want to highlight into the `<textarea>`:

```html
<textarea class="code-highlighter" data-syntax="markup">
    <div>Content</div><!-- This element will be highlighted -->
</textarea>
```

## Features

The above attributes are the most basic attributes for using code highlighter, but here are some more interesting attributes to easily style `.code-highlighter`, the following attributes may be optional or not, some of them when presented must have a value(predefined or user defined value), the `css` rules they apply used **!important**, so read the notes on each and use carefully:

1. `data-lines`(**optional**) is used to add line numbers, you can additionally add a padding value to the lines column to override the color scheme default lines column left/right padding, for example: `data-lines="1.2em"`, you don't have to supply a unit(px is the default), you can even use the **E notation**, for example `data-lines="2e1"` is `20x10^1px = 20px`.

2. `data-abs-width`(**optional**), is used to include the element padding within the element width(`box-sizing`: `border-box`),  **highly suggested to use**.

## Don't forget

1. You can't omit the `data-syntax` attribute, take a look at the next section for supported languages.

2. If you don't pick a color scheme via `data-color-scheme` the first color scheme will be picked.

## Supported languages

1. Javascript
2. HTML
3. CSS
4. PHP

## No CSS

You may notice from the examples I didn't mentioned any css file to include, and that is on of the best feature this framework offers, the simplicity of implementation, only single script file is needed.

Well not exactly, I did take care of almost everything, but there are rules that are not scheme related, they are case specific, you can style your code containing element via `.code-highlighter` class, the suggested rules you should consider set are:

1. `padding`
2. `font-family`
3. `font-size`
3. `letter-spacing`

## Limitations

1. No support for IE8, don't ask me why it's a limitation.
2. Regex based, so there may be some edge cases.
4. Support only Javascript, PHP, Markup(`html`) and stylesheets(`css`) for the moment.

## Supported color schemes:

1. Apple, white background color scheme.
2. Banana, black background color scheme.
3. Peach, black background color scheme.
4. Melon, white background color scheme.
5. Mango, white background color scheme.
6. Olive, black background color scheme.
7. Orange, white background color scheme.
8. Papaya, black background color scheme.

if you won't pick a color scheme via `data-color-scheme` the `apple` color scheme will be chosen by default.

## Editing the source code

If you open up `code-highlighter.js` you will find out that there is about **60%** code and **40%** comments, I'v worked really hard to make sure the code can be easily edited, there are few things you may want to edit so let me point you to the right place where to edit:

1. Each color scheme has it's own default colors(`strings`, `keywords`, `etc`), also there is a line numbers default color scheme for each color scheme, lookup for the `colorSchemes` object to edit the default colors and `background-color`, lookup for `schemesOverallStyles` object to edit lines color scheme and selection rules.

2. There are default rules applied to `code-highlighter` class and related(descendants) elements at the beginning of the `init` function, you might want to take a look there.

3. Due to the fact that this engine is regex based and keywords can appear within variable name, for example `$echoMe`, well `echo` is a `php` keyword, hence the `echo` within `$echoMe` will be highlighted with a keyword color, to fix that I added the `valuables.withMeaning` object, this object contains objects that relates to specific syntaxes and 1 object(`valuables.withMeaning.multiMeaning`) that relates to all syntaxes, the idea is well explained at the code, but for example we can "say" via `regexp` that we want our engine to apply the `echo` keyword color only if the `echo` have a space(`echo `) afterwards, it's a pretty unique feature, you should read the comments near `valuables.withMeaning` to get a better understanding.

## Notes

> Spend 5 minutes reading those notes to avoid unnecessary problems with the framework.

1. `data-url`(**optional**) is used to upload any kind of content with the following exception:

	* The problem is with requesting files from the server that the server forward for parsing, for example to load `.php` files, the server will identify that the extension is `.php` hence forward the file to the PHP engine configured for that server, hence the returned content will be `text/html` and not the `.php` file **source code**, there are 2 solutions:

		1. Changing the `.php` to `.txt` or `.html`.
		2. Directly drop the `.php` source code into the `<textarea>`.

2. The `data-url`(**optional**) path is relative to the where `code-highlighter.min.js` is loaded, for example let's assume those paths:

	* Your code is location: `/codes/js/ajax.js`
	* Your main `index.html` file is located at the root, so `/index.html`
	* `code-highlighter.min.js` location is `js/frm/code-highlighter.min.js`

	Given those paths:

	* `index.html` will use `script` with `src` set to `js/frm/code-highlighter.min.js`
	* Your `data-url` within `index.html` will contain `codes/js/ajax.js`

3. `data-color-scheme`(**optional**) is used to pick a color scheme, if you omit this attribute, the first color scheme within the color schemes object in the code will be chosen.

4. `data-syntax`(**you must pick a value, not optional**):
	* `markup` for html highlighting.
	* `stylesheet` for css highlighting.
	* Supported programming languages such as `php` or `javascript`.
	* `*` will highlight `stylesheet` under `style` element, `php` under php opening/closing tags(`<??>`, `<?php?>`, `<%%>`, `<%=%>`, `<?=?>`), `javascript` under `script` tags, the rest of the code will be considered as `markup`.

5. The `.code-highlighter` class **must** be added to `textarea` element, this element will be replaced with `pre` + `code` elements, there are reasons for that, if you would like to style the element containing your code use the `code-highlighter` class in your stylesheet.

**Enjoy !**

## Contact

Feel free to contact me via my email: `avielfedida@gmail.com`.

###### Version: `1.3.0`

###### License: `MIT`
