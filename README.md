<p align="center">
	<img height="135" width="387" src="http://i.imgur.com/Bi4BiPX.png">
</p>

---

Less than a minute, that's what it takes for a basic use of this code highlighter.

Pure JS, with support up to IE8(don't ask me why), highlighted scripts can be auto loaded by Ajax.

No css files to include, there are prebuilt color schemes.

You can [edit/add color schemes](www.github.com), and [edit/add keywords restrictions](www.github.com).

Include `code-highlighter.min.js` anywhere within within your page, and then add:

```html
<textarea data-syntax="markup" class="code-highlighter" data-url="my/markup/location"></textarea>
```

There are 6 color schemes for the moment that you can add via `data-color-scheme="schemeName"`:

```html
<textarea data-syntax="markup" data-color-scheme="summer" class="code-highlighter" data-url="my/markup/location"></textarea>
```

The `data-url` is the location of the markup you would like to highlight, the location is relative to the file where `code-highlighter.min.js` is loaded.

Of course you can directly drop the markup you want to highlight into the `<textarea>`:

```html
<textarea class="code-highlighter" data-syntax="markup">
    <div>Content</div><!-- This element will be highlighted -->
</textarea>
```

There is a problem when using `data-url` to load `.php` files, the problem is that the server will identify that the extension is `.php` hence forward the file to the php engine on the server, the idea is that the ajax response will be the `.php` output, **not the .php source code**.

There are **2** solutions:

1. Changing the `.php` to `.txt` or `.html`.
2. Directly drop the `.php` source code into the `<textarea>`.

For more information about why and how please refer to the [wiki]().

###### Version: `1.0`

######License: `MIT`