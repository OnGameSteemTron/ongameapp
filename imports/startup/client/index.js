import './routes.js';
import './steemproperties';
import './chathandler';
import { Session } from 'meteor/session';

FlowRouter.wait();
FlowRouter.notFound = {
    action: function () {
        BlazeLayout.render('mainlayout', { top: "topbar", main: "home", nav: "nav" });
    }
};


BlazeLayout.setRoot('body');
Meteor.startup(function () {
    if (Meteor.isClient) {  
    coinmarket.steemdollars()
    coinmarket.allcoins()

    steam.applist()
    steam.getFeaturedGames()
    startload.loadFromSteem()
    ongame.getRecords()
    ongame.getRecentGameContents()
    twitch.getLiveList()
    twitch.getTopStream()
 
    Session.set('backgroundimage', './images/background.jpg')
    Session.set('and', '&')
    Session.set('lower', '<')
    Session.set('higher', '>')

    // if (localStorage.username) {
    //     MainUser.add(localStorage.username, function (result) {
    //         if (result) {
    //             ongame.getUser(localStorage.username,function(user){
    //                 if(user)
    //                 {
    //                     MainUser.upsert({_id:user.id},user)
    //                 }
    //             })
    //         }
    //     })
    // }

    FlowRouter.initialize({ 
        // hashbang: true 
    }, function () {

    });

    // $(window).on('hashchange', function () {
    //     FlowRouter.go(window.location.hash)
    // });

    if(window.steem_keychain)
    console.log(window.steem_keychain)
    }
    Meteor.subscribe("users");
    Meteor.subscribe("counter");
    if(localStorage.username)
    MainUser.add(localStorage.username, function (error) {
        if (error) {
            console.log(error)
        }
    })
})


// $.expr[":"].external = function(a) {
//     //var linkHref = a.hostname;
//     //var domainHref = location.hostname;
    
//     var linkhn = a.hostname.split('.').reverse();
//     var linkHref = linkhn[1] + "." + linkhn[0];
    
//     var domainhn = window.location.hostname.split('.').reverse();
//     var domainHref = domainhn[1] + "." + domainhn[0];

//     return !a.href.match(/^mailto\:/) && !a.href.match(/^tel\:/) && linkHref !== domainHref;
// };

// $("a:external").addClass("ext_link");

// $(function() {
    
//     $('a.ext_link').click(function() {
//         $('.ui.modal.external').modal('setting', 'transition', 'scale').modal('show')
//         $('a:external').attr('data-toggle', 'modal');
//         $('a:external').attr('data-target', '#speedbump');
//         //go to link on modal close
//         var url = $(this).attr('href');
//         $('.btn-modal.btn-continue').click(function() {
//             window.open(url);
//             $('.btn-modal.btn-continue').off();
//         });
//         $('.btn-modal.btn-close').click(function() {
//             $('#speedbump').modal('hide');
//             $('.btn-modal.btn-close').off();
//         })
//     })
    
// })