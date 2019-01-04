import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import { Template } from "meteor/templating";
import { Session } from "meteor/session";

function refreshMainUser() {
  if (localStorage.username) {
    MainUser.add(localStorage.username, function (error) {
      if (error) {
        console.log(error)
      }
    })
  }
  return
}

// Tracker.autorun(function () {
//   var routeName = FlowRouter.getRouteName();
//   if (Meteor.userId()) {
//     if (routeName === 'login' && Meteor.user() != undefined && Meteor.user().wallets.steem.username != undefined && Meteor.user().wallets.tron.address.base58 != undefined) {
//       FlowRouter.go('/@' + Meteor.user().wallets.steem.username);
//     }
//   }
// });

FlowRouter.route('/', {
  name: 'home',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "home", nav: "nav" });
  }
});

// FlowRouter.route('/login', {
//   triggersEnter: [function(context, redirect) {
//     if (Meteor.userId()) {
//       console.log(Meteor.user({_id : this.userId}).wallets)
//       redirect('/profile');
//     }
//   }],
//   name: 'home',   
//   action(){
//     Session.set("DocumentTitle", 'Ongame.io');
//     BlazeLayout.render('mainlayout', { top: "topbar", main: "login", nav: "nav" });
//    }
//  });

FlowRouter.route('/login', {
  name: 'login',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    if (Meteor.user()) {
      console.log('bra')
    }
    BlazeLayout.render('mainlayout', { top: "topbar", main: "login", nav: "nav" });
  }
});

FlowRouter.route('/authentificate/:user', {
  name: 'authentificate',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    console.log(JSON.parse(params.user))
    BlazeLayout.render('mainlayout', { top: "topbar", main: "authentificate", nav: "nav" });
  }
});

FlowRouter.route('/news', {
  name: 'news',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "news", nav: "nav" });
  }
});

FlowRouter.route('/complete', {
  name: 'complete',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "complete", nav: "nav" });
    Cart.remove({})
    FlowRouter.go('/')
  }
});


FlowRouter.route('/cart', {
  name: 'cart',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "cart", nav: "nav" });
  }
});

FlowRouter.route('/games', {
  name: 'games',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "games", nav: "nav" });
  }
});

FlowRouter.route('/livestreams', {
  name: 'livestreams',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "livestreams", nav: "nav" });
  }
});

FlowRouter.route('/market', {
  name: 'market',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "market", nav: "nav" });
  }
});

FlowRouter.route('/videos', {
  name: 'videos',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "videos", nav: "nav" });
  }
});

FlowRouter.route('/team', {
  name: 'team',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "team", nav: "nav" });
  }
});

FlowRouter.route('/tournament', {
  name: 'tournament',
  action: function (params, queryParams) {
    Session.set("DocumentTitle", 'Ongame.io');
    BlazeLayout.render('mainlayout', { top: "topbar", main: "tournament", nav: "nav" });
  }
});


FlowRouter.route('/@:user', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'overview')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/blog', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'blog')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/friends', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'friends')
    loadUser(params.user)
    Followers.loadFollowers(params.user, function (error) {
      if (error) {
        console.log(error)
      }
    })
  }
})

FlowRouter.route('/@:user/rewards', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'rewards')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/wallet', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'wallet')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/comments', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'comments')
    loadUser(params.user)
  }
})

FlowRouter.route('/create', {
  name: 'create',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "create", nav: "nav" });
    Content.remove({ type: 'gamenews' })
    CurrentGame.remove({})
  }
})

FlowRouter.route('/create/game-:id', {
  name: 'create',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "create", nav: "nav" });
    Content.remove({ type: 'gamenews' })
    CurrentGame.remove({})
    Games.remove({})
    steam.getGameNews(params.id)
    steam.getGameDetails(params.id)
    Session.set('createappid', params.id)
  }
})

FlowRouter.route('/@:user/transfer', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'transfer')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/achievements', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'achievements')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/statistics', {
  name: 'profile',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "profile", nav: "nav" });
    Session.set('user', params.user)
    Session.set('currentprofiletab', 'statistics')
    loadUser(params.user)
  }
})

