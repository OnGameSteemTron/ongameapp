Comments = new Mongo.Collection(null)
CurrentChat = new Mongo.Collection(null)

Comments.loadComments = function (author, permlink, cb) {
  steem.api.getContentReplies(author, permlink, function (error, result) {
    if (result) {
      for (var i = 0; i < result.length; i++) {
        if (result[i].json_metadata) {
          result[i].json_metadata = JSON.parse(result[i].json_metadata)
        }
        var comment = result[i]
        steem.api.getContent(comment.author, comment.permlink, function (error, result) {
          if (!result)
            return cb(true)
          else {
            if (!banlist.includes(comment.author)) {
              Comments.upsert({ permlink: result.permlink }, result)
            }
          }
        })
        if (!banlist.includes(comment.author)) {
        Comments.upsert({ _id: comment.id }, comment)
        Comments.loadSubComments(result[i].author, result[i].permlink, function (error) {
          if (error)
            console.log(error)
        })
      }
      }
    }
    cb(null)
  })
}

Comments.loadSubComments = function (author, permlink, cb) {
  steem.api.getContentReplies(author, permlink, function (error, result) {
    if (result) {
      for (var i = 0; i < result.length; i++) {
        if (result[i].json_metadata) {
          result[i].json_metadata = JSON.parse(result[i].json_metadata)
        }
        var comment = result[i]
        Comments.upsert({ _id: comment.id }, comment)
        steem.api.getContent(comment.author, comment.permlink, function (error, result) {
          if (!result)
            return cb(true)
          else {
            if (!banlist.includes(comment.author)) {
            Comments.upsert({ permlink: result.permlink }, result)
            }
          }
        })
        Comments.loadSubComments(result[i].author, result[i].permlink, function (error) {
          if (error)
            console.log(error)
        })
      }
    }
  })
  cb(null)
}

CurrentChat.loadComments = function (author, permlink, cb) {
  steem.api.getContentReplies(author, permlink, function (error, result) {
    if (result) {
      for (var i = 0; i < result.length; i++) {
        if (result[i].json_metadata) {
          result[i].json_metadata = JSON.parse(result[i].json_metadata)
        }
        var comment = result[i]
        if (!banlist.includes(comment.author)) {
        CurrentChat.upsert({ _id: comment.id }, comment)
        }
      }
    }
    cb(null)
  })
}

var banlist = ['steemitboard','steem-ua']