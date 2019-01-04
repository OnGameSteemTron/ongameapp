Template.footer.rendered = function () {
    if (sessionStorage.currency || Session.get('currency'))
    {
        var cur = sessionStorage.currency || Session.get('currency')
        Session.set('currency', cur)
        $(".ui.dropdown.choosecurrency").dropdown("set selected", cur)
    }
    else {
        sessionStorage.setItem('currency', 'USD')
        $(".ui.dropdown.choosecurrency").dropdown("set selected", 'USD')
    }
    $('.ui.dropdown.choosecurrency')
        .dropdown({
            useLabels: false,
            onChange: function (value, text, $selectedItem) {
                Session.set('currency', value)
                sessionStorage.setItem('currency', value)
            }
        })
        
    var userLang = navigator.language || navigator.userLanguage;
    $(".ui.dropdown.chooselanguage").dropdown("set selected", userLang.substring(0, 2))
    $('.ui.dropdown.chooselanguage')
        .dropdown({
            useLabels: false,
            onChange: function (value, text, $selectedItem) {
                loadtranslations(value, function (error) {
                    if (error)
                        console.log(error)
                    else {
                        $('.default.text').text(text)
                        var tags = [
                            { category: 'animal', title: translate("BASICSFORM_ANIMAL") },
                            { category: 'agriculture', title: translate("BASICSFORM_AGRICULTURE") },
                            { category: 'arts', title: translate("BASICSFORM_ARTS") },
                            { category: 'association', title: translate("BASICSFORM_ASSOCIATION") },
                            { category: 'business', title: translate("BASICSFORM_BUSINESS") },
                            { category: 'charity', title: translate("BASICSFORM_CHARITY") },
                            { category: 'cinema', title: translate("BASICSFORM_CINEMA") },
                            { category: 'coding', title: translate("BASICSFORM_CODING") },
                            { category: 'comedy', title: translate("BASICSFORM_COMEDY") },
                            { category: 'fashion', title: translate("BASICSFORM_FASHION") },
                            { category: 'food', title: translate("BASICSFORM_COOKING") },
                            { category: 'gaming', title: translate("BASICSFORM_GAMING") },
                            { category: 'geek', title: translate("BASICSFORM_GEEK") },
                            { category: 'health', title: translate("BASICSFORM_HEALTH") },
                            { category: 'journalism', title: translate("BASICSFORM_JOURNALISM") },
                            { category: 'life', title: translate("BASICSFORM_LIFE") },
                            { category: 'medical', title: translate("BASICSFORM_MEDICAL") },
                            { category: 'music', title: translate("BASICSFORM_MUSIC") },
                            { category: 'nature', title: translate("BASICSFORM_NATURE") },
                            { category: 'photography', title: translate("BASICSFORM_PHOTOGRAPHY") },
                            { category: 'steemit', title: 'Steem & Steemit' },
                            { category: 'science', title: translate("BASICSFORM_SCIENCE") },
                            { category: 'streaming', title: translate("BASICSFORM_STREAMING") },
                            { category: 'technology', title: translate("BASICSFORM_TECHNOLOGY") },
                            { category: 'travel', title: translate("BASICSFORM_TRAVEL") },
                            { category: 'vlog', title: translate("BASICSFORM_VLOG") },
                            { category: 'volunteer', title: translate("BASICSFORM_VOLUNTEER") },
                            { category: 'writing', title: translate("BASICSFORM_BOOKS") }
                        ]
                        Session.set('tags', tags)
                    }
                })
            }
        })
}

Template.footer.helpers({
    CheckIfEn: function (tag) {
        if (!tag) return
        if (tag === 'en')
            return 'gb'
        else
            return tag
    },
    CheckIfVn: function (tag) {
        if (!tag) return
        if (tag === 'vn')
            return 'Vietnamese'
        else
            return tag
    }
})

