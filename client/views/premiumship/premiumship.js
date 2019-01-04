Template.premiumship.events({
    'click .subscribe': function (event) {
        var item = {}
        item.type = 'premium'
        item.id = event.currentTarget.id
        item.name = "ONGAME PREMIUM MEMBERSHIP - ELITE ACCESS " + item.id.toUpperCase()
        item.price_overview = {}
        switch(item.id){
            case 'basic':
            item.price_overview.final = 3490
            item.short_description = "ONE GAME PER WEEK FOR A MONTHLY TOTAL VALUE (AT LESS) OF 50$ - 10 STEEM POWER DELEGATION FROM ONGAME. 1 MONTHLY INVITATION FOR FRIENDS + GET SPECIAL BADGE"
            item.header_image = "./images/premium.png"
            break;
            case 'gold':
            item.price_overview.final = 6990
            item.short_description = "ONE GAME PER WEEK FOR A MONTHLY TOTAL VALUE (AT LESS) OF 80$ - 20 STEEM POWER DELEGATION FROM ONGAME. 2 MONTHLY INVITATION FOR FRIENDS + GET SPECIAL BADGE + GET SPECIAL TITLE + 1% OFF ONGAME PURCHASES"
            item.header_image = "./images/premium.png"
            break;
            case 'diamond':
            item.price_overview.final = 10990
            item.short_description = "ONE GAME PER WEEK FOR A MONTHLY TOTAL VALUE (AT LESS) OF 120$ -35 STEEM POWER DELEGATION FROM ONGAME. 3 MONTHLY INVITATION FOR FRIENDS + GET SPECIAL BADGE + GET SPECIAL TITLE + 2% OFF ONGAME PURCHASES"
            item.header_image = "./images/premium.png"
            break;
        }
        Cart.upsert({_id:item.type},item)
        $('.ui.cart.modal').remove()
        $('article').append(Blaze.toHTMLWithData(Template.cartmodal, {data:item}));
        $('.ui.cart.modal').modal('setting', 'transition', 'horizontal flip').modal('show')
    },
})