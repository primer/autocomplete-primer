var octicons = require('octicons')

module.exports = {
  selector: ".text.html.erb, .source.ruby",
  disableForSelector: [
    ".text.html.erb .comment",
    ".text.html.erb .ruby.embedded",
    ".text.html.erb .tag",
    ".source.ruby .comment",
    ".source.ruby .quote"
  ].join(","),

  inclusionPriority: 1,
  excludeLowerPriority: true,

  getSuggestions: function(request) {
    var prefix = request.prefix
    var suggestions = []
    var scopes = request.scopeDescriptor.getScopesArray()

    Object.keys(octicons).forEach(function(key) {
      if (isAMatch(key, prefix) || anyMatch(octicons[key].keywords, prefix)) {
        var snippet = "octicon(\"" + key + "\"$1)"
        if (scopes.indexOf("text.html.erb") >= 0) {
          snippet = "<%= " + snippet + " %>"
        }
        suggestions.push({
          snippet: snippet,
          displayText: key,
          rightLabel: "octicon",
          type: "tag",
          leftLabelHTML: octicons[key].toSVG({ style: "vertical-align:middle;fill:currentColor;" })
        })
      }
    })

    return suggestions
  }
}

function isAMatch(str1, str2) {
  return str1.toLowerCase().indexOf(str2.toLowerCase()) >= 0
}

function anyMatch(keywords, str) {
  var result = false
  keywords.forEach(function(key) {
    if (isAMatch(key, str)) {
      result = true
    }
  })
  return result
}
