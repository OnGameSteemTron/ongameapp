Template.helpcenter.helpers({
    Faq: function (cat) {
        return Faq.find({ 'type': cat }).fetch().reverse();
    },
    SelectedFaq: function () {
        if(Session.get('selectedfaq'))
        return Faq.findOne({ 'permlink': Session.get('selectedfaq') })
        else{
            return Faq.findOne({ 'json_metadata.tags': 'welcome', 'type': 'welcome' })
        }
    }
})

Template.helpcenter.events({
    'click .item.faq': function (event) {
        event.preventDefault()
        Session.set('selectedfaq',this.permlink)
    }
  })