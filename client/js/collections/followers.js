Followers = new Mongo.Collection(null)

Followers.loadFollowing = function (username, startFollowing = undefined, recursive = true, cb) {
    var limit = 100
    steem.api.getFollowing(username, startFollowing, 'blog', limit, function (error, results) {
        if (error) console.log(error)
        if (results && results.length) {
            for (var i = 0; i < results.length; i++)
                Followers.upsert(results[i], results[i])
            if (results.length == limit && recursive)
                Followers.loadFollowing(username, results[results.length - 1].following, true, cb)
        }
    });
}

Followers.loadFollowers = function (username, startFollowers = undefined, recursive = true, cb) {
    var limit = 100
    steem.api.getFollowers(username, startFollowers, 'blog', limit, function (error, results) {
        if (error) console.log(error)
        for (var i = 0; i < results.length; i++)
            Followers.upsert(results[i], results[i])
        if (results.length == limit && recursive)
            Followers.loadFollowers(username, results[results.length - 1].follower, true, cb)
    });
}
