Template.tronloginmodal.helpers({
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