const dsteem = require('dsteem')
Template.steemloginmodal.events({
    'click .confirmusername': function (event) {
        var name = $('#account_username').val()
        checkAccountName(name, function (result) {
            if (result)
                $('.message.exist').show()
            else {
                $('.message.exist').hide()
               console.log('braa')
            }
        })
    }
})

function checkAccountName(name, cb) {
    steem.api.getAccounts([name], function (error, result) {
        if (result.length > 0) {
            cb(true)
        }
        else {
            cb(null)
        }
    })
}

Template.steemloginmodal.helpers({
    steem_account: function () {
        if(Session.get('steem_account'))
        {
            var account = {}
            account.owner = dsteem.PrivateKey.fromSeed(Session.get('steem_account')[1].owner).toString()
            account.active = dsteem.PrivateKey.fromSeed(Session.get('steem_account')[1].active).toString()
            account.posting = dsteem.PrivateKey.fromSeed(Session.get('steem_account')[1].posting).toString()
            account.memo = dsteem.PrivateKey.fromSeed(Session.get('steem_account')[1].memo_key).toString()
            return account
        }
    }
})