Rewards = new Mongo.Collection(null)
//rewardsObserver = new PersistentMinimongo2(Rewards, 'rewards');

Rewards.add = function (reward) {
    Rewards.insert(reward)
    //sessionStorage.setItem('rewards', JSON.stringify(Rewards.find().fetch()))
}