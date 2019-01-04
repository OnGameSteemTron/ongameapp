ServiceConfiguration.configurations.update(
    { "service": "facebook" },
    {
        $set: {
            "appId": '381439492598550',
            "secret": process.env.FB_SECRET
        }
    },
    { upsert: true }
)

ServiceConfiguration.configurations.update(
    { "service": "google" },
    {
        $set: {
            "clientId": '680925503594-udh7r8jev15s2cjhrshvck4n7n6ddk32.apps.googleusercontent.com',
            "secret": process.env.GOOGLE_SECRET
        }
    },
    { upsert: true }
)

ServiceConfiguration.configurations.update(
    { "service": "github" },
    {
        $set: {
            "clientId": 'd1a39c97256c3cedaf7a',
            "secret": process.env.GITHUB_SECRET
        }
    },
    { upsert: true }
)

ServiceConfiguration.configurations.update(
    { "service": "steam" },
    {
        $set: {
            loginStyle: 'redirect',
            timeout: 10000
        }
    },
    { upsert: true }
)

ServiceConfiguration.configurations.update(
    { "service": "twitch" },
    {
        $set: {
            "clientId": 'b5x65miullqqvqf6lkqcaio2ofljt4',
            "secret": process.env.TWITCH_SECRET
        }
    },
    { upsert: true }
)

ServiceConfiguration.configurations.update(
    { "service": "twitter" },
    {
        $set: {
            'consumerKey': 'MqXWIISyTdUdaJCzG1kGfmROC',
            'secret': process.env.TWITTER_SECRET,
            'loginStyle': "popup"
        }
    },
    { upsert: true }
)