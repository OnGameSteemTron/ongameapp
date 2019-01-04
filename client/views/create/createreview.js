
Template.createreview.onRendered(function () {
    $('.ui.dropdown.tags').dropdown({
        maxSelections: 3,
        onNoResults: function (search) { },
        onChange: function () {
            var tags = $('.ui.dropdown.tags').val().split(",").length;
            if (tags <= 2) {
                $('.ui.dropdown.tags').dropdown('setting', 'allowAdditions', true);
            }
            else {
                $('.ui.dropdown.tags').dropdown('setting', 'allowAdditions', false);
            }
        }
    })
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


Template.createreview.rendered = function () {
    Session.set('preview','')
    Session.set('story', 75)
    Session.set('gameplay', 75)
    Session.set('dialogue', 75)
    Session.set('level', 75)
    Session.set('graphic', 75)
    Session.set('sound', 75)
    Session.set('replayability', 75)
    Session.set('valueperdollar', 75)
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
    $(".rslider.story").roundSlider({
        sliderType: "min-range",
        editableTooltip: false,
        radius: 90,
        width: 16,
        value: 75,
        handleSize: 0,
        handleShape: "square",
        circleShape: "pie",
        startAngle: 315,
        tooltipFormat: function (args) {
            return "STORY " + args.value;
        },
        change: function (args) {
            Session.set('story', args.value) ;
        }
    });
    $(".rslider.gameplay").roundSlider({
        sliderType: "min-range",
        editableTooltip: false,
        radius: 90,
        width: 16,
        value: 75,
        handleSize: 0,
        handleShape: "square",
        circleShape: "pie",
        startAngle: 315,
        tooltipFormat: function (args) {
            return "GAMEPLAY " + args.value;
        },
        change: function (args) {
            Session.set('gameplay', args.value) ;
        }
    });
    $(".rslider.dialogue").roundSlider({
        sliderType: "min-range",
        editableTooltip: false,
        radius: 90,
        width: 16,
        value: 75,
        handleSize: 0,
        handleShape: "square",
        circleShape: "pie",
        startAngle: 315,
        tooltipFormat: function (args) {
            return "DIALOGUE " + args.value;
        },
        change: function (args) {
            Session.set('dialogue', args.value) ;
        }
    });
    $(".rslider.level").roundSlider({
        sliderType: "min-range",
        editableTooltip: false,
        radius: 90,
        width: 16,
        value: 75,
        handleSize: 0,
        handleShape: "square",
        circleShape: "pie",
        startAngle: 315,
        tooltipFormat: function (args) {
            return "LEVEL DESIGN " + args.value;
        },
        change: function (args) {
            Session.set('level', args.value) ;
        }
    });
    $(".rslider.graphic").roundSlider({
        sliderType: "min-range",
        editableTooltip: false,
        radius: 90,
        width: 16,
        value: 75,
        handleSize: 0,
        handleShape: "square",
        circleShape: "pie",
        startAngle: 315,
        tooltipFormat: function (args) {
            return "GRAPHIC " + args.value;
        },
        change: function (args) {
            Session.set('graphic', args.value) ;
        }
    });
    $(".rslider.sound").roundSlider({
        sliderType: "min-range",
        editableTooltip: false,
        radius: 90,
        width: 16,
        value: 75,
        handleSize: 0,
        handleShape: "square",
        circleShape: "pie",
        startAngle: 315,
        tooltipFormat: function (args) {
            return "SOUND " + args.value;
        },
        change: function (args) {
            Session.set('sound', args.value) ;
        }
    });
    $(".rslider.replayability").roundSlider({
        sliderType: "min-range",
        editableTooltip: false,
        radius: 90,
        width: 16,
        value: 75,
        handleSize: 0,
        handleShape: "square",
        circleShape: "pie",
        startAngle: 315,
        tooltipFormat: function (args) {
            return "REPLAYABILITY " + args.value;
        },
        change: function (args) {
            Session.set('replayability', args.value) ;
        }
    });
    $(".rslider.valueperdollar").roundSlider({
        sliderType: "min-range",
        editableTooltip: false,
        radius: 90,
        width: 16,
        value: 75,
        handleSize: 0,
        handleShape: "square",
        circleShape: "pie",
        startAngle: 315,
        tooltipFormat: function (args) {
            return "VALUE PER DOLLAR " + args.value;
        },
        change: function (args) {
            Session.set('valueperdollar', args.value) ;
        }
    });
}


Template.createreview.helpers({
    score: function () {
        return ((Session.get('story') +
            + Session.get('gameplay')
            + Session.get('dialogue')
            + Session.get('level')
            + Session.get('graphic')
            + Session.get('replayability')
            + Session.get('valueperdollar')
            + Session.get('sound')) / 8).toFixed(1)
    }
})