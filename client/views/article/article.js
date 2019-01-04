var videojs = require('video.js')
var playlist = require('videojs-playlist')
var youtube = require('videojs-youtube')

Template.article.rendered = function () {
    Session.set('backgroundimage','./images/background.jpg')
    $(window).scrollTop(0);
}

Template.article.helpers({
    tagsArray: function (tags) {
        if(typeof tags != String)
        return true
        else return false
    },
    SelectedFaq: function () {
        if(Session.get('selectedfaq'))
        return Faq.findOne({ 'permlink': Session.get('selectedfaq') })
        else{
            return Faq.findOne({ 'json_metadata.tags': 'welcome', 'type': 'welcome' })
        }
    },
    myStreamInfo: function () { 
        return JSON.parse(sessionStorage.getItem('mystream'))
    },
    launchVideo: function () { 
        console.log(document.querySelector('video'))
        if(document.querySelector('video') && Content.findOne({ 'permlink': Session.get('article') }) && Records.findOne({transcoder_id:Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_id}))
        {
            console.log('op')
            if(Records.findOne({transcoder_id:Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_id}).download_url != null && Records.findOne({transcoder_id:Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_id}).download_url != undefined)
            {
                var player = videojs(document.querySelector('video'), {
                    inactivityTimeout: 0
                });
                    videojs.addLanguage('en', { "The media could not be loaded, either because the server or network failed or because the format is not supported.": "This stream seems to be now offline." });
                    player.reset()
                    var sources = [{ "type": "video/mp4", "src": Records.findOne({transcoder_id:Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_id}).download_url}];
                    player.src(sources);
            }
    
        }
        else if(document.querySelector('video')&& Content.findOne({ 'permlink': Session.get('article') }))
        {
            var player = videojs(document.querySelector('video'), {
                inactivityTimeout: 0
            });
                videojs.addLanguage('en', { "The media could not be loaded, either because the server or network failed or because the format is not supported.": "This stream seems to be now offline." });
                player.reset()
                var sources = [{ "type": "application/x-mpegURL", "src": Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_url }];
                player.src(sources);
        }
    },
    vimm: function (string) { 
        if(string.includes('vimm'))
        {
          return true
        }
    },
})


Template.article.events({
    'click .card.screenshot': function (event) {
        $('.ui.screenshot.modal').remove()
        $('.ui.main.segment').append(Blaze.toHTMLWithData(Template.imagemodal, {data:this}));
        $('.ui.screenshot.modal').modal('setting', 'transition', 'horizontal flip').modal('show')
    },
    'click .buygame': function (event) {
        this.refferer = $('.header.name').text()
        Cart.upsert({_id:this._id},this)
        $('.ui.cart.modal').remove()
        $('article').append(Blaze.toHTMLWithData(Template.cartmodal, {data:this}));
        $('.ui.cart.modal').modal('setting', 'transition', 'horizontal flip').modal('show')
    },
    'click .button.create': function (event) {
        Session.set('creategame',this.steam_appid)
       FlowRouter.go('/create/game-'+this.steam_appid)
    },
})

Template.article.onRendered(function () {
    if(Content.findOne({ 'permlink': Session.get('article') }) && Records.findOne({transcoder_id:Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_id}))
    {
        if(Records.findOne({transcoder_id:Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_id}).download_url != null && Records.findOne({transcoder_id:Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_id}).download_url != undefined)
        {
            var player = videojs(document.querySelector('video'), {
                inactivityTimeout: 0
            });
                videojs.addLanguage('en', { "The media could not be loaded, either because the server or network failed or because the format is not supported.": "This stream seems to be now offline." });
                player.reset()
                var sources = [{ "type": "video/mp4", "src": Records.findOne({transcoder_id:Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_id}).download_url}];
                player.src(sources);
        }

    }
    else if(Content.findOne({ 'permlink': Session.get('article') }) && Content.findOne({ 'permlink': Session.get('article') }).type === "streaming")
    {
        var player = videojs(document.querySelector('video'), {
            inactivityTimeout: 0
        });
            videojs.addLanguage('en', { "The media could not be loaded, either because the server or network failed or because the format is not supported.": "This stream seems to be now offline." });
            player.reset()
            var sources = [{ "type": "application/x-mpegURL", "src": Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_url }];
            player.src(sources);
    }
    $( window ).on( "load", function() {
    if(Content.findOne({ 'permlink': Session.get('article') }) && Records.findOne({transcoder_id:Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_id}))
    {
        if(Records.findOne({transcoder_id:Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_id}).download_url != null && Records.findOne({transcoder_id:Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_id}).download_url != undefined)
        {
            var player = videojs(document.querySelector('video'), {
                inactivityTimeout: 0
            });
                videojs.addLanguage('en', { "The media could not be loaded, either because the server or network failed or because the format is not supported.": "This stream seems to be now offline." });
                player.reset()
                var sources = [{ "type": "video/mp4", "src": Records.findOne({transcoder_id:Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_id}).download_url}];
                player.src(sources);
        }

    }
    else if(Content.findOne({ 'permlink': Session.get('article') }) && Content.findOne({ 'permlink': Session.get('article') }).type === "streaming")
    {
        var player = videojs(document.querySelector('video'), {
            inactivityTimeout: 0
        });
            videojs.addLanguage('en', { "The media could not be loaded, either because the server or network failed or because the format is not supported.": "This stream seems to be now offline." });
            player.reset()
            var sources = [{ "type": "application/x-mpegURL", "src": Content.findOne({ 'permlink': Session.get('article') }).json_metadata.stream_url }];
            player.src(sources);
    }
    })
    ongame.getTips(Session.get('article'))
})