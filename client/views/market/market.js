// var url = "https://steemconnect.com/sign/transfer?to=ongame-shop" + Session.get('and') + "amount=" + Session.get('cryptopayment') + " " + Session.get('paymentcoin') + Session.get('and') + "memo=" + Session.get('productlist') + "&redirect_uri=https://ongame.io/complete"
// window.open(url.split('+').join('_'), "_blank")




Template.market.rendered = function () {
    $("#price").change(function () {
        Session.set('gametosellprice', $("#price").val())
        $('.field.price').removeClass('hidden')
      });
      ongame.getShop()
}

Template.market.helpers({
    toSBD: function (int) {
        if(Coins.findOne({ 'id': 'steem-dollars' }))
        return parseFloat(int/Coins.findOne({ 'id': 'steem-dollars' }).price_usd).toFixed(3)
    },
    toSTEEM: function (int) {
        if(Coins.findOne({ 'id': 'steem' }))
        return parseFloat(int/Coins.findOne({ 'id': 'steem' }).price_usd).toFixed(3)
    },
    gametosell: function () {
        return Session.get('gametosell')
    },
    gametosellid: function () {
        return Session.get('gametosellid')
    },
    gametosellprice: function () { 
        return Session.get('gametosellprice') + ' USD'
    },
    gametosellpricesteem: function () { 
        if(Coins.findOne({ 'id': 'steem' }))
        return parseFloat(Session.get('gametosellprice')/Coins.findOne({ 'id': 'steem' }).price_usd).toFixed(3)+ ' STEEM'
    },
    fee: function () { 
        return parseFloat((Session.get('gametosellprice')/100)*5).toFixed(3) + ' USD'
    },
    feesteem: function () { 
        if(Coins.findOne({ 'id': 'steem' }))
        return parseFloat(((Session.get('gametosellprice')/Coins.findOne({ 'id': 'steem' }).price_usd)/100)*5).toFixed(3) + ' STEEM'
    },
    finalsellprice: function () {
        return Session.get('gametosellprice') - parseFloat((Session.get('gametosellprice')/100)*5).toFixed(3) + ' USD'
    },
    finalsellpricesteem: function () {
        if(Coins.findOne({ 'id': 'steem' }))
        return parseFloat(Session.get('gametosellprice')/Coins.findOne({ 'id': 'steem' }).price_usd).toFixed(3) - parseFloat(((Session.get('gametosellprice')/Coins.findOne({ 'id': 'steem' }).price_usd)/100)*5).toFixed(3) + ' STEEM'
    }

})

//ratification_deadline=2018-06-25T19%3A08%3A45&escrow_expiration=2018-06-26T19%3A08%3A45&json_meta={%22terms%22:%22example%22}

