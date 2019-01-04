
import steem from 'steem';
import sc2sdk from 'sc2-sdk';

 steem.api.setOptions({ url: 'https://api.steemit.com' });
 window.steem = steem;
 var isInDev = true;
 if (isInDev) {
     console.log('DevMode')
     var sc2 = sc2sdk.Initialize({
         app: 'factit.app',
         baseURL: 'https://steemconnect.com',
         callbackURL: 'https://ongameheroku.herokuapp.com/sc2login',
         accessToken: 'access_token'
     });
 }
 else {
     var sc2 = sc2sdk.Initialize({
         app: 'ongame.app',
         baseURL: 'https://steemconnect.com',
         callbackURL: 'https://ongame.io/#!/sc2login',
         accessToken: 'access_token'
     });
}
window.sc2 = sc2

steem.api.getOrderBook(1, function (err, result) {
    if (!err) {
        Session.set("sbdmarketprice", Number(result.asks[0].real_price).toFixed(2));
    }
});
steem.api.getCurrentMedianHistoryPrice(function (error, result) {
    if (!error) {
        var sbd = result.base.split(' ')[0]
        Session.set('sbdprice', sbd)
    }
});
var sendDate = (new Date()).getTime();

steem.api.getDynamicGlobalProperties(function (err, result) {
    if (result) {
        var receiveDate = (new Date()).getTime();
        var responseTimeMs = receiveDate - sendDate;
        console.log('Global Properties loaded in : ' + responseTimeMs + "ms")
        console.groupEnd();
        console.group(
            `%c Console Debug :`,
            "background: #6b07f8; color: white; font-size: 18px; padding: 3px 3px;"
        );
        localStorage.setItem('steemProps', JSON.stringify(result))
    }
})


console.group(
    `%c Read this for your security !`,
    "background: #6b07f8; color: white; font-size: 18px; padding: 3px 3px;"
);
console.log(
    `%c THIS FEATURE IS DESIGNED FOR DEVELOPERS.`,
    "background: white; color: black; font-size: 12px; padding: 3px 3px;"
);
console.log(
    `%c You must read and understand anything you paste or type here or you could compromise your account, your wallets and/or your private keys.`,
    "background: white; color: black; font-size: 12px; padding: 3px 3px;"
);
console.groupEnd();
console.group(
    `%c More informations on :`,
"background: #6b07f8; color: white; font-size: 18px; padding: 3px 3px;"
)
console.log(
    `%c https://ongame.io or contact@ongame.io`,
    "background: white; color: black; font-size: 12px; padding: 3px 3px;"
);
console.log(
    `%c https://steemit.com/@futureshock`,
    "background: white; color: black; font-size: 12px; padding: 3px 3px;"
);
console.groupEnd();
console.group(
    `%c OnGame.io App Stats :`,
"background: #6b07f8; color: white; font-size: 18px; padding: 3px 3px;"
)