Template.topbardropdown.rendered = function () {
    $('.ui.dropdown.profile').dropdown()
}

Template.topbardropdown.events({
    'click #top-blog': function (event) {
        FlowRouter.go('/@'+this.name)
        Template.profile.InitTab()
      },
      'click #top-comments': function (event) {
        FlowRouter.go('/@'+this.name+'/comments')
        Template.profile.InitTab()
      },
      'click #top-rewards': function (event) {
        FlowRouter.go('/@'+this.name+'/rewards')
        Template.profile.InitTab()
      },
      'click #top-replies': function (event) {
        FlowRouter.go('/@'+this.name+'/replies')
        Template.profile.InitTab()
      },
      'click #top-wallet': function (event) {
        FlowRouter.go('/@'+this.name+'/wallet')
        Template.profile.InitTab()
      },
})
