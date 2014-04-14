module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    protractor: {
      options: {
        configFile: "conf.js", // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          'browser': 'chrome'
        }
      },
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
        },
        src: ['test/server/**/*.spec.js']
      }
    }
  });

  grunt.registerTask('test', ['protractor']);

};