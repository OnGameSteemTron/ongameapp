var carousel = require('owl.carousel')

Template.videoslider.rendered = function () {
  Template.videoslider.createSlider();
  $( window ).on( "load", function() {
    Template.videoslider.createSlider();
  })
  $(window).resize(function () {
    $('.videoslider.owl-carousel').owlCarousel('destroy')
    Template.videoslider.createSlider();
  });
  
}

Template.videoslider.createSlider = function () {
  $(".videoslider.owl-carousel").owlCarousel({
    loop: false,
    margin: 20,
    autoplay: false,
    autoplayTimeout: 10000,
    nav: true,
    lazyLoad: true,
    navText: ["<i class='chevron left icon semanticui-nextprev-icon'></i>", "<i class='chevron right icon semanticui-nextprev-icon'></i>"],
    dots: false,
    items:5
  })
}