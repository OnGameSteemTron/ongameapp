User = new Mongo.Collection(null)

UserRecentGames = new Mongo.Collection(null)
UserGames = new Mongo.Collection(null)
MainUser = new Mongo.Collection(null)



User.add = function (username, cb) {
    steem.api.getAccounts([username], function (error, result) {
        if (!result || result.length < 1) {
            cb(true)
            return
        }
        for (i = 0; i < result.length; i++) {
            try {
                result[0].json_metadata = JSON.parse(result[0].json_metadata)
            } catch (error) {
                //console.log(error)
            }
            User.remove({})
            steem.api.getFollowCount(username, function (err, res) {
                if (!error) {
                    var user = {}
                    user = result[0]
                    user.follower_count = res.follower_count
                    user.following_count = res.following_count
                    const totalShares = parseFloat(user.vesting_shares) + parseFloat(user.received_vesting_shares) - parseFloat(user.delegated_vesting_shares) - parseFloat(user.vesting_withdraw_rate);
                    const elapsed = Math.floor(Date.now() / 1000) - user.voting_manabar.last_update_time;
                    const maxMana = totalShares * 1000000;
                    let currentMana = parseFloat(user.voting_manabar.current_mana) + elapsed * maxMana / 432000;

                    if (currentMana > maxMana) {
                        currentMana = maxMana;
                    }

                    user.currentMana = currentMana * 100 / maxMana;
                    ongame.getUser(user.name, function (info) {
                        if (!info) {
                            User.upsert({ _id: user.id }, user)
                        }
                        else {
                            user.details = info
                            user.twitch_id = info.twitch_id
                            user.steam_id = info.steam_id
                            user.youtube_id = info.youtube_id
                            if (user.youtube_id != null) {
                                youtube.getYoutubeChannel(user.youtube_id, function (result) {
                                    if (result) {
                                        user.youtube_channel = result
                                        user.details = info
                                        User.upsert({ _id: user.id }, user)
                                    }
                                })
                                youtube.getYoutubeVideos(user.youtube_id, function (result) {
                                    if (result) {
                                        user.youtube_videos = result
                                        user.details = info
                                        User.upsert({ _id: user.id }, user)
                                    }
                                })
                            }
                            if (user.twitch_id != null) {
                                twitch.getUser(user.twitch_id, function (cb) {
                                    if (cb) {
                                        user.twitchsettings = cb.data[0]
                                        user.details = info
                                        User.upsert({ _id: user.id }, user)
                                    }
                                })
                            }
                            if (user.steam_id != null) {
                                steam.getPlayerSummary(user.steam_id, function (cb) {
                                    if (cb) {
                                        user.steamsettings = cb
                                        user.details = info
                                        steam.getUserGames(user.steam_id)
                                        steam.getUserRecentGames(user.steam_id)
                                        User.upsert({ _id: user.id }, user)
                                    }
                                })
                                //steam.getUserBadges(user.steam_id)
                                //steam.getUserFriends(user.steam_id)
                                steam.getUserFriendsDetails(user.steam_id)
                            }
                        }
                    })
                    if(typeof user.json_metadata.profile.cover_image !== 'undefined')
                    $('.main.background').css( "background-image",'url('+user.json_metadata.profile.cover_image+')');
                }
            })
        }
        cb(null)
    });
}

User.addSmall = function (username, cb) {
    steem.api.getAccounts([username], function (error, result) {
        if (!result || result.length < 1) {
            cb(true)
            return
        }
        for (i = 0; i < result.length; i++) {
            try {
                result[0].json_metadata = JSON.parse(result[0].json_metadata)
            } catch (error) {
                //console.log(error)
            }
            User.remove({})
            steem.api.getFollowCount(username, function (err, res) {
                if (!error) {
                    var user = {}
                    user = result[0]
                    user.follower_count = res.follower_count
                    user.following_count = res.following_count
                    const totalShares = parseFloat(user.vesting_shares) + parseFloat(user.received_vesting_shares) - parseFloat(user.delegated_vesting_shares) - parseFloat(user.vesting_withdraw_rate);
                    const elapsed = Math.floor(Date.now() / 1000) - user.voting_manabar.last_update_time;
                    const maxMana = totalShares * 1000000;
                    let currentMana = parseFloat(user.voting_manabar.current_mana) + elapsed * maxMana / 432000;

                    if (currentMana > maxMana) {
                        currentMana = maxMana;
                    }

                    user.currentMana = currentMana * 100 / maxMana;
                    ongame.getUser(user.name, function (info) {
                        if (!info) {
                            User.upsert({ _id: user.id }, user)
                        }
                        else{
                            user.details = info
                            User.upsert({ _id: user.id }, user)
                        }
                    })
                    if(user.json_metadata.profile.cover_image)
                    $('.main.background').css( "background-image",'url('+user.json_metadata.profile.cover_image+')');
                    else{
                        $('.main.background').css( "background-image",'url("./images/background.jpg")');
                    }
                }
            })
        }
        cb(null)
    });
}

