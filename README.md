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
### Methods
#### dissolve
```javascript
$('#intro-text').dissolve([,options] [,callback])
```
Calling dissolve on an element will fade all the text it contains to the `opacity` option.  All characters will fade at the same speed but they will start fading at different times. `dissolve` is just an alias to calling `prepareText` and then `fadeCharacters` see the documentation of those methods for more informationon how the text gets prepared and the fading process respectivley.

#### prepareText
```javascript
$.prepareText(text [,options])
```
This method wraps each character of the text passed to it (aside from html tags) in a span with dissolve class with a random number inbetween 0 and the `count` option and returns the processed text.

#### prepareElement
```javascript
$('#intro-text').prepareElement([,options])
```
This runs `prepareText` on the contents of the elements it is called on.

#### fadeCharacters
```javascript
$('#intro-text').fadeCharacters([,options] [,callback])
```
Call this method on elements that have already had `prepareText` called on them!

This method starts fading one of the classes to the `opacity` option over `fadeTime` ms and then wait for `fadeOffset` ms until it starts fading the next class. It will go through each class and when the last class finishes fading, it will be call the callback.
### Options
```javascript
// Defaults
options = {
  count: 8,        // Number of fade classes
  opacity: 0,      // Opacity to fade to
  fadeTime: 2000,  // Length of time it takes to fade to opacity
  fadeOffset: 300 // Time between the different classes begin to fade
};
```
## Examples
### Fade out a block of text:
```javascript
$('#intro-text').dissolve({ fadeTime: 1500 }, function(){
  console.log('Fading is complete!');
});
```
### Fade in a block of text:
```javascript
$('#sample')
  .html($.prepareText('Text to be faded'))
  .fadeCharacters({opacity: 1});
```
In this case, `#sample` should have this CSS so that the contents start out opaque:
```CSS
#sample span {
  opacity: 0;
  // For ie compatability
  filter: alpha(Opacity=0);
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=00)";
}
```

## Todo
- Submit to uheap

## Release History
0.0.2 Initial release
