
Template.createvideo.onRendered(function () {
    $('#basics_form').form({
        on: 'blur',
        fields: {
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


Template.createvideo.rendered = function () {
    Session.set('preview','')
    $("#title").change(function () {
        Session.set('title', $("#title").val())
      });
    $( "#url" ).change(function() {
        Session.set('preview',$("#url").val())
      });
}

