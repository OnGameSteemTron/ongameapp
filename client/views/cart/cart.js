Template.cart.helpers({
    depositAdress: function () {
        if (Session.get("DepositAdress"))
            return Session.get("DepositAdress")
    },
    allRewards:function(amount){
        if(Tips.find({ 'permlink': Session.get('article') }).fetch())
        {
            var tips = Tips.find({ 'permlink': Session.get('article') }).fetch()
            for(i=0;i<tips.length;i++)
            {
                if(tips[i].type === "og")
            {
                amount = Number(amount) + Number(parseFloat(tips[i].amount * 0.02).toFixed(2))
            }
            else{
                if(Coins.findOne({ 'id': tips[i].type }))
                amount = Number(amount) + Number(parseFloat(tips[i].amount / Coins.findOne({ 'id': tips[i].type }).price_usd).toFixed(2))
                }   
            }
            return amount
        }
        else{
            return amount
        }
    },
    totalPrice:function(){
        var total = 0;
        var items = Cart.find().fetch()
        var products =[]
        for (i=0;i<items.length;i++)
        {
             if(items[i].price_overview.final)
             {
                total += items[i].price_overview.final
                if(items[i].refferer)
                {
                    products.push(items[i].steam_appid+'='+items[i].price_overview.final +'-ref='+items[i].refferer)
                }
                else{
                    products.push(items[i].steam_appid+'='+items[i].price_overview.final)
                }
             }

        }
        Session.set('productlist',products)
        Session.set('paymentamount',parseFloat(total/100).toFixed(2))
        return parseFloat(total/100).toFixed(2)
    },
    productList:function(){
        return Session.get('productlist')
    },
    coinPrice:function(coin){
        if(Coins.findOne({ 'id': coin }))
        return (Session.get('paymentamount') / Coins.findOne({ 'id': coin }).price_usd).toFixed(3)
    },
    estimatePrice:function(coin){
        if(Coins.findOne({ id: 'steem' }))
        {
            var price = 0;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://blocktrades.us:443/api/v2/estimate-input-amount?outputAmount=' + (Session.get('paymentamount') / Coins.findOne({ 'id': 'steem' }).price_usd).toFixed(6) + '&inputCoinType=' + coin + '&outputCoinType=steem')
            xhr.send(); 
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        try{
                            var ticker = JSON.parse(xhr.responseText)
                            price = ticker.inputAmount
                            var up = document.getElementById(coin+'price')
                            up.innerText = parseFloat(price).toFixed(6)
                        }
                        catch(e){}
                    } else {
                        console.log("Error: API not responding!");
                    }
                }
            }

        }

    }
})

Template.cart.events({
    'click .remove.button': function (event) {
        Cart.remove({steam_appid:this.steam_appid})
    },
})