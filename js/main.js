(function ($) {

  "use strict";

  // -----------------------------------
  // Safe media query helper (no Modernizr)
  // -----------------------------------
  function isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }

  // -----------------------------------
  // Scroll to top button
  // -----------------------------------
  if (window.addEventListener) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 100) {
        $('.scrollup').fadeIn();
      } else {
        $('.scrollup').fadeOut();
      }
    }, { passive: true });
  } else {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $('.scrollup').fadeIn();
      } else {
        $('.scrollup').fadeOut();
      }
    });
  }

  $('.scrollup').click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });

  // -----------------------------------
  // Document Ready
  // -----------------------------------
  $(document).ready(function () {

    // -----------------------------------
    // Home click (FIXED for GitHub Pages)
    // -----------------------------------
    $('.navbar-nav a[href="/"], .navbar-nav a[href="./"]').on('click', function (e) {
      e.preventDefault();

      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, './');
      }

      $('html, body').animate({
        scrollTop: 0
      }, 800);

      $('.navbar-nav li').removeClass('active');
      $(this).parent().addClass('active');

      if (isMobile()) {
        setTimeout(function () {
          $('.navbar-collapse').collapse('hide');
        }, 100);
      }

      return false;
    });

    // -----------------------------------
    // Navbar brand click
    // -----------------------------------
    $('.navbar-brand').on('click', function (e) {
      e.preventDefault();

      if (window.history && window.history.pushState) {
        window.history.pushState(null, null, './');
      }

      $('html, body').animate({
        scrollTop: 0
      }, 800);

      $('.navbar-nav li').removeClass('active');
      $('.navbar-nav a[href="./"]').parent().addClass('active');

      return false;
    });

    // -----------------------------------
    // Smooth scroll (safe)
    // -----------------------------------
    $('.navbar-nav a[href^="#"]').on('click', function (e) {
      var target = $(this.getAttribute('href'));

      if (target.length) {
        e.preventDefault();

        var offset = isMobile() ? 60 : 100;

        $('html, body').stop().animate({
          scrollTop: target.offset().top - offset
        }, 800);

        $('.navbar-nav li').removeClass('active');
        $(this).parent().addClass('active');

        if (isMobile()) {
          $('.navbar-collapse').collapse('hide');
        }
      }
    });

    // -----------------------------------
    // Isotope (SAFE)
    // -----------------------------------
    if ($.fn.isotope) {
      var $container = $('.portfolio-items');
      if ($container.length) {
        $container.isotope({
          itemSelector: '.isotopeItem',
          layoutMode: 'fitRows'
        });
      }
    }

    // -----------------------------------
    // Fancybox (SAFE)
    // -----------------------------------
    if ($.fn.fancybox) {
      $('.fancybox').fancybox();
    }

    // -----------------------------------
    // NiceScroll (SAFE)
    // -----------------------------------
    if ($.fn.niceScroll) {
      $("html").niceScroll({
        cursorcolor: "#333",
        cursorwidth: "8px"
      });
    }

    // -----------------------------------
    // Parallax (SAFE)
    // -----------------------------------
    if (!isMobile()) {
      if (typeof skrollr !== 'undefined') {
        skrollr.init({
          smoothScrolling: true
        });
      }

      if ($.fn.stellar) {
        $(window).stellar({
          responsive: true
        });
      }
    }

  });

})(jQuery);
