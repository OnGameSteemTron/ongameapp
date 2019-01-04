Template.singlegame.rendered = function () {
    $('.menu.game .item')
    .tab()
}

Template.singlegame.onRendered(function () {
    window.addEventListener("load", function () {
        $('.menu.game .item')
        .tab()
    }, false);
    $(window).scrollTop(0);
})

Template.singlegame.InitTab = function(){
    $('.menu.game .item')
    .tab()
}

Template.singlegame.helpers({
    currenTab: function () {
        return Session.get('currentgametab')
    }
})


Template.singlegame.events({
    'click .menu.game .item': function (event) {
        path = event.currentTarget.name
        if(path==='about')
        FlowRouter.go('/game-' + this.steam_appid)
        else
       FlowRouter.go('/game-' + this.steam_appid + '/' + path)
    },
    'click .button.create': function (event) {
        Session.set('creategame',this.steam_appid)
       FlowRouter.go('/create/game-'+this.steam_appid)
    },
    'click .buygame': function (event) {
        Cart.upsert({_id:this._id},this)
        $('.ui.cart.modal').remove()
        $('article').append(Blaze.toHTMLWithData(Template.cartmodal, {data:this}));
        $('.ui.cart.modal').modal('setting', 'transition', 'horizontal flip').modal('show')
    },
})