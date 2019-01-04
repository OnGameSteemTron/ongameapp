Template.feedgamenews.rendered = function () {
    $('.item.feed').popup({
        on: 'hover',
        hoverable:true,
        lastResort: 'left center',
        onShow: function(){
            resizePopup();
        },
      })
  
}
var resizePopup = function(){$('.item.feed').css('max-height', '100vh' );};

$(window).resize(function(e){
    resizePopup();
});