TwitchGames = new Mongo.Collection(null)
TwitchLive = new Mongo.Collection(null)
const twitch_client_id = "b5x65miullqqvqf6lkqcaio2ofljt4"

twitch={
    verifyUser:function(code,cb){
        $.ajax({
            url: 'https://id.twitch.tv/oauth2/validate',
            beforeSend: function(xhr) {
                 xhr.setRequestHeader("Authorization","OAuth "+ code)
            }, success: function(json){
               cb(json)
            }
        })
    },
    getUser: function(code,cb) {
        $.ajax({
            url: 'https://api.twitch.tv/helix/users?id='+ code,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Client-ID", twitch_client_id)
            }, success: function(json){
                    return cb(json)
            }
        })
    },
    checkChannel: function(code,cb) {
        $.ajax({
            url: '  https://api.twitch.tv/kraken/streams/'+code,
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Client-ID", twitch_client_id)
            }, success: function(json){
                    return cb(json)
            }
        })
    },
    getLiveList: function() {
        $.ajax({
            url: 'https://api.twitch.tv/helix/games/top',
            beforeSend: function(xhr) {
                 xhr.setRequestHeader("Client-ID", twitch_client_id)
            }, success: function(json){
                $.each(json.data, function (index, value) {
                    value.box_art_url = value.box_art_url.replace('{width}x{height}','342x456')  
                    if(value.name != 'Casino' && value.name != 'Just Chatting' && value.name != 'Potato Thriller')
                    TwitchGames.upsert({_id:value.id},value)
                 })
            }
        })
    },
    getTopStream: function() {
        $.ajax({
            url: 'https://api.twitch.tv/helix/streams?first=20',
            beforeSend: function(xhr) {
                 xhr.setRequestHeader("Client-ID", twitch_client_id)
            }, success: function(json){
                $.each(json.data, function (index, value) {
                    value.thumbnail_url = value.thumbnail_url.replace('{width}x{height}','342x456')  
                    TwitchLive.upsert({_id:value.id},value)
                 })
            }
        })
    },
    addTwitchUser: function(id) {
        var xtr = new XMLHttpRequest();
        xtr.open('GET', 'https://ongameapi.herokuapp.com/api/link/' + localStorage.username + "/twitch_id/" + id, true);
        xtr.send();
        xtr.onreadystatechange = function () {
            if (xtr.readyState == 4) {
                if (xtr.status == 200) {
                    if (xtr.responseText) {
                        MainUser.add(localStorage.username, function (error) {
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


