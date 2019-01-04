Faq = new Mongo.Collection(null)

Faq.getFaq = function (cb) {
    var query = {
        tag: 'fundition.faq',
        limit: 100
    };
    steem.api.getDiscussionsByBlog(query, function (err, result) {
        if (!result)
        return  cb(true)
        else {
            for (var i = 0; i < result.length; i++) {
                try{
                    result[i].json_metadata = JSON.parse(result[i].json_metadata)
                }
                catch(e){}
                if(result[i].json_metadata.tags.includes('projects'))
                {
                    result[i].type = 'projects'
                    Faq.upsert({ _id: result[i].id }, result[i])
                }
                if(result[i].json_metadata.tags.includes('users'))
                {
                    result[i].type = 'users'
                    Faq.upsert({ _id: result[i].id }, result[i])
                }
                if(result[i].json_metadata.tags.includes('payments'))
                {
                    result[i].type = 'payments'
                    Faq.upsert({ _id: result[i].id }, result[i])
                }
                if(result[i].json_metadata.tags.includes('welcome'))
                {
                    result[i].type = 'welcome'
                    Faq.upsert({ _id: result[i].id }, result[i])
                }
            }
            cb(null)
        }
    });
}