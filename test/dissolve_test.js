(function($) {

  module('jQuery.dissolve', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    }
  });

  test('is chainable', 1, function() {
    strictEqual(this.elems.dissolve(), this.elems, 'should be chainable');
  });

  asyncTest('prepares target element correctly', 1, function() {
    var text = this.elems.filter('#text');
    var charLength = text.html().length;
    text.dissolve({fadeTime: 1, fadeOffset: 1}, function() {
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
    textTag.dissolve({fadeTime: 1, fadeOffset: 1}, function() {
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
