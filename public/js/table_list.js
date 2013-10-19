(function($) {
    // Define new sorting type - fake-fraction (for # Players column)
    function getNumBeforeSlash(str) {
        var slash_index = str.indexOf('/')
          , before_slash = str.substring(0, slash_index);
        before_slash = parseInt(before_slash);
        return before_slash;
    }
    
    //launch table game function.
    function launchTableGame() {
      var table_name = $(this).attr('id')
        , username = $('#user_server_values').data('username');
      if (username !== null &&
          window.document.title =='Bitcoin Poker') {
        console.log('logged in as', username, 'and on landing page. Launching iframe: ', table_name );
        iframes.openNewIframe(table_name);

        //redirect to table
        //window.location.href = '/' + table_name;

        //open new window at table
        //return popup(table_name);

        //remove 'active' class from lobby_trigger and hide lobby
        $('#lobby_trigger').click();        
      }
      else {
          //navigate to home page
          console.log('redirected to landing page');
          window.location.href = "/login?next=/?joined_table_name=" + table_name;
        }
      //}
    }

    jQuery.fn.dataTableExt.oSort['fake-fraction-asc']  = function(a, b) {
      var first_num = getNumBeforeSlash(a)
        , second_num = getNumBeforeSlash(b);
      return ((first_num < second_num) ? -1 :
             ((first_num > second_num) ?  1 : 0));
    };
    jQuery.fn.dataTableExt.oSort['fake-fraction-desc'] = function(a,b) {
      var first_num = getNumBeforeSlash(a)
        , second_num = getNumBeforeSlash(b);
      return ((first_num < second_num) ?  1 :
             ((first_num > second_num) ? -1 : 0));
    };

    var $table_list = $('#table_list').dataTable({
        bJQueryUI: true,
        sDom: 't',
        bPaginate: false,
        iDisplayLength: 18,
        sScrollY: '475px',
        aaSorting: [[3,'desc'], [0, 'asc']],
        aoColumns: [
            null,
            null,
            { sWidth: '235px' },
            { sWidth: '115px', sType: 'fake-fraction' },
        ]
    });
    $table_list.fnFilter('funbucks', 2);

    // Add a bootstrap-switch button that toggles currency filter
    $('<div></div>', {
        'id': 'currency-switch',
        'class': 'switch switch-mini',
        // green funbucks
        'data-on': 'success',
        'data-on-label': 'FB',
        // orange satoshi
        'data-off': 'warning',
        'data-off-label': 'sat'
    })
    .append('<input type="checkbox" checked />')
    .prependTo($('thead th:nth(2)'))
    .bootstrapSwitch()
    .on('switch-change', function (e, data) {
        // filter by second column (Currency), depending on switch value
        $table_list.fnFilter( data.value ? 'funbucks' : 'satoshi', 2 );
    })
    .on('click', function(e) { e.stopPropagation(); });

    // Add a click handler for the table rows
    $('#table_list tbody').on('click', 'tr', launchTableGame);

    // Adjust column sizes when window resizes
    $(window).bind('resize', function() {
      $table_list.fnAdjustColumnSizing();
    });
})(jQuery);