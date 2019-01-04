Template.aboutgame.events({
  'click .card.screenshot': function (event) {
      $('.ui.screenshot.modal').remove()
      $('.ui.main.segment').append(Blaze.toHTMLWithData(Template.imagemodal, {data:this}));
      $('.ui.screenshot.modal').modal('setting', 'transition', 'horizontal flip').modal('show')
  },
})