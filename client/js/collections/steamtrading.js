// var SteamApi = require('steam-api');
// var STEAM_API_KEY = "FC92D4C81E7CEF254D5E4BA4BEE80AAD"

// //var STEAM_API_KEY = "D37CE30A27F152CDA1E3BCB258C83453"

// steamtrade = {
//     getTradeOffers: function () {
//         $.ajax({
//             url: "https://api.steampowered.com/IEconService/GetTradeOffers/v1/?key=" + STEAM_API_KEY + "&format=json&get_sent_offers=1&get_received_offers=1&get_descriptions=0&active_only=0&historical_only=1",
//             data: 'go',
//             dataType: "json",
//             success: function (json) {
//                 $.each(json, function (index, value) {
//                     if (value.fields.category === "Gaming")
//                         LiveStream.upsert({ _id: value.id }, value.fields)
//                 })
//             },
//             error: function (result, status, error) {
//                 console.log(result, status, error)
//             }
//         })
//     }
// }

