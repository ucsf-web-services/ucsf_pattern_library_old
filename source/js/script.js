(function ($) {
  "use strict";
  
  $(function() {

    $(window).setBreakpoints({
      // use only largest available vs use all available
      distinct: true,
      // array of widths in pixels where breakpoints
      // should be triggered
      breakpoints: [
        300,
        480,
        640,
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
      /*
activate: function (event) { // Callback function if tab is switched
        //var $tab = $(this);
        //var $info = $('#tabInfo');
        //var $name = $('span', $info);

        //$name.text($tab.text());

        //$info.show();
      },
*/
      closed: 'accordion' // Start closed if in accordion view
      
    });

    var $container = $('#post-filter-results');
    // initialize
    $container.masonry({
      columnWidth: 290,
      "isFitWidth": true,
      itemSelector: '#post-filter-results li'
    });

    // layout Masonry again after all images have loaded
    $container.imagesLoaded( function() {
      $container.masonry();
    });

    $(window).bind('enterBreakpoint300',function() {
      $container.masonry({
        columnWidth: 290
      });
    });

    $(window).bind('enterBreakpoint480',function() {
      $container.masonry({
        columnWidth: 440
      });
    });

    $(window).bind('enterBreakpoint640',function() {
      $container.masonry({
        columnWidth: 320
      });
    });

    $(window).bind('enterBreakpoint768',function() {
      $container.masonry({
        columnWidth: 398
      });
    });

    $(window).bind('enterBreakpoint1024',function() {
      $container.masonry({
        columnWidth: 340
      });
    });

    $(window).bind('enterBreakpoint1190',function() {
      $container.masonry({
        columnWidth: 297
      });
    });

    /**
     * Initialize Select replacement
     */

    $('.js-selecter').selecter();

    $(document).on( "click", "#post-filter-tags input", function() {
      $('#post-filter-results > li').not('.more').hide();


      $('#post-filter-tags').find('input:checked').each(function () {
        $('#post-filter-results > li.' + $(this).attr('rel')).show();
      });

      $container.masonry();

    });
      
      
    // provide some equal heights for various elements
    $('.blog--science ul > li').matchHeight(false);
    $('.media-blocks .media--coverage__wrapper, .media-blocks .youtube__wrapper, .media-blocks .twitter__wrapper').matchHeight(false);
  });  
})(jQuery);
