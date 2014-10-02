This JavaScript library provides a tool to automatically turn `http`/`https`/`ftp `URLs in HTML into links.

Inspired from [autolink-js](https://github.com/bryanwoods/autolink-js) and [Autolinker.js](https://github.com/gregjacobs/Autolinker.js), it has the following distinct features from these 2 projects:

* it creates link with proper DOM calls and without string manipulations (via `innerHTML`), ensuring reduced risks of introducing XSS
* it avoids turning urls in `textarea` into links (which would add spurious markup in the textarea values)

It does not try to handle scheme-less URLs (e.g. `example.com` or `www.example.com` won't be turned into links). It lets set any attributes on the resulting link.

## Basic Usage
Assuming the following HTML
```html
<div>
http://www.example.org https://example.org
<span>http://example.org</span>
<a href="http://example.org">http://example.com</a>
</div>
```

The following script applied to it:
```javajscript
var autolinker = new Autolinker();
autolinker.linkify(document.querySelector('div'));
```

Will result in the following updated HTML:
```html
<div>
<a href="http://www.example.org">http://www.example.org</a> <a href="https://example.org">https://example.org</a>
<span><a href="http://example.org">http://example.org</a></span>
<a href="http://example.org">http://example.com</a>
</div>
```

## Options
The `Autolinker` constructor takes an object for configuration. At this time, the only property used in that object is `attributes`, which is itself an object in which one can set the attributes that should be set in the said links.

Thus, the following script:
```javajscript
var autolinker = new Autolinker({attributes: {rel:"nofollow"}});
```
will generate links with the attribute `rel="nofollow"`.