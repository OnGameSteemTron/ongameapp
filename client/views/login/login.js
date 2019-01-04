Template.login.helpers({
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
    }
})

Template.login.rendered = function () {
    Session.set('trx_account', false)
}

Template.login.events({
    'click .steamlogin': function (event) {
        event.preventDefault();
        Meteor.loginWithSteam(function (err) {
            if (err) {
                console.log('Handle errors here: ', err);
            }
            else {
                Meteor.subscribe('userData');
            }
        });
    },
    'click .googlelogin': function (event) {
        event.preventDefault();
        Meteor.loginWithGoogle({
            requestPermissions: ['email']
        }, function (err) {
            if (err) {
                console.log('Handle errors here: ', err);
            }
            else {
                Meteor.subscribe('userData');
            }
        });
    },
    'click .fblogin': function (event) {
        event.preventDefault();
        Meteor.loginWithFacebook({ requestPermissions: ['public_profile', 'email'] }, function (err) {
            if (err) {
                console.log('Handle errors here: ', err);
            }
            else {
                Meteor.subscribe('userData');
            }
        });
    },
    'click .twitchlogin': function (event) {
        event.preventDefault();
        Meteor.loginWithTwitch({ requestPermissions: ['user_read'] }, function (err) {
            if (err) {
                console.log('Handle errors here: ', err);
            }
            else {
                Meteor.subscribe('userData');
            }
        });
    },
    'click .twitterlogin': function (event) {
        event.preventDefault();
        Meteor.loginWithTwitter({ requestPermissions: ['public_profile', 'email'] }, function (err) {
            if (err) {
                console.log('Handle errors here: ', err);
            }
            else {
                Meteor.subscribe('userData');
            }
        });
    },
    'click .githublogin': function (event) {
        event.preventDefault();
        Meteor.loginWithGithub({ requestPermissions: ['public_profile', 'email'] }, function (err) {
            if (err) {
                console.log('Handle errors here: ', err);
            }
            else {
                Meteor.subscribe('userData');
            }
        });
    },
    'click .scconnect': function (event) {
        window.location.href = sc2.getLoginURL()
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