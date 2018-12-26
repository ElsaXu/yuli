



/* 
 * Visual dom elements definition
 * Start 
 */ 
var win = $(window);
var html = $('html');
var body = $('body');
var blank = $('.blank');
var container1 = $('.container-1');
var rect1 = $('.rect-1');
var bg1 = $('.bg-1');
var title1 = $('.title-1');
var title2 = $('.bg2-title-1');
var title21 = $('.bg2-title-2').eq(0);
var title21Fixed = $('.bg2-title-2-fixed');
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
var bg3TitleMask = $('.bg3-title-mask');
var bg3TitleImage = $('.bg3-title-mask>img');
var bg3 = $('.bg3-image');
var container4 = $('.container-4');
var container4Inner = $('.container4-inner');
var title41 = $('.bg4-title-2').eq(0);
var title41Fixed = $('.bg4-title-2-fixed');
var title41Square = title41.find('.square-container-2');
var container4Images = [$('.bg4-image-1'), $('.bg4-image-2'), $('.bg4-image-3')];
var footer = $('.footer');
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
var square2Top = $('.square-container-2 .line-top-reverse');
var square2Bottom = $('.square-container-2 .line-bottom-100');
var square2Left = $('.square-container-2 .line-left-reverse');
var square2Right = $('.square-container-2 .line-right-reverse');
// 三角形 放大缩小
var trangle = $('.square-container-1 > .trangle-container');
var trangle2 = $('.square-container-2 > .trangle-container');
//  small text
var smallText = $('.bg2-title-2 .bg2-text-mask');
var smallText2 = $('.bg4-title-2 .bg2-text-mask');
var allImages;
var globalMask = $('.global-mask');
var loadingNum = globalMask.find('.loading-num');
var menuSlider = $('.menu-wrapper');
var menuBar = $('.menu-icon-wrapper');
var menu = $('.menu');
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
	body_fontSize: 16 * 4,
	bg_1_width: 1920,
	bg_1_height: 2133,
	bg_1_hideAt: 1100,
	bg_1_heightRate: 2,
	bg_1_followRate: 1,
	rect_1_showAt: 200,
	rect_1_hideAt: 1200,
	rect_1_widthRate: 0.65,
	title_1_hideAt: 0,
	bg_2_defaultColor: '#b40020',
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
	// $('body').hide();
	// $('body').children('div').hide();
	globalMask.show();
	allImages = $('img');
	checkImagesLoading();
});

document.getElementById("menu-icon-wrapper").addEventListener('touchstart',function(e) {
	console.log("123")
	menuSlider.toggleClass("menu-slider-left-ani")
	menu.toggleClass("menu-ani")

})
menuBar.on('click',function() {
	menuSlider.toggleClass("menu-slider-left-ani")
	menu.toggleClass("menu-ani")
})

