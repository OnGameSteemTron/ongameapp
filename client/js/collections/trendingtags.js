TrendingTags = new Mongo.Collection(null)

TrendingTags.getTrendingTags = function () {
  if (sessionStorage.trendingtags) return
  steem.api.getTrendingTags('life', 20, function (err, result) {
    if (result) {
      for (var i = 0; i < result.length; i++) {
        TrendingTags.upsert({ _id: result[i].name }, result[i])
      }
      sessionStorage.setItem('trendingtags', JSON.stringify(TrendingTags.find().fetch()))
    }
    else {
      //console.log(err, result);
    }
  });
}

