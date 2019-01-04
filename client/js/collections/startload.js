import { Session } from 'meteor/session';
Session.set('load',0)
startload = {
    loadFromSteem: function () {
        // Content.getContentByCreated('ongame', 100, 'ongame', function (error) {
        //     if (error)
        //         console.log(error)
        // })
        // Content.getContentByCreated('ongame-news', 100, 'ongame', function (error) {
        //     if (error)
        //         console.log(error)
        // })
        // Content.getContentByCreated('ongame-streaming', 100, 'ongame', function (error) {
        //     if (error)
        //         console.log(error)
        // })
        // Content.getContentByCreated('ongame-video', 100, 'ongame', function (error) {
        //     if (error)
        //         console.log(error)
        // })
        // Content.getContentByCreated('ongame-review', 100, 'ongame', function (error) {
        //     if (error)
        //         console.log(error)
        // })
        // Content.getContentByCreated('ongame-screenshot', 100, 'ongame', function (error) {
        //     if (error)
        //         console.log(error)
        // })
        // Content.getContentByCreated('ongame-tips', 100, 'ongame', function (error) {
        //     if (error)
        //         console.log(error)
        // })
        Content.getContentByCreated('xbox', 10, 'xbox', function (error) {
            if (error)
                console.log(error)
                else Session.set('load',Session.get('load')+1)
        })
        Content.getContentByCreated('playstation', 10, 'psx', function (error) {
            if (error)
                console.log(error)
                else Session.set('load',Session.get('load')+1)
        })
    }

}
