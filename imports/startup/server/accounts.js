const SteamAPI = require('steamapi');
const steamapi = new SteamAPI('CEC36B9FA6B14A871D4A02DE102486DA');
var gravatar = require('gravatar');

Accounts.onCreateUser((options, user) => {
  if (options.profile) {
    user.profile = options.profile;
  }
  else{
    user.profile = {}
  }
  user.name
  user.profile.settings = {}
  user.profile.settings.confirmed = false
  user.wallets = {}
  user.wallets.steem = {}
  user.wallets.tron = {}
  user.wallets.tron.address = {}
  user.profile.publications = {}
  user.profile.followers = 0
  user.profile.following = 0

  return user; 
});  
    
//Meteor.users.remove({}) 
 
Meteor.users.after.insert(function (userId, doc) {
    //WE ONLY USE SERVICE HERE, AND DEFINE THE AVATAR
    var id = doc._id
    var settings = {}
    var service = doc.services
    if (service['steam'] != undefined) {
      steamapi.getUserSummary(service.steam.id).then(result => {
        result.nickname
        settings.avatar = result.avatar.medium
        Meteor.users.update({_id:id}, { $set: { 'profile.settings': settings } });
        Meteor.users.update({_id:id}, { $set: { 'name': result.nickname } });
        }).catch(error => {
        console.log(error)
      })
    }
    if (service['facebook'] != undefined) {
      settings.avatar = service.facebook.picture.data.url
      Meteor.users.update({_id:id}, { $set: { 'profile.settings': settings } });
    }
    if (service['twitch'] != undefined) {
      settings.avatar = service.twitch.logo
      Meteor.users.update({_id:id}, { $set: { 'profile.settings': settings } });
    }
    if (service['google'] != undefined) {
      settings.avatar = service.google.picture
      Meteor.users.update({_id:id}, { $set: { 'profile.settings': settings } });
    }
    if (service['twitter'] != undefined) {
      settings.avatar = service.twitter.profile_image_url_https
      Meteor.users.update(id, { $set: { 'profile.settings': settings } });
    }
    if (service['github'] != undefined) {
      if(service.github.email)
      settings.avatar = gravatar.url(service.github.email);
      Meteor.users.update({_id:id}, { $set: { 'profile.settings': settings } });
    }
});

// Ensuring every user has an email address, should be in server-side code
// Accounts.validateNewUser((user) => {
//   new SimpleSchema({
//     _id: { type: String },
//     emails: { type: Array },
//     'emails.$': { type: Object },
//     'emails.$.address': { type: String },
//     'emails.$.verified': { type: Boolean },
//     createdAt: { type: Date },
//     services: { type: Object, blackbox: true }
//   }).validate(user);

//   // Return true to allow user creation to proceed
//   return true;
// });