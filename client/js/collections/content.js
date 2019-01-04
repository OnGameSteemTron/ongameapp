Content = new Mongo.Collection(null)
Promoted = new Mongo.Collection(null)
Tips = new Mongo.Collection(null)

Content.getContentByBlog = function (name, limit, cb) {
  Content.remove({ type: 'blog' })
  var query = {
    tag: name,
    limit: limit
  };
  steem.api.getDiscussionsByBlog(query, function (error, result) {
    if (!result)
      return cb(error)
    else {
      for (var i = 0; i < result.length; i++) {
        try {
          result[i].json_metadata = JSON.parse(result[i].json_metadata)
        } catch (error) {
          console.log(error)
          cb(error)
        }
        for (b = 0; b < result[i].json_metadata.tags.length; b++) {
          var tag = result[i].json_metadata.tags[b]
          if (tag.includes('ongame-') && tag != 'ongame-news' && tag != 'ongame-video' &&
            tag != 'ongame-review' && tag != 'ongame-screenshot' && tag != 'ongame-tips' && tag != 'ongame-streaming') {
            var appid = tag.split('-')[1]
            result[i].appid = appid
            result[i].surl = Content.CreateUrl(result[i].author, result[i].permlink)
            if (Content.findOne({ permlink: result[i].permlink }))
              result[i].type = Content.findOne({ permlink: result[i].permlink }).type
            else
              result[i].type = "blog"
            AddOnGameElements(result[i], result[i].type)
          }
        }
      }
    }
  })
}

Content.getContentByTrending = function (tag, limit, type, cb) {
  var query = {
    tag: tag,
    limit: limit
  };
  steem.api.getDiscussionsByTrending(query, function (error, result) {
    if (!result)
      return cb(error)
    else {
      for (var i = 0; i < result.length; i++) {
        try {
          result[i].json_metadata = JSON.parse(result[i].json_metadata)
        } catch (error) {
          console.log(error)
          cb(error)
        }
        for (b = 0; b < result[i].json_metadata.tags.length; b++) {
          var tag = result[i].json_metadata.tags[b]
          if (tag.includes('ongame-') && tag != 'ongame-news' && tag != 'ongame-video' &&
            tag != 'ongame-review' && tag != 'ongame-screenshot' && tag != 'ongame-tips' && tag != 'ongame-streaming') {
            var appid = tag.split('-')[1]
            result[i].appid = appid
          }
        }
        AddOnGameElements(result[i], type)
        cb(null)
      }
    }
  })
}

Content.getContentByCreated = function (tag, limit, type, cb) {
  var query = {
    tag: tag,
    limit: limit
  };
  steem.api.getDiscussionsByCreated(query, function (error, result) {
    if (!result)
      return cb(error)
    else {
      for (var i = 0; i < result.length; i++) {
        try {
          result[i].json_metadata = JSON.parse(result[i].json_metadata)
        } catch (error) {
          console.log(error)
          cb(error)
        }
        for (b = 0; b < result[i].json_metadata.tags.length; b++) {
          var tag = result[i].json_metadata.tags[b]
          if (tag.includes('ongame-') && tag != 'ongame-news' && tag != 'ongame-video' &&
            tag != 'ongame-review' && tag != 'ongame-screenshot' && tag != 'ongame-tips' && tag != 'ongame-streaming') {
            var appid = tag.split('-')[1]
            result[i].appid = appid
          }
        }
        AddOnGameElements(result[i], type)
        cb(null)
      }
    }
  })
}

AddOnGameElements = function (content, type) {
  content.type = type
  content.surl = Content.CreateUrl(content.author, content.permlink)
  Content.upsert({ _id: content.id }, content)
}


Content.getContent = function (author, permlink,type, cb) {
  steem.api.getContent(author, permlink, function (error, result) {
    if (!result)
      return cb(true)
    else {
      if (result.json_metadata) {
        try {
          result.json_metadata = JSON.parse(result.json_metadata)
        } catch (error) {
          console.log(error)
          cb(error)
        }
        if (Content.findOne({ permlink: result.permlink }))
          result.type = Content.findOne({ permlink: result.permlink }).type
        else{
          result.tags = result.json_metadata.tags
          if(type)
          result.type = type
          else
          result.type = "ongame"
          for (i = 0; result.tags.length > i; i++) {
            if (result.tags[i].includes('ongame-news') || result.tags[i].includes('ongame-streaming') || result.tags[i].includes('ongame-video') 
            || result.tags[i].includes('ongame-screenshot') || result.tags[i].includes('ongame-review') || result.tags[i].includes('ongame-tips')  ) {
                result.type = result.tags[i].split('-')[1]
            }
            else if (result.tags[i].includes('ongame-')){
                result.appid = result.tags[i].split('-')[1]
            }
        }
        result.surl = Content.CreateUrl(result.author, result.permlink)
        Content.upsert({ _id: result.id }, result)
        }
        // steam.getGameNews(result.appid)
        // steam.getGameDetails(result.appid)
      }
    }
    cb(null)
  });
}

Content.chainLoad = function () {
  if (Session.get('customtags')) {
    var tags = Session.get('customtags')
    for (i = 0; i < tags.length; i++) {
      if (tags[i].category != "home") {
        Content.getCreatedContent(tags[i].category, 15, 'featured', function (error) {
          if (error) {
            console.log(error)
          }
        })
        if (tags[i].subcategories) {
          for (s = 0; s < tags[i].subcategories.length; s++) {
            Content.getCreatedContent(tags[i].subcategories[s], 15, 'featured', function (error) {
              if (error) {
                console.log(error)
              }
            })
          }
        }
      }
    }
  }
}

Content.CreateUrl = function (author, permlink) {
  var url = ""
  url = "#!/@" + author + "/" + permlink
  return url
}
