(function() {
  function resizeWindowJazz(e) {
    var height = $(window).height();
    var width = $(window).width();
    var ratio = _.min([width / 690, height / 480, 1]);
    var distance_to_shift = (1-ratio)/2;
    var translate = distance_to_shift/ratio * 100;
    var scale_ratio = 'scale('+ ratio + ', ' + ratio + ') translate(-'+ translate + '%, -' + translate + '%)';
    console.log('scale_ratio is', scale_ratio);
    console.log('translate number is ', translate);
    console.log('Window resized with dimensions', height, ',', width);
    $('iframe').css('transform', scale_ratio);
  }

  var throttled = _.throttle(resizeWindowJazz, 2000);

  $(window).resize(throttled);

  $(function() {
    resizeWindowJazz();
  });

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

  function closeIframe(href) {
    var $iframe = $iframe_container.find('iframe[src="' + href + '"]');
    if ($iframe.length > 0) {
      console.log('found iframe with href', href);
      // delete $iframe from DOM
    }
    else {
      console.error('no iframe found with href[', href);
    }
  }
  // reference code (for pokertable.js): parent.window.iframes.closeIframe(href);

  iframes = {
    openNewIframe: openNewIframe
  , closeIframe: closeIframe
  };
})();