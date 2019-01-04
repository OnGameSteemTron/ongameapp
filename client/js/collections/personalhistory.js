PersonalHistory = new Mongo.Collection(null)
var moment = require('moment')

PersonalHistory.getPersonalHistory = function (username, limit, cb) {
    steem.api.getAccountHistory(username, -1, limit, function (error, result) {
        if (result) {
            for (i = 0; result.length > i; i++) {
                PersonalHistory.filterhistory(result[i], username)
            }
            cb(null)
        }
        else {
            cb(true)
        }
    })
}


PersonalHistory.filterhistory = function (transaction, username) {
    switch (transaction[1].op[0]) {
        case 'vote':
            var result = {};
            result.type = 'vote'
            result.username = username
            result.date = transaction[1].timestamp
            result.name = transaction[1].op[1].voter
            result.author = transaction[1].op[1].author
            result.permlink = transaction[1].op[1].permlink
            result.weight = transaction[1].op[1].weight / 100
            PersonalHistory.upsert({ _id: result.id }, result)
            break;
        case 'comment':
            if (transaction[1].op[1].parent_permlink && transaction[1].op[1].parent_permlink != transaction[1].op[1].permlink && transaction[1].op[1].parent_author) {
                var result = {};
                if (transaction[1].op[1].author === username)
                    result.type = 'comment'
                else
                    result.type = 'replies'
                result.username = username
                result.date = transaction[1].timestamp
                result.name = transaction[1].op[1].author
                result.body = transaction[1].op[1].body
                result.parent_permlink = transaction[1].op[1].parent_permlink
                result.parent_author = transaction[1].op[1].parent_author
                result.permlink = transaction[1].op[1].permlink
                PersonalHistory.upsert({ _id: result.id }, result)
            }
            break;
        case 'transfer':
            var result = {};
            result.type = 'transfer'
            result.username = username
            result.date = transaction[1].timestamp
            result.from = transaction[1].op[1].from
            result.to = transaction[1].op[1].to
            result.amount = transaction[1].op[1].amount
            result.memo = transaction[1].op[1].memo
            PersonalHistory.upsert({ _id: result.id }, result)
            break;
        case 'claim_reward_balance':
            var result = {};
            result.type = 'claimreward'
            result.username = username
            result.date = transaction[1].timestamp
            result.name = transaction[1].op[1].account
            result.reward_sbd = transaction[1].op[1].reward_sbd
            result.reward_steem = transaction[1].op[1].reward_steem
            result.reward_vests = transaction[1].op[1].reward_vests
            PersonalHistory.upsert({ _id: result.id }, result)
            break;
        default:
            break;
    }
}