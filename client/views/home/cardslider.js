var carousel = require('owl.carousel')

Template.cardslider.rendered = function () {
  var random = Template.cardslider.createPermlink(10)
  this.firstNode.id = random
  Template.cardslider.createSlider(random)
  $( window ).on( "load", function() {
    Template.cardslider.createSlider(random)
  })
}

Template.cardslider.createSlider = function (elemId) {
    $("#" + elemId).owlCarousel({
      margin: 20,
      loop: false,
      autoplay:true,
      autoplayTimeout:10000,
      responsiveBaseElement: document.getElementsByClassName('ui container'),
      nav: true,
      navText: ["<i class='chevron left icon semanticui-nextprev-icon'></i>","<i class='chevron right icon semanticui-nextprev-icon'></i>"],
      dots: false,
      lazyLoad: true,
      responsiveClass: false,
      items:4
    })
}

Template.cardslider.refreshSlider = function () {
  window.dispatchEvent(new Event('resize'))
}

Template.cardslider.createPermlink = function (length) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }