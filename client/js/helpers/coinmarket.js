coinmarket = {
    steemdollars: function () {
        var xtr = new XMLHttpRequest();
        xtr.open('GET', 'https://api.coinmarketcap.com/v1/ticker/steem-dollars/', true);
        xtr.send();
        xtr.onreadystatechange = function () {
            if (xtr.readyState == 4) {
                if (xtr.status == 200) {
                    if (xtr.responseText) {
                        try {
                            var ticker = JSON.parse(xtr.responseText)
                            if (Coins.findOne(ticker[0])) {
                                Coins.remove(ticker[0])
                            }
                            Coins.upsert({_id:ticker[0].id},ticker[0])
                        }
                        catch (e) {

                        }

                        // console.log('SteemD')
                    }
                } else {
                    console.log("Error: API not responding!");
                }
            }
        }
    },
    allcoins: function () {
        var coinDate = (new Date()).getTime();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.coinmarketcap.com/v1/ticker/', true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (xhr.responseText) {
                        try {
                            var ticker = JSON.parse(xhr.responseText)
                            for (var i = 0; i < ticker.length; i++) {
                                if (Coins.findOne(ticker[i])) {
                                    Coins.remove(ticker[i])
                                }
                                Coins.upsert({_id:ticker[i].id},ticker[i])
                            }
                            var receiveDate = (new Date()).getTime();
                            var responseTimeMs = receiveDate - coinDate;
                            console.log('CoinMarketCap loaded in : ' + responseTimeMs + "ms")
                        }
                        catch (e) {

                        }
                    }
                } else {
                    console.log("Error: API not responding!");
                }
            }
        }
    },
    convertcoins: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://apilayer.net/api/live?access_key=a4d5d62cc69c3cb2fea2fb9fd4402852&currencies=EUR,GBP,CAD,PLN,TRY,CNY,IDR,KRW,PHP,JPY&source=USD&format=1', true);
        xhr.send();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    if (xhr.responseText) {
                        try {
                            var ticker = JSON.parse(xhr.responseText)
                            Session.set('currencies', ticker.quotes)
                        }
                        catch (e) {

                        }
                    }
                } else {
                    console.log("Error: API not responding!");
                }
            }
        }
    },
}