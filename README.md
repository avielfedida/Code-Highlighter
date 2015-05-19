<p align="center">
	<img height="135" width="387" src="http://imagizer.imageshack.us/a/img540/1338/qL3t1V.png">
</p>

---

> Highlights your code, markup and stylesheet

## Installation

After you read the brief installation, you should read the rest of the sections because the following examples **doesn't** reflect the full power of this framework and you will avoid any future misconceptions.

Simply include `code-highlighter.min.js` anywhere within your page and add:

```html
<textarea data-syntax="php" class="code-highlighter" data-url="code/location"></textarea>
```

There are 5 color schemes for the moment that you can add via `data-color-scheme="schemeName"`:

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

The above attributes was the most basic attributes for using code highlighter, but here are some more interesting attributes:

1. `data-lines` is used to add line numbers, you can additionally add a padding value, for example: `data-lines="1.2em"`, you don't have to supply a unit(px is the default), you can even use the **E notation**, for example `data-lines="2e1"` is `20x10^1px = 20px`.
2. `data-abs-width` is used to include the element padding within the element width(`box-sizing`: `border-box`).
3. `data-scroll="down|right"`, pick `down` when your code is really long, pick `right` if the code is pretty wide.

The `data-scroll` is not an optianal attribute but a requirement, although I try to make this framework really simple to implement, the `data-scroll` define the your code layout, to avoid misconceptions with some default layout, I suggest you to try both, `down` and `right` and choose what's best suit your layout.

I suggest you to play with the above attributes to get a better understanding.

## No CSS

You may notice from the examples I didn't mentioned any css file to include, and that is the power of this framework, the simplicity of implementation, only single script file is needed.

Well not exactly, I did take care of almost everything, but there are rules that are not scheme related, they are case specific, some may implement different rules/values so the basic rules you should set are:

1. `padding`
2. `font-family`
3. `font-size`
3. `letter-spacing`

## Limitations

1. No support for IE8, don't ask me why it's a limitation.
2. Regex based, so there may be some edge cases.
3. Only 5 color schemes for now.
4. Support only JS, PHP, Markup(`html`) and stylesheets(`css`, `scss`).

## Supported color schemes:

1. Apple, white background color scheme.
1. Banana, black background color scheme.
1. Peach, black background color scheme.
1. Melon, white background color scheme.
1. Mango, white background color scheme.

if you won't pick a color scheme via `data-color-scheme` the `apple` color scheme will be chosen by default.

## Notes

> Spend 5 minutes reading those notes to avoid unnecessary problems with the framework.

1. `data-url` is used to upload any kind of content with the following exeption:

	* The problem is with requesting files from the server that the server forward for parsing, for example to load `.php` files, the problem is that the server will identify that the extension is `.php` hence forward the file to the php engine configured for that server, hence the ajax response with `.php` output, **not the .php source code**, there are 2 solutions:

		1. Changing the `.php` to `.txt` or `.html`.
		2. Directly drop the `.php` source code into the `<textarea>`.

2. The `data-url` path is relative to the where `code-highlighter.min.js` is loaded, for example lets assume those paths:
	
	* Your code is location: `/codes/js/ajax.js`
	* Your main `index.html` file is located at the root, so `/index.html`
	* `code-highlighter.min.js` location is `js/frm/code-highlighter.min.js`
	
	Given those paths:

	* `index.html` will use `script` with `src` set to `js/frm/code-highlighter.min.js`
	* Your `data-url` within `index.html` will contain `codes/js/ajax.js`

3. `data-color-scheme` is used to pick a color scheme, if you omit this attribute, the first color scheme within the color
	schemes object in the code will be chosen.

4. `data-syntax` can contain:
	* `markup` for html highlighting.
	* `stylesheet` for css highlighting.
	* Supported programming languages such as `php` or `javascript`.

5. The `code-highlighter` class must be added to `textarea` element, this element will be replaced with `pre` + `code` elements, there are reasons for that, if you would like to style the element containing your code use the `code-highlighter` class in your stylesheet.

**Enjoy !**

About the source code, I worked hard to make the code editable, user friendly and highly commented, `code-highlighter.js` contains about 60% code and 40% comments, so every color scheme, default css rules and much more can be easily removed, replaced or edited.

## Contact

Feel free to contact me at `avielfedida@gmail.com`.

###### Version: `1.0.0`

###### License: `MIT`