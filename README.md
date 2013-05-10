# Dissolve [![Build Status](https://travis-ci.org/colinwren/dissolve.png?branch=master)](https://travis-ci.org/colinwren/dissolve)

> A tiny jQuery plugin to change the opacity of text character by character. Check out the [Demo](http://colinwren.github.io/dissolve/)!

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/colinwren/dissolve/master/dist/dissolve.min.js
[max]: https://raw.github.com/colinwren/dissolve/master/dist/dissolve.js

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/dissolve.min.js"></script>
<script>
jQuery(function($) {
  $('.textToDissolve').dissolve();
});
</script>
```

## Documentation
### dissolve
```javascript
$('#intro-text').dissolve([,options][,callback])
```
Calling dissolve on an element will fade all the text it contains to the `opacity` option.  All characters will fade at the same speed but they will start fading at different times. `dissolve` is just an alias to calling `prepareText` and then `fadeCharacters` see the documentation of those methods for more informationon how the text gets prepared and the fading process respectivley.

### prepareText
```javascript
$('#intro-text').prepareText([,options])
```
This method takes care of wrapping each character inside the element (it ignores html tags) in a span with dissolve class with a random number inbetween 0 and the `count` option.

### fadeCharacters
```javascript
$('#intro-text').fadeCharacters([,options][,callback])
```
Call this method on elements that have already had `prepareText` called on them!

This method starts fading one of the classes to the `opacity` option over `fadeTime` ms and then wait for `fadeOffset` ms until it starts fading the next class. It will go through each class and when the last class finishes fading, it will be call the callback.

## Examples
_(Coming soon)_

## Todo
- Submit to uheap
- Add to bower
- Add to jquery plugin registry

## Release History
_(Nothing yet)_
