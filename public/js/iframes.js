(function() {
  function resizeWindowJazz(e) {
    var height = $(window).height();
    var width = $(window).width();
    var ratio = _.min([width / 690, height / 495, 1]);
    var distance_to_shift = (1-ratio)/2;
    var translate = distance_to_shift/ratio * 100;
    var scale_ratio = 'scale('+ ratio + ', ' + ratio + ') translate(-'+ translate + '%, -' + translate + '%)';
    console.log('scale_ratio is', scale_ratio);
    console.log('translate number is ', translate);
    console.log('Window resized with dimensions', height, ',', width);
    $('.iframe').css('transform', scale_ratio);
  }

  var throttled = _.throttle(resizeWindowJazz, 2000);

  $(window).resize(throttled);

  $(function() {
    resizeWindowJazz();
  });

  var id_prefix = 'iframe_'
    , iframe_template =
  '<div id="iframe_<%= table_name %>" class="iframe">' +
    '<div class="iframe_header">Iframe Title Here</div>' +
    '<iframe src="/<%= table_name %>" width="690" height="480">' +
        '<p>Your browser does not support iframes.</p>' +
        '<p><a href="http://www.smashingmagazine.com/2012/07/10/dear-web-user-please-upgrade-your-browser/">Upgrade your browser</a></p>' +
        '<p>Or go directly to <a table_name="/<%= table_name %>">/<%= table_name %></a>.</p>' +
    '</iframe>' +
  '</div>'
    , $iframe_container = $('#iframe_container')
    , $html_body = $('html,body'); // elements to be scrolled

  function openNewIframe(table_name) {
    var iframe_id = id_prefix + table_name
      , $iframe = $iframe_container.find('#iframe_' + iframe_id);
    if ($iframe.length > 0) {
        console.log('iframe already open with iframe_id', iframe_id);
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

  function closeIframe(table_name) {
    var iframe_id = id_prefix + table_name
      , $iframe = $iframe_container.find('#' + iframe_id);
    if ($iframe.length > 0) {
      $iframe.remove();
    }
    else {
      console.error('no iframe found with id', iframe_id);
    }
  }
  // reference code (for pokertable.js): parent.window.iframes.closeIframe(href);

  iframes = {
    openNewIframe: openNewIframe
  , closeIframe: closeIframe
  };
})();