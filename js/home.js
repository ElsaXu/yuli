var win = $(window);
var rightRect = $('.rightRect');
var bg1 = $('.bg-1');
var config = {
	bg1Hide: 1500
}
win.scroll(function(evt) {
	checkBg1();
	//console.log(win.scrollTop());
	//rightRect.css('top', 100 + win.scrollTop());
});
win.on('resize', function() {
	console.log('ssssss');
});

function checkBg1() {
	var st = win.scrollTop();
	if (st > config.bg1Hide && !bg1.hasClass('be-fixed')) {
		bg1.addClass('be-fixed');
		bg1.css('top', -st);
	} else if (st <= config.bg1Hide && bg1.hasClass('be-fixed')) {
		bg1.removeClass('be-fixed');
		bg1.css('top', 0);
	}
}