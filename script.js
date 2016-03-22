var windowLoaded = false;
var webComponentsFired = false;

function init() {
	if (windowLoaded && webComponentsFired) {
		document.querySelector('body').style.background = '';
		// $('iron-image.paper-card').css('display','inline');
		// $('[container]').width(Math.floor($('#mainContainer').width()/408)*408);

		var app = document.querySelector('template[is="dom-bind"]');

		app.page = 1;

		var grad = document.createElement("div");
		grad.setAttribute("gradient", "");
		$(grad).insertAfter($('iron-image.paper-card:not([hidden])'));

		arrange();

		// app.page = 1;
	}
};

var supportsOrientationChange = "onorientationchange" in window,
orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

$(window).on({
	WebComponentsReady: function() {
		webComponentsFired = true;
		init();
	},
	load: function() {
		windowLoaded = true;
		init();
	},
	orientationEvent: function() {
		// arrange();
	}

});


var width = widthOld = $(window).width(), small = width <= 780;
$(window).resize(function(){
	width = $(window).width();
	if (width == widthOld) {return;}
	// else if (widthOld > 780 && width <= 780) {
	// 	arrange();
	// }
	else if (widthOld <= 780 && width > 780) {
		arrange(1);
	} else {
		arrange();
	}
	widthOld = width;
});

// function rearrange(i){
// 	$('[main]').pinbox({ind:'paper-card',rows:i,abs:!1});
// 	$('[container]').width(i*408);
// }



// ######## ##     ## ##    ##  ######  ######## ####  #######  ##    ##  ######
// ##       ##     ## ####  ## ##          ##     ##  ##     ## ####  ## ##
// ######   ##     ## ## ## ## ##          ##     ##  ##     ## ## ## ##  ######
// ##       ##     ## ##  #### ##          ##     ##  ##     ## ##  ####       ##
// ##        #######  ##    ##  ######     ##    ####  #######  ##    ##  ######

function arrange(navSlide = 0){
	var app = document.querySelector('template[is="dom-bind"]');
	var page = app.page;
	app.page = 0;

	var columns = [];
	var $pages = $('[container]');
	var cardWidth = $('paper-card').first().outerWidth(true);
	var cardMargin = parseInt($('paper-card').first().css('margin'),10);
	var superContWidth = $('#mainPanel section:eq(0)').innerWidth();
	if (navSlide == 1) {superContWidth -= 256;}

	var colCount;
	var cardsInPage;
	var cards;
	var card;
	var lowest;
	var $this;

	$pages.each(function(i) {
		app.page = i;
		$page = $(this);
		$cards = $page.children();
		cardsInPage = $cards.length;
		colCount = Math.max(Math.min(Math.floor(superContWidth / cardWidth), cardsInPage), 1);
		$page.width(colCount * cardWidth);
		for(var l=0;l<colCount;l++){columns[l]=0;}
		$cards.each(function(j) {
			$this = $(this);
			lowest = columns.indexOf(Math.min.apply(null,columns));
			$(this).css({'left':lowest*cardWidth,'top':columns[lowest]+cardMargin});
			columns[lowest] += $this.outerHeight() + cardMargin * 2;
		});
		columns = [];
	});
	app.page = page;
};