function init() {
	win.scrollTop(0);
	windowResized();
	windowScrolled();
	addEventListeners();
}
function checkImagesLoading() {
	var intervalId;
	intervalId = setInterval(function() {
		check();
	}, 300);
	function check() {
		var numDone = 0;
		allImages.each(function(index, item) {
			if (item.complete) numDone ++;
			loadingNum.text(Math.round(numDone / allImages.length * 100));
		});
		if (numDone >= allImages.length) {
			//$('body').children('div').show();
			init();
			globalMask.hide();
			if (intervalId) clearInterval(intervalId);
		}
	}
}
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
	title21.on('click', function() {
		window.location.href = "./hotpot.html";
	});
	title21Fixed.on('click', function() {
		window.location.href = "./hotpot.html";
	});
	title41.on('click', function() {
		window.location.href = "./specialty.html";
	});
	title41Fixed.on('click', function() {
		window.location.href = "./specialty.html";
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
		//bg1.css('top', -scrollTop);
	} else {
		container1.css('height', windowHeight * config.bg_1_heightRate);
		bg1.find('img').css('height', windowHeight * config.bg_1_heightRate).css('width', '');
		//bg1.css('top', 0);
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
	title21.data('topToContainer2', title21.offset().top - container2.data('offset').top);
	title2.css('left', title2Clone.offset().left);
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
	title3.data('offset', title3.offset());
	title3.css('left', (windowWidth - title3.width()) / 2);
	title4.data('topToContainer2', 80);
	title4.css('left', (windowWidth - title4.width()) / 2);
	bg3TitleImage.width(title3.width());
	_cHei = container4Inner.height();
	_maxHei = Math.max(windowHeight, _cHei + 200);
	container4.css('height', _maxHei + 100);
	container4.data('width', container4.width());
	container4.data('height', _maxHei);
	container4.data('offset', container4.offset());
	container4.data('toTop', container3.data('toTop') + container3.data('height'));
	container4Inner.data('toTop', (_maxHei - _cHei) / 2);
	container4Inner.css('left', (windowWidth - container4Inner.width()) / 2);
	title41Fixed.css('left', (windowWidth - container4Inner.width()) / 2);
	title41.data('topToContainer4', title41Square.offset().top - container4.data('offset').top);
	for (var i = 0; i < container4Images.length; i++) {
		container4Images[i].data('topToContainer4', container4Images[i].offset().top - container4Inner.offset().top + container4Inner.data('toTop'));
	}
	blank.css('height', container4.data('toTop') + container4.data('height'));
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
		//bg1.css('top', -container1.data('height') + windowHeight * config.bg_1_followRate);
		container1.css('top', -container1.data('height') + windowHeight * config.bg_1_followRate);
	} else {
		//bg1.css('top', -_scrollY);
		container1.css('top', -_scrollY);
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
	var _top = container2.data('toTop') - scrollTop;
	var _hei = container2.data('height');
	container2.css('top', _top);
	if (_top < windowHeight * config.bg_2_colorSwitchRate) {
		container2.css('background-color', config.bg_2_finalColor);
	} else {
		container2.css('background-color', config.bg_2_defaultColor);
	}
	if (_top + title21.data('topToContainer2') < windowHeight) {
		displayBg2WidgetAni2();
	} else {
		removeBg2WidgetAni2();
	}
	if (_top + title21.data('topToContainer2') < 0 && windowWidth <= 640) {
		title21.css('opacity', 0);
		title21Fixed.css('opacity', 1);
	} else {
		title21.css('opacity', 1);
		title21Fixed.css('opacity', 0);
	}
	var _dy = title2.data('topToContainer2');
	if (_top <= windowHeight + windowHeight * config.title_2_showAtRate ) {
		if (_top <= 0) {
			if (title2.hasClass('bg2-title-1-long-ani')) {
				title2.removeClass('bg2-title-1-long-ani').addClass('bg2-title-1-short-ani');
			}
			title2.css('top', _top + title2.data('topToContainer2'));
		} else {
			// if (title2.hasClass('bg2-title-1-short-ani')) {
			// 	title2.removeClass('bg2-title-1-short-ani').addClass('bg2-title-1-long-ani');
			// }
			if (title2.css('top') === title2.data('topToContainer2')) {
				title2.removeClass('bg2-title-1-long-ani').addClass('bg2-title-1-short-ani');
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
		title3.css('top', windowHeight * 0.3 + (_top + windowHeight) * 0.2);
	}
	if ((_top <= -windowHeight / 3 && windowWidth > 640) || (_top <= 0 && windowWidth <= 640)) {
		bg3TitleMask.css('width', '100%');
		bg3TitleMask.css('opacity', 1);
	} else {
		bg3TitleMask.css('width', 0);
		bg3TitleMask.css('opacity', 0);
	}
	// var _bg3StartAt = Math.min(windowHeight * 0.75, bg3.data('height') * 1);
	var _bg3StartAt = Math.min(windowHeight * 0.75, bg3.data('height') * 0.5);
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
	if (_top + title41.data('topToContainer4') < windowHeight) {
		displayBg4WidgetAni1();
	} else {
		removeBg4WidgetAni1();
	}
	if (_top + title41.data('topToContainer4') <= 0 && windowWidth <= 640) {
		title41.css('opacity', 0);
		title41Fixed.css('opacity', 1);
	} else {
		title41.css('opacity', 1);
		title41Fixed.css('opacity', 0);
	}
	for (var i = 0; i < container4Images.length; i++) {
		if (container4Images[i].data('topToContainer4') + _top <= windowHeight - 150) {
			container4Images[i].css('top', 0).css('opacity', 1);
		} else {
			container4Images[i].css('top', 100).css('opacity', 0);
		}
	}
}

// setTimeout(function() {
// 	displayBg4ImageAni();
// 	displayBg2WidgetAni();
// 	bg3TitleAni();
// },10000);

function displayBg2WidgetAni1() {
	// 大正方形 环绕
	squareTop.addClass("line-top-animate");
	squareBottom.addClass("line-bottom-animate");
	squareLeft.addClass("line-left-animate");
	squareRight.addClass("line-right-animate");
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
function displayBg4WidgetAni1() {
	// 三角形 放大缩小
	trangle2.addClass("trangle-scale-ani");
	smallText2.addClass("bg2-text-ani");
	// xiao正方形 环绕
	square2Top.addClass("line-top-animate-1");
	square2Bottom.addClass("line-bottom-animate-1");
	square2Left.addClass("line-left-animate-1");
	square2Right.addClass("line-right-animate-1");
}


// function displayBg2BigSquare() {
// 	var squareTop = $('.bg2-title-1 .line-top');
// 	var squareBottom = $('.bg2-title-1 .line-bottom-70');
// 	var squareLeft = $('.bg2-title-1 .line-left');
// 	var squareRight = $('.bg2-title-1 .line-right');

// 	squareTop.addClass("line-top-animate");
// 	squareBottom.addClass("line-bottom-animate");
// 	squareLeft.addClass("line-left-animate");
// 	squareRight.addClass("line-right-animate");
// }

// function displayBg2WidgetAni() {
// 	// xiao正方形 环绕
// 	var square1Top = $('.square-container-1 .line-top-reverse');
// 	var square1Bottom = $('.square-container-1 .line-bottom-100');
// 	var square1Left = $('.square-container-1 .line-left-reverse');
// 	var square1Right = $('.square-container-1 .line-right-reverse');
// 	// 三角形 放大缩小
// 	var trangle = $('.square-container-1 > .trangle-container');
// 	var smallText = $('.bg2-title-2 .bg2-text-mask');
// 	// 三角形 放大缩小
// 	trangle.addClass("trangle-scale-ani");
// 	smallText.addClass("bg2-text-ani");
// 	// xiao正方形 环绕
// 	square1Top.addClass("line-top-animate-1");
// 	square1Bottom.addClass("line-bottom-animate-1");
// 	square1Left.addClass("line-left-animate-1");
// 	square1Right.addClass("line-right-animate-1");
// }

function removeBg2WidgetAni1() {
	// 大正方形 环绕
	squareTop.removeClass("line-top-animate");
	squareBottom.removeClass("line-bottom-animate");
	squareLeft.removeClass("line-left-animate");
	squareRight.removeClass("line-right-animate");
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
function removeBg4WidgetAni1() {
	// 三角形 放大缩小
	trangle2.removeClass("trangle-scale-ani");
	smallText2.removeClass("bg2-text-ani");
	// xiao正方形 环绕
	square2Top.removeClass("line-top-animate-1");
	square2Bottom.removeClass("line-bottom-animate-1");
	square2Left.removeClass("line-left-animate-1");
	square2Right.removeClass("line-right-animate-1");
}
// scenario 3 title
function bg3TitleAni() {
	var bg3title2 = $('.bg3-title-2 .bg3-title-mask');
	bg3title2.addClass("bg3-title-ani");
}
// scenario 4 title
function displayBg4ImageAni() {
	var bg4Image1 = $(".bg4-image-container .bg4-image-1");
	var bg4Image2 = $(".bg4-image-container .bg4-image-2");
	var bg4Image3 = $(".bg4-image-container .bg4-image-3");

	bg4Image1.addClass("bg4-image-ani-1");
	bg4Image2.addClass("bg4-image-ani-2");
	bg4Image3.addClass("bg4-image-ani-3");
}

/* 
 * Function definition
 * End 
 */ 