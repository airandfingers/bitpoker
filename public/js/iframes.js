(function() {
  function resizeWindowJazz(e) {
    var height = $(window).height()
      , width = $(window).width()
      , scale_ratio = _.min([width / 690, height / 465, 1])
      , scale_string = 'scale(' + scale_ratio + ', ' + scale_ratio + ')'
      , distance_to_shift = (1 - scale_ratio) / 2
      , translate_ratio = distance_to_shift / scale_ratio * 100
      , translate_string = 'translate(-'+ translate_ratio + '%, -' + translate_ratio + '%)'
      , transform_string = scale_string + ' ' + translate_string;
    console.log('Window resized with dimensions', height, ',', width);
    $('.iframe').css('transform', transform_string);
  }

  var throttled = _.throttle(resizeWindowJazz, 2000);

  // resize once every 2 seconds when window is resized
  $(window).resize(throttled);

  // resize once upon page load
  $(resizeWindowJazz);

  var id_prefix = 'iframe_'
    , iframe_template =
  '<div id="iframe_<%= table_name %>" class="iframe">' +
    '<div class="iframe_header"></div>' +
    '<iframe src="/<%= table_name %>" width="690" height="450">' +
        '<p>Your browser does not support iframes.</p>' +
        '<p><a href="http://www.smashingmagazine.com/2012/07/10/dear-web-user-please-upgrade-your-browser/">Upgrade your browser</a></p>' +
        '<p>Or go directly to <a table_name="/<%= table_name %>">/<%= table_name %></a>.</p>' +
    '</iframe>' +
  '</div>'
    , $iframe_container = $('#iframe_container')
    , $html_body = $('html,body') // elements to be scrolled
    , initial_tables = $('#server_values').data('current_table_names');

  function openNewIframe(table_name) {
    var $iframe = findIframe(table_name);
    if ($iframe.length > 0) {
        console.log('iframe already open for table_name', table_name);
        $html_body.animate({ scrollTop: $iframe.offset().top }, 500);
        return;
    }
    var $iframe = $(_.template(iframe_template, {
        table_name: table_name
    }));
    $iframe_container.append($iframe);
    // make iframe draggable
    $iframe.draggable({
      handle: '.iframe_header'
    , snap: true
    , snapMode: 'outer'
    , stack: '.iframe'
    });
  }

  // open iframes for each table_name in initial_tables
  _.each(initial_tables, function(table_name) {
    openNewIframe(table_name);
  });

  function setIframeTitle(table_name, title) {
    console.log('setIframeTitle called with', table_name, title)
    var $iframe = findIframe(table_name);
    if ($iframe.length > 0) {
      $iframe.find('.iframe_header').text(title);
      $iframe.find('.iframe_header').append(
        "<button type='button' class='close' ><a href='javascript: iframes.closeIframe("+table_name+")'>×</a></button>"
      );    
    }
    else {
      console.error('no iframe found for table_name', table_name);
    }
  }

  function closeIframe(table_name) {
    var $iframe = findIframe(table_name);
    if ($iframe.length > 0) {
      $iframe.remove();
    }
    else {
      console.error('no iframe found for table_name', table_name);
    }
    $.post('/leave_table', { table_name: table_name }, function(response) {
      console.log('/leave_table returns', response)
    })
  }
  
  function findIframe(table_name) {
    var iframe_id = id_prefix + table_name
      , $iframe = $iframe_container.find('#' + iframe_id);
    return $iframe;
  }

  iframes = {
    openNewIframe: openNewIframe
  , setIframeTitle: setIframeTitle
  , closeIframe: closeIframe
  };
})();