User.load = function (username, cb) {
    steem.api.getAccounts([username], function (error, result) {
        if (!result || result.length < 1) {
            cb(true)
            return
        }
        for (var i = 0; i < result.length; i++) {
            var user = result[i]
            try {
                user.json_metadata = JSON.parse(user.json_metadata)
            }
            catch (e){
            }
            ongame.getUser(user.name, function (info) {
                if (!info) {
                    User.upsert({ _id: user.id }, user)
                }
                else{
                    user.details = info
                    User.upsert({ _id: user.id }, user)
                }
            })
        }
        cb(null)
    });
}




MainUser.add = function (username, cb) {
    steem.api.getAccounts([username], function (error, result) {
        if (!result || result.length < 1) {
            cb(true)
            return
        }
        for (var i = 0; i < result.length; i++) {
            var user = {}
            user = result[i]
            try {
                user.json_metadata = JSON.parse(result[i].json_metadata)
            } catch (error) {
                //console.log(error)
            }
            user.json_metadata.apps = []
            const totalShares = parseFloat(user.vesting_shares) + parseFloat(user.received_vesting_shares) - parseFloat(user.delegated_vesting_shares) - parseFloat(user.vesting_withdraw_rate);
            const elapsed = Math.floor(Date.now() / 1000) - user.voting_manabar.last_update_time;
            const maxMana = totalShares * 1000000;
            let currentMana = parseFloat(user.voting_manabar.current_mana) + elapsed * maxMana / 432000;

            if (currentMana > maxMana) {
                currentMana = maxMana;
            }

            user.currentMana = currentMana * 100 / maxMana;
            ongame.getUser(user.name, function (info) {
                if (info) {
                    user.details = info
                    user.twitch_id = info.twitch_id
                    user.steam_id = info.steam_id
                    user.youtube_id = info.youtube_id

                    MainUser.upsert({ _id: user.id }, user)
                }
                else {
                    MainUser.upsert({ _id: user.id }, user)
                }
            })

        }
        cb(null)
    });
}

User.estimateAccountValue = function (user) {
    if (Coins.findOne({ 'id': 'steem' }) && Coins.findOne({ 'id': 'steem-dollars' })) {
        var balanceSteem = parseFloat(user.balance.split(' ')[0])
        var balanceVests = parseFloat(user.vesting_shares.split(' ')[0])
        var balanceSbd = parseFloat(user.sbd_balance.split(' ')[0])
        var balanceUsd = 0

        balanceUsd += Coins.findOne({ 'id': 'steem' }).price_usd * vestToSteemPower(balanceVests)
        balanceUsd += Coins.findOne({ 'id': 'steem' }).price_usd * balanceSteem
        balanceUsd += Coins.findOne({ 'id': 'steem-dollars' }).price_usd * balanceSbd
        return balanceUsd
    }
    else {
        return 0

    }

}

function vestToSteemPower(userVests) {
    if (localStorage.steemProps && userVests) {
        try {
            var globals = JSON.parse(localStorage.steemProps)
        } catch (error) {
            //console.log(error)
        }
        var totalSteem = parseFloat(globals.total_vesting_fund_steem.split(' ')[0])
        var totalVests = parseFloat(globals.total_vesting_shares.split(' ')[0])
        var SP = totalSteem * (userVests / totalVests)
        return SP
    }
}
