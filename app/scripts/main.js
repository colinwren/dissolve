(function() {
  $('#demo-button').one('click', function() {

    $(this).animate({
      fontSize: 0,
      padding: 0,
      border: 0
    }, 300, function() {
      $(this).remove();
    });

    $('#intro-text').dissolve(function() {
      this
        .addClass('opaque')
        .html($.prepareText('You can also fade text in!<br /><br /> Take a gander at the <a class="documentation" href="https://github.com/colinwren/dissolve">documentation</a> for all of the options'))
        .fadeCharacters({opacity: 1});
    });
  });
}());
