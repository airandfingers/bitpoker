
function resizeWindowJazz(e) {
	var height = $(window).height();
	var width = $(window).width();
	console.log('Window resized with dimensions', height, ',', width);
	$('iframe').css(back)
}

var throttled = _.throttle(resizeWindowJazz, 2000);

	$(function() {
		$(window).resize(throttled);
	});

/*
   zoom: 0.75;
    -moz-transform: scale(0.75);
    -moz-transform-origin: 0 0;
    -o-transform: scale(0.75);
    -o-transform-origin: 0 0;
    -webkit-transform: scale(0.75);
    -webkit-transform-origin: 0 0;

    */