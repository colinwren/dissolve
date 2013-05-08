/*
 * dissolve
 * https://github.com/colinwren/dissolve
 *
 * Copyright (c) 2013 Colin Wren
 * Licensed under the MIT license.
 */

(function($) {

  function random (max) {
    return Math.floor(Math.random() * max);
  }

  // Wrap each letter in a span with a random numbered dissolve class
  $.fn.prepareText = function (options) {

    // Override default options with passed-in options.
    options = $.extend({}, $.fn.dissolve.options, options);

    // Final element contents
    var buffer = '';

    var characters = this.html().split('');
    for (var i = 0; i < characters.length; i++) {
      var character = characters[i];

      // Skip over tags
      if (character === '<') {
        var tagEnd = $.inArray('>', characters, i);
        buffer += characters.slice(i, tagEnd + 1).join('');
        i = tagEnd;

      // Wrap letter in dissolve class
      } else {
        buffer += '<span class="dissolve' + random(options.count) + '">' + character + '</span>';
      }
    }

    // Replace old contents prepared for fade
    this.html(buffer);

    return this;
  };

  function fadeChar (element, options, callback) {
    options.count--;
    var done = options.count < 1;
    var toFade = element.find('.dissolve' + options.count);
    var fadeCounter = toFade.length;

    toFade.fadeTo(options.fadeTime, options.opacity, function() {
      if (done && typeof callback === 'function') {
        fadeCounter--;
        if (fadeCounter === 1) callback();
      }
    });

    if (!done) {
      window.setTimeout(function(){
        element.fadeCharacters(options, callback);
      }, options.fadeOffset);
    }
  }

  $.fn.fadeCharacters = function (options, callback) {

    // Override default options with passed-in options.
    options = $.extend({}, $.fn.dissolve.options, options);

    fadeChar(this, options, callback);
  };

  $.fn.dissolve = function(options, callback) {

    this
      .each(function() {
        // Prepare the element for fading
        $(this).prepareText(options);
      })
      .fadeCharacters(options, callback); // Begin fading

    return this;
  };

  // Static method default options.
  $.fn.dissolve.options = {
    count: 8,        // Number of fade classes
    opacity: 0,      // Opacity to fade to
    fadeTime: 3000,  // Length of time it takes to fade to opacity
    fadeOffset: 1000 // Time between the different classes begin to fade
  };

}(jQuery));
