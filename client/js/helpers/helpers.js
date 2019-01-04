import { Session } from "meteor/session";
import xss from 'xss'
import moment from 'moment-with-locales-es6'
import showdown from 'showdown'
import Remarkable from 'remarkable';

var Autolinker = require('autolinker');

const steemMarkdown = require('steem-markdown-only')

Template.registerHelper('imgFromBody', function (content) {
    if (!content) return
    else {
        var __imgRegex = /https?:\/\/(?:[-a-zA-Z0-9._]*[-a-zA-Z0-9])(?::\d{2,5})?(?:[/?#](?:[^\s"'<>\][()]*[^\s"'<>\][().,])?(?:(?:\.(?:tiff?|jpe?g|gif|png|svg|ico)|ipfs\/[a-z\d]{40,})))/gi;
        if (__imgRegex.test(content.body)) {

            return content.body.match(__imgRegex)[0];
        }
        else {
            if (content.json_metadata) {
                if (content.json_metadata.image) {
                    return content.json_metadata.image
                }
                if (content.json_metadata.thumbnail) {
                    return content.json_metadata.thumbnail
                }
            }
            if (__imgRegex.test(content)) {
                return content.match(__imgRegex)[0];
            }
            else {
                return false
            }
        }
    }
})

Template.registerHelper('isBlacklisted', function (name) {
    if (!Session.get('settings').blacklist.includes(result[i].author))
        return false
    else
        return true
});



Template.registerHelper('translator', function (code) {
    return translate(code);
});

Template.registerHelper('remarkableFormatter', function (text) {
    if (!text) return
    text = steemMarkdown(text)
    // var autolinker = new Autolinker({
    //     urls: {
    //         schemeMatches: true,
    //         wwwMatches: true,
    //         tldMatches: true
    //     },
    //     email: true,
    //     phone: true,
    //     mention: 'steemit',
    //     hashtag: 'steemit',
    //     stripPrefix: false,
    //     stripTrailingSlash: false,
    //     newWindow: true,

    //     truncate: {
    //         length: 0,
    //         location: 'end'
    //     },

    //     className: ''
    // });
    // text = autolinker.link(text);
    return makeLinksOpenInNewWindow(ongamecleaner(text))
})

var anchorTagRegex = /<a(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/g,
    targetAttrRegex = /target\s*=\s*(".*?"|'.*?'|[^'">\s]+)/;

var makeLinksOpenInNewWindow = function( html ) {
    return html.replace( anchorTagRegex, function( anchorTag ) {
        var targetAttrMatch = anchorTag.match( targetAttrRegex );  // find any pre-existing 'target' attribute
        if( targetAttrMatch ) {
            // For the case where the 'target' attr exists, and it is something other
            // than "_blank", replace it. We always want it to be "_blank". 
            var targetAttrValue = targetAttrMatch[ 1 ].replace( /['"]/g, "" );  // strip away any quote characters from the value
            if( targetAttrValue !== "_blank" ) {
                anchorTag = anchorTag.replace( targetAttrRegex, 'target="_blank"' );
            }
        } else {
            // no target attribute, add it
            anchorTag = anchorTag.substr( 0, anchorTag.length - 1 ) + ' target="_blank">';
        }

        return anchorTag;
    } );
}

var ongamecleaner = function(text){
    text = text.replace(/<div class="pull-left"><a href="(.*?)*And many more... !!!/gi, "");
    return text
}

function parseURL($string) {
    var __imgRegex = /^https?[^ \!@\$\^&\(\)\+\=]+(\.png|\.jpeg|\.gif|\.jpg)$/;
    var exp = __imgRegex;
    return $string.replace(exp, function (match) {
        __imgRegex.lastIndex = 0;
        if (__imgRegex.test(match)) {
            return match;
        }
    }
    )
}

function transformDTubeLinks(text) {
    if (!text) return text;
    const self = this;
    const linkreg = /(?:)<a([^>]+)>(.+?)<\/a>/g;
    const fullreg = /(https?:\/\/)?(d\.tube\/)([^& \n<]+)(?:[^ \n<]+)?/g;
    const regex = /(?:https?:\/\/)?(?:d\.tube\/)([^& \n<]+)(?:[^ \n<]+)?/g;
    let resultHtml = text;
    const match = text.match(fullreg);
    if (match && match.length > 0) {
        const matchlinks = text.match(linkreg);

        if (matchlinks && matchlinks.length > 0) {
            for (var i = 0; i < matchlinks.length; i++) {
                resultHtml = resultHtml.replace(matchlinks[i], "#placeholder" + i + "#");
            }
        }
        for (var i = 0; i < match.length; i++) {
            let matchParts = match[i].split(regex);
            //console.log('tes' + match[i])
            //console.log(resultHtml.replace(match[i], createDTubeEmbed(matchParts[1])))
            resultHtml = resultHtml.replace(match[i], createDTubeEmbed(matchParts[1]));
            //console.log('tes' + resultHtml)
        }
        if (matchlinks && matchlinks.length > 0) {
            for (var i = 0; i < matchlinks.length; i++) {
                resultHtml = resultHtml.replace("#placeholder" + i + "#", createDTubeEmbed(matchlinks[i]));
            }
        }
    }
    return resultHtml;
}

Template.registerHelper('isFollowing', function (following) {
    if(MainUser.findOne())
    var followers = Followers.findOne({ follower: MainUser.findOne().name, following: following })
    if (followers) return true
    return false;
})

Template.registerHelper('shortDescription', function (string) {
    if (!string) return
    return string.slice(0,75)
})

Template.registerHelper('shortDescriptionForCard', function (string) {
    if (!string) return
    return string.slice(0, 150) + " ..."
})

Template.registerHelper('xssTxtFormatter', function (text) {
    if (!text) return text;
    text = steemMarkdown(text)
    var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
    text = text.replace(urlPattern, "")
    text = text.replace(/<img[^>"']*((("[^"]*")|('[^']*'))[^"'>]*)*>/g, "");
    text = text.replace(/<(?:.|\n)*?>/gm, '');
    //-- remove BR tags and replace them with line break
    text = text.replace(/<br>/gi, "");
    text = text.replace(/<br\s\/>/gi, "");
    text = text.replace(/<br\/>/gi, "");
    text = text.replace(/<iframe(.+)<\/iframe>/g, "");
    //-- remove P and A tags but preserve what's inside of them
    text = text.replace(/<p.*>/gi, "");
    text = text.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

    //-- remove all inside SCRIPT and STYLE tags
    text = text.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
    text = text.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
    //-- remove all else
    text = text.replace(/<(?:.|\s)*?>/g, "");

    //-- get rid of more than 2 multiple line breaks:
    text = text.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "");

    //-- get rid of more than 2 spaces:
    text = text.replace(/ +(?= )/g, '');

    //-- get rid of html-encoded characters:
    text = text.replace(/&nbsp;/gi, " ");
    text = text.replace(/&amp;/gi, "&");
    text = text.replace(/&quot;/gi, '"');
    text = text.replace(/&lt;/gi, '<');
    text = text.replace(/&gt;/gi, '>');
    text = text.replace(/\.[^/.]+$/, "")
    return text;
})


Template.registerHelper('inequals', function (a, b) {
    return a !== b;
});

Template.registerHelper('equals', function (a, b) {
    return a === b;
});

Template.registerHelper('settingsLoaded', function () {
    return Session.get('settings')
});

Template.registerHelper('currentGame', function () {
    return Session.get('currentGame')
});


Template.registerHelper('displayDate', function (date) {
    return moment(date).format('MMMM Do YYYY');
})

Template.registerHelper('displayDateFull', function (date) {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
})

Template.registerHelper('DisplayTimeFrom', function (date) {
    if (!date) return
    return moment(date + 'Z').fromNow()
})

Template.registerHelper('DisplayTimeCreated', function (date) {
    if (!date) return
    return moment(date).format("ll")
})

Template.registerHelper('displayUpvote', function (share, rewards) {
    return (share * rewards).toFixed(3);
})


Template.registerHelper('displayReputation', function (string) {
    return steem.formatter.reputation(string);
})

Template.registerHelper('isSubscribed', function (following) {
    var sub = Subs.findOne({ follower: MainUser.find().fetch()[0].name, following: following })
    if (sub) return true
    return false;
})



// Template.registerHelper('DisplayVotingPower', function (votingPower, lastVoteTime, precision) {
//     if (isNaN(votingPower)) return
//     var secondsPassedSinceLastVote = (new Date - new Date(lastVoteTime + "Z")) / 1000;
//     votingPower += (10000 * secondsPassedSinceLastVote / 432000);
//     return Math.min(votingPower / 100, 100).toFixed(precision)
// })


Template.registerHelper('DisplaySteemPower', function (vesting_shares, delegated, received_vesting_shares) {
        var SP = 0;
        SP += Number(vestToSteemPower(vesting_shares.split(' ')[0]))
        //SP -= Number(vestToSteemPower(delegated.split(' ')[0]))
        if (received_vesting_shares)
            SP += Number(vestToSteemPower(received_vesting_shares.split(' ')[0]))
        return parseFloat(SP).toFixed(3) + ' STEEMPOWER'
})


Template.registerHelper('vestToSteemPower', function (userVests) {
    try {
        var globals = JSON.parse(localStorage.steemProps)
        var totalSteem = parseFloat(globals.total_vesting_fund_steem.split(' ')[0])
        var totalVests = parseFloat(globals.total_vesting_shares.split(' ')[0])
        userVests = userVests.split(' ')[0]
        var SP = totalSteem * (userVests / totalVests)
        return parseFloat(SP).toFixed(3) + ' SP'
    }
    catch(e){return false}
})

Template.registerHelper('displayRewards', function (text) {
    if (!text) return text;
    text = text.replace(/(?:\r\n|\r|\n)/g, ' ');
    var array = [];
    var str = text,
        rg = /\[REWARD(.+?)\]/g, match;
    while (match = rg.exec(str)) {
        array.push(match[1].split(':'))
    }
    return array;
})

function vestToSteemPower(userVests) {
    if (JSON.parse(localStorage.steemProps) && userVests) {
        var globals = JSON.parse(localStorage.steemProps)
        var totalSteem = parseFloat(globals.total_vesting_fund_steem.split(' ')[0])
        var totalVests = parseFloat(globals.total_vesting_shares.split(' ')[0])
        var SP = totalSteem * (userVests / totalVests)
        return SP
    }
}

Template.registerHelper('isMobile', function () {
    if (/Mobi/.test(navigator.userAgent)) {
        return true;
    }
    return false;
});

Template.registerHelper('guestuser', function () {
    if (!Session.get('guestuser')) return
    else {
        var guestuser = Session.get('guestuser')
        return guestuser
    }
})

 Template.registerHelper('keychain', function () {
    if(window.steem_keychain)
    return true
})
Template.registerHelper('tronlink', function () {
    return Session.get('tron_link')
})
Template.registerHelper('tronlink_logged', function () {
    return Session.get('tron_link_logged')
})
Template.registerHelper('trx_address', function () {
    return Session.get('trx_address')
})

Template.registerHelper('normalizePrice', function (int) {
    return parseFloat(int/100).toFixed(2)
})

Template.registerHelper('steemPrice', function (int) {
    return parseFloat(int/Coins.findOne({ 'id': 'steem' }).price_usd).toFixed(2)
})

Template.registerHelper('sbdPrice', function (int) {
    return parseFloat(int/Coins.findOne({ 'id': 'steem-dollars' }).price_usd).toFixed(2)
})


Template.registerHelper('CleanText', function (str) {
    str = str.replace(/<br>/gi, "\n");
    str = str.replace(/<p.*>/gi, "\n");
    str = str.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 (Link->$1) ");
    str = str.replace(/<(?:.|\s)*?>/g, "");
    return str
  })
  
  Template.registerHelper('CleanTextShort', function (str) {
    str = str.replace(/<br>/gi, "\n");
    str = str.replace(/<p.*>/gi, "\n");
    str = str.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 (Link->$1) ");
    str = str.replace(/<(?:.|\s)*?>/g, "");
    str = str.substring(0, 135)
    str = str + '...'
    return str
  })

  Template.registerHelper('appidFromName', function (string) {
    var customgames = Session.get('customgames')
    for(var i=0;i<customgames.length;i++)
    {
        if(customgames[i].name === string)
        {
            return  customgames[i].appid
        }
    }
})

Template.registerHelper('customGames', function (string) {
    var customgames = Session.get('customgames')
    return  customgames
})

Template.registerHelper('mainuser', function () {    
    if(Meteor.user()){
        Meteor.subscribe('userData');
        return Meteor.user()
    }
})

Template.registerHelper('mainsteemuser', function () {    
    if(MainUser.findOne()){
        return MainUser.findOne()
    }
})

Template.registerHelper('guestuser', function () {    
        return Meteor.users.find().fetch()
})

Template.registerHelper('userdata', function () {
    return Session.get('userdata')
})

Template.registerHelper('drafts', function () {
    return Session.get('userdata').drafts
})

Template.registerHelper('unfiltered', function () {
    return Session.get('unfiltered')
})

Template.registerHelper('currentSearch', function () {
    if (Session.get('currentSearch'))
        return Session.get('currentSearch')
    else
        return 'steemstem'
})

Template.registerHelper('minutesToHours', function (int) {
    return parseFloat(int/60).toFixed(1) + ' Hours' 
})




Template.registerHelper('youtubeUrlFromThumbnail', function (string) {
    if (!string || !string.includes('vi/'))return false
    else
        return string.split('vi/')[1].split('/')[0]
})

Template.registerHelper('whitelist', function () {
    if (Session.get('settings'))
        return Session.get('settings').whitelist
})

Template.registerHelper('isWhitelisted', function (user_permlink) {
    if (Session.get('settings'))
        var whitelist = Session.get('settings').whitelist
    if (whitelist.includes(user_permlink))
        return true
})


Template.registerHelper('MainUserRate', function (project) {
    if (!project || !project.active_votes || !project.net_votes) return
    if (project.active_votes.length) {
        for (var i = 0; i < project.active_votes.length; i++) {
            if (project.active_votes[i].voter == localStorage.username
                && parseInt(project.active_votes[i].percent) > 0)
                return parseFloat(project.active_votes[i].percent / 100).toFixed(0)
        }
    }
    else {
        if (project.net_votes.length) {
            for (var i = 0; i < project.net_votes.length; i++) {
                if (project.net_votes[i].voter == localStorage.username
                    && parseInt(project.net_votes[i].percent) > 0)
                    return parseFloat(project.net_votes[i].percent / 100).toFixed(0)
            }
        }
    }
})

Template.registerHelper('displayPayout', function (active, total, voter) {
    if (active && !total || !voter) return active
    if (!active || !total || !voter) return
    var payout = active
    if (total.split(' ')[0] > 0) {
        var amount = parseInt(total.split(' ')[0].replace('.', '')) + parseInt(voter.split(' ')[0].replace('.', ''))
        amount /= 1000
        payout = amount + ' SBD'
    }
    if (!payout) return
    var amount = payout.split(' ')[0]
    var currency = payout.split(' ')[1]
    amount = parseFloat(amount).toFixed(2)
    return amount;
})

Template.registerHelper('displayPayoutUpvote', function (share, rewards) {
    return (share * rewards).toFixed(3);
})

Template.registerHelper('displayAllVoters', function (votes, isDownvote) {
    if (!votes) return
    votes.sort(function (a, b) {
        var rsa = parseInt(a.rshares)
        var rsb = parseInt(b.rshares)
        return rsb - rsa
    })
    if (isDownvote) votes.reverse()

    var rsharesTotal = 0;
    for (let i = 0; i < votes.length; i++)
        rsharesTotal += parseInt(votes[i].rshares)

    var top300 = []
    for (let i = 0; i < 300; i++) {
        if (i == votes.length) break
        votes[i].rsharespercent = parseInt(votes[i].rshares) / rsharesTotal
        if (parseInt(votes[i].rshares) < 0 && !isDownvote) break;
        if (parseInt(votes[i].rshares) >= 0 && isDownvote) break;
        top300.push(votes[i])
    }
    return top300
})

Template.registerHelper('estimateAccount', function () {
    if (Coins.findOne({ 'id': 'steem' }) && Coins.findOne({ 'id': 'steem-dollars' })) {
        var balanceSteem = parseFloat(this.balance.split(' ')[0])
        var balanceVests = parseFloat(this.vesting_shares.split(' ')[0])
        var balanceSbd = parseFloat(this.sbd_balance.split(' ')[0])
        var balanceUsd = 0
        balanceUsd += Coins.findOne({ 'id': 'steem' }).price_usd * vestToSteemPower(balanceVests)
        balanceUsd += Coins.findOne({ 'id': 'steem' }).price_usd * balanceSteem
        balanceUsd += Coins.findOne({ 'id': 'steem-dollars' }).price_usd * balanceSbd
        if(Coins.findOne({ 'id': 'tron' }) && Session.get('tron_link_logged'))
        {
            balanceUsd += Coins.findOne({ 'id': 'tron' }).price_usd * (Session.get('trx_balance')/1000000)
        }
    }
    return parseFloat(balanceUsd).toFixed(2)
})


Template.registerHelper('displayVotersTop', function (votes, isDownvote) {
    if (!votes) return
    votes.sort(function (a, b) {
        var rsa = parseInt(a.rshares)
        var rsb = parseInt(b.rshares)
        return rsb - rsa
    })
    if (isDownvote) votes.reverse()

    var rsharesTotal = 0;
    for (let i = 0; i < votes.length; i++)
        rsharesTotal += parseInt(votes[i].rshares)

    var top20 = []
    for (let i = 0; i < 20; i++) {
        if (i == votes.length) break
        votes[i].rsharespercent = parseInt(votes[i].rshares) / rsharesTotal
        if (parseInt(votes[i].rshares) <= 0 && !isDownvote) break;
        if (parseInt(votes[i].rshares) >= 0 && isDownvote) break;
        top20.push(votes[i])
    }
    return top20
})

Template.registerHelper('isArray', function (array) {
    if (!array) return
    if ($.isArray(array))
        return true
    else return false
});


Template.registerHelper('customTags', function (array) {
    if (Session.get('customtags'))
        return Session.get('customtags')
});


function createDTubeEmbed(key) {
    if (key) {
        var href_regex = /href\s*=\s*(['"])(https?:\/\/.+?)\1/ig;
        key = key.match(href_regex);
        if (key) {
            var str = key[0]
            var bra = str.split('\/')
            str = str.replace("href=", "")
            return '<iframe width="100%" height="345" src="https://emb.d.tube/#!/' + bra[bra.length - 2] + "/" + bra[bra.length - 1] + ' frameborder="0" allowfullscreen></iframe>';
        }
    }
};
