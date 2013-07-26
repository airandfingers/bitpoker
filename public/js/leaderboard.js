(function($) {

    var $funbucks_leaderboard = $('#funbucks_leaderboard').dataTable({
        bJQueryUI: true,
        sDom: 't',
        bPaginate: false,
        bSort: false,
    });

    // Adjust column sizes when window resizes
    $(window).bind('resize', function() {
      $funbucks_leaderboard.fnAdjustColumnSizing();
    });
})(jQuery);

(function($) {

    var $satoshi_leaderboard = $('#satoshi_leaderboard').dataTable({
        bJQueryUI: true,
        sDom: 't',
        bPaginate: false,
        bSort: false,
    });

    // Adjust column sizes when window resizes
    $(window).bind('resize', function() {
      $satoshi_leaderboard.fnAdjustColumnSizing();
    });
})(jQuery);