(function ($) {
  "use strict";
  
  $.fn.extend({
    closeMegaNav: function () {
      $(".meganav-overlay").fadeOut('fast').removeClass('opened-overlay-item');
      $('html').removeClass('overlay-opened');    
    },
    openSlideShow: function (fullscreenLink) {
      // give it a class that guides our new styling for the fullscreen rotator
      $(fullscreenLink).parents('#gallery-rotator').addClass('fullscreen-slideshow');

      // @todone - add in the title of the page to this rotator popup. 
      var slideshowTitle = $('#post-information > h1').clone().addClass('cloned-title').append('<a href="#" class="close-icon fa fa-remove"></a>');
      $('#gallery-rotator .flexslider').before(slideshowTitle);
      // @todo - add in the close icon/functionality
      // close gallery overlay when we use the close icon
      $('#gallery-rotator a.close-icon').click(function(){
        $.fn.closeSlideShow();
      });
      // this helps flexslider resize appropriately to the new container size/position
      $(window).trigger('resize');
      
    },
    closeSlideShow: function () {
      // remove the extra title
      $('#gallery-rotator .cloned-title').remove();
      // remove the extra styles for fullscreen display
      $('#gallery-rotator').removeClass('fullscreen-slideshow');
      // this helps flexslider resize appropriately to the new container size/position
      $(window).trigger('resize');
    }
  });
  

	
  $(function() {
    
    
  // close any overlays when we use the close icon
  $('.meganav-overlay a.close-icon').click(function(){
    $.fn.closeMegaNav();
  });
  
  
  
  
  // toggle subnavs on meganav
  $('.meganav-overlay-menu a.toggle-submenu').on('focus', function(){
    

    // add active class to the link
    $(this).toggleClass('active');
    // find the child sub-menu
    var childMenu = $(this).siblings('ul');
    
    // get the active list item
    var activeListItem = $(this).parent('li');
    
    // get the inactive list item(s)
    var inactiveSiblings = activeListItem.siblings();
    
    if (childMenu.hasClass('closed')) {
      
      // open the menu
      childMenu.removeClass('closed').addClass('open');
      //$().not(childMenu)
      
      // apply clases to li parent & it's sliblings
      activeListItem.removeClass('inactive-nav-item').addClass('active-nav-item');
      inactiveSiblings.addClass('inactive-nav-item').removeClass('active-nav-item');
      
      inactiveSiblings.find('ul.open').removeClass('open').addClass('closed');
      
      return false;  
    } 
    else {      
      
      // close the menu
      childMenu.removeClass('open').addClass('closed');
      
      // apply clases to li parent & it's sliblings
      activeListItem.removeClass('inactive-nav-item').removeClass('active-nav-item');
      inactiveSiblings.removeClass('inactive-nav-item').removeClass('active-nav-item');
      
      return false;
    }
  });
  
  // make the slideshow fullscreen
  $('.slideshow-popup').click(function(){
    $.fn.openSlideShow(this);
  });
    
    
    
    
    $(window).setBreakpoints({
      // use only largest available vs use all available
      distinct: true,
      // array of widths in pixels where breakpoints
      // should be triggered
      breakpoints: [
        320,
        480,
        768,
        1024,
        1190
      ]
    });
    
    /**
     * Initialize tabs/accordian for pillars
     */

    $('#pillar_tabs').easyResponsiveTabs({
      type: 'default', //Types: default, vertical, accordion
      width: 'auto', //auto or any width like 600px
      fit: true,   // 100% fit in a container
      closed: 'accordion' // Start closed if in accordion view
      
    });
    
    var $container = $('#masonry--homepage .masonry-results, #masonry--news-center .masonry-results, #masonry--related .masonry-results, #masonry--explore-news .masonry-results');
    //var itemWidthMatch = $('#post-filter-results li.masonry-sizer');
    // initialize
    $container.masonry({
      //columnWidth: itemWidthMatch,
      "isFitWidth": true,
      itemSelector: "#post-filter-results li.masonry-sizer",
      "stamp": ".big-article"
    });

    // layout Masonry again after all images have loaded
    $container.imagesLoaded( function() {
      $container.masonry();
    });
    
    
    $(window).bind('enterBreakpoint320',function() {
      $container.masonry({
        //columnWidth: 440
        "isFitWidth": true,
        itemSelector: "#post-filter-results li.masonry-sizer",
        "stamp": ".big-article"
      });
    });
    
    $(window).bind('enterBreakpoint480',function() {
      $container.masonry({
        //columnWidth: 440
        "isFitWidth": true,
        itemSelector: "#post-filter-results li.masonry-sizer",
        "stamp": ".big-article"
      });
    });

    $(window).bind('enterBreakpoint768',function() {
      $container.masonry({
        //columnWidth: 398
        "isFitWidth": true,
        itemSelector: "#post-filter-results li.masonry-sizer",
        "stamp": ".big-article"
      });
    });

    $(window).bind('enterBreakpoint1024',function() {
      $container.masonry({
        //columnWidth: 340
        "isFitWidth": true,
        itemSelector: "#post-filter-results li.masonry-sizer",
        "stamp": ".big-article"
      });
    });

    $(window).bind('enterBreakpoint1190',function() {
      $container.masonry({
        //columnWidth: 297
        "isFitWidth": true,
        itemSelector: "#post-filter-results li.masonry-sizer",
        "stamp": ".big-article"
      });
    });
    
    // create the hero background
    //var heroImage = $('.hero-image').attr('data-img');
    //$(".hero-image").css('background-image', 'url(' + heroImage + ')');
      
    // provide some equal heights for various elements
    $('.blog--science ul > li').matchHeight(true);
    
    
    
    $('.pillar-content .pillar-2col > .pillar-2col-half').matchHeight(true);
    $('.pillar-content .pillar-3col > .pillar-3col-half, .pillar-content .pillar-3col > .pillar-3col-quarter').matchHeight(true);
    
    $('.media-blocks .media--coverage__wrapper, .media-blocks .youtube__wrapper, .media-blocks .twitter__wrapper').matchHeight(true);
    
    // create a rotator
    $('.flexslider').flexslider({
      namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
      selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
      animation: "slide",              //String: Select your animation type, "fade" or "slide"
      easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
      direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
      reverse: false,                 //{NEW} Boolean: Reverse the animation direction
      animationLoop: true,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
      smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode  
      startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
      slideshow: true,                //Boolean: Animate slider automatically
      slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
      animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
      initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
      randomize: false,               //Boolean: Randomize slide order
      
      // Usability features
      pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
      pauseOnHover: true,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
      useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
      touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
      video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches
      
      // Primary Controls
      controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
      directionNav: false,             //Boolean: Create navigation for previous/next navigation? (true/false)
      prevText: 'Prev',           //String: Set the text for the "previous" directionNav item
      nextText: 'Next',               //String: Set the text for the "next" directionNav item
      
      // Secondary Navigation
      keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
      multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
      mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
      pausePlay: false,               //Boolean: Create pause/play dynamic element
      pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
      playText: 'Play',               //String: Set the text for the "play" pausePlay item
      
      // Special properties
      controlsContainer: "",          //{UPDATED} Selector: USE CLASS SELECTOR. Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be ".flexslider-container". Property is ignored if given element is not found.
      manualControls: ".flexslider-carousel .thumbnail-carousel-navigation li",             //Selector: Declare custom control navigation. Examples would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
      sync: ".flexslider-carousel .thumbnail-cariousel-navigation li",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
      asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider
      
      // Carousel Options
      itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
      itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
      minItems: 0,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
      maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
      move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
                                      
      // Callback API
      start: function(){
        // fix disabled arrows
        $('.flex-prev, .flex-next').click(function(){
          var disabledItem = $(this).hasClass('flex-disabled');
          if (!disabledItem) {
            //console.log('disabled');
            return false;  
          }
        });
      },            //Callback: function(slider) - Fires when the slider loads the first slide
      before: function(){
        
      },           //Callback: function(slider) - Fires asynchronously with each slider animation
      after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
      end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
      added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
      removed: function(){}           //{NEW} Callback: function(slider) - Fires after a slide is removed
      
    });
    
    
    // create a rotator
    $('.flexslider-carousel').flexslider({
      namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
      selector: ".thumbnail-carousel-navigation > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
      animation: "slide",              //String: Select your animation type, "fade" or "slide"
      easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
      direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
      reverse: false,                 //{NEW} Boolean: Reverse the animation direction
      animationLoop: false,             //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
      smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode  
      startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
      slideshow: false,                //Boolean: Animate slider automatically
      slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
      animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
      initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
      randomize: false,               //Boolean: Randomize slide order
      
      // Usability features
      pauseOnAction: false,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
      pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
      useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
      touch: false,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
      video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches
      
      // Primary Controls
      controlNav: false,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
      directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
      prevText: '<button class="btn btn--transparent" data-toggle="dropdown" type="button"><em class="fa fa-backward fa-lg fa-lone"></em></button>',           //String: Set the text for the "previous" directionNav item
      nextText: '<button class="btn btn--transparent" data-toggle="dropdown" type="button"><em class="fa fa-forward fa-lg fa-lone"></em></button>',               //String: Set the text for the "next" directionNav item
      
      // Secondary Navigation
      keyboard: false,                 //Boolean: Allow slider navigating via keyboard left/right keys
      multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
      mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
      pausePlay: false,               //Boolean: Create pause/play dynamic element
      pauseText: 'Pause',             //String: Set the text for the "pause" pausePlay item
      playText: 'Play',               //String: Set the text for the "play" pausePlay item
      
      // Special properties
      controlsContainer: "",          //{UPDATED} Selector: USE CLASS SELECTOR. Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be ".flexslider-container". Property is ignored if given element is not found.
      manualControls: "",             //Selector: Declare custom control navigation. Examples would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
      sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
      asNavFor: ".flexslider",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider
      
      // Carousel Options
      itemWidth: 120,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
      itemMargin: 10,                  //{NEW} Integer: Margin between carousel items.
      minItems: 5,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
      maxItems: 5,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
      move: 5,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
                                      
      // Callback API
      start: function(){
        
      },            //Callback: function(slider) - Fires when the slider loads the first slide
      before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
      after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
      end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
      added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
      removed: function(){}           //{NEW} Callback: function(slider) - Fires after a slide is removed
      
    });
    
  
  
    // The amazing scrolling header  
    var fixedNavigation = $('#header'); // Change to nav div
    var toggleNavClass = 'page-scrolling'; // Change to class name
    var threshold = 10; // Change to pixels scrolled
    
    $(window).scroll(function () {
        var distance = $(this).scrollTop();
        if (distance > threshold) { // If scrolled past threshold
            fixedNavigation.addClass(toggleNavClass); // Add class to nav
        } else { // If user scrolls back to top
            if (fixedNavigation.hasClass(toggleNavClass)) { // And if class has been added
                fixedNavigation.removeClass(toggleNavClass); // Remove it
            }
        }
    });
    
    $('a.navigation-overlay').on('focus', function(){
      var meganavId = $(this).attr('rel');
      
      $(".meganav-overlay:not(#" + meganavId + ")").fadeOut('fast');
      $('html').addClass('overlay-opened');
      $('#' + meganavId).fadeIn('fast').addClass('opened-overlay-item');
    });
    
    // in the overlay, when hitting the menu, close other overlays, open the 'menu overlay'
    $('.meganav-overlay a.main-menu-icon, .mobile-menu-button').click(function(){
      var meganavId = 'main-menu-meganav';
      $(".meganav-overlay").fadeOut('fast');
      $('html').addClass('overlay-opened');
      $('#' + meganavId).fadeIn('fast').addClass('opened-overlay-item');
    });
    
    $(document).keyup(function(e){
      if(e.keyCode === 27) {
        // escape key will close ANY open meganav items
        $.fn.closeMegaNav();
        // escape key will also close any open fullscreen slideshows
        $.fn.closeSlideShow();
      }
    });
  
  $(document).keydown(function(e) {
    
    
    
    if ($('html').hasClass('overlay-opened')) {
      // get the current one that is visible
      var overlayIndex = $('.opened-overlay-item').index('.meganav-overlay');
      var numOverlays = $('.meganav-overlay').size();
      var lastOverlay = numOverlays - 1;
      var nextOverlay = overlayIndex + 1;
      var prevOverlay = overlayIndex - 1;
      if(e.keyCode === 37) { // left
        // now we'll navigate to the previous 'main menu' overlay
        //console.debug("Item #: " + overlayIndex);
        //console.debug("Number of Overlays: " + numOverlays);
        //console.debug("Previous Overlay: " + prevOverlay);

        // we are at the first one, so going left/previous should go to the last?
        if (overlayIndex === 0) {
          prevOverlay = numOverlays - 1;
          //console.debug("First Overlay, go to last: " + prevOverlay);
        }
        
        $(".meganav-overlay:eq(" + overlayIndex + ")").fadeOut('fast').removeClass('opened-overlay-item');
        $(".meganav-overlay:eq(" + prevOverlay + ")").fadeIn('slow').addClass('opened-overlay-item');
        
        
        return false;
      }
      else if(e.keyCode === 39) { // right
        // now we'll navigate to the next 'main menu' overlay
        //console.debug("Item #: " + overlayIndex);
        //console.debug("Number of Overlays: " + numOverlays);
        //console.debug("Next Overlay: " + nextOverlay);
        
        // we are at the first one, so going left/previous should go to the last?
        if (overlayIndex === lastOverlay) {
          nextOverlay = 0;
          //console.debug("Last Overlay, go to first: " + nextOverlay);
        }
        $(".meganav-overlay:eq(" + overlayIndex + ")").fadeOut('fast').removeClass('opened-overlay-item');
        $(".meganav-overlay:eq(" + nextOverlay + ")").fadeIn('slow').addClass('opened-overlay-item');

        return false;
      }
    }
    else {
      return false;
    }
  });
  
  // add an active class to the news pages
  $('.news-page .nav-primary a.news').addClass('active');
  
  
  
  
  });
})(jQuery);
