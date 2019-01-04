var translationsDef = null

window.loadDefaultLang = function(cb = function(){}){
  $.get('/lang/en.json', function(file, result) {
    if (result == 'success') {
      translationsDef = file
      cb()
    }
  })
}
var culture =  navigator.language || navigator.userLanguage; 
window.loadLangAuto = function(cb) {
  if(navigator.language || navigator.userLanguage)
  {
    culture =  navigator.language || navigator.userLanguage; 
    this.console.log(culture)
    loadtranslations(culture, function() {
      cb(null)
    });
  }
  else{
    window.loadLangAuto(function(result){
      if(!result)
      console.log(result)
  })
  }
}
window.loadtranslations = function(culture, cb = function(){}){
  $.get('/lang/'+culture+'.json', function(file, result) {
    if (result == 'success') {
      Session.set('translations', file)
      cb()
    }
  })
}

loadDefaultLang()



function translate(code){
  //find translation
  var value = code;
  var found = false;
  if (Session.get('translations')) {
    for(var key in Session.get('translations')){
      if(key === code){
        value = Session.get('translations')[key];
        found = true;
        break;
      }
    }
  }

  if(!found){
    if (culture.substr(0,2) != 'en')
      console.log('no translation for ' + culture);
    if (translationsDef) {
      for(var key in translationsDef){
        if(key === code){
          value = translationsDef[key];
          found = true;
          break;
        }
      }
    }
    if (!found) {

      return '[['+code+']]';
    }
  }
  var args = arguments
  for (var i = 1; i < args.length; i++) {
    var find = '%'+i
    var regex = new RegExp(find, "g");
    value = value.replace(regex, args[i])
  }

  return value;
}

window.translate = translate;


