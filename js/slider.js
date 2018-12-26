var menuSlider = $('.menu-wrapper');
var menuBar = $('.menu-icon');


$(document).ready(function() {
	menuBar.addEventListener('touchStart', function() {
		menuSlider.toggleClass("menu-slider-left-ani")
	});
	menuBar.on('click',function() {
		menuSlider.toggleClass("menu-slider-left-ani")
	})
});