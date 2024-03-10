jQuery(document).ready(function ($) {

    if ($('.js--sticky-nav').length > 0) {
    // http://codetheory.in/change-active-state-links-sticky-navigation-scroll/
    var sections = $('.js--sticky-nav-sections > div, .js--sticky-nav-sections > section'),
        stickyNav = $('.js--sticky-nav'),
        stickyNavHeight = stickyNav.outerHeight();
  
    $(window).on('scroll', function () {
      var cur_pos = $(this).scrollTop();
      
      sections.each(function() {
        // var top = $(this).offset().top - stickyNavHeight,
        var top = $(this).offset().top,
            bottom = top + $(this).outerHeight();
        
        if (cur_pos >= top && cur_pos <= bottom) {
          stickyNav.find('a').removeClass('active');
          sections.removeClass('active');
          
          $(this).addClass('active');
          stickyNav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
        }
        if ( $(window).scrollTop() <= $('.js--sticky-nav-sections div:first-child, .js--sticky-nav-sections section:first-child').offset().top ) {
          stickyNav.find('a').removeClass('active');
          sections.removeClass('active');
        }
      });
    });
  
  
    stickyNav.find('a').on('click', function () {
      var $el = $(this),
          id = $el.attr('href');
      
      $('html, body').animate({
        // scrollTop: $(id).offset().top - stickyNavHeight
        scrollTop: $(id).offset().top
      }, 500);
      
      return false;
    });
  
  
  
    stickyNav.parent().addClass('js--has-sticky-nav');
    $('.js--sticky-nav-sections > div, .js--sticky-nav-sections > section').addClass('js--sticky-nav-section');
  
  
  
    // http://alexcican.com/post/teehan-lax-navigation/
    var previousScroll = 0, // previous scroll position
        stickyNav = $('.js--sticky-nav'),
        stickyNavHeight = stickyNav.outerHeight(),
        menuOffset = stickyNav.offset().top, // position of menu (once scroll passed it, menu is hidden)
        menuOffsetBottom = (menuOffset + stickyNavHeight),
        detachPoint = menuOffsetBottom, // point of detach (after scroll passed it, menu is fixed)
        hideShowOffset = 1; // scrolling value after which triggers hide/show menu
    // on scroll hide/show menu
      $(window).scroll(function() {
        var currentScroll = $(this).scrollTop(), // gets current scroll position
            scrollDifference = Math.abs(currentScroll - previousScroll); // calculates how fast user is scrolling
        // if scrolled past menu
        if (currentScroll > menuOffset) {
          // if scrolled past detach point add class to fix menu
          if (currentScroll > (detachPoint + (stickyNavHeight*2)) ) {
            if (!stickyNav.hasClass('detached'))
              stickyNav.addClass('detached');
          }
          // if scrolling faster than hideShowOffset hide/show menu
          if (scrollDifference >= hideShowOffset) {
            // if scrolling down and scroll position is after sticky menu
            if ( currentScroll > previousScroll && $(window).scrollTop() >= menuOffsetBottom ) {
              // scrolling down; hide menu
              if (!stickyNav.hasClass('invisible'))
                stickyNav.addClass('invisible');
            } else {
              // scrolling up; show menu
              if (stickyNav.hasClass('invisible'))
                stickyNav.removeClass('invisible');
            }
          }
        } else {
          // only remove “detached” class if user is at the top of document (menu jump fix)
          if (currentScroll <= menuOffsetBottom){
            stickyNav.removeClass('detached');
          }
        }
        // if user is at the bottom of document show menu
        // if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        //   stickyNav.removeClass('invisible');
        // }
        // replace previous scroll position with new one
        previousScroll = currentScroll;
      })
  
    }
  
  });
  /*------------------------------------*\
   * jQuery CLOSING
  \*------------------------------------*/
  