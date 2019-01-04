
Template.createnews.onRendered(function () {
  $('#basics_form').form({
    on: 'blur',
    fields: {
      tags: {
        identifier: 'tags',
        rules: [
          {
            type: 'empty',
            prompt: translate('COMMON_AT_LEAST_ONETAG')
          }
        ]
      },
      language: {
        identifier: 'language',
        rules: [
          {
            type: 'empty',
            prompt: translate('COMMON_SELECT_YOUR_LANGUAGE')
          }
        ]
      },
      title: {
        identifier: 'title',
        rules: [
          {
            type: 'empty',
            prompt: translate('COMMON_TYPE_A_TITLE')
          },
          {
            type: 'minLength[5]',
            prompt: translate('COMMON_AT_LEAST_FIVECHAR')
          },
          {
            type: 'maxLength[80]',
            prompt: translate('COMMON_AT_MOST_EIGHTYCHAR')
          }
        ]
      },
      summernote: {
        identifier: 'summernote',
        rules: [
          {
            type: 'empty',
            prompt: translate('COMMON_TYPE_DESCRIPTION')
          }
        ]
      }
    }
  })
})


Template.createnews.rendered = function () {
  Session.set('preview','')
  $("#title").change(function () {
    Session.set('title', $("#title").val())
  });
  $('#summernote').summernote({
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
      ['fontsize', ['fontsize']]
    ],
    callbacks: {
      onImageUpload: function (files) {
        Template.basicsform.handleFiles(files);
      },
      onChange: function (contents, $editable) {
        Session.set('preview', $('#summernote').summernote('code'))
      }
    },
    height: 300,
    placeholder: "Your content...",
  })
}