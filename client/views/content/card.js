
Template.card.helpers({
    allTips: function (upvotes) {
        if(Tips.find({ 'permlink': this.permlink }).fetch())
        {
            upvotes =  upvotes + Tips.find({ 'permlink': this.permlink }).fetch().length
            return upvotes
        }
        else{
            return upvotes
        }
    },
    allRewards:function(amount){
        if(Tips.find({ 'permlink': this.permlink }).fetch())
        {
            var tips = Tips.find({ 'permlink': this.permlink }).fetch()
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
    isVimm: function () {
        if(this.body.includes('twitch.tv'))
        {
            var channel = this.body.split('twitch.tv/')[1].split('<p>')[0]
            twitch.checkChannel(channel,function(result){
                if(result.stream != null)
                {
                    if(result.stream.stream_type === 'live')
                    {
                        return "LIVE"
                    }
                    else
                    return "OFFLINE"
                }
                else
                return "OFFLINE"
            })
        }
        if (this.body.includes('https://www.vimm.tv')) {
            vimm.getUserInfo(this.author)
            if (UserLive.findOne()) { 
                return "LIVE"
            }
            else {
                return "OFFLINE"
            }
        }
        else {
            if (Records.findOne({ transcoder_id: this.json_metadata.stream_id })) {
                return 'REPLAY'
            }
          
            else{
                return "LIVE"
            }
        }
    },
})


Template.card.onRendered(function () {
    ongame.getTips(this.data.permlink)
})