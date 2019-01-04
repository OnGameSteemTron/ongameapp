
Template.reply.onRendered(function () {
    var permlink = this.data.permlink
    $('#reply-content-' + this.data.permlink).on({
        focus: function () {
            $('.submit.com').addClass('dspnone');
            $('#submit-' + permlink).removeClass('dspnone');
        },
        blur: function () {
            if ($('#reply-content-' + permlink).val().length === 0) {
                $('#submit-' + permlink).addClass('dspnone');
            }
        }
    })
})
var bool = false;
function displayValidation(data) {
    if (!bool) {
        $('.green.remove.icon').removeClass('active');
        $('.green.remove.icon.' + data.permlink).addClass('active');
    }
    else {
        $('.green.remove.icon').removeClass('active');
    }
    bool = !bool
}

Template.reply.events({
    'click .green.remove.com': function (event) {
        event.preventDefault()
        event.stopPropagation();
        Template.reply.deletecomment(this)
    },
    'click .red.remove.com': function (event) {
        event.preventDefault()
        event.stopPropagation();
        displayValidation(this)
    },
    'click .submit.com': function (event) {
        event.preventDefault()
        event.stopPropagation();
        Template.reply.comment(this)
    },
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


Template.reply.comment = function (article) {
    var body = $('#reply-content-' + article.permlink).val()
    $(".reply-" + article.permlink + ' .submit.com').addClass('loading')
    var json_metadata = {
        tags: 'ongame',
        app: 'ongame'
    }
    steemconnect.comment(article.author, article.permlink, body, json_metadata, function (error, result) {
        if (error) {
            console.log(error)
            if (error.description)
                console.log(error.description)
        } else {
            $(".reply-" + article.permlink + ' .submit.com').removeClass('loading')
            $('#reply-content-' + article.permlink).val('')
            $('#submit-' + article.permlink).addClass('dspnone');

            Comments.loadComments(article.author, article.permlink, function (error) {
                if (error) {
                    console.log(error)
                }
            })
        }
    })
}


Template.reply.deletecomment = function (article) {
    steemconnect.deletecomment(article.author, article.permlink, function (error, result) {
        if (error) {
            console.log(error)
            if (error.description)
                console.log(error.description)
        } else {
            $('.comment.' + article.permlink)
                .transition({
                    animation: 'scale',
                    reverse: 'auto', // default setting
                    interval: 1000,
                    onComplete: function () {
                        Comments.remove({ permlink: article.permlink }, function (error) {
                            if (error) {
                                console.log(error)
                            }
                        })
                    }
                })
        }
    })
}
