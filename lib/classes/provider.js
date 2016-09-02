var completions = require('./completions')
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
      if (!prefix || isAMatch(completion.text, prefix)) {
        completion.replacementPrefix = prefix
        suggs.push(completion);
      }
    }
    return suggs
  }
}

var isAMatch = function (str1, str2) {
  return str1.toLowerCase().indexOf(str2.toLowerCase()) >= 0
}
