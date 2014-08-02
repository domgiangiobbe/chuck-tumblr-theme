<script type="text/javascript">
	$(window).ready(function() {
		console.log('scroll top this ' + $(this).scrollTop());
		console.log('cover outerHeight ' + $("#cover").outerHeight());

		if(window.location.href == "http://chucktheme.tumblr.com/") {
			$('body').addClass('index-page');
			$('article.text-post, article.link-post').remove();
			// $('#posts').masonry('reload');
		}

		$('#contact-head').closest('body').addClass('contact-page');
		$('#cv-head').closest('body').addClass('cv-page');
	});

	// ADDED THROUGH .JavaScript
	$("p").remove(":contains('Source:'),:contains('via ')");

	$('.photoset-grid').photosetGrid({
		highresLinks: true,
		rel: $('.photoset-grid').attr('data-id'),
		gutter: '5px',
		onComplete: function(){}
	});

	$('.photoset-grid').each(function() {
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
			gallery: {
				enabled: true
			},
			removalDelay: 200,
			mainClass: 'mfp-fade',
			image: {
				titleSrc: function(item) {
					var titleHtml;

					$('div.large-post > img').each(function() {
						if($(this).attr('src') == item.el.attr('href')) {
							console.log('this if statment work ' + $(this).closest('div.photo').next().find('div.captions').html());
							titleHtml = $(this).closest('div.photo').next().find('div.captions').html();
						}
					});

					return titleHtml;
				}
			}
		});
	});

	{block:Indexpage}
	$('#cover').click(function(){
		scrollToTop();
	});


	function EasyPeasyParallax() {
		scrollPos = $(this).scrollTop();
		$('#cover #slideshow').css({'top':-(scrollPos/5)+"px"});
		$('#topbar').css({'opacity':scrollPos/($("#cover").outerHeight() - 90),'height':$("#cover").outerHeight() - scrollPos + "px"});
	};

	$(document).ready(function(){
		if(window.location.href == "http://chucktheme.tumblr.com/") {
			$(window).scroll(function() {
				EasyPeasyParallax();
			});
		}
	});

	// detect scroll up or down and open and close hero
	var scrollPos = 0;

	$(window).scroll(function () {
	    var curScrollPos = $(this).scrollTop();
	    
	    if (curScrollPos > scrollPos) {
	        //Scrolling Down
	        if (curScrollPos < 100 && curScrollPos > 0) {
	        	//scrollToTop();
	        }
	    } else {
	       //Scrolling Up
	       // console.log('up ' + curScrollPos);
	    }

	    scrollPos = curScrollPos;
	});

	// $(window).scroll(function(){
	// 	if ($(this).scrollTop() > $("#cover").outerHeight()){
	// 		$('#cover').css("opacity","0");
	// 	}else{
	// 		$('#cover').css("opacity","1");
	// 		scrollToTop();
	// 	}
	// });

	$('#topbar a#top').click(function(){
		$('html, body').animate({
			scrollTop: $('body').offset().top
		},1000);
	});
	{/block:Indexpage}

	$("a#slide").click(function(){
		$("#topbar").addClass("topbar-move");
		$("#sidebar").addClass("sidebar-move");
		$("#posts-container").addClass("posts-container-move")	;
		$("#full-overlay").addClass("overlay-show");
	});

	$("#full-overlay").click(function(){
		closeNav();
	});

	if($("#full-overlay").hasClass("overlay-show")){
		console.log('nav is open');
	};

	$(window).scroll(function(){
		//closeNav();
	});

	function closeNav() {
		$("#topbar").removeClass("topbar-move");
		$("#sidebar").removeClass("sidebar-move");
		$("#posts-container").removeClass("posts-container-move");
		$("#full-overlay").removeClass("overlay-show");
	};

	{block:Indexpage}
	$(window).scroll(function(){
		if ($(this).scrollTop() < $("#cover").outerHeight() - 130){
			$("#topbar").removeClass("topbar-move");
			$("#sidebar").removeClass("sidebar-move");
			$("#posts-container").removeClass("posts-container-move");
			$("#full-overlay").removeClass("overlay-show");
		}
	});
	{/block:Indexpage}

	// scroll to top function
	function scrollToTop() {
		$('html, body').animate({
			scrollTop: $("section").offset().top
		},1000);

		console.log('offset top ' + $("section").offset().top);
	};

	// to keep static
	{block:ifactivateslideshow}
		$("#slideshow > li:gt(0)").hide();

		setInterval(function() { 
			$('#slideshow > li:first').fadeOut(1000).next().fadeIn(1000).end().appendTo('#slideshow');
		},3000);
	{/block:ifactivateslideshow}

	{block:ifopenlinksinnewtab}
		$('a[href^="http://"]').attr('target','_blank');
	{/block:ifopenlinksinnewtab}

	function masonryInfinite(){
		var $K = $('#posts');

		$K.imagesLoaded(function (){
			$K.masonry({
				itemSelector:"#post-info,.entry{block:permalinkpage},.permalink-box{/block:permalinkpage}",
				columnWidth:1,
				isFitWidth:true
			})
		});

		$(window).resize(function(){ $K.masonry('reload'); });

		{block:ifinfinitescrolling}
			$K.infinitescroll({
				navSelector:'#pagination',
				nextSelector:'#pagination a#older',
				itemSelector: ".entry",
				animate: false,
				loading:{
					finishedMsg: function(){
						$('#infscr-loading').fadeOut("slow")
					}
				}
			},

			function(newElements){
				var $newElems = $(newElements).css("opacity","0").css("pointer-events","none");

				$("p").remove(":contains('Source:'),:contains('via ')");
				
				$('.photoset-grid').photosetGrid({
					highresLinks: true,
					rel: $('.photoset-grid').attr('data-id'),
					gutter: '5px',
					onComplete: function(){}
				});

				$('.photoset-grid').each(function() {
					$(this).magnificPopup({
						delegate: 'a',
						type: 'image',
						gallery: {
							enabled: true
						},
						removalDelay: 200,
						mainClass: 'mfp-fade',
						image: {
							titleSrc: function(item) {
								var titleHtml;

								$('div.large-post > img').each(function() {
									if($(this).attr('src') == item.el.attr('href')) {
										console.log('this if statment work ' + $(this).closest('div.photo').next().find('div.captions').html());
										titleHtml = $(this).closest('div.photo').next().find('div.captions').html();
									}
								});

								return titleHtml;
							}
						}
					});
				});

				var $newElemsIDs = $newElems.map(function (){
					return this.id;
				}).get();

				$newElems.imagesLoaded(function (){
					//$('#infscr-loading').fadeOut("slow");
					$newElems.css("opacity","1").css("pointer-events","auto");
					$K.masonry('appended',$newElems,true);

					console.log($newElems,$newElemsIDs);

					Tumblr.LikeButton.get_status_by_post_ids($newElemsIDs);
				});
			});
		{/block:ifinfinitescrolling}
	};

	if($('#paintings').length || $('#drawings').length) {
		console.log(this + ' current page runs masonry');
		masonryInfinite();
	}

	if(window.location.href == "http://chucktheme.tumblr.com/") {
		masonryInfinite();
	}

	
	// $(this).masonry('reload');

	{block:ifGoogleAnalyticsID}var _gaq = _gaq || [];_gaq.push(['_setAccount', '{text:Google Analytics ID}']);_gaq.push(['_trackPageview']);(function() {var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);})();
	{/block:ifGoogleAnalyticsID}
</script>