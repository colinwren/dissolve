/*
 * dissolve
 * https://github.com/colinwren/dissolve
 *
 * Copyright (c) 2013 Colin Wren
 * Licensed under the MIT license.
 */

(function($) {
  $.prepareText = function(text, options) {
    options = options || $.fn.dissolve.options;

    var buffer = '';

    var characters = text.split('');
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

    return buffer;
  };

  // Wrap each letter in a span with a random numbered dissolve class
  $.fn.prepareElement = function (options) {

    if (typeof options === 'function') {
      options = $.fn.dissolve.options;
    } else {
      // Override default options with passed-in options.
      options = $.extend({}, $.fn.dissolve.options, options);
    }

    this.each(function() {

      // Prepare contents for fading
      var preparedContent = $.prepareText($(this).html(), options);
      $(this).html(preparedContent);
    });

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
        if (!elementsLeft) {
          callback();
        }
      }
    });

    if (!done) {
      window.setTimeout(function() {
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


    // If callback is provided call it with the correct context
    var that = this;

    // Third argument will be false or a function that calls callback with the
    // correct context
    if (toFade.length) fadeChar(toFade, options, typeof callback === 'function' && function() {
      callback.call(that);
    });

    return this;
  };

  $.fn.dissolve = function(options, callback) {

    this
      // Prepare the elements for fading
      .prepareElement(options)
      // Begin fading
      .fadeCharacters(options, callback);

    return this;
  };

  // Default options.
  $.fn.dissolve.options = {
    count: 8,        // Number of fade classes
    opacity: 0,      // Opacity to fade to
    fadeTime: 2000,  // Length of time it takes to fade to opacity
    fadeOffset: 300 // Time between the different classes begin to fade
  };

}(jQuery));
