var postcss = require("postcss")
var glob = require("glob")
var fs = require("fs")
var syntax = require("postcss-scss")

module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      options: {
        includePaths: ["./node_modules"],
        outputStyle: "expanded",
        sourceComments: true
      },
      dist: {
        files: {
          'tmp/utilities.css': 'node_modules/primer-utilities/index.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ["sass", "build"])

  grunt.registerTask('build', '', function() {
    var pattern = "tmp/*.css";

    var files = glob.sync(pattern);

    var cleanSelector = function(selector) {
      return selector.replace(/[\s\.]/g,"").replace(/::?\S+$/,"")
    }

    var buildCompleter = function(selector, comment, filename, section) {
      var comp = {
        text: cleanSelector(selector),
        type: "class",
        rightLabel: filename
      }
      if (comment != null) {
        comp.description = comment.replace("/*","").replace("*/","").trim()
        comp.descriptionMoreURL = "https://github.com/styleguide/css/" + filename + "/" + section
      }
      return comp
    }

    var readClasses = postcss.plugin('readClasses', function() {
      return function (css, opts) {
        var comment = null
        var section = null
        var completions = []
        var compIndex = {}
        var filename = opts.opts.file.replace(/(tmp\/|\.css)/g, "")
        var trackable = function(selector) {
          if (compIndex[cleanSelector(selector)]) {
            return false
          }
          var periods = selector.match(/\./g)
          if (periods == null) {
            return false
          }
          if (periods.length != 1) {
            return false
          }
          return true
        }
        css.walk(function(node) {
          switch (node.type) {
            case "comment":
                if (node.toString().indexOf("/* line") == 0) {
                  section = /\/(\w+)\.scss/g.exec(node.toString())[1]
                } else {
                  comment = node.toString()
                }
              break;
            case "rule":
                node.selector.split(",").forEach(function(selector) {
                  if (trackable(selector) == true) {
                    compIndex[cleanSelector(selector)] = true
                    completions.push(buildCompleter(selector, comment, filename, section));
                    section = null
                    comment = null
                  }
                })
              break;
          }
        });
        fs.writeFileSync("lib/classes/completions/" + filename + ".js", "module.exports = " + JSON.stringify(completions));
      }
    });

    files.forEach(function(file) {
      var data = fs.readFileSync(file);
      postcss([readClasses]).process(data.toString(), {
        syntax: syntax,
        file: file
      }).then(function (result) {
      });
    });
  });
};
