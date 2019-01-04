const TronWeb = require('tronweb')
const dsteem = require('dsteem')
const steem = require('steem')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const io = require('socket.io-client');
var socket = new io.connect('https://ongamechatapp.herokuapp.com');
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider('https://api.trongrid.io:8090');
const solidityNode = new HttpProvider('https://api.trongrid.io:8091');
const eventServer = 'https://api.trongrid.io/';
const privateKey = 'da146374a75310b9666e834ee4ad0866d6f4035967bfc76217c5a495fff9f0d0';
const tronWeb = new TronWeb(
  fullNode,
  solidityNode,
  eventServer,
  privateKey
)

Meteor.methods({
  setSteemAccount(newName) {
    var username = { username: newName }
    Meteor.users.update(this.userId, {
      $set: { 'wallets.steem': username }
    });
  },
  createSteemWallet(user, pass, save) {
    if (this.userId) {
      id = this.userId
      if (pass === null) {
        pass = Array(10).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function (x) { return x[Math.floor(Math.random() * x.length)] }).join('');
      }
      let promise = new Promise((resolve) => {
        let creator = process.env.CREATOR_ACCOUNT
        let creatorKey = process.env.CREATOR_KEY

        let privateKey = dsteem.PrivateKey.fromString(
          creatorKey
        );
        var client = new dsteem.Client('https://api.steemit.com');
        let ops = [];
        let username = user;
        let password = pass;

        const ownerKey = dsteem.PrivateKey.fromLogin(username, password, 'owner');
        const activeKey = dsteem.PrivateKey.fromLogin(username, password, 'active');
        const postingKey = dsteem.PrivateKey.fromLogin(username, password, 'posting');
        let memoKey = dsteem.PrivateKey.fromLogin(username, password, 'memo').createPublic();

        const ownerAuth = {
          weight_threshold: 1,
          account_auths: [],
          key_auths: [[ownerKey.createPublic(), 1]],
        };
        const activeAuth = {
          weight_threshold: 1,
          account_auths: [],
          key_auths: [[activeKey.createPublic(), 1]],
        };
        const postingAuth = {
          weight_threshold: 1,
          account_auths: [],
          key_auths: [[postingKey.createPublic(), 1]],
        };

        const create_op = [
          'create_claimed_account',
          {
            creator: creator,
            new_account_name: username,
            owner: ownerAuth,
            active: activeAuth,
            posting: postingAuth,
            memo_key: memoKey,
            json_metadata: '',
            extensions: [],
          }
        ];

        ops.push(create_op);
        console.log(username, password)
        client.broadcast.sendOperations(ops, privateKey).then(function (result) {
          create_op[1].username = username
          if (result && save) {
            create_op[1].password = password
            Meteor.users.update(id, {
              $set: { 'wallets.steem': create_op[1] }
            }, function (error) {
              if (error)
                console.log(error)
            })
            resolve(create_op)
          }
          else {
            Meteor.users.update(id, {
              $set: { 'wallets.steem': create_op[1] }
            }, function (error) {
              if (error)
                console.log(error)
            });
            resolve(create_op)
          }
        },
          function (error) {
            return error
          }
        )
      }
      )
      return Promise.await(promise)
    }
  },
  createTronWallet() {
    createTronAccount(this.userId, function (result) {
      {
        if (result) {
          return true
        }
        else {
          return false
        }
      }
    })
  },
  userTronWallet(base, hexa) {
    if (this.userId) {
      var address = { address: { base58: base, hex: hexa } }
      let promise = new Promise((resolve) =>
        resolve(Meteor.users.update({ _id: this.userId }, { $set: { 'wallets.tron': address } }))
      )

      return Promise.await(promise)
    }
  },
  testme() {
    if (this.userId) {
      console.log(Counter.find({}))
      console.log(Meteor.users.findOne({ _id: this.userId }))
    }
  },
  addView(permlink) {
    Counter.upsert({_id: permlink}, {$inc: {views: 1}});
  },
  addTip(amount, type, creator, permlink, trx_id) {
    if (this.userId) {
      var xtr = new XMLHttpRequest();
      xtr.open('GET', 'https://ongameapi.herokuapp.com/api/addtip/'+ Meteor.user().wallets.steem.username + "/" + amount + "/" + type+ "/"+ permlink + "/"+ trx_id, true);
      xtr.send();
      xtr.onreadystatechange = function () {
        if (xtr.readyState == 4) {
          if (xtr.status == 200) {
            if (xtr.responseText) {
              console.log(xtr.responseText)
            }
          } else {
            console.log("Error: API not responding!");
          }
        }
      }
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://ongamechatapp.herokuapp.com/send_message', true);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify({ room: 'general',
      'username': 'ongame',
      'message': Meteor.user().wallets.steem.username + ' sent : ' + amount + ' '+type+ ' to <a href="/@' +  creator+'/'+permlink + '/">@'+creator+'/'+permlink+'</a>'}));
     
      socket.emit('message', {
        room: 'general',
        'username': 'ongame',
        'message': Meteor.user().wallets.steem.username + ' sent : ' + amount + ' '+type+ ' to <a href="/@' +  creator+'/'+permlink + '/">@'+creator+'/'+permlink+'</a>'
    })
    }
  }
})

const createTronAccount = async (id, cb) => {
  const account = await tronWeb.createAccount();
  const isValid = tronWeb.isAddress(account.address.hex);
  if (isValid) {
    Meteor.users.update(id, { $set: { 'wallets.tron': account } });
    return cb(true)
  }
  else {
    return cb(false)
  }
}

function createSteemAccount(userId, user, pass, save) {

}
