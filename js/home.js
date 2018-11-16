/* 
 * Visual dom elements definition
 * Start 
 */ 
var win = $(window);
var html = $('html');
var body = $('body');
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
var title4 = $('.bg3-title-1');
var bg3 = $('.bg3-image');
var container4 = $('.container-4');
var container4Inner = $('.container4-inner');
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
		windowScrolled();
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
	html.css('font-size', (config.body_fontSize * widthRate) + 'px');

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
	container1.data('toTop', 0);
	rect1.data('width', rect1.width());
	var _cHei = container2Inner.height();
	var _maxHei = Math.max(windowHeight -50, _cHei + 200);
	container2.css('height', _maxHei + 50);
	container2.data('width', container2.width());
	container2.data('height', container2.height());
	container2.data('offset', container2.offset());
	container2.data('toTop', container1.data('height'));
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
	container3.data('toTop', container2.data('toTop') + container2.data('height'));
	title3.show(); //reset title3, title3Clone
	title3.data('offset', title3.offset());
	title3.css('left', (windowWidth - title3.width()) / 2);
	title3.hide();
	title4.data('topToContainer2', 80);
	title4.css('left', (windowWidth - title4.width()) / 2);
	_cHei = container4Inner.height();
	_maxHei = Math.max(windowHeight, _cHei + 200);
	container4.css('height', _maxHei + 100);
	container4.data('width', container4.width());
	container4.data('height', _maxHei);
	container4.data('toTop', container3.data('toTop') + container3.data('height'));
	container4Inner.data('toTop', (_maxHei - _cHei) / 2);
	container4Inner.css('left', (windowWidth - container4Inner.width()) / 2);
	body.css('height', container4.data('toTop') + container4.data('height'));
}
function windowScrolled() {
	scrollTopPrev = scrollTop;
	scrollTop = win.scrollTop();
	checkBg1();
	checkRect1();
	checkBg2();
	checkBg3();
	checkBg4();
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
	container1.css('top', _scrollY);
}
function checkBg2() {
	var _top = container2.data('toTop') - scrollTop;
	var _hei = container2.data('height');
	container2.css('top', _top);
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
			//displayBg2BigSquare();
			//displayBg2WidgetAni();
			title2.css('top', title2.data('topToContainer2'));
		}
		displayBg2WidgetAni1();
	} else {
		if (!title2.hasClass('bg2-title-1-long-ani')) {
			title2.removeClass('bg2-title-1-short-ani').addClass('bg2-title-1-long-ani');
		}
		removeBg2WidgetAni1();
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
	var _top = container3.data('toTop') - scrollTop;
	container3.css('top', _top);
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
	if (_top <= windowHeight - _bg3StartAt) {
		// show bg3
		bg3.css('transform', 'scale(1, 1)');
		bg3.css('top', windowHeight - (windowHeight - _bg3StartAt - _top) * 0.5);
	} else {
		bg3.css('transform', 'scale(0.2, 0.2)');
		bg3.css('top', windowHeight);
	}
	if (_top <= windowHeight) {
		title4.css('top', _top + title4.data('topToContainer2'));
	} else {
		title4.css('top', '120%');
	}
}
function checkBg4() {
	var _top = container4.data('toTop') - scrollTop;
	container4.css('top', _top);
	container4Inner.css('top', _top + container4Inner.data('toTop'));
	// displayBg4WidgetAni();
	// displayBg2WidgetAni();
	// if (_top <= windowHeight - _bg3StartAt) {
	// 	// show bg3
	// 	bg3.css('transform', 'scale(1, 1)');
	// 	bg3.css('top', windowHeight - (windowHeight - _bg3StartAt - _top) * 0.5);
	// } else {
	// 	bg3.css('transform', 'scale(0.2, 0.2)');
	// 	bg3.css('top', windowHeight);
	// }
	// if (_top <= windowHeight) {
	// 	title4.css('top', _top + title4.data('topToContainer2'));
	// } else {
	// 	title4.css('top', '120%');
	// }
}

