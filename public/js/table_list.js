(function($) {
    // Define new sorting type - fake-fraction (for # Players column)
    function getNumBeforeSlash(str) {
        var slash_index = str.indexOf('/')
          , before_slash = str.substring(0, slash_index);
        before_slash = parseInt(before_slash);
        return before_slash;
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
        iDisplayLength: 15,
        sScrollY: '421px',
        aaSorting: [[3,'desc'], [0, 'asc']],
        aoColumns: [
            null,
            null,
            { 'sType': 'fake-fraction' },
            null
        ]
    });
    $table_list.fnFilter('maobucks', 2);

    // Add a bootstrap-switch button that toggles currency filter
    $('<div></div>', {
        'id': 'currency-switch',
        'class': 'switch switch-mini',
        // green maobucks
        'data-on': 'success',
        'data-on-label': 'MB',
        // orange satoshi
        'data-off': 'warning',
        'data-off-label': 'sat'
    })
    .append('<input type="checkbox" checked />')
    .prependTo($('thead th:nth(2)'))
    .bootstrapSwitch()
    .on('switch-change', function (e, data) {
        // filter by second column (Currency), depending on switch value
        $table_list.fnFilter( data.value ? 'maobucks' : 'satoshi', 2 );
    })
    .on('click', function(e) { e.stopPropagation(); });

    // Add a click handler for the table rows
    $('#table_list tbody').on('click', 'tr', function(e) {
      var table_name = $(this).attr('id');
      return popup(table_name);
    });

    // Adjust column sizes when window resizes
    $(window).bind('resize', function() {
      $table_list.fnAdjustColumnSizing();
    });
})(jQuery);