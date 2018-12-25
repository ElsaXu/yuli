
var shareBtnWeiBo = $('.share-weibo');
var shareBtnWeiXin = $('.share-weixin');
var shareBtnVideo = $('.share-video');
var shareMaskWeiXin = $('.share-mask-weixin');
var shareMaskWeiBo = $('.share-mask-weibo');
var shareImageWeiXin = $('.share-weixin-img');
var shareImageWeiBo = $('.share-weibo-img');

shareMaskWeiXin.hide();
shareMaskWeiBo.hide();

shareBtnWeiXin.on('click', function() {
	shareMaskWeiXin.show();
});

shareBtnWeiBo.on('click', function() {

});

shareBtnVideo.on('click', function() {

});

shareMaskWeiXin.on('click', function() {
	shareMaskWeiXin.hide();
});

shareMaskWeiBo.on('click', function() {
	shareMaskWeiBo.hide();
});

shareImageWeiXin.on('click', function() {

});

shareImageWeiBo.on('click', function() {

});