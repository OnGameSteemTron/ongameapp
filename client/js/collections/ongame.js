
Games = new Mongo.Collection(null)
CurrentGame = new Mongo.Collection(null)
FeaturedGames = new Mongo.Collection(null)
GameNews = new Mongo.Collection(null)
PremiumGames = new Mongo.Collection(null)
Cart = new Mongo.Collection(null)
//cartObserver = new PersistentMinimongo2(Cart, 'cart')
Market = new Mongo.Collection(null)
Records = new Mongo.Collection(null)
ChatHistory = new Mongo.Collection(null)

ongame = {
    getUser: function (user, cb) {
        var xtr = new XMLHttpRequest();
        xtr.open('GET', 'https://ongameapi.herokuapp.com/api/getlinks/' + user, true);
        xtr.send();
        xtr.onreadystatechange = function () {
            if (xtr.readyState == 4) {
                if (xtr.status == 200) {
                    if (xtr.responseText) {
                        try {
                            var res = JSON.parse(xtr.responseText)
                            cb(res[0])
                        }
                        catch (e) { cb(false) }
                    }
                }
            }
            else cb(false)
        }
    },
    getShop: function () {
        var xtr = new XMLHttpRequest();
        xtr.open('GET', 'https://ongameapi.herokuapp.com/api/market/items', true);
        xtr.send();
        xtr.onreadystatechange = function () {
            if (xtr.readyState == 4) {
                if (xtr.status == 200) {
                    if (xtr.responseText) {
                        try {
                            var res = JSON.parse(xtr.responseText)
                            for (i = 0; i < res.length; i++) {
                                Market.upsert({ _id: res[i].id }, res[i])
                            }
                        }
                        catch (e) { }
                    }
                }
            }
        }
    },
    getRecords: function () {
        $.ajax({
            type: "GET",
            contentType: 'application/json;',
            url: 'https://api.cloud.wowza.com/api/v1.2/recordings',
            beforeSend: function (xhr) {
                xhr.setRequestHeader("wsc-api-key", 'HuJOSkX1KvQKsXeWUMYOQj7rbL8yruF13YApHMTis0zxe1RQRbwN41NQkMTL3332')
                xhr.setRequestHeader("wsc-access-key", 'fTnJ1b36PCKvoQLcBCAfKQQmZAsOyuQrXKBRdwY2Xd4dZEKe52ayxNszfMrf3434')
            }, success: function (json) {
                for(i=0;i<json.recordings.length;i++)
                {
                    Records.upsert({ _id: json.recordings[i].id }, json.recordings[i])
                }
            },
            error: function (error) {
                error = JSON.parse(error.responseText)
            }
        })
    },
    getAuthorContents: function (author) {
        var xtr = new XMLHttpRequest();
        xtr.open('GET', 'https://ongameapi.herokuapp.com/api/getusercontents/' + author, true);
        xtr.send();
        xtr.onreadystatechange = function () {
            if (xtr.readyState == 4) {
                if (xtr.status == 200) {
                    if (xtr.responseText) {
                        try {
                            var res = JSON.parse(xtr.responseText)
                        }
                        catch (e) { }
                        for(i=0;i<res.length;i++){
                            var type = 'blog'
                            Content.getContent(res[i].author,res[i].permlink,type,function(error){
                                if(error)
                                console.log(error)
                            })
                        }
                    }
                }
            }
        }
    },
    getGameContents: function (game) {
        var xtr = new XMLHttpRequest();
        xtr.open('GET', 'https://ongameapi.herokuapp.com/api/getgamecontents/' + game, true);
        xtr.send();
        xtr.onreadystatechange = function () {
            if (xtr.readyState == 4) {
                if (xtr.status == 200) {
                    if (xtr.responseText) {
                        try {
                            var res = JSON.parse(xtr.responseText)
                        }
                        catch (e) { }
                        for(i=0;i<res.length;i++){
                            var type = "games"
                            Content.getContent(res[i].author,res[i].permlink,type,function(error){
                                if(error)
                                console.log(error)
                            })
                        }
                    }
                }
            }
        }
    },
    getTips: function (permlink) {
        var xtr = new XMLHttpRequest();
        xtr.open('GET', 'https://ongameapi.herokuapp.com/api/tips/' + permlink, true);
        xtr.send();
        xtr.onreadystatechange = function () {
            if (xtr.readyState == 4) {
                if (xtr.status == 200) {
                    if (xtr.responseText) {
                        try {
                            var res = JSON.parse(xtr.responseText)
                            for (i = 0; i < res.length; i++) {
                                Tips.upsert({ _id: res[i].id }, res[i])
                            }
                        }
                        catch (e) { }
                    }
                }
            }
        }
    },
    getRecentGameContents: function () {
        var xtr = new XMLHttpRequest();
        xtr.open('GET', 'https://ongameapi.herokuapp.com/api/getrecentgamecontents/', true);
        xtr.send();
        xtr.onreadystatechange = function () {
            if (xtr.readyState == 4) {
                if (xtr.status == 200) {
                    if (xtr.responseText) {
                        try {
                            var res = JSON.parse(xtr.responseText)
                        }
                        catch (e) { }
                        for(i=0;i<res.length;i++){
                            var type = "games"
                            Content.getContent(res[i].author,res[i].permlink,type,function(error){
                                if(error)
                                console.log(error)
                            })
                        }
                    }
                }
            }
        }
    },
    createAccount: function (user,wallet,cb) {
        var xtr = new XMLHttpRequest();
        xtr.open('GET', 'https://ongameapi.herokuapp.com/api/addaccount/'+user+'/'+wallet, true);
        xtr.send();
        xtr.onreadystatechange = function () {
            if (xtr.readyState == 4) {
                if (xtr.status == 200) {
                    if (xtr.responseText) {
                       cb(xtr.responseText)
                    }
                }
            }
        }
    },
    fblogin:function(user,cb){
        var xtr = new XMLHttpRequest();
        xtr.open('POST', 'https://ongameaccount.herokuapp.com/auth/facebook', true);
        xtr.send();
        xtr.onreadystatechange = function () {
            if (xtr.readyState == 4) {
                if (xtr.status == 200) {
                    if (xtr.responseText) {
                       cb(xtr.responseText)
                    }
                }
            }
        }
    }
}

