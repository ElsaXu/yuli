/* 
 * Visual dom elements definition
 * Start 
 */ 
var win = $(window);
var body = $('html');
var container1 = $('.container-1');
var rect1 = $('.rect-1');
var bg1 = $('.bg-1');
var title1 = $('.title-1');
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
	body_fontSize: 16,
	bg_1_height: 2133,
	bg_1_hideAt: 1100,
	rect_1_showAt: 200,
	rect_1_hideAt: 1200,
	rect_1_widthRate: 0.65,
	title_1_hideAt: 0,
}
/* 
 * Parameters definition
 * End 
 */ 

/* 
 * Init
 * Start 
 */

setTimeout(function() {
	win.scrollTop(0); 
	windowResized();
	windowScrolled();
});
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
	body.css('font-size', (config.body_fontSize * widthRate) + 'px');
	// container1.css('height', config.bg_1_height * widthRate);
	// rect1.css('height', _width * config.rect_1_widthRate / config.rect_1_heightRate);
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
		_rate = Math.max(0, (_hideAt - _scrollY) / (_hideAt - _showAt)) - 1;  
	} else {
		_rate = 0;
	}
	var _dx = _rate * rect1.width();
	rect1.css('right', _dx);
	checkTitle1();
	function checkTitle1() {
		var _width = $(window).width();
		var _hideAt2 = config.title_1_hideAt * widthRate;
		if (_scrollY > _hideAt2) {
			title1.css('top', _hideAt2 - _scrollY);
		} else {
			title1.css('top', 0);
		}
		title1.css('left', _dx);
	}
}

/* 
 * Function definition
 * End 
 */ 