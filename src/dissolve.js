/*
 * dissolve
 * https://github.com/colinwren/dissolve
 *
 * Copyright (c) 2013 Colin Wren
 * Licensed under the MIT license.
 */

(function($) {

  // Wrap each letter in a span with a random numbered dissolve class
  $.fn.prepareText = function (options) {

    if (typeof options === 'function') {
      callback = options;
      options = $.fn.dissolve.options;
    } else {
      // Override default options with passed-in options.
      options = $.extend({}, $.fn.dissolve.options, options);
    }

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

      } else {
        // Wrap letter in dissolve class
        var classNum = Math.floor(Math.random() * options.count);
        buffer += '<span class="dissolve' + classNum + '">' + character + '</span>';
      }
    }

    // Replace old contents prepared for fade
    this.html(buffer);

    return this;
  };

  function fadeChar (toFade, options, callback) {
    var currentSet = toFade.pop();
    var done = toFade.length === 0;

    // Only call callback when the last elements animation finishes
    var elementsLeft = currentSet.length;

    currentSet.fadeTo(options.fadeTime, options.opacity, function() {
      if (done && typeof callback === 'function') {
        elementsLeft--;
        if (elementsLeft === 0) {
          callback();
        }
      }
    });

    if (!done) {
      window.setTimeout(function(){
        fadeChar(toFade, options, callback);
      }, options.fadeOffset);
    }
  }

  $.fn.fadeCharacters = function (options, callback) {

    if (typeof options === 'function') {
      callback = options;
      options = $.fn.dissolve.options;
    } else {
      // Override default options with passed-in options.
      options = $.extend({}, $.fn.dissolve.options, options);
    }

    // Make array of sets to fade
    var toFade = [];
    for (var i = 0; i < options.count; i++) {
      // Only push set if it contains elements
      var matchedElements = this.find('.dissolve' + i);
      if (matchedElements.length) toFade.push(matchedElements);
    }

    if (toFade.length) fadeChar(toFade, options, callback);

    return this;
  };

  $.fn.dissolve = function(options, callback) {

    this
      // Prepare the elements for fading
      .each(function() {
        $(this).prepareText(options);
      })
      // Begin fading
      .fadeCharacters(options, callback);

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
