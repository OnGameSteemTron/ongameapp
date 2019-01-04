Template.stream.rendered = function () {
    Session.set('backgroundimage','./images/background.jpg')
    $(window).scrollTop(0);
}

Template.stream.helpers({
    tagsArray: function (tags) {
        if(typeof tags != String)
        return true
        else return false
    },
    SelectedFaq: function () {
        if(Session.get('selectedfaq'))
        return Faq.findOne({ 'permlink': Session.get('selectedfaq') })
        else{
            return Faq.findOne({ 'json_metadata.tags': 'welcome', 'type': 'welcome' })
        }
    }
})


Template.stream.events({
    'click .card.screenshot': function (event) {
        event.preventDefault()
        $('.ui.screenshot.modal').remove()
        $('.ui.main.segment').append(Blaze.toHTMLWithData(Template.imagemodal, {data:this}));
        $('.ui.screenshot.modal').modal('setting', 'transition', 'horizontal flip').modal('show')
    },
})