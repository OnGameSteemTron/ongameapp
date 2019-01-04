Template.upvote.rendered = function () {
    if(this.data.active_votes.length >= 1)
    $('.left.floated.upvote')
    .popup({
      popup: '.upvote.popup',
      position: 'top left'
    })

}

Template.upvote.helpers({
    currentView:function(amount,coin){
        if(Counter.findOne({_id:Session.get('article')}))
        return Counter.findOne({_id:Session.get('article')}).views
    },
    itemPrice:function(amount,coin){
        if(Coins.findOne({ 'id': coin }))
        return (amount / Coins.findOne({ 'id': coin }).price_usd).toFixed(2)
    },
    itemPriceDetailed:function(amount,coin){
        if(Coins.findOne({ 'id': coin }))
        return (amount / Coins.findOne({ 'id': coin }).price_usd).toFixed(5)
    },
    donationConvert:function(amount,coin){
        if(coin === "og")
        {
            return parseFloat(amount * 0.02).toFixed(2)
        }
        else{
            if(Coins.findOne({ 'id': coin }))
            return (amount / Coins.findOne({ 'id': coin }).price_usd).toFixed(2)
        }
    },
    allRewards:function(amount){
        if(Tips.find({ 'permlink': Session.get('article') }).fetch())
        {
            var tips = Tips.find({ 'permlink': Session.get('article') }).fetch()
            for(i=0;i<tips.length;i++)
            {
                if(tips[i].type === "og")
            {
                amount = Number(amount) + Number(parseFloat(tips[i].amount * 0.02).toFixed(2))
            }
            else{
                if(Coins.findOne({ 'id': tips[i].type }))
                amount = Number(amount) + Number(parseFloat(tips[i].amount / Coins.findOne({ 'id': tips[i].type }).price_usd).toFixed(2))
                }   
            }
            return amount
        }
        else{
            return amount
        }
    }
})
Template.upvote.events({
    'click .confirm.button': function (event) {
        event.preventDefault()
        event.stopPropagation();
        $(".confirm.button").addClass('loading')
        var weight = Session.get('votevalue') * 100
        var author = $(".confirm.button").attr("data-author")
        var permlink = $(".confirm.button").attr("data-permlink")
        steemconnect.vote(author, permlink, weight, function (error, result) {
            if (result) {
                //console.log(result)
                $(".confirm.button").removeClass('loading')
                var type = "games"
                Content.getContent(author,permlink,type,function(error){
                    if(error)
                    console.log(error)
                })
            }
            else {
                event.preventDefault()
                sessionStorage.setItem('currentroute', FlowRouter.current().path)
                window.location.href = sc2.getLoginURL()
            }
        });
    }
})
