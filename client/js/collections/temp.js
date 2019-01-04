var timer 
chat = {
    temp: function(author, permlink) {
        CurrentChat.loadComments(author, permlink, function (error) {
            if(error)
            console.log(error)
        })
        timer = setInterval(function () {         
            CurrentChat.loadComments(author, permlink, function (error) {
                if(error)
                console.log(error)
        })
        $('.chat.segment').scrollTop(5000);
        }, 8000)
    },
    stop: function() {
        clearInterval(timer)
    }
}