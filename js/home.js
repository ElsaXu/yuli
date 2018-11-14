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
var title2Clone = $('.bg2-title-1-placeholder');
var container2 = $('.container-2');
var container2Inner = $('.container2-inner');
var container2Titles = $('.container2-titles');
var container2Mask1 = $('.container2-mask-1');
var container2Mask2 = $('.container2-mask-2');
var container2Texts = [$('.bg2-text-1'), $('.bg2-text-2'), $('.bg2-text-3')];
var container3 = $('.container-3');
var container3Inner = $('.container3-inner');
var title3 = $('.bg3-title-2');
var bg3 = $(".bg3-image");
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
/* 
 * Parameters definition
 * End 
 */ 

/* 
 * Init
 * Start 
 */
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
		windowScrolled();
		addEventListeners();
	}, 150);
});
/* 
 * Init
 * End 
 */

/* 
 * Event listener definition
 * Start 
 */ 
function addEventListeners() {
	win.on('resize', function() {
		windowResized();
		//windowScrolled();
	});
	win.scroll(function(evt) {
		windowScrolled();
	});
}
/* 
 * Event listener definition
 * Emd 
 */ 

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
	body.css('font-size', (config.body_fontSize * widthRate) + 'px');

	if (windowWidth / (windowHeight * config.bg_1_heightRate) >= config.bg_1_width / config.bg_1_height) {
		container1.css('height', config.bg_1_height * widthRate);
		bg1.find('img').css('width', '100%').css('height', '');
		bg1.css('top', -scrollTop);
	} else {
		container1.css('height', windowHeight * config.bg_1_heightRate);
		bg1.find('img').css('height', windowHeight * config.bg_1_heightRate).css('width', '');
		bg1.css('top', 0);
	}
	container1.data('height', container1.height());
	rect1.data('width', rect1.width());
	var _cHei = container2Inner.height();
	var _maxHei = Math.max(windowHeight, _cHei + 100);
	container2.css('height', _maxHei + 50);
	container2.data('width', container2.width());
	container2.data('height', container2.height());
	container2.data('offset', container2.offset());
	container2Inner.data('topToContainer2', (_maxHei - _cHei) / 2);
	container2Inner.css('left', (windowWidth - container2Inner.width()) / 2);
	//container2Inner.data('offset', container2Inner.offset());
	title2Clone.css('width', title2.width());
	title2Clone.css('height', title2.height());
	title2.data('topToContainer2', container2Inner.data('topToContainer2') + 30);
	for (var i = 0; i < container2Texts.length; i++) {
		container2Texts[i].data('topToContainer2', container2Texts[i].offset().top - container2Inner.offset().top + container2Inner.data('topToContainer2'));
	}
	bg3.data('width', bg3.width());
	bg3.data('height', bg3.height());
	_maxHei = Math.max(windowHeight * 2, bg3.data('height') * 3);
	container3.css('height', _maxHei);
	container3.data('width', container3.width());
	container3.data('height', _maxHei);
	container3.data('offset', container3.offset());
	title3.show(); //reset title3, title3Clone
	title3.data('offset', title3.offset());
	title3.css('left', (windowWidth - title3.width()) / 2);
	title3.hide();
}
function windowScrolled() {
	scrollTopPrev = scrollTop;
	scrollTop = win.scrollTop();
	checkBg1();
	checkRect1();
	checkBg2();
	checkBg3();
}
function checkBg1() {
	var _scrollY = scrollTop;
	var _hideAt = config.bg_1_hideAt * widthRate;
	if (_scrollY >= container1.data('height') - windowHeight * config.bg_1_followRate) {
		bg1.css('top', -container1.data('height') + windowHeight * config.bg_1_followRate);
	} else {
		bg1.css('top', -_scrollY);
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
	if (_top <= windowHeight + windowHeight * config.title_2_showAtRate ) {
		if (_top <= 0) {
			if (title2.hasClass('bg2-title-1-long-ani')) {
				title2.removeClass('bg2-title-1-long-ani').addClass('bg2-title-1-short-ani');
			}
			title2.css('top', _top + title2.data('topToContainer2'));
		} else {
			if (title2.hasClass('bg2-title-1-short-ani')) {
				title2.removeClass('bg2-title-1-short-ani').addClass('bg2-title-1-long-ani');
			}
			title2.css('top', title2.data('topToContainer2'));
		}
	} else {
		if (!title2.hasClass('bg2-title-1-long-ani')) {
			title2.removeClass('bg2-title-1-short-ani').addClass('bg2-title-1-long-ani');
		}
		title2.css('top', '120%');
	}
	if (_top + container2.data('height') <= windowHeight) {
		container2Inner.css('top', windowHeight - container2.data('height') + container2Inner.data('topToContainer2'));
		title2.css('top', windowHeight - container2.data('height') + title2.data('topToContainer2'));
	} else {
		container2Inner.css('top', container2Inner.data('topToContainer2') + _top);
	}
	if (_top + container2.data('height') < windowHeight * 0.75) {
		container2Mask1.css('left', Math.max(0, _top + container2.data('height')) * 100 / (windowHeight * 0.75) + '%');
		container2Mask2.css('bottom', -Math.max(0, _top + container2.data('height')) * 200 / (windowHeight * 0.75) + 'px');
	} else {
		container2Mask1.css('left', '100%');
		container2Mask2.css('bottom', '-200px');
	}
	for (var i = 0; i < container2Texts.length; i++) {
		if (container2Texts[i].data('topToContainer2') + _top <= windowHeight - 150) {
			container2Texts[i].css('top', 0).css('opacity', 1);
		} else {
			container2Texts[i].css('top', 100).css('opacity', 0);
		}
	} 
}
function checkBg3() {
	var _top = container3.data('offset').top - scrollTop;
	if (_top <= -windowHeight / 3) {
		title3.css('top', windowHeight * 0.3 + (_top + windowHeight) * 0.2);
	} else {
		title3.css('top', '30%');
	}
	if (_top <= -windowHeight / 3){
		title3.show();
	} else {
		title3.hide();
	}
	var _bg3StartAt = Math.min(windowHeight * 0.75, bg3.data('height') * 1);
	if (_top + container3.data('height') <= windowHeight) {

	} else if (_top <= windowHeight - _bg3StartAt) {
		// show bg3
		bg3.css('transform', 'scale(1, 1)');
		bg3.css('top', windowHeight - (windowHeight - _bg3StartAt - _top) * 0.5);
	} else {
		bg3.css('transform', 'scale(0.2, 0.2)');
		bg3.css('top', windowHeight);
	}
}

setTimeout(function() {
	displayBg2WidgetAni();
},5000);

function displayBg2WidgetAni() {
	// 大正方形 环绕
	var squareTop = $('.bg2-title-1 .line-top');
	var squareBottom = $('.bg2-title-1 .line-bottom-70');
	var squareLeft = $('.bg2-title-1 .line-left');
	var squareRight = $('.bg2-title-1 .line-right');

	// xiao正方形 环绕
	var square1Top = $('.square-container-1 .line-top-reverse');
	var square1Bottom = $('.square-container-1 .line-bottom-100');
	var square1Left = $('.square-container-1 .line-left-reverse');
	var square1Right = $('.square-container-1 .line-right-reverse');

	// 三角形 放大缩小
	var trangle = $('.square-container-1 > .trangle-container');
	//  small text
	var smallText = $('.bg2-title-2 .bg2-text-mask');

	// 大正方形 环绕
	console.log(square1Top.length);
	squareTop.addClass("line-top-animate");
	squareBottom.addClass("line-bottom-animate");
	squareLeft.addClass("line-left-animate");
	squareRight.addClass("line-right-animate");

	// 三角形 放大缩小
	trangle.addClass("trangle-scale-ani");
	smallText.addClass("bg2-text-ani");
	
	// xiao正方形 环绕
	square1Top.addClass("line-top-animate-1");
	square1Bottom.addClass("line-bottom-animate-1");
	square1Left.addClass("line-left-animate-1");
	square1Right.addClass("line-right-animate-1");
}

/* 
 * Function definition
 * End 
 */ 