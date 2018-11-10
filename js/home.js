/* 
 * Visual dom elements definition
 * Start 
 */ 
var win = $(window);
var container1 = $('.container-1');
var rect1 = $('.rect-1');
var bg1 = $('.bg-1');
/* 
 * Visual dom elements definition
 * End
 */

/* 
 * Parameters definition
 * Start 
 */ 
var widthRate = 1; // The real window width / 1920
var defaultWidth = 1920;
var config = {
	bg1Height: 2133,
	bg1HideAt: 1500
}
/* 
 * Parameters definition
 * End 
 */ 

/* 
 * Init
 * Start 
 */ 
windowResized();
checkBg1();
/* 
 * Init
 * End 
 */

/* 
 * Event listener definition
 * Start 
 */ 
win.scroll(function(evt) {
	checkBg1();
});
win.on('resize', function() {
	windowResized();
});
/* 
 * Event listener definition
 * Emd 
 */ 

/* 
 * Function definition
 * Start 
 */ 
function windowResized() {
	var _width = $(window).width();
	widthRate = _width / defaultWidth;
	container1.css('height', config.bg1Height * widthRate);
	rect1.css('height', rect1.width() / 2.2);
}
function checkBg1() {
	var _scrollY = win.scrollTop();
	var _hideAt = config.bg1HideAt * widthRate;
	if (_scrollY > _hideAt && !bg1.hasClass('be-fixed')) {
		bg1.addClass('be-fixed');
		bg1.css('top', -_scrollY);
	} else if (_scrollY <= _hideAt && bg1.hasClass('be-fixed')) {
		bg1.removeClass('be-fixed');
		bg1.css('top', 0);
	}
}
/* 
 * Function definition
 * End 
 */ 