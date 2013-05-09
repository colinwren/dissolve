/*! Dissolve - v0.0.0 - 2013-05-08
* https://github.com/colinwren/dissolve
* Copyright (c) 2013 Colin Wren; Licensed MIT */
(function($) {

  // Wrap each letter in a span with a random numbered dissolve class
  $.fn.prepareText = function (options) {

    if (typeof options === 'function') {
      callback = options;
      options = {};
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

    if (typeof options === 'function') {
      callback = options;
      options = {};
    } else {
      // Override default options with passed-in options.
      options = $.extend({}, $.fn.dissolve.options, options);
    }

    fadeChar(this, options, callback);

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
