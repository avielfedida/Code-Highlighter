<p align="center">
	<img height="135" width="387" src="http://imagizer.imageshack.us/a/img540/1338/qL3t1V.png">
</p>

---

> Highlights your code, markup and stylesheet

## Installation

After you read the brief installation, you should read the notes section because the following examples **doesn't** reflect the full power of this framework.

Simply include `code-highlighter.min.js` anywhere within your page and add:

```html
<textarea data-syntax="php" class="code-highlighter" data-url="code/location"></textarea>
```

There are 5 color schemes for the moment that you can add via `data-color-scheme="schemeName"`:

```html
<textarea data-syntax="php" data-color-scheme="summer" class="code-highlighter" data-url="code/location"></textarea>
```

The `data-url` is the location of the code you would like to highlight, but of course you can directly drop the code you want to highlight into the `<textarea>`:

```html
<textarea class="code-highlighter" data-syntax="markup">
    <div>Content</div><!-- This element will be highlighted -->
</textarea>
```

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

For more information about how, why and editing the source code you should visit the wiki.

## Contact

Feel free to contact me at `avielfedida@gmail.com`.

###### Version: `2.0`

###### License: `MIT`