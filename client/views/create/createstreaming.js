
Template.createstreaming.events({
    'click .button.stream': function (event) {
        var ls = JSON.stringify({
            "live_stream": {
                "aspect_ratio_height": 720,
                "aspect_ratio_width": 1280,
                "billing_mode": "pay_as_you_go",
                "broadcast_location": Session.get('streamlocation'),
                "encoder": "other_rtmp",
                "name": Session.get('streamtitle'),
                "transcoder_type": "passthrough",
                "closed_caption_type": "none",
                "delivery_method": "push",
                "delivery_protocols": [],
                "delivery_type": "single-bitrate",
                "disable_authentication": false,
                "hosted_page": true,
                "hosted_page_description": "Ongame Play & Get Paid",
                "hosted_page_logo_image": "",
                "hosted_page_sharing_icons": true,
                "hosted_page_title": "Ongame Play & Get Paid",
                "low_latency": false,
                "password": Math.random(localStorage.username + 'ongame').toString(36).substr(2, 9),
                "player_countdown": false,
                "player_countdown_at": "2017-12-29T19:00:00.000Z",
                "player_logo_image": "",
                "player_logo_position": "top-right",
                "player_responsive": true,
                "player_type": "wowza_player",
                "player_video_poster_image": "",
                "player_width": 640,
                "recording": true,
                "remove_hosted_page_logo_image": true,
                "remove_player_logo_image": true,
                "remove_player_video_poster_image": true,
                "source_url": "",
                "target_delivery_protocol": "hls-https",
                "use_stream_source": false,
                "username": localStorage.username,
                "video_fallback": false
            }
        })
        $.ajax({
            type: "POST",
            contentType: 'application/json;',
            url: 'https://api.cloud.wowza.com/api/v1/live_streams',
            data: ls,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("wsc-api-key", 'HuJOSkX1KvQKsXeWUMYOQj7rbL8yruF13YApHMTis0zxe1RQRbwN41NQkMTL3332')
                xhr.setRequestHeader("wsc-access-key", 'fTnJ1b36PCKvoQLcBCAfKQQmZAsOyuQrXKBRdwY2Xd4dZEKe52ayxNszfMrf3434')
            }, success: function (json) {
                console.log(json)
                sessionStorage.setItem('mystream', JSON.stringify(json.live_stream.source_connection_information))
                Session.set('mystream', json.live_stream)
                $('.ui.button.start').removeClass('disabled')
                $('.ui.button.stream').addClass('disabled')
                $("#title").addClass('disabled')
                $('.label.alert').addClass('nodsp')
            },
            error: function (error) {
                error = JSON.parse(error.responseText)
                $('.label.alert').removeClass('nodsp')
                if (error.meta.message.includes("Name can"))
                    $('.label.alert').text('Title is required')
                else {
                    $('.label.alert').text(error.meta.message)
                }
            }
        })
    },
    'click .button.start': function (event) {
        $.ajax({
            type: "PUT",
            contentType: 'application/json;',
            url: Session.get('mystream').links[4].href,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("wsc-api-key", 'HuJOSkX1KvQKsXeWUMYOQj7rbL8yruF13YApHMTis0zxe1RQRbwN41NQkMTL3332')
                xhr.setRequestHeader("wsc-access-key", 'fTnJ1b36PCKvoQLcBCAfKQQmZAsOyuQrXKBRdwY2Xd4dZEKe52ayxNszfMrf3434')
            }, success: function (json) {
                console.log(json)
                $('.ui.button.start').addClass('disabled')
                $('.ui.button.publish').removeClass('disabled')
                $('.ui.live.preview').removeClass('nodsp')
            },
            error: function (error) {
                error = JSON.parse(error.responseText)
                console.log(error)
            }
        })
    },
    'click .button.publish': function (event) {
        var post = Template.create.createPost()
        Template.create.submitPost(post)
    }
})


Template.createstreaming.helpers({
    stream: function () {
        return Session.get('mystream')
    },
    streamUrl: function () {
        return Session.get('mystream').player_hls_playback_url
    },
    isReadyToPost: function () {
        if (Session.get('preview') && Session.get('streamtitle')) {
            $('.ui.button.stream').addClass('disabled')
            return Session.get('preview') && Session.get('streamtitle')
        }
        else 
        {
            $('.ui.button.stream').removeClass('disabled')
            return false
        }
    },
    preview: function () {
        return Session.get('preview')
    },
    title_preview: function () {
        return Session.get('streamtitle')
    },
})

Template.createstreaming.rendered = function () {
    $('.dropdown.location')
  .dropdown({
    clearable: true,
    placeholder: 'any'
  })
;
    Session.set('preview', '')
    $("#title").change(function () {
        Session.set('streamtitle', $("#title").val())
    })
    $("#url").change(function () {
        var url = $("#url").val()
        url = url.replace('gaming.youtube','www.youtube')
        Session.set('preview', url)
    });

    $('.checkbox.location')
  .checkbox({
    // check all children
    onChecked: function() {
        Session.set('streamlocation',this.id)
        console.log(this.id)
    }
  })
;
}