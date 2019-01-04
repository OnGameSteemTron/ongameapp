const io = require('socket.io-client');

Template.rightsidebar.onRendered(function () {

    Template.rightsidebar.initChat()
})


Template.rightsidebar.events({
    'click .menu .item.ch': function (event) {
        Session.set('chatroom', event.currentTarget.attributes.name.value)
    },
})

Template.rightsidebar.helpers({
    currentRoom: function () {
        return Session.get('chatroom')
    }
})


Template.rightsidebar.initChat = function () {
    Session.set('chatroom', 'general')
    $('.menu .item').tab()
    $('.ui.dropdown.profile')
        .dropdown()
    // var ws = new WebSocket('ws://localhost:7272')
    // ws.onmessage = (msg) => {
    //     console.log(msg.data)
    // }

    var socket = new io.connect('https://ongamechatapp.herokuapp.com');
    var chatter_count;
    $.get('https://ongamechatapp.herokuapp.com/get_chatters', function (response) {
        Session.set('chatusers', response)
        $('.chat-info').text(response.length + " people in the general chat");
        chatter_count = response.length; //update chatter count
    });
        var username = localStorage.username

        $.ajax({
            url: 'https://ongamechatapp.herokuapp.com/join',
            type: 'POST',
            data: {
                room: Session.get('chatroom'),
                username: username
            },
            success: function (response) {
                if (response.status == 'OK') { //username doesn't already exists
                    socket.emit('update_chatter_count', {
                        'action': 'increase'
                    });
                    $('.chat').show();
                    $('#leave-chat').data('username', username);
                    $('#send-message').data('username', username);
                    $.get('https://ongamechatapp.herokuapp.com/get_messages', function (response) {
                        if (response.length > 0) {
                            for (var x = 0; x < response.length; x++) {
                                ChatHistory.upsert({ id: response[x].date }, response[x])
                            }
                            // $('.messages').html(html);
                            $('.messages').scrollTop(1000000);
                        }
                    });
                    $.get('https://ongamechatapp.herokuapp.com/get_chatters', function (response) {
                        Session.set('chatusers', response)
                        $('.chat-info').text(response.length);
                        chatter_count = response.length; //update chatter count
                    });
                    $('.join-chat').hide(); //hide the container for joining the chat room.
                } else if (response.status == 'FAILED') { //username already exists
                    $.ajax({
                        url: 'https://ongamechatapp.herokuapp.com/leave',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            room: Session.get('chatroom'),
                            username: username
                        },
                        success: function (response) {
                            if (response.status == 'OK') {
                                // socket.emit('message', {
                                //     'username': username,
                                //     'message': username + " has left the chat room.."
                                // });
                                socket.emit('update_chatter_count', {
                                    'action': 'decrease'
                                });
                                $('.chat').hide();
                                $('.join-chat').show();
                                $('#username').val('');
                                //alert('You have successfully left the chat room');
                            }
                        }
                    });
                    // alert("Sorry but the username already exists, please choose another one");
                    $.ajax({
                        url: 'https://ongamechatapp.herokuapp.com/join',
                        type: 'POST',
                        data: {
                            room: Session.get('chatroom'),
                            username: username
                        },
                        success: function (response) {
                            console.log(response)
                            if (response.status == 'OK') { //username doesn't already exists
                                socket.emit('update_chatter_count', {
                                    'action': 'increase'
                                });
                                $('.chat').show();
                                $('#leave-chat').data('username', username);
                                $('#send-message').data('username', username);
                                $.get('https://ongamechatapp.herokuapp.com/get_messages', function (response) {
                                    if (response.length > 0) {
                                        var message_count = response.length;
                                        for (var x = 0; x < message_count; x++) {
                                            ChatHistory.upsert({ id: response[x].id }, response[x])
                                        }
                                    }
                                });
                                $('.join-chat').hide(); //hide the container for joining the chat room.
                            } else if (response.status == 'FAILED') { //username already exists
                                //alert("Sorry but the username already exists, please choose another one");
                                $('#username').val('').focus();
                            }
                        }
                    });
                    $('#username').val('').focus();
                }
            }
        });

    $('#join-chat').click(function () {
        if (localStorage.username) {
            var username = localStorage.username
        }
        else {
            var username = $.trim($('#username').val());
        }

        if ($('#username').val().length > 2) {
            $.ajax({
                url: 'https://ongamechatapp.herokuapp.com/join',
                type: 'POST',
                data: {
                    room: Session.get('chatroom'),
                    username: username
                },
                success: function (response) {
                    if (response.status == 'OK') { //username doesn't already exists
                        socket.emit('update_chatter_count', {
                            'action': 'increase'
                        });
                        $('.chat').show();
                        $('#leave-chat').data('username', username);
                        $('#send-message').data('username', username);
                        $.get('https://ongamechatapp.herokuapp.com/get_messages', function (response) {
                            if (response.length > 0) {
                                var message_count = response.length;
                                var html = '';
                                for (var x = 0; x < message_count; x++) {
                                    ChatHistory.upsert({ id: response[x].id }, response[x])
                                }
                            }
                        });
                        $('.join-chat').hide(); //hide the container for joining the chat room.
                    } else if (response.status == 'FAILED') { //username already exists
                        alert("Sorry but the username already exists, please choose another one");
                        $('#username').val('').focus();
                    }
                }
            })
        }

    });
    $('#leave-chat').click(function () {
        var username = $(this).data('username');
        $.ajax({
            url: 'https://ongamechatapp.herokuapp.com/leave',
            type: 'POST',
            dataType: 'json',
            data: {
                room: Session.get('chatroom'),
                username: username
            },
            success: function (response) {
                if (response.status == 'OK') {
                    // socket.emit('message', {
                    //     'username': username,
                    //     'message': username + " has left the chat room.."
                    // });
                    socket.emit('update_chatter_count', {
                        'action': 'decrease'
                    });
                    $('.chat').hide();
                    $('.join-chat').show();
                    $('#username').val('');
                    //alert('You have successfully left the chat room');
                }
            }
        });
    });
    var input = document.getElementById("message");
    input.addEventListener("keyup", function (event) {
        // Cancel the default action, if needed
        event.preventDefault();
        event.stopPropagation()
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById("send-message").click();
            event.preventDefault();
            event.stopPropagation()
        }
    });
    $('#send-message').click(function () {
        var username = $(this).data('username');
        var message = $.trim($('#message').val());
        $.ajax({
            url: 'https://ongamechatapp.herokuapp.com/send_message',
            type: 'POST',
            dataType: 'json',
            data: {
                room: Session.get('chatroom'),
                'username': username,
                'message': message
            },
            success: function (response) {
                if (response.status == 'OK') {
                    socket.emit('message', {
                        room: Session.get('chatroom'),
                        'username': username,
                        'message': message
                    });
                    $('#message').val('');
                }
            }
        });
        $.get('https://ongamechatapp.herokuapp.com/get_chatters', function (response) {
            Session.set('chatusers', response)
            $('.chat-info').text(response.length);
            chatter_count = response.length; //update chatter count
        });
    });
    socket.on('send', function (data) {
        var room = Session.get('chatroom')
        var date = new Date().toUTCString();
        var username = data.username;
        var message = data.message;
        var res = {}
        res.room = room
        res.date = date
        res.username = username
        res.message = message
        html = `<div class='msg' style="background: #ffffff0a;padding: 5px;margin-bottom: 2px;    display: inline-block;
            width: 100%;">
            <div style="    font-size: 0.7em;
            color: #5d5c5d;">${date}</div>
                <div class="avatar ui mini top" style="    width: 20px;border-radius: 25px!important;margin-right: 5px;
                    float: left;"><img
                        src="https://steemitimages.com/u/${username}/avatar" style="border-radius: 25px!important;"></div>
                <a target="_blank" href="/@${username}">${username}</a> : 
                <div style="font-size:10px;float: right;margin-right: 5px;">
               
                </div>
                 ${message}
            </div>`;
        $('.messages.' + Session.get('chatroom')).append(html);
        $('.messages').scrollTop(1000000);
    });
    socket.on('count_chatters', function (data) {
        if (data.action == 'increase') {
            chatter_count++;
        } else {
            chatter_count--;
        }
        $('.chat-info').text(chatter_count);
    });


    timer = setInterval(function () {

        $('.messages').scrollTop(1000000);
        clearInterval(timer)
    }, 2000)
}