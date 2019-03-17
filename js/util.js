
(
	function() {

var sharePanel = $('.share');
var shareBtnWeiBo = $('.share-weibo');
var shareBtnWeiXin = $('.share-weixin');
var shareBtnVideo = $('.share-video');
var shareMaskWeiXin = $('.share-mask-weixin');
var shareMaskVideo = $('.share-mask-video');
var shareImageWeiXin = $('.share-weixin-img');
var shareVideoClip = $('.share-video-clip');
var shareMovie = shareVideoClip.find('video');
var defaultVideoWidth = 640;
var defaultVideoHeight = 480;
var ratio = defaultVideoWidth / defaultVideoHeight;
var menuWrapper = $('.menu-wrapper');
var menuBar = $('.menu-icon-wrapper');
var menu = $('.menu');
var footer = $('.footer');
var windowHeight = 0;
var pageHeight = 0;
var menuHeight = 0;
var scrollTop = 0;
//var menuExpanded = false;
if (window.registerImagesLoadedListener) {
	window.registerImagesLoadedListener.add(function() {
		checkWindowSize();
		var rec = $('#recruit');
		if (rec.length > 0 && window.location.hash === '#zhaopin') {
			window.location.hash = '';
			$(document).scrollTop(rec.offset().top);
		}
	});
}

shareMaskWeiXin.hide();
shareMaskVideo.hide();

shareBtnWeiXin.on('click', function() {
	shareMaskWeiXin.show();
});

shareBtnWeiBo.on('click', function() {
	window.open('https://weibo.com/p/1006062670501850/home?from=page_100606&mod=TAB&is_all=1#place', '_blank');
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
$(".menu-slider-home").mouseover(function(){
    $(".menu-home-normal").hide();
    $(".menu-home-hover").show();
});
$(".menu-slider-home").mouseout(function(){
    $(".menu-home-normal").show();
    $(".menu-home-hover").hide();
});
// $(".menu-slider-home").click(function(){
//     $(".menu-home-normal").hide();
//     $(".menu-home-hover").show();
// });
$(".menu-slider-home").on('touchstart', function(){
    $(".menu-home-normal").hide();
    $(".menu-home-hover").show();
});

$(".menu-slider-yuli").mouseover(function(){
    $(".menu-about-normal").hide();
    $(".menu-about-hover").show();
});
$(".menu-slider-yuli").mouseout(function(){
    $(".menu-about-normal").show();
    $(".menu-about-hover").hide();
});
// $(".menu-slider-yuli").click(function(){
//     $(".menu-about-normal").hide();
//     $(".menu-about-hover").show();
// });
$(".menu-slider-yuli").on('touchstart', function(){
    $(".menu-about-normal").hide();
    $(".menu-about-hover").show();
});

$(".menu-slider-hotpot").mouseover(function(){
    $(".menu-hotpot-normal").hide();
    $(".menu-hotpot-hover").show();
});
$(".menu-slider-hotpot").mouseout(function(){
    $(".menu-hotpot-normal").show();
    $(".menu-hotpot-hover").hide();
});
// $(".menu-slider-hotpot").click(function(){
//     $(".menu-hotpot-normal").hide();
//     $(".menu-hotpot-hover").show();
// });
$(".menu-slider-hotpot").on('touchstart', function(){
    $(".menu-hotpot-normal").hide();
    $(".menu-hotpot-hover").show();
});

$(".menu-slider-specialty").mouseover(function(){
    $(".menu-specialty-normal").hide();
    $(".menu-specialty-hover").show();
});
$(".menu-slider-specialty").mouseout(function(){
    $(".menu-specialty-normal").show();
    $(".menu-specialty-hover").hide();
});
// $(".menu-slider-specialty").click(function(){
//     $(".menu-specialty-normal").hide();
//     $(".menu-specialty-hover").show();
// });
$(".menu-slider-specialty").on('touchstart', function(){
    $(".menu-specialty-normal").hide();
    $(".menu-specialty-hover").show();
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

$(window).on('scroll.util', function() {
	checkWindowScroll();
});

checkWindowSize();

function checkWindowSize() {
	var wid = $(window).width();
	var hei = $(window).height();
	windowHeight = hei;
	pageHeight = $('body').height();
	footerHeight = footer.outerHeight();
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

function checkWindowScroll() {
	scrollTop = $(window).scrollTop();
	if (scrollTop >= pageHeight - footerHeight - windowHeight) {
		sharePanel.css('bottom', (footerHeight + 15) + 'px');
	} else {
		sharePanel.css('bottom', '15px');
	}
}

$(document).ready(function() {  
  
   $('a').on('click touchend', function(e) {  
      var el = $(this);  
      var link = el.attr('href');  
      window.location = link;  
   });  
  
});  

})();