setTimeout(function() {
	var bg3title2 = $('.bg3-title-2 .bg3-title-mask');
	bg3title2.addClass("bg3-title-ani");
	displayBg4WidgetAni();
	displayBg2WidgetAni();
},5000);

var timerId1;
var timerId2;
function displayBg2WidgetAni1() {
	if (timerId2) clearTimeout(timerId2);
	if (timerId1) return;
	// 大正方形 环绕
	timerId1 = setTimeout(function() {
		squareTop.addClass("line-top-animate");
		squareBottom.addClass("line-bottom-animate");
		squareLeft.addClass("line-left-animate");
		squareRight.addClass("line-right-animate");
	}, 2500);
}
function displayBg2WidgetAni2() {
	// 三角形 放大缩小
	trangle.addClass("trangle-scale-ani");
	smallText.addClass("bg2-text-ani");
	// xiao正方形 环绕
	square1Top.addClass("line-top-animate-1");
	square1Bottom.addClass("line-bottom-animate-1");
	square1Left.addClass("line-left-animate-1");
	square1Right.addClass("line-right-animate-1");
}
function displayBg2BigSquare() {
	var squareTop = $('.bg2-title-1 .line-top');
	var squareBottom = $('.bg2-title-1 .line-bottom-70');
	var squareLeft = $('.bg2-title-1 .line-left');
	var squareRight = $('.bg2-title-1 .line-right');

	squareTop.stop(true, true);
	squareBottom.stop(true, true);
	squareLeft.stop(true, true);
	squareRight.stop(true, true);

	squareTop.addClass("line-top-animate");
	squareBottom.addClass("line-bottom-animate");
	squareLeft.addClass("line-left-animate");
	squareRight.addClass("line-right-animate");
}

function displayBg2WidgetAni() {
	// xiao正方形 环绕
	var square1Top = $('.square-container-1 .line-top-reverse');
	var square1Bottom = $('.square-container-1 .line-bottom-100');
	var square1Left = $('.square-container-1 .line-left-reverse');
	var square1Right = $('.square-container-1 .line-right-reverse');
	// 三角形 放大缩小
	var trangle = $('.square-container-1 > .trangle-container');
	var smallText = $('.bg2-title-2 .bg2-text-mask');
	// 三角形 放大缩小
	trangle.addClass("trangle-scale-ani");
	smallText.addClass("bg2-text-ani");
	// xiao正方形 环绕
	square1Top.addClass("line-top-animate-1");
	square1Bottom.addClass("line-bottom-animate-1");
	square1Left.addClass("line-left-animate-1");
	square1Right.addClass("line-right-animate-1");
}
function removeBg2WidgetAni1() {
	if (timerId1) clearTimeout(timerId1);
	if (timerId2) return;
	// 大正方形 环绕
	timerId2 = setTimeout(function() {
		squareTop.removeClass("line-top-animate");
		squareBottom.removeClass("line-bottom-animate");
		squareLeft.removeClass("line-left-animate");
		squareRight.removeClass("line-right-animate");
	}, 2500);
}
function removeBg2WidgetAni2() {
	// 三角形 放大缩小
	trangle.removeClass("trangle-scale-ani");
	smallText.removeClass("bg2-text-ani");
	// xiao正方形 环绕
	square1Top.removeClass("line-top-animate-1");
	square1Bottom.removeClass("line-bottom-animate-1");
	square1Left.removeClass("line-left-animate-1");
	square1Right.removeClass("line-right-animate-1");
}

function displayBg4WidgetAni() {
	var bg4Image1 = $(".bg4-image-container .bg4-image-1");
	var bg4Image2 = $(".bg4-image-container .bg4-image-2");
	var bg4Image3 = $(".bg4-image-container .bg4-image-3");

	bg4Image1.stop(true,true);
	bg4Image2.stop(true,true);
	bg4Image3.stop(true,true);

	bg4Image1.addClass("bg4-image-ani-1");
	bg4Image2.addClass("bg4-image-ani-2");
	bg4Image3.addClass("bg4-image-ani-3");
}

/* 
 * Function definition
 * End 
 */ 