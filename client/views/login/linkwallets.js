const dsteem = require('dsteem')
Template.linkwallets.helpers({
    loginUrl: function () {
        return sc2.getLoginURL()
    },
    tronlink: function () {
        return Session.get('tron_link')
    },
    tronlink_logged: function () {
        return Session.get('tron_link_logged')
    },
    trx_account: function () {
        return Session.get('trx_account')
    },
    steem_account: function () {
        return Session.get('steem_account')
    }
})

Template.linkwallets.rendered = function () {
    Session.set('trx_account', false)
    Session.set('steem_account', false)
}

Template.linkwallets.events({
    'click .scconnect': function (event) {
        window.location.href = sc2.getLoginURL()
    },
    'click .createtron': function (event) {
        //Meteor.call('createTronWallet')
        $('.ui.modal.tronlogin').modal('setting', 'transition', 'scale').modal('show')
    },
    'click .createsteem': function (event) {
        //Meteor.call('createTronWallet')
        $('.ui.modal.steemlogin').modal('setting', 'transition', 'scale').modal('show')
    },
    'click .confirm': function (event) {
        var name = $('.acc.username').val()
        checkAccountName(name, function (result) {
            if (result)
                $('.message.exist').show()
            else {
                $('.message.exist').hide()
                ongame.createAccount(name, Session.get('trx_address'), function (result) {
                    if (result)
                        localStorage.username = name
                    FlowRouter.go('/')
                    ongame.getUser(localStorage.username, function (user) {
                        if (user) {
                            MainUser.upsert({ _id: user.id }, user)
                        }
                    })
                })
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