/*!
 * jQuery Plugin: TextDimensions
 * https://github.com/rubensa/jquery.text-dimensions/
 *
 * Copyright (c) 2013, Ruben Suarez Alvarez http://blog.rubensa.eu.org/
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Author:   rubensa@rubensa.eu.org
 * Version:  1.0.0
 * Date:     18 April 2013
 */
(function($) {
	$.fn.textDimensions = function(text, testElementToAppendTo) {
		// create dummy text container
		var html = $('<span style="postion:absolute;width:auto;left:-9999px">'
				+ text + '</span>');
		// if applied to certain context (container)
		if ($(this)) {
			// get context (container) font definition for appliying to dummy text container
			html.css("font-family", $(this).css("font-family"));
			html.css("font-size", $(this).css("font-size"));
			html.css("font-weight", $(this).css("font-weight"));
		}
		html.css("white-space", 'nowrap');
		// add dummy text container to body
		if(!testElementToAppendTo){var testElementToAppendTo = $('body')}
			
		$(testElementToAppendTo).append(html);
		// check container size
		var dimensions = {width: html.width(), height: html.height()};
		// remove dummy container
		html.remove();
		// return dimensions
		return dimensions;
	};
})(jQuery);