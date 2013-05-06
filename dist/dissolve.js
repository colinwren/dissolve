/*! Dissolve - v0.0.0 - 2013-05-05
* https://github.com/colinwren/dissolve
* Copyright (c) 2013 Colin Wren; Licensed MIT */
(function($) {

  function random (max) {
    return Math.floor(Math.random() * max);
  }

  // Wrap each letter in a span with a random numbered dissolve class
  function prepare (element, options) {

    // Final element contents
    var buffer = '';

    var characters = element.html().split('');
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
    $(element)
      .html(buffer)
      .addClass('dissolve-ready');
  }

  function fade (element, options, callback) {
    options.count--;
    var done = options.count < 1;
    var toFade = $('.dissolve' + options.count);
    var fadeCounter = toFade.length;

    toFade.fadeTo(options.fadeTime, options.opacity, function() {
      if (done && typeof callback === 'function') {
        fadeCounter--;
        if (fadeCounter === 1) callback();
      }
    });

    if (!done) {
      window.setTimeout(function(){
        fade(element, options, callback);
      }, options.fadeOffset);
    }
  }

  $.fn.dissolve = function(options, callback) {

    // Override default options with passed-in options.
    options = $.extend({}, $.fn.dissolve.options, options);

    this.each(function() {
      // Prepare the element for fading if it isn't already
      if ( !$(this).hasClass('dissolve-ready')) {
        prepare($(this), options);
      }

      // Begin fading
      fade($(this), options, callback);
    });

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
