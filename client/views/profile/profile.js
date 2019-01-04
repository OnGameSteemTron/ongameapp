Template.profile.events({
    'click .ui.button.buy.sp': function (event) {
        $('.ui.power.modal').remove()
        $('article').append(Blaze.toHTMLWithData(Template.powermodal));
        $('.ui.power.modal').modal('setting', 'transition', 'horizontal flip').modal('show')
        Template.powermodal.Init()
    },
    'click .ui.button.violet.claim': function (event) {
        steemconnect.claimRewardBalance(this.reward_steem_balance, this.reward_sbd_balance, this.reward_vesting_balance, function (error) {
            if (error) {
                console.log(error)
            }
            else {
                $('.ui.button.violet.claim').addClass('dsp-none')
            }
        })
    },
    'click #logoutbutton': function (event) {
        MainUser.remove({})
        localStorage.removeItem('username')
        localStorage.removeItem('accesstoken')
        localStorage.removeItem('expireat')
        localStorage.removeItem('expirein')
        FlowRouter.go('/explore')
    },
    'click .menu.profile .item': function (event) {
        path = event.currentTarget.name
        if(path==='overview')
        FlowRouter.go('/@' + this.name)
        else
       FlowRouter.go('/@' + this.name + '/' + path)
    },
})

Template.profile.rendered = function () {
    Template.profile.InitTab()
}



Template.profile.InitTab = function(){
    $('.menu.profile .item').tab()
    if (Session.get('currentprofiletab')) {
      var tabmenu = Session.get('currentprofiletab');
      switch (tabmenu) {
          case 'overview':
              $('.menu.profile .item').tab('change tab', 'first')
              break;
          case 'blog':
              $('.menu.profile .item').tab('change tab', 'second')
              break;
          case 'friends':
              $('.menu.profile .item').tab('change tab', 'third')
              break;
          case 'rewards':
              $('.menu.profile .item').tab('change tab', 'fourth')
              break;  
          case 'wallet':
              $('.menu.profile .item').tab('change tab', 'fifth')
              break;      
          case 'comments':
              $('.menu.profile .item').tab('change tab', 'sixth')
              break;
          case 'transfer':
              $('.menu.profile .item').tab('change tab', 'seventh')
              break;
          case 'achievements':
              $('.menu.profile .item').tab('change tab', 'eigth')
              break;
          case 'statistics':
              $('.menu.profile .item').tab('change tab', 'nineth')
              break;
          default:
              $('.menu.profile .item').tab('change tab', 'first')
      }
    }
}
