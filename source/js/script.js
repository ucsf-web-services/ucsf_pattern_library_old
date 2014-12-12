(function(w){

  $(function() {
    //$( "#tabs" ).tabs();


  $('#pillar_tabs').easyResponsiveTabs({
    type: 'default', //Types: default, vertical, accordion
    width: 'auto', //auto or any width like 600px
    fit: true,   // 100% fit in a container
    closed: 'accordion', // Start closed if in accordion view
    activate: function(event) { // Callback function if tab is switched
      //var $tab = $(this);
      //var $info = $('#tabInfo');
      //var $name = $('span', $info);

      //$name.text($tab.text());

      //$info.show();
    }
  });

  });

  //$('#verticalTab').easyResponsiveTabs({
  //  type: 'vertical',
  //  width: 'auto',
  //  fit: true
  //});

  //$(function() {
  //  var $container = $('#content-blocks--masonry');
  //  // initialize
  //  $container.masonry({
  //    columnWidth: 300,
  //    "isFitWidth": true,
  //    itemSelector: '.content-blocks__masonry__item'
  //  });
  //
  //  var $container = $('#content-blocks--masonry').masonry();
  //  // layout Masonry again after all images have loaded
  //  $container.imagesLoaded( function() {
  //    $container.masonry();
  //  });
  //});

})(this);
