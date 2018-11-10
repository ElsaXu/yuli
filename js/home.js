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
var scrollTop = 0;
var config = {
	bg_1_height: 2133,
	bg_1_hideAt: 1700,
	rect_1_showAt: 200,
	rect_1_hideAt: 1200,
	rect_1_widthRate: 0.65,
	rect_1_heightRate: 2.2,
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
windowScrolled();
/* 
 * Init
 * End 
 */

/* 
 * Event listener definition
 * Start 
 */ 
win.on('resize', function() {
	windowResized();
});
win.scroll(function(evt) {
	windowScrolled();
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
	scrollTop = win.scrollTop();
	widthRate = _width / defaultWidth;
	container1.css('height', config.bg_1_height * widthRate);
	rect1.css('height', _width * config.rect_1_widthRate / config.rect_1_heightRate);
}
function windowScrolled() {
	scrollTop = win.scrollTop();
	checkBg1();
	checkRect1();
}
function checkBg1() {
	var _scrollY = scrollTop;
	var _hideAt = config.bg_1_hideAt * widthRate;
	if (_scrollY > _hideAt && !bg1.hasClass('be-fixed')) {
		bg1.addClass('be-fixed');
		bg1.css('top', -_scrollY);
	} else if (_scrollY <= _hideAt && bg1.hasClass('be-fixed')) {
		bg1.removeClass('be-fixed');
		bg1.css('top', 0);
	}
}
function checkRect1() {
	var _scrollY = scrollTop;
	var _showAt = config.rect_1_showAt * widthRate;
	var _hideAt = config.rect_1_hideAt * widthRate;
	var _rate;
	if (_scrollY > _showAt) {
		_rate = Math.max(0, (_hideAt - _scrollY) / (_hideAt - _showAt));  
		rect1.css('width', (config.rect_1_widthRate * _rate * 100) + '%');
	} else {
		rect1.css('width', (config.rect_1_widthRate * 100) + '%');
	}
}
/* 
 * Function definition
 * End 
 */ 