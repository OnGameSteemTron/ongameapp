Coins = new Mongo.Collection(null)
//coinsObserver = new PersistentMinimongo2(Coins, 'coins');


Coins.GetDepositAdress = function (coin, memo, cb) {

    $.post("https://blocktrades.us/api/v2/simple-api/initiate-trade",
    {
        "inputCoinType": coin,
        "outputCoinType": "steem",
        "outputAddress": "ongame-shop",
        "outputMemo": memo,
        "inputMemo": memo,
        "refundMemo": memo
    })
    .done(function (data) {
        Session.set("DepositAdress", data.inputAddress)
        cb(null)
    });
  }

  Coins.GetDepositAdressForSP = function (to, memo, cb) {

    $.post("https://blocktrades.us/api/v2/simple-api/initiate-trade",
    {
        "inputCoinType": Session.get('donationcrypto'),
        "outputCoinType": "steem_power",
        "outputAddress": to,
        "outputMemo": memo,
        "inputMemo": memo,
        "refundMemo": memo
    })
    .done(function (data) {
        Session.set("DepositAdress", data.inputAddress)
        cb(null)
    });
  }

  SteemMarket = {
    vestToSteemPower: function(userVests) {
        if (Session.get('steemGlobalProp') && userVests) {
            var globals = Session.get('steemGlobalProp')
            var totalSteem = parseFloat(globals.total_vesting_fund_steem.split(' ')[0])
            var totalVests = parseFloat(globals.total_vesting_shares.split(' ')[0])
            var SP = totalSteem * (userVests / totalVests)
            return SP
        }
    }
  }