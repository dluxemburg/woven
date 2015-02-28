# Woven

A very *very* immature tool for extracting semating data from web pages, primarily targeting the browser, with no external runtime dependencies.

Include it on your page:

```html
<script src="woven.min.js"></script>
```

`require` it in Node/io.js

```javascript
var woven = require("woven")
```

All methods take an `HTMLDocument` or `HTMLElement` as the first argument. You can get ahold of one in the browser:

```javascript
// as the main document global variable
var doc = document

// with any `getElement-*` method
var elem = document.getElementById("some-element")

// by parsing some HTML
var parser = new DOMParser()
var html = "<meta name='a' content='b'>"
var docFragment = parser.parseFromString(html, "text/html")

// with some help
var elem = $("#some-element")[0]
```

In Node/io.js, you can use [jsdom](https://github.com/tmpvar/jsdom) (or similar):

```javascript
var jsdom = require("jsdom")
var html = "<meta name='a' content='b'>"
var docFragment = jsdom.jsdom(html)
```

## Data Sources

### [Schema.org](http://schema.org/) Data

Given a `docFragment`:

```html
<div itemscope itemtype="http://data-vocabulary.org/Person">
   My name is <span itemprop="name">Bob Smith</span>,
   but people call me <span itemprop="nickname">Smithy</span>.
   Here is my homepage:
   <a href="http://www.example.com" itemprop="url">www.example.com</a>.
   I live in
   <span itemprop="address" itemscope
      itemtype="http://data-vocabulary.org/Address">
      <span itemprop="locality">Albuquerque</span>,
      <span itemprop="region">NM</span>
   </span>
   and work as an <span itemprop="title">engineer</span>
   at <span itemprop="affiliation">ACME Corp</span>.
</div>
```

```javascript
woven.extractSchemaItems(docFragment) // =>
[ { itemtype: 'http://data-vocabulary.org/Person',
    name: 'Bob Smith',
    nickname: 'Smithy',
    url: 'www.example.com',
    address:
     { itemtype: 'http://data-vocabulary.org/Address',
       locality: 'Albuquerque',
       region: 'NM' },
    locality: 'Albuquerque',
    region: 'NM',
    title: 'engineer',
    affiliation: 'ACME Corp' },
  { itemtype: 'http://data-vocabulary.org/Address',
    locality: 'Albuquerque',
    region: 'NM' } ]
```

### Page `<meta>` Data

Given a page:

```html
<html>
  <head>
    <meta name="title" content="I Am a Teapot">
    <meta name="keywords" content="self being vessel">
    <meta property="og:title" content="I Am a Teapot">
    <meta property="not-real-property" content="418">
  </head>
  <body>
    <h1>I Am a Teapot</h1>
  </body>
</html>
```

```javascript
woven.extractDocumentMeta(document) // =>
{ title: 'I Am a Teapot',
  keywords: 'self being vessel',
  'og:title': 'I Am a Teapot',
  'not-real-property': '418' }
```

### [Microformats](http://microformats.org/)

Work in progress.

#### [hAudio](http://microformats.org/wiki/haudio)

(Look, it's the one I needed)

Given a `docFragment`:

```html
<div class="haudio">
   <span class="fn">Start Wearing Purple</span> by
   <span class="contributor">
        <span class="vcard">
            <span class="fn org">Gogol Bordello</span>
        </span>
    </span>
   found on
   <span class="album">Underdog World Strike</span>
</div>
```

```javascript
woven.extractHAudio(document) // =>
[ { fn: 'Start Wearing Purple',
    contributor: 'Gogol Bordello',
    album: 'Underdog World Strike' } ]
```

## Development

### Tests

They're in [Mocha](http://mochajs.org/).

```
$ mocha test/*
```

Or, automatically

```
$ mocha watch test/*
```

### Building

```
$ gulp
```

Builds the [Browserified](http://browserify.org/) version, a minified version of that and corresponding source map.

### TODO

- `extractAll` method
- `extractMicroformats` method
- More individual microformats
- Meaningful breakdown of common `meta` tags
- Interface for page meta with fallthrough for values
- More real-world example tests
- Browser-based tests?
- Visualizer?