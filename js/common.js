/* 
 * Init
 * Start 
 */

var win = $(window);
var html = $('html');
var body = $('body');
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
	bg_1_followRate: 1,
	rect_1_showAt: 200,
	rect_1_hideAt: 1200,
	rect_1_widthRate: 0.65,
	title_1_hideAt: 0,
	bg_2_defaultColor: '#000',
	bg_2_finalColor: '#b40020',
	bg_2_colorSwitchRate: 0.75,
	title_2_showAtRate: 0.5,
}
$(document).ready(function() {
	// win.scrollTop(0);
	// windowResized();
	// windowScrolled();
	$('body').hide();
	// This setTimeout below is a work around for reset scroll bar in IE 
	setTimeout(function() {
		$('body').show();
		win.scrollTop(0);
		windowResized();
		addEventListeners();
	}, 150);
});

/* 
 * Event listener definition
 * Start 
 */ 
function addEventListeners() {
	win.on('resize', function() {
		windowResized();
	});
}

/* 
 * Function definition
 * Start 
 */ 
function windowResized() {
	//win.scrollTop(0);
	windowWidth = win.width();
	windowHeight = win.height();
	scrollTop = win.scrollTop();
	widthRate = windowWidth / defaultWidth;
	html.css('font-size', (config.body_fontSize * widthRate) + 'px');
}