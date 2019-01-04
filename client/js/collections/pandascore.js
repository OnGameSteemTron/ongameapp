const pandatoken = 'cumO3h5IUuGGZkuWzmOU4gShHL2FkS4YxgE2DCwaEnaLCAR0Q-8';

Matchs = new Mongo.Collection(null)
Tournaments = new Mongo.Collection(null)
TournamentGames = new Mongo.Collection(null)
UpcomingSeries = new Mongo.Collection(null) 
UpcomingMatchs = new Mongo.Collection(null) 
panda = {
    getLiveTournaments: function () {
        var x = new XMLHttpRequest();
        x.open('GET', 'https://steamcors.herokuapp.com/https://api.pandascore.co/lives?token='+pandatoken);
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.onload = function () {
            try{
                var result =  JSON.parse(x.responseText)
                console.log(result)
                for(i=0;i<result.length;i++)
                {
                    Matchs.upsert({_id:result[i].id},result[i])
                }
            }
            catch(e){}
        };
        x.send();
    },
    getMatchDetails: function (matchid) {
        var x = new XMLHttpRequest();
        x.open('GET', 'https://steamcors.herokuapp.com/https://api.pandascore.co/matches/'+matchid+'.json?token='+pandatoken);
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.onload = function () {
            try{
                var result =  JSON.parse(x.responseText)
                Matchs.upsert({_id:result.id},result)
            }
            catch(e){}
        };
        x.send();
    },
    getGames: function () {
        var x = new XMLHttpRequest();
        x.open('GET', 'https://steamcors.herokuapp.com/https://api.pandascore.co/videogames?token='+pandatoken);
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.onload = function () {
            try{
                var result =  JSON.parse(x.responseText)
                for(i=0;i<result.length;i++)
                {
                    TournamentGames.upsert({_id:result[i].id},result[i])
                }
            }
            catch(e){}
        };
        x.send();
    },
    getUpcomingSeries: function () {
        var x = new XMLHttpRequest();
        x.open('GET', 'https://steamcors.herokuapp.com/https://api.pandascore.co/series/upcoming?token='+pandatoken);
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.onload = function () {
            try{
                var result =  JSON.parse(x.responseText)
                for(i=0;i<result.length;i++)
                {
                    UpcomingSeries.upsert({_id:result[i].id},result[i])
                }
            }
            catch(e){}
        };
        x.send();
    },
    getUpcomingMatchs: function () {
        var x = new XMLHttpRequest();
        x.open('GET', 'https://steamcors.herokuapp.com/https://api.pandascore.co/matches/upcoming?token='+pandatoken);
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.onload = function () {
            try{
                var result =  JSON.parse(x.responseText)
                for(i=0;i<result.length;i++)
                {
                    UpcomingMatchs.upsert({_id:result[i].id},result[i])
                }
            }
            catch(e){}
        };
        x.send();
    }
}
//https://api.pandascore.co/matches/running?token=cumO3h5IUuGGZkuWzmOU4gShHL2FkS4YxgE2DCwaEnaLCAR0Q-8
