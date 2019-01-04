function refreshPrice() {
    var x = document.getElementById("amount");
    var alert = document.getElementById("alert");
    var coin = Session.get('currentcoin')
    if (Session.get('currentcoin')) {
        alert.innerHTML = "Estimated amount to send : " + parseFloat(x.value / Session.get(coin)).toFixed(8) + ' ' + Session.get('currentcoin');
        Template.donate.getDepositAdress(coin);
        var a = document.getElementById('donatecoinbase');
        a.href = "https://buy.coinbase.com/widget?code=9e4c4501-54eb-5d5a-92f9-189e354bb082&amount=5&address=&currency=USD&crypto_currency=LTC&redirect_uri="
    }
    if (!x.value) {
        //Template.donate.getDepositAdress(coin);
    }
}



Template.powermodal.GetDepositAdressForSP = function (coin, name) {
    if (coin === "bitcoin" || coin === "ethereum" || coin === "litecoin" || coin === "bitcoin-cash" || coin === "bitshares" || coin === "dash" || coin === "monero") {
    }
    else {
        var coinprice;
        if (coin === "steem") {
            coinprice = Session.get(coin)
            coin = "STEEM"
        }
        if (coin === "steem-dollars") {
            coinprice = Session.get(coin)
            coin = "SBD"
        }
        var x = document.getElementById("amount");
        $('#depositinfo').addClass('dsp-none')
        $('#depositmessage').addClass('dsp-none')
        $('#depositsteemconnect').removeClass('dsp-none')
        var a = document.getElementById('donatesc2');
        a.href = "https://steemconnect.com/sign/transfer?to=" + localStorage.username + "&amount=" + parseFloat(x.value / coinprice).toFixed(3) + " " + coin + "&memo=Fundition"
    }
}


Template.powermodal.Init = function () {
    if (this.permlink) {
        $('.ui.styled.accordion.' + this.permlink).accordion('close others', true).accordion('open', 0)
    }
}


Template.powermodal.helpers({
    mode: function (mode) {
        if (Session.get('donationmode') === mode) {
            return true
        }
        else return false
    },
    donationamount: function () {
        if (Session.get('donationamount'))
            return Session.get('donationamount')
    },
    init:function()
    {
        //console.log('init')
    },
    modalproject:function(){
        return FullProject.findOne({'permlink': Session.get('currentdonate')})
    },
    checkConfirm:function(){
        if(Session.get('donationamount'))
        return true
    },
    depositAdress:function(){
        if(Session.get("DepositAdress"))
        return Session.get("DepositAdress")
    },
    isConverted: function () {
        var currency = Session.get('currency')
        switch (currency) {
            case 'USD':
                return false
                break;
            default:
                return true
                break;
        }
    }
})
