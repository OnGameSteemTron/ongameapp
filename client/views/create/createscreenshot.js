Template.createscreenshot.rendered = function () {
  Session.set('preview', '')
  $("#title").change(function () {
    Session.set('title', $("#title").val())
  })
  $('#summernote').summernote({
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
      ['fontsize', ['fontsize']]
    ],
    callbacks: {
      onChange: function (contents, $editable) {
        Session.set('preview', $('#summernote').summernote('code'))
      }
    },
    height: 300,
    placeholder: "One link per line...",
  })
  $('#summernote').summernote("removeModule", "autoLink")
}
