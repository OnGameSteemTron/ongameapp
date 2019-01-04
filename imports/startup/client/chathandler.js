const io = require('socket.io-client');
var socket = new io.connect('https://ongamechatapp.herokuapp.com');

$(window).bind('beforeunload', function () {
    var username = this.localStorage.username
    $.ajax({
        url: 'https://ongamechatapp.herokuapp.com/leave',
        type: 'POST',
        dataType: 'json',
        data: {
            username: username
        },
        success: function (response) {
            if (response.status == 'OK') {
                socket.emit('message', {
                    'username': username,
                    'message': username + " has left the chat room.."
                });
                socket.emit('update_chatter_count', {
                    'action': 'decrease'
                });
                $('.chat').hide();
                $('.join-chat').show();
                $('#username').val('');
            }
        }
    });
});