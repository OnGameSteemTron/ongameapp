Meteor.publish(null, function (){
    return Meteor.roles.find({})
  })

  Meteor.publish("userData", function() { 
    if (this.userId)
       return Meteor.users.find(this.userId,
        {fields: {createdAt: 1,settings:1,'wallets.steem.username':1,'wallets.tron.address':1}})
  });

  Meteor.publish('users', function() {
    return Meteor.users.find({}, { fields: { 'profile': 1 } })
  });

  Meteor.publish('counter', function() {
    return Counter.find({})
  });