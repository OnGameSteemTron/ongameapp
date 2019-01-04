
Template.team.rendered = function () {
    Session.set('selectedgameid','')
    Session.set('selectedgame','')
    $('.ui.search.game')
    .search({
        source: Session.get('games'),
        searchFields: ['name'],
        maxResults: 15,
        fullTextSearch: 'exact',
        fields: {
            title: 'name',
        },
        onSelect: function (result, response) {
            Session.set('selectedgameid', result.appid)
            Session.set('selectedgame', result.name)
        }
    })
}

                
Template.team.helpers({
    gameName: function () {
      return Session.get('selectedgame')
    },
    gameId: function () {
        return Session.get('selectedgameid')
      }
  })
  