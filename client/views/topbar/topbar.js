Template.topbar.events({
  // 'click #login': function (event) {
  //   event.preventDefault()
  //   window.location.href = sc2.getLoginURL()
  // },
  'click #logout': function (event) {
    event.preventDefault()
    Meteor.logout(function result(){})
    // MainUser.remove({})
    // localStorage.removeItem('username')
    // localStorage.removeItem('accesstoken')
    // localStorage.removeItem('expireat')
  }
})


Template.topbar.rendered = function () {
  function toggleSidebar() {
    $(".sidebarbutton").toggleClass("active");
    $('.ui.sidebar.left').sidebar('setting', 'closable', false).sidebar('setting', 'transition', 'overlay').sidebar('toggle')
    $(".sidebar-item").toggleClass("active");
  }

  $(".sidebarbutton").on("click tap", function () {
    toggleSidebar();
  });

  $(document).keyup(function (e) {
    if (e.keyCode === 27) {
      toggleSidebar();
    }
  });

}
