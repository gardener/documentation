$(document).ready(function(){
	// Variables
	var $window = $(window);
	$window.sr = ScrollReveal({ reset: false});
	$window.sr.reveal('.reveal-fast', { duration: 2000 });
	$window.sr.reveal('.reveal-slow', { duration: 2500 });
	$window.sr.reveal('.reveal-right', { duration: 2000, origin:'right', distance:'30px' });
	$window.sr.reveal('.reveal-left', { duration: 2000, origin:'left', distance:'30px' });

})

$(window).load(function() {
		
	// reverse the z-index of all "page" elements to ensure that
	// the stacked page effect works well
	//
	var item_count = 1000;
	for( i = 0; i < item_count; i++ ){
		$('.page').eq( i ).css( 'z-index', item_count - (i*100) );
	}


	var height = 0;
	$(".page").each(function(){
		$this = $(this);
		height +=$this.outerHeight();
	})
	$("html").css({height:height});

	var controller = new ScrollMagic.Controller();	


	new ScrollMagic.Scene({
		triggerElement: "#page-1",
		triggerHook: 0,
		offset:10,
		duration:"200%"
	})
	.setTween(TweenMax.to("#page-1 .container", 1, {y:'-250%', ease:Power0.easeNone}))
//	.addIndicators()
	.addTo(controller); // assign the scene to the controller


	// create a scene
	new ScrollMagic.Scene({
		triggerElement:  ".projectMembers",
		triggerHook: 0,
		offset:100,
		duration:"200%"
		})
	.setTween(TweenMax.to(".projectMembers", 1, {backgroundPositionY:'500px', ease:Power0.easeNone}))
	.addTo(controller); // assign the scene to the controller
	
	$(".page").each(function(){

		// create a scene
		new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 0,
			offset:100,
			duration:"200%"
			})
		.setTween(TweenMax.from($(this.nextElementSibling).find("img.poster"), 1, {y:'100px', ease:Power0.easeNone}))
		.addTo(controller); // assign the scene to the controller

		// create a scene
		new ScrollMagic.Scene({
			triggerElement: this,
			triggerHook: 0,
			offset: $(this).outerHeight()
		})
		.setClassToggle(this.nextElementSibling,"not-fixed")
		.addTo(controller); // assign the scene to the controller


		if(this.nextElementSibling.firstElementChild!==null){
			var parallaxTimeline = new TimelineMax()
			parallaxTimeline
				.to(this.nextElementSibling.lastElementChild, 1, {autoAlpha:0, ease:Power0.easeNone},1)
				.from(this.nextElementSibling.firstElementChild, 1, {y:'50', ease:Power0.easeNone},1);
			new ScrollMagic.Scene({
				triggerElement: this,
				triggerHook: 0.3,
				duration: "40%",
				offset: $(this).outerHeight()/2
			})
	//		.addIndicators()
			.setTween(parallaxTimeline)
			.addTo(controller);
		}
	})

	//  bind scroll to anchor links
	$(document).on("click", "a[href^='#']", function (e) {
		e.preventDefault();
		var id = $(this).attr("href");
		var height = $(id).outerHeight()+30
		TweenMax.to(window,0.8, {scrollTo: {y:height}});
	});
});	