FlowRouter.route('/@:user/:permlink', {
  name: 'project',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "article", nav: "nav" });
    Session.set('user', params.user)
    Session.set('article', params.permlink)
    var type = 'games'
    Meteor.call('addView',params.permlink)
    Content.getContent(params.user, params.permlink, type, function (error) {
      if (error) {
        console.log(error)
      }
      else {
        CurrentGame.remove({})
        steam.getGameNews(Content.findOne({ 'permlink': Session.get('article') }).appid)
        steam.getGameDetails(Content.findOne({ 'permlink': Session.get('article') }).appid)
      }

    })
    if (!Comments.findOne({ permlink: params.permlink })) {
      Comments.loadComments(params.user, params.permlink, function (error) {
        if (error) {
          console.log(error)
        }
      })
    }
    Content.getContentByBlog(params.user, 30, function (error) {
      if (error) {
        console.log(error)
      }
    })
    User.add(params.user, function (error) {
      if (error) {
        console.log(error)
      }
    })
  }
})


FlowRouter.route('/game-:id', {
  name: 'singlegame',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "singlegame", nav: "nav" });
    CurrentGame.remove({})
    Content.remove({ type: 'gamenews' })
    Games.remove({})
    Content.getContentByCreated('ongame-' + params.id, 100, 'steemgamenews', function (error) {
      if (error)
        console.log(error)
    })
    steam.getGameNews(params.id)
    steam.getGameDetails(params.id)

    Session.set('currentappid', params.id)
    Session.set('currentgametab', 'about')
    Template.singlegame.InitTab()
    ongame.getGameContents(params.id)
  }
})

FlowRouter.route('/game-:id/:tab', {
  name: 'singlegame',
  action: function (params, queryParams) {
    BlazeLayout.render('mainlayout', { top: "topbar", main: "singlegame", nav: "nav" });
    Session.set('currentappid', params.id)
    if (!CurrentGame.findOne({ steam_appid: Number(params.id) })) {
      Content.remove({ type: 'gamenews' })
      CurrentGame.remove({})
      Games.remove({})
      steam.getGameNews(params.id)
      steam.getGameDetails(params.id)
      ongame.getGameContents(params.id)
    }
    Content.getContentByCreated('ongame-' + params.id, 100, 'steemgamenews', function (error) {
      if (error)
        console.log(error)
    })
    Session.set('currentgametab', params.tab)
    Template.singlegame.InitTab()
  }
})

FlowRouter.route('/sc2login', {
  name: 'sc2login',
  action: function (params, queryParams) {
    localStorage.setItem('accesstoken',false)
    localStorage.setItem('expireat', false)
    localStorage.setItem('username', false)

    localStorage.setItem('accesstoken', queryParams.access_token)
    localStorage.setItem('expireat', queryParams.expires_in)
    localStorage.setItem('username', queryParams.username)
    var time = new Date();
    FlowRouter.setQueryParams({ params: null, queryParams: null });
    time = new Date(time.getTime() + 1000 * (localStorage.expireat - 10000));
    localStorage.setItem('expirein', time)
    Meteor.call('setSteemAccount', queryParams.username)
    FlowRouter.go('/login')
    refreshMainUser()
  }
});

function loadUser(user) {
  if (!User.findOne({ name: user })) {
    User.add(user, function (error) {
      if (error) {
        console.log(error)
      }
    })
  }
  if (!PersonalHistory.findOne({ username: user })) {
    PersonalHistory.getPersonalHistory(user, 4000, function (error) {
      if (error) {
        console.log(error)
      }
    })
    Followers.loadFollowers(user, function (error) {
      if (error) {
        console.log(error)
      }
    })
  }

  if (!Content.findOne({ author: user }))
    Content.getContentByBlog(user, 30, function (error) {
      if (error) {
        console.log(error)
      }
    })
}