Template.market.events({
    'click .buysteem.button': function (event) {
        var sc = "https://steemconnect.com/sign/escrow-transfer?from="
        var from = localStorage.username
        var to = "&to=" + this.seller
        var agent = "&agent=ongame&escrow_id=1"
        var sbdamount = "&sbd_amount=0.000 SBD"
        var steemamount = "&steem_amount="+parseFloat(this.usd_price/Coins.findOne({ 'id': 'steem' }).price_usd).toFixed(3)+" STEEM"
        var fee = "&fee="+parseFloat((((this.usd_price/Coins.findOne({ 'id': 'steem' }).price_usd))/100)*5).toFixed(3)+" STEEM"
        var today = new Date();
        today.setDate(today.getDate() + 2);
        var dd = today.getUTCDate();
        var mm = today.getUTCMonth() + 1; //January is 0!
        var yyyy = today.getUTCFullYear();
        var hhhh = today.getUTCHours()
        var mmmm = today.getUTCMinutes()
        var ssss = today.getUTCSeconds()
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        if (hhhh < 10) {
            hhhh = '0' + hhhh
        }
        if (mmmm < 10) {
            mmmm = '0' + mmmm
        }
        if (ssss < 10) {
            ssss = '0' + ssss
        }
        today = yyyy + '-' + mm + '-' + dd + 'T' + hhhh + ':' + mmmm + ':' + ssss;
        var date = new Date();
        date.setDate(date.getDate() + 3);
        var dd = date.getUTCDate();
        var mm = date.getUTCMonth() + 1; //January is 0!
        var yyyy = date.getUTCFullYear();
        var hhhh = date.getUTCHours()
        var mmmm = date.getUTCMinutes()
        var ssss = date.getUTCSeconds()
        date = yyyy + '/' + mm + '/' + dd;
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        if (hhhh < 10) {
            hhhh = '0' + hhhh
        }
        if (mmmm < 10) {
            mmmm = '0' + mmmm
        }
        if (ssss < 10) {
            ssss = '0' + ssss
        }
        last = yyyy + '-' + mm + '-' + dd + 'T' + hhhh + ':' + mmmm + ':' + ssss;

        var ratif = "&ratification_deadline=" + today
        var expir = "&escrow_expiration=" + last
        var json = "&json_meta="+this.appid

        var url = sc + from + to + agent + sbdamount + steemamount + fee + ratif + expir + json +"&redirect_uri=https://ongame.io/market"
        window.open(url.split('+').join('_'), "_blank")
    },
    'click .buysbd.button': function (event) {
        var sc = "https://steemconnect.com/sign/escrow-transfer?from="
        var from = localStorage.username
        var to = "&to=" + this.seller
        var agent = "&agent=ongame&escrow_id=1"
        var sbdamount = "&sbd_amount="+parseFloat(this.usd_price/Coins.findOne({ 'id': 'steem-dollars' }).price_usd).toFixed(3)+" SBD" 
        var steemamount =  "&steem_amount=0.000 STEEM"
        var fee = "&fee="+parseFloat((((this.usd_price/Coins.findOne({ 'id': 'steem' }).price_usd))/100)*5).toFixed(3)+" STEEM"
        var today = new Date();
        today.setDate(today.getDate() + 2);
        var dd = today.getUTCDate();
        var mm = today.getUTCMonth() + 1; //January is 0!
        var yyyy = today.getUTCFullYear();
        var hhhh = today.getUTCHours()
        var mmmm = today.getUTCMinutes()
        var ssss = today.getUTCSeconds()
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        if (hhhh < 10) {
            hhhh = '0' + hhhh
        }
        if (mmmm < 10) {
            mmmm = '0' + mmmm
        }
        if (ssss < 10) {
            ssss = '0' + ssss
        }
        today = yyyy + '-' + mm + '-' + dd + 'T' + hhhh + ':' + mmmm + ':' + ssss;
        var date = new Date();
        date.setDate(date.getDate() + 3);
        var dd = date.getUTCDate();
        var mm = date.getUTCMonth() + 1; //January is 0!
        var yyyy = date.getUTCFullYear();
        var hhhh = date.getUTCHours()
        var mmmm = date.getUTCMinutes()
        var ssss = date.getUTCSeconds()
        date = yyyy + '/' + mm + '/' + dd;
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        if (hhhh < 10) {
            hhhh = '0' + hhhh
        }
        if (mmmm < 10) {
            mmmm = '0' + mmmm
        }
        if (ssss < 10) {
            ssss = '0' + ssss
        }
        last = yyyy + '-' + mm + '-' + dd + 'T' + hhhh + ':' + mmmm + ':' + ssss;

        var ratif = "&ratification_deadline=" + today
        var expir = "&escrow_expiration=" + last
        var json = "&json_meta="+this.appid

        var url = sc + from + to + agent + sbdamount + steemamount + fee + ratif + expir + json +"&redirect_uri=https://ongame.io/market"
        window.open(url.split('+').join('_'), "_blank")
    },
    'click .startsell': function (event) {
        $('#sell_form').removeClass('dspnone')
    },
    'click .sellitem': function (event) {
        var item = Template.market.sellItem()
        Template.market.submitItem(item)
    },
    'click .cancel': function (event) {
        $('#sell_form').addClass('dspnone')
        Template.market.submitItem(item)
    },
})

//2018-11-25T19%3A08%3A45&escrow_expiration=2018-11-26T19%3A08%3A45&json_meta={"terms":"example"}
//2018-11-04T03%2058%2008&escrow_expiration=2018-11-07T03%2058%2008&json_meta=47700


Template.market.sellItem = function () {
    var image = $('.image.lazy.sellcard img').attr('src')
    var form = document.getElementById('sell_form')
    var item = {}
    item.usdprice = form.usdprice.value.split(' ')[0]
    item.image = image
    item.fee = form.fee.value.split(' ')[0]
    item.appid = form.gameid.value
    item.name = form.gamename.value
    return item
}

Template.market.submitItem = function (item) {
    $('.sellitem').addClass('loading')
    steemconnect.custom_json(item,'ongame-sell',
        function (error, result) {
            if (error) {
                if (error.error_description)
                    console.log(error.error_description)
            } else {
                $('.field.price').addClass('hidden')
                $('.sellitem').removeClass('loading')
                $('#sell_form').addClass('dspnone')
                console.log('nice')
            }
        }
    )
}