(function($) {

  module('jQuery.prepareText', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
      $('#text, #text-with-tags')
        .clone()
        .appendTo('#temp');
      this.elems = $('#temp').children();
    },

    teardown: function() {
     $('#temp').empty();
    }
  });

  test('prepares target element correctly', 1, function() {
    console.log($);
    var text = this.elems.filter('#text');
    var charLength = text.html().length;
    text.html($.prepareText(text.html()));
    var spanCount = text.find('span').length;
    equal(spanCount, charLength);
  });

  test('prepares target element that contains tags correctly', 1, function() {
    var textTag = this.elems.filter('#text-with-tags');
    var charLength = textTag.html().length;
    // Subtract length of span tags
    charLength = charLength - 13;
    var startSpanCount = textTag.find('span').length;
    textTag.html($.prepareText(textTag.html()));
    var spanCount = textTag.find('span').length;
    equal(spanCount, charLength + startSpanCount );
  });

  module('jQuery.prepareElement', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
      $('#text, #text-with-tags')
        .clone()
        .appendTo('#temp');
      this.elems = $('#temp').children();
    },

    teardown: function() {
     $('#temp').empty();
    }
  });

  test('is chainable', 1, function() {
    strictEqual(this.elems.prepareElement(), this.elems, 'should be chainable');
  });

  test('prepares target element correctly', 1, function() {
    var text = this.elems.filter('#text');
    var charLength = text.html().length;
    text.prepareElement();
    var spanCount = text.find('span').length;
    equal(spanCount, charLength);
  });

  test('prepares target element that contains tags correctly', 1, function() {
    var textTag = this.elems.filter('#text-with-tags');
    var charLength = textTag.html().length;
    // Subtract length of span tags
    charLength = charLength - 13;
    var startSpanCount = textTag.find('span').length;
    textTag.prepareElement();
    var spanCount = textTag.find('span').length;
    equal(spanCount, charLength + startSpanCount );
  });

  module('jQuery.fadeCharacters', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
      $('#text, #text-with-tags')
        .clone()
        .appendTo('#temp');
      this.elems = $('#temp').children();
    },

    teardown: function() {
     $('#temp').empty();
    }
  });

  test('is chainable', 1, function() {
    strictEqual(this.elems.fadeCharacters(), this.elems, 'should be chainable');
  });

  asyncTest('calls callback with correct context', 1, function() {
    var text = this.elems.filter('#text');
    text.prepareElement();
    text.fadeCharacters({opacity: 0.2, fadeTime: 1, fadeOffset: 1}, function() {
      equal(this.attr('id'), text.attr('id'));
      start();
    });
  });

  asyncTest('fades elements to specified opacity', 1, function() {
    var text = this.elems.filter('#text');
    text.prepareElement();
    text.fadeCharacters({opacity: 0.2, fadeTime: 1, fadeOffset: 1}, function() {
      var elementOpacity = text.children().first().css('opacity') * 10;
      equal(Math.round(elementOpacity), 2);
      start();
    });
  });

  module('jQuery.dissolve', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
      $('#text, #text-with-tags')
        .clone()
        .appendTo('#temp');
      this.elems = $('#temp').children();
    },

    teardown: function() {
     $('#temp').empty();
    }
  });

  test('is chainable', 1, function() {
    strictEqual(this.elems.dissolve(), this.elems, 'should be chainable');
  });

  asyncTest('calls callback with correct context', 1, function() {
    var text = this.elems.filter('#text');
    text.dissolve({opacity: 0.2, fadeTime: 1, fadeOffset: 1}, function() {
      equal(this.attr('id'), text.attr('id'));
      start();
    });
  });

  asyncTest('prepares target element correctly', 1, function() {
    var text = this.elems.filter('#text');
    var charLength = text.html().length;
    text.dissolve({opacity: 0.2, fadeTime: 1, fadeOffset: 1},function() {
      var spanCount = text.find('span').length;
      equal(spanCount, charLength);
      start();
    });
  });

  asyncTest('prepares target element that contains tags correctly', 1, function() {
    var textTag = this.elems.filter('#text-with-tags');
    var charLength = textTag.html().length;
    // Subtract length of span tags
    charLength = charLength - 13;
    var startSpanCount = textTag.find('span').length;
    textTag.dissolve({opacity: 0.2, fadeTime: 1, fadeOffset: 1}, function() {
      var spanCount = textTag.find('span').length;
      equal(spanCount, charLength + startSpanCount );
      start();
    });
  });

  asyncTest('fades elements to specified opacity', 1, function() {
    var text = this.elems.filter('#text');
    text.dissolve({opacity: 0.2, fadeTime: 1, fadeOffset: 1}, function() {
      var elementOpacity = text.children().first().css('opacity') * 10;
      equal(Math.round(elementOpacity), 2);
      start();
    });
  });

}(jQuery));
