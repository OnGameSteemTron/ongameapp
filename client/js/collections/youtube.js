youtube={
    addYoutubeUser: function(id) {
        var xtr = new XMLHttpRequest();
        xtr.open('GET', 'https://ongameapi.herokuapp.com/api/link/' + localStorage.username + "/youtube/" + id, true);
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
    },
    getYoutubeVideos: function(channel,cb) {
        var xtr = new XMLHttpRequest();
        xtr.open('GET', 'https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId='+channel+'&maxResults=50&key=AIzaSyAeCdglXdzGX0cMqg7Nw31B_RvSypdi2qg', true);
        xtr.send();
        xtr.onreadystatechange = function () {
            if (xtr.readyState == 4) {
                if (xtr.status == 200) {
                    if (xtr.responseText) {
                        try{
                            var res =  JSON.parse(xtr.responseText)
                            cb(res.items)
                        }
                        catch(e){}
                    }
                 }
            }
            else{
                cb(null)
            }
        }
    },
    getYoutubeChannel: function(channel,cb) {
        var xtr = new XMLHttpRequest();
        xtr.open('GET', 'https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id='+channel+'&&key=AIzaSyAeCdglXdzGX0cMqg7Nw31B_RvSypdi2qg', true);
        xtr.send();
        xtr.onreadystatechange = function () {
            if (xtr.readyState == 4) {
                if (xtr.status == 200) {
                    if (xtr.responseText) {
                        var res =  JSON.parse(xtr.responseText)
                        cb(res.items[0])
                    }
                 }
            }
            else{
                cb(null)
            }
        }
    },
}
