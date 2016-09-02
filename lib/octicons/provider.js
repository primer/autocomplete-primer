var octicons = require('octicons')

module.exports = {
  selector: ".text.html.erb",
  disableForSelector: ".text.html.erb .comment, .text.html.erb .ruby.embedded, .text.html.erb .tag",

  inclusionPriority: 1,
  excludeLowerPriority: true,

  getSuggestions: function (request) {
    var prefix = request.prefix
    var suggestions = []

    Object.keys(octicons.keywords).forEach(function(key){
      if(isAMatch(key, prefix) || anyMatch(octicons.keywords[key].keywords, prefix)) {
        suggestions.push({
          snippet: "<%= octicon(\"" + key + "\"$1) %>",
          displayText: key,
          rightLabel: "octicon",
          type: "tag",
          leftLabelHTML: octicons.svg[key].replace("<svg","<svg style=\"vertical-align:middle;fill:currentColor;\"")
        })
      }
    })

    return suggestions
  }
}

var isAMatch = function (str1, str2) {
  return str1.toLowerCase().indexOf(str2.toLowerCase()) >= 0
}

var anyMatch = function (keywords, str) {
  var result = false
  keywords.forEach(function(key) {
    if(isAMatch(key, str)) {
      result = true
    }
  })
  return result
}
