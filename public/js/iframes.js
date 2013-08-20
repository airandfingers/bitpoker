
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