(function ($) {

	// Scroll handler for scroll-to-top button - using passive listener
	// Note: We don't call preventDefault() here, so passive is fine for performance
	if (window.addEventListener) {
		var scrollHandler = function() {
			if (window.pageYOffset > 100) {
				$('.scrollup').fadeIn();
			} else {
				$('.scrollup').fadeOut();
			}
		};
		window.addEventListener('scroll', scrollHandler, { passive: true });
	} else {
		// Fallback for older browsers
		$(window).scroll(function(){
			if ($(this).scrollTop() > 100) {
				$('.scrollup').fadeIn();
			} else {
				$('.scrollup').fadeOut();
			}
		});
	}
		$('.scrollup').click(function(){
			$("html, body").animate({ scrollTop: 0 }, 1000);
				return false;
		});
	
	// local scroll - smooth scrolling for navigation links
	// Initialize after DOM and scripts are ready
	$(document).ready(function() {
		// Handle home link separately (scrolls to top)
		$('.navbar-nav a[href="/"]').on('click', function(e) {
			e.preventDefault();
			var $this = $(this);
			// Update URL in address bar
			if (window.history && window.history.pushState) {
				window.history.pushState(null, null, '/');
			} else {
				window.location.hash = '';
			}
			$('html, body').animate({
				scrollTop: 0
			}, 800, 'easeInOutExpo');
			// Update active state
			$('.navbar-nav li').removeClass('active');
			$this.parent().addClass('active');
			// Close mobile menu if open (with delay to allow click to complete)
			if ($(window).width() < 768) {
				setTimeout(function() {
					if ($('.navbar-collapse').hasClass('in')) {
						$('.navbar-collapse').collapse('hide');
					}
				}, 100);
			}
			return false;
		});
		
		// Handle navbar-brand click (OM ALUMINIUM title)
		$('.navbar-brand').on('click', function(e) {
			e.preventDefault();
			// Update URL in address bar
			if (window.history && window.history.pushState) {
				window.history.pushState(null, null, '/');
			} else {
				window.location.hash = '';
			}
			$('html, body').animate({
				scrollTop: 0
			}, 800, 'easeInOutExpo');
			// Update active state
			$('.navbar-nav li').removeClass('active');
			$('.navbar-nav a[href="/"]').parent().addClass('active');
			// Close mobile menu if open
			if ($(window).width() < 768) {
				setTimeout(function() {
					if ($('.navbar-collapse').hasClass('in')) {
						$('.navbar-collapse').collapse('hide');
					}
				}, 100);
			}
			return false;
		});
		
		// Initialize localScroll for hash links after scripts are loaded
		function initLocalScroll() {
			// Calculate offset dynamically based on current screen size
			var navbarOffset = $(window).width() < 768 ? 60 : 100;
			
			// Enable localScroll for navbar hash links
			if (typeof jQuery.fn.localScroll !== 'undefined') {
				// Remove any existing handlers to avoid duplicates
				jQuery('.navbar-nav a[href^="#"]').off('click.localScroll');
				
				jQuery('.navbar-nav a[href^="#"]').localScroll({
					hash: true,
					offset: { top: -navbarOffset },
					duration: 800,
					easing: 'easeInOutExpo',
					stop: true
				});
				
				// Also enable for all other anchor links in the page
				jQuery('a[href^="#"]').not('.navbar-nav a').localScroll({
					hash: true,
					offset: { top: -navbarOffset },
					duration: 800,
					easing: 'easeInOutExpo',
					stop: true
				});
			} else {
				// Retry if localScroll plugin isn't loaded yet
				setTimeout(initLocalScroll, 100);
			}
		}
		
		// Wait a bit for deferred scripts to load
		setTimeout(initLocalScroll, 300);
	});

	
	// portfolio
    if($('.isotopeWrapper').length){

        var $container = $('.isotopeWrapper');
        var $resize = $('.isotopeWrapper').attr('id');
        // initialize isotope
        
        $container.isotope({
            itemSelector: '.isotopeItem',
            resizable: false, // disable normal resizing
            masonry: {
                columnWidth: $container.width() / $resize
            }


            
        });

        $('#filter a').click(function(){



            $('#filter a').removeClass('current');
            $(this).addClass('current');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 1000,
                    easing: 'easeOutQuart',
                    queue: false
                }
            });
            return false;
        });
        
        
        $(window).smartresize(function(){
            $container.isotope({
                // update columnWidth to a percentage of container width
                masonry: {
                    columnWidth: $container.width() / $resize
                }
            });
        });
        

}  


	// fancybox
	jQuery(".fancybox").fancybox();


	if (Modernizr.mq("screen and (max-width:1024px)")) {
			jQuery("body").toggleClass("body");
			
	} else {
		// Wait for skrollr to be available before initializing
		function initSkrollr() {
			if (typeof skrollr !== 'undefined') {
				var s = skrollr.init({
					mobileDeceleration: 1,
					edgeStrategy: 'set',
					forceHeight: true,
					smoothScrolling: true,
					smoothScrollingDuration: 300,
					easing: {
						WTF: Math.random,
						inverted: function(p) {
							return 1-p;
						}
					}
				});
			} else {
				// Retry after a short delay if skrollr isn't loaded yet
				setTimeout(initSkrollr, 100);
			}
		}
		initSkrollr();
	}



	//scroll menu - Update active menu item based on scroll position
	jQuery('.appear').appear();
	jQuery(".appear").on("appear", function(data) {
		var id = $(this).attr("id");
		if (id) {
			jQuery('.navbar-nav li').removeClass('active');
			var $activeLink = jQuery(".navbar-nav a[href='#" + id + "']");
			if ($activeLink.length) {
				$activeLink.parent().addClass("active");
			}
			// Also handle root/home link
			if (id === 'header' || id === 'home') {
				jQuery(".navbar-nav a[href='/']").parent().addClass("active");
			}
		}
	});


        //parallax
        var isMobile = false;

        if(Modernizr.mq('only all and (max-width: 1024px)') ) {
            isMobile = true;
        }

        
        if (isMobile == false && ($('#parallax1').length  ||isMobile == false &&  $('#parallax2').length ||isMobile == false &&  $('#testimonials').length))
        {
            // Wait for stellar.js to be available before initializing
            function initStellar() {
                if (typeof jQuery !== 'undefined' && jQuery.fn.stellar) {
                    $(window).stellar({
                        responsive:true,
                        scrollProperty: 'scroll',
                        parallaxElements: false,
                        horizontalScrolling: false,
                        horizontalOffset: 0,
                        verticalOffset: 0
                    });
                } else {
                    // Retry after a short delay if stellar isn't loaded yet
                    setTimeout(initStellar, 100);
                }
            }
            initStellar();
        }
	
	//nicescroll - DISABLED to prevent passive event listener warnings
	// niceScroll calls preventDefault() on wheel/touch events which causes console warnings
	// Native browser scrolling works fine without this plugin
	// If you need custom scrollbars, consider using CSS scrollbar styling instead
	function initNice() {
		// Completely disabled - remove any existing instances
		try {
			if (typeof $.fn.niceScroll !== 'undefined') {
				var existingInstance = $('html').getNiceScroll();
				if (existingInstance && existingInstance.length) {
					existingInstance.remove();
				}
			}
		} catch(e) {
			// Ignore errors
		}
	}
	// Run on load and resize to ensure it's always disabled
	$(window).on('load', initNice);
	$(window).on('resize', initNice);
	// Also run immediately
	initNice();

	// Auto-close mobile menu when menu item is clicked (Industry Standard)
	// Use setTimeout to ensure click event completes before closing menu
	$(document).on('click', '.navbar-nav a', function(e) {
		// Check if we're on mobile (menu is collapsed/visible)
		if ($(window).width() < 768) {
			// Check if menu is currently open (has 'in' class or is visible)
			var $collapse = $('.navbar-collapse');
			if ($collapse.hasClass('in') || $collapse.is(':visible')) {
				// Delay closing to allow click event to complete
				setTimeout(function() {
					// Close the mobile menu by collapsing it
					if (typeof $.fn.collapse !== 'undefined') {
						$collapse.collapse('hide');
					} else {
						// Fallback: remove 'in' class and set aria-expanded
						$collapse.removeClass('in').attr('aria-expanded', 'false');
						$('.navbar-toggle').addClass('collapsed').attr('aria-expanded', 'false');
					}
				}, 100);
			}
		}
	});

	// Update ARIA attributes when menu is toggled (Industry Standard - Accessibility)
	$(document).on('shown.bs.collapse', '.navbar-collapse', function() {
		$('.navbar-toggle').removeClass('collapsed').attr('aria-expanded', 'true');
		$(this).attr('aria-expanded', 'true');
	});

	$(document).on('hidden.bs.collapse', '.navbar-collapse', function() {
		$('.navbar-toggle').addClass('collapsed').attr('aria-expanded', 'false');
		$(this).attr('aria-expanded', 'false');
	});

	// Keyboard navigation support (Industry Standard - ESC key closes menu)
	$(document).on('keydown', '.navbar-collapse', function(e) {
		// ESC key closes the menu
		if (e.keyCode === 27 && $(this).hasClass('in')) {
			$('.navbar-toggle').click();
		}
	});

	// Keyboard navigation for menu items (Industry Standard)
	$(document).on('keydown', '.navbar-nav a', function(e) {
		// Enter or Space activates the link
		if (e.keyCode === 13 || e.keyCode === 32) {
			e.preventDefault();
			$(this)[0].click();
		}
	});

})(jQuery);