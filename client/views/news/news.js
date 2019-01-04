Template.news.rendered = function () {
    Session.set('newslimit',12)
    $('.ui.stackable.cards')
    .visibility({
        once: false,
        observeChanges: true,
        onBottomVisible: function () {
                Session.set('newslimit', Session.get('newslimit') + 3)
        }
    })
}
