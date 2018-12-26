(
	function() {

var shareBtnWeiBo = $('.share-weibo');
var shareBtnWeiXin = $('.share-weixin');
var shareBtnVideo = $('.share-video');
var shareMaskWeiXin = $('.share-mask-weixin');
var shareMaskVideo = $('.share-mask-video');
var shareImageWeiXin = $('.share-weixin-img');
var shareVideoClip = $('.share-video-clip');
var shareMovie = shareVideoClip.find('video');
var defaultVideoWidth = 720;
var defaultVideoHeight = 480;
var ratio = defaultVideoWidth / defaultVideoHeight;
var menuWrapper = $('.menu-wrapper');
var menuBar = $('.menu-icon-wrapper');
var menu = $('.menu');
//var menuExpanded = false;

shareMaskWeiXin.hide();
shareMaskVideo.hide();

shareBtnWeiXin.on('click', function() {
	shareMaskWeiXin.show();
});

shareBtnWeiBo.on('click', function() {

});

shareBtnVideo.on('click', function() {
	shareMaskVideo.show();
});

shareMaskWeiXin.on('click', function() {
	shareMaskWeiXin.hide();
});

shareMaskVideo.on('click', function() {
	shareMaskVideo.hide();
	shareMovie[0].pause();
});

shareImageWeiXin.on('click', function() {

});

menuBar.on('click', function() {
	//menuExpanded = !menuExpanded;
	menuWrapper.toggleClass('menu-slider-left-ani');
	if (menuWrapper.hasClass('menu-slider-left-ani')) {
		menu.css('left', menuWrapper.outerWidth());
		menu.find('.menu-icon-1').hide();
		menu.find('.menu-icon-2').show();
	} else {
		menu.css('left', '');
		menu.find('.menu-icon-1').show();
		menu.find('.menu-icon-2').hide();
	}
});

$(window).on('resize.util', function() {
	checkWindowSize();
});

checkWindowSize();

function checkWindowSize() {
	var wid = $(window).width();
	var hei = $(window).height();
	wid = Math.min(wid, defaultVideoWidth);
	hei = Math.min(hei, defaultVideoHeight);
	if (wid / hei > ratio) {
		wid = hei * ratio;
	} else {
		hei = wid / ratio;
	}
	shareMovie.css('width', wid);
	shareMovie.css('height', hei);
	shareVideoClip.css('top', ($(window).height() - hei) / 2);
	shareVideoClip.css('left', ($(window).width() - wid) / 2);
	if (menuWrapper.hasClass('menu-slider-left-ani')) {
		menu.css('left', menuWrapper.outerWidth());
	}
}

})();
