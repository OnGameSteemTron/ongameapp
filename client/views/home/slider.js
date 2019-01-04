var carousel = require('owl.carousel')

Template.slider.rendered = function () {
  Template.slider.createSlider();
  $( window ).on( "load", function() {
    Template.slider.createSlider();
  })
  $(window).resize(function () {
    $('.slider.owl-carousel').owlCarousel('destroy')
    Template.slider.createSlider();
  });

}

Template.slider.createSlider = function () {
  $(".slider.owl-carousel").owlCarousel({
    loop: false,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 10000,
    nav: true,
    lazyLoad: true,
    navText: ["<i class='chevron left icon semanticui-nextprev-icon'></i>", "<i class='chevron right icon semanticui-nextprev-icon'></i>"],
    dots: false,
    responsiveClass: true,
    responsive: {
       211: {
         items: 1,
         slideBy: 1,
         nav: false
       },
      399: {
         items: 2,
         slideBy: 2,
        nav: false
       },
       642: {
        items: 4,
        slideBy: 1,
       nav: true
      },
      854: {
        items: 4,
        slideBy: 1,
        nav: true
      },
      1060: {
        items: 5,
        slideBy: 1,
        nav: true,
        loop: true
      },
      1272: {
        items: 5,
        slideBy: 1,
        nav: true,
        loop: true
      },
      1484: {
        items: 5,
        slideBy: 1,
        nav: true,
        loop: true
      }
    }
  })
}