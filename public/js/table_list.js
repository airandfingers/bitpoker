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

    var iframe_template =
    '<iframe src="<%= href %>" width="690" height="480">' +
        '<p>Your browser does not support iframes.</p>' +
        '<p><a href="http://www.smashingmagazine.com/2012/07/10/dear-web-user-please-upgrade-your-browser/">Upgrade your browser</a></p>' +
        '<p>Or go directly to <a href="<%= href %>"><%= href %></a>.</p>' +
    '</iframe>'
      , $iframe_container = $('#iframe_container')
      , $html_body = $('html,body'); // elements to be scrolled
    function openNewIframe(href) {
        var $iframe = $iframe_container.find('iframe[src="' + href + '"]');
        if ($iframe.length > 0) {
            console.log('iframe already open with href', href);
            $html_body.animate({ scrollTop: $iframe.offset().top }, 500);
            return;
        }
        var $iframe = _.template(iframe_template, {
            href: href
        });
        $iframe_container.append($iframe);
    }

    // Add a click handler for the table rows
    $('#table_list tbody').on('click', 'tr', function(e) {
      var table_name = $(this).attr('id');
      openNewIframe('/' + table_name);
      //window.location.href = '/' + table_name;
      //return popup(table_name);
    });

    // Adjust column sizes when window resizes
    $(window).bind('resize', function() {
      $table_list.fnAdjustColumnSizing();
    });
})(jQuery);