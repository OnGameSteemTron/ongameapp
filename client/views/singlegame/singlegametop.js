Template.singlegametop.events({
    'click .column.cover': function (event) {
        FlowRouter.go('/game-' + this.steam_appid)
    },
})