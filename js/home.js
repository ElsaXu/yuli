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
var title2 = $('.bg2-title-1');
var container2 = $('.container-2');
var container2Inner = $('.container2-inner');
/* 
 * Visual dom elements definition
 * End
 */

/* 
 * Parameters definition
 * Start 
 */ 
var widthRate = 1; // The real window (width / defaultWidth)
var windowWidth = 1920; // The real window width
var windowHeight = 1080; // The real window height
var defaultWidth = 1920; // Standard designed width
var scrollTop = 0;
var scrollTopPrev = 0;
var config = {
	body_fontSize: 16,
	bg_1_width: 1920,
	bg_1_height: 2133,
	bg_1_hideAt: 1100,
	bg_1_heightRate: 2,
	bg_1_followRate: 0.6,
	rect_1_showAt: 200,
	rect_1_hideAt: 1200,
	rect_1_widthRate: 0.65,
	title_1_hideAt: 0,
	bg_2_defaultColor: '#000',
	bg_2_finalColor: '#b40020',
	bg_2_colorSwitchRate: 0.75,
	title_2_showAtRate: 0.5,
}
/* 
 * Parameters definition
 * End 
 */ 

/* 
 * Init
 * Start 
 */
win.scrollTop(0);
windowResized();
windowScrolled();
// This setTimeout below is a work around for reset scroll bar in IE 
setTimeout(function() {
	win.scrollTop(0);
	windowResized();
	windowScrolled();
}, 150);
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
	windowWidth = win.width();
	windowHeight = win.height();
	scrollTop = win.scrollTop();
	widthRate = windowWidth / defaultWidth;
	body.css('font-size', (config.body_fontSize * widthRate) + 'px');

	if (windowWidth / (windowHeight * config.bg_1_heightRate) >= config.bg_1_width / config.bg_1_height) {
		container1.css('height', config.bg_1_height * widthRate);
		bg1.find('img').css('width', '100%').css('height', '');
	} else {
		container1.css('height', windowHeight * config.bg_1_heightRate);
		bg1.find('img').css('height', windowHeight * config.bg_1_heightRate).css('width', '');
		bg1.addClass('be-fixed');
		bg1.css('top', 0);
	}
	container1.data('height', container1.height());
	rect1.data('width', rect1.width());
	var _cHei = container2Inner.height();
	var _maxHei = Math.max(windowHeight, _cHei);
	container2.css('height', _maxHei);
	container2Inner.css('top', (_maxHei - _cHei) / 2);
	container2.data('height', container2.height());
	container2.data('offset', container2.offset());
	title2.css('top', 0);
	title2.data('topToContainer2', title2.offset().top - container2.data('offset').top);
}
function windowScrolled() {
	scrollTopPrev = scrollTop;
	scrollTop = win.scrollTop();
	checkBg1();
	checkRect1();
	checkBg2();
}
function checkBg1() {
	var _scrollY = scrollTop;
	var _hideAt = config.bg_1_hideAt * widthRate;
	if (_scrollY > container1.data('height') - windowHeight * config.bg_1_followRate) {
		if (!bg1.hasClass('be-fixed')) {
			bg1.addClass('be-fixed');
			bg1.css('top', -_scrollY);
		}
	} else {
		if (bg1.hasClass('be-fixed')) bg1.removeClass('be-fixed');
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
	var _dx = _rate * rect1.data('width');
	rect1.css('right', _dx);
	checkTitle1();
	function checkTitle1() {
		var _hideAt2 = config.title_1_hideAt * widthRate;
		if (_scrollY > _hideAt2) {
			title1.css('top', _hideAt2 - _scrollY);
		} else {
			title1.css('top', 0);
		}
		title1.css('left', _dx);
	}
}
function checkBg2() {
	var _top = container2.data('offset').top - scrollTop;
	var _hei = container2.data('height');
	if (_top < windowHeight * config.bg_2_colorSwitchRate) {
		container2.css('background-color', config.bg_2_finalColor);
	} else {
		container2.css('background-color', config.bg_2_defaultColor);
	}
	var _dy = title2.data('topToContainer2');
	var _cond = 0;
	if (_top <= _dy) {
		title2.css('top', 0);
	} else if (_top >= windowHeight + windowHeight * config.title_2_showAtRate) {
		_cond = Math.min(config.title_2_showAtRate * windowHeight, _top - _dy);
		title2.css('top', -1 * title2.data('dy'));
	} else if (_top >= windowHeight) {
		_cond = (windowHeight + windowHeight * config.title_2_showAtRate - _top) / (windowHeight * config.title_2_showAtRate);
		title2.css('top', -1 * windowHeight * _cond);
	} else {
		_cond = Math.max(_top, 0) / windowHeight;
		title2.css('top', -1 * windowHeight * _cond);
	}
}

/* 
 * Function definition
 * End 
 */ 