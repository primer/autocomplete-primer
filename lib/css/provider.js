var completions = require('./data')
module.exports = {
  selector: '.text.html.erb .string.quoted',

  inclusionPriority: 1,
  excludeLowerPriority: true,

  getSuggestions: function (request) {
    var prefix = request.prefix
    var suggs = []
    var classname, i, len

    for (i = 0, len = completions.length; i < len; i++) {
      completion = completions[i];
      if (!prefix || isAMatch(completion.text, prefix) || isAMatch(completion.description, prefix)) {
        completion.replacementPrefix = prefix
        suggs.push(completion);
      }
    }
    return suggs
  }
}

var isAMatch = function (str1, str2) {
  if (str1 == null) {
    return false
  }
  return str1.toLowerCase().indexOf(str2.toLowerCase()) >= 0
}
