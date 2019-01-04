Template.commentupvote.events({
    'click .confirm.com.button': function (event) {
        event.preventDefault()
        event.stopPropagation();
        $(".confirm.com.button."+this.permlink).addClass('loading')
        var weight = Session.get('votevalue') * 100
        var author = $(".confirm.com.button."+this.permlink).attr("data-author")
        var permlink = $(".confirm.com.button."+this.permlink).attr("data-permlink")
        steemconnect.vote(author, permlink, weight, function (error, result) {
            if (result) {
                //console.log(result)
                $(".confirm.com.button."+this.permlink).removeClass('loading')
                var type = "games"
                Content.getContent(author,permlink,type,function(error){
                    if(error)
                    console.log(error)
                })
            }
            else {
                console.log(error)
                event.preventDefault()
                sessionStorage.setItem('currentroute', FlowRouter.current().path)
                //window.location.href = sc2.getLoginURL()
            }
        });
    }
})
