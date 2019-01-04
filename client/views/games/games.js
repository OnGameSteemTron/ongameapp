

Template.games.rendered = function () {
    $('.ui.search.category')
    .search({
        source: Session.get('games'),
        searchFields: ['name'],
        fields: {
            title: 'name',
        },
        onSelect: function (result, response) {
            event.preventDefault()
            event.stopPropagation()
            Session.set('currentGame',result.name)
            FlowRouter.go('/game-'+result.appid)
        }
    })
}

Template.games.helpers({

})
