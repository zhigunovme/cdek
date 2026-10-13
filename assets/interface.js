jQuery(document).ready(function() {
	jQuery('.menu-burger__header').click(function(){
		jQuery('.menu-burger__header').toggleClass('open-menu');
		jQuery('.header__nav').toggleClass('open-menu');
		jQuery('body').toggleClass('fixed-page');
	});
});

jQuery(document).ready(function() {
	jQuery('.menu__item').click(function(){
		jQuery('.menu-burger__header').removeClass('open-menu');
		jQuery('.header__nav').removeClass('open-menu');
        jQuery('body').removeClass('fixed-page');
	});
});

jQuery(".b-more").click(function () {
	jQuery(".adapt").toggle();
	jQuery(".b-more").css("display", "none");
	});


jQuery(document).ready(function(){
	jQuery('.slider').slick({
		dots: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		prevArrow: ('.slick-prev'),
		  nextArrow: ('.slick-next'),
		  responsive: [
			  {
				breakpoint: 768,
				settings: {
				  slidesToShow: 2,
				  slidesToScroll: 2
				},
 }, { breakpoint: 500,
				settings: {
				  slidesToShow: 1,
				  slidesToScroll: 1
				}
			  }
			]
	  });
	});

jQuery(document).ready(function(){
	jQuery('.slider-video').slick({
			centerMode: true,
			dots: false,
			infinite: true,
			slidesToShow: 3,
			slidesToScroll: 1,
			variableWidth: true,
			draggable: false,
			prevArrow: ('.video-prev'),
			  nextArrow: ('.video-next'),
			  responsive: [
					{
					  breakpoint: 980,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					  }
					}
				  ]
		  });
		});
		