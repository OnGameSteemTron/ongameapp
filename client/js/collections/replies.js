
Replies = new Mongo.Collection(null)

Replies.getRepliesByLastUpdate = function (author,permlink,cb) {
    steem.api.getRepliesByLastUpdate(startAuthor, startPermlink, 100, function (err, result) {
        console.log(err, result);
        if(result)
        {
            cb(null)
        }
        else cb(true)
    })
}