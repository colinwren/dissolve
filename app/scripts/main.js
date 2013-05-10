(function() {
  $('#demo-button').one('click', function() {
    $('#intro-text').dissolve(function() {
        this.addClass('opaque');
        this.text('You can also fade text in! Take a gander at the documentation for all of the options');
        this.dissolve({opacity: 1});
      });
    });

  }());
