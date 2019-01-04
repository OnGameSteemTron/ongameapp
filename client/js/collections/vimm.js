LiveStream = new Mongo.Collection(null)
UserLive = new Mongo.Collection(null)

vimm = {
    getLiveList: function() {
        $.ajax({
            url: "https://www.vimm.tv/livelist/",
            data: 'go',
            dataType: "json",
            success: function (json) {
                $.each(json, function (index, value) {
                   if(value.fields.category === "Gaming")
                   LiveStream.upsert({_id:value.id},value.fields)
                })
            },
            error: function (result, status, error) {
                console.log(result, status, error)
            }
        })
    },
    getUserInfo: function(user) {
        $.ajax({
            url: "https://www.vimm.tv/status/"+user,
            data: 'go',
            dataType: "json",
            success: function (json) {
                UserLive.remove({})
                $.each(json, function (index, value) {
                    if(value.fields.is_live)
                    UserLive.upsert({_id:value.id},value.fields)
                })
            },
            error: function (result, status, error) {
                console.log(result, status, error)
            }
        })
    }
}