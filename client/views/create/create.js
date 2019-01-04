Template.create.helpers({
  createTab: function () {
    return Session.get('createtab')
  },
  preview: function () {
    return Session.get('preview')
  },
  title_preview: function () {
    return Session.get('title')
  },
  isReadyToPost: function () {
    return Session.get('preview') && Session.get('title')
  }
})

Template.create.events({
  'click .item.cr': function (event) {
    event.preventDefault()
    Session.set('createtab', event.currentTarget.name)
    $('.item.cr').removeClass('purple')
    $('.ui.dropdown.tags').dropdown('clear');
    $('.ui.dropdown.tags').dropdown('setting', 'allowAdditions', true);
    $('.ui.dropdown.tags').dropdown('set selected', 'ongame-' + Session.get('createappid'));
    $('.ui.dropdown.tags').dropdown('set selected', event.currentTarget.name);
    $('.item.cr.' + event.currentTarget.name).addClass('purple')
  },
  'click #btn_submit_form': function (event) {
    event.preventDefault()
    var post = Template.create.createPost()
    Template.create.submitPost(post)
  }
})




Template.create.createPost = function () {
  var author = localStorage.username
  var permlink = Math.random(author + title).toString(36).substr(2, 12)
  var title;
  var body;
  var type = Session.get('createtab')
  var lang = 'en'
  var tags = []
  tags.push('ongame')
  tags.push('gaming')
  tags.push('ongame-'+type)
  tags.push('ongame-' + Session.get('createappid'))
  tags.push(lang)
  var json_metadata = {
    content: type,
    app: 'ongame',
    header_image: CurrentGame.findOne().header_image,
    tags:tags
  }

  switch (type) {
    case 'news':
      title = Session.get('title')
      body = Session.get('preview')
      break;
    case 'streaming':
      title = Session.get('streamtitle')
      body = Session.get('preview')
      if(Session.get('mystream'))
      {
        if(Session.get('mystream').player_hls_playback_url)
        json_metadata.stream_url = Session.get('mystream').player_hls_playback_url
        if(Session.get('mystream').id)
        json_metadata.stream_id = Session.get('mystream').id
      }

      break;
    case 'video':
      title = Session.get('title')
      body = Session.get('preview')
      break;
    case 'screenshot':
      title = Session.get('title')
      body = Session.get('preview')
      break;
    case 'review':
      title = Session.get('title')
      body = Session.get('preview')
      json_metadata.review = {}
      json_metadata.review.story = Session.get('story')
      json_metadata.review.gameplay = Session.get('gameplay')
      json_metadata.review.dialogue = Session.get('dialogue')
      json_metadata.review.level = Session.get('level')
      json_metadata.review.graphic = Session.get('graphic')
      json_metadata.review.sound = Session.get('sound')
      json_metadata.review.replayability = Session.get('replayability')
      json_metadata.review.valueperdollar = Session.get('valueperdollar')
      json_metadata.review.score = ((Session.get('story') +
      + Session.get('gameplay')
      + Session.get('dialogue')
      + Session.get('level')
      + Session.get('graphic')
      + Session.get('replayability')
      + Session.get('valueperdollar')
      + Session.get('sound')) / 8).toFixed(1)
      break;
    case 'tips':
      title = Session.get('title')
      body = Session.get('preview')
      break;
    default:
      break;
  }
  var joinus = "<p></p><div class=\"pull-left\"><a href=\"https://ongame.io/@"+author+"/"+permlink+"\"><img src=\""+  CurrentGame.findOne().header_image+"\"></a></div><a href=\"https://ongame.io/@"+author+"/"+permlink+"\">Ongame.io - Play & Get Paid</a> <br> - All Recent Games (More than 70k) <br>  - Live Stream & external sources<br>  - Review Games and get rewarded<br>  - And many more... !!!"
  body = body + joinus
  var post = [
    ['comment',
      {
        parent_author: '',
        parent_permlink: tags[0],
        author: author,
        permlink: permlink,
        title: title,
        body: body,
        json_metadata: JSON.stringify(json_metadata)
      }
    ],
    ['comment_options', {
      author: author,
      permlink: permlink,
      max_accepted_payout: '1000000.000 SBD',
      percent_steem_dollars: 10000,
      allow_votes: true,
      allow_curation_rewards: true,
      extensions: [
        [0, {
          beneficiaries: [{ "account": "ongame", "weight": 2500 }]
        }]
      ]
    }]
  ];
  return post
}


Template.create.submitPost = function (post) {
  $('#btn_submit_form').addClass('loading')
  $('.button.publish').addClass('loading')
  steemconnect.send(post,
    function (error, result) {
      if (error) {
        $('.label.alert').removeClass('nodsp')
        $('.button.publish').removeClass('loading')
        $('#btn_submit_form').removeClass('loading')
        $('.label.alert').text(error.error_description)
      } else {
        $('.button.publish').removeClass('loading')
        $('#btn_submit_form').removeClass('loading')
        FlowRouter.go('/@' + post[0][1].author + '/' + post[0][1].permlink)
        Template.create.removePost()
      }
    }
  )
}

 Template.create.removePost = function(){
  Session.set('createtab',false)
  Session.set('title',false)
  Session.set('preview',false)
  Session.set('streamtitle',false)
 }