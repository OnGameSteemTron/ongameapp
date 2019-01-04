Collaborators = new Mongo.Collection(null)
//collaboratorsObserver = new PersistentMinimongo2(Collaborators, 'collaborators');

Collaborators.add = function (username, cb) {
    steem.api.getAccounts(username, function (err, result) {
        if (!result || result.length < 1) {
            cb(true)
            return
        }
        for (var i = 0; i < result.length; i++) {
            if (result[i].json_metadata) {
                result[i].json_metadata = JSON.parse(result[i].json_metadata)
            }
            result[i].estimateAccountValue = User.estimateAccountValue(result[i])
          
            Collaborators.insert(result[i])
        }
        cb(null)
    });
}
