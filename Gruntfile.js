module.exports = function(grunt) {
 
  grunt.initConfig({
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true
      },
      // Add a new travis ci karma configuration
      // configs here override those in our existing karma.conf.js
      travis: {
          configFile: 'karma.conf.js',
          singleRun: true,
          browsers: ['PhantomJS']
      }
    },
    watch: {
      karma: {
        files: ['client/app/**/*.js', 'Spec/unit/**/*.js'],
        tasks: ['karma:unit:run']
      }
    }
    });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');
  grunt.registerTask('devmode', ['karma:unit', 'watch']);
  grunt.registerTask('test', ['karma:travis']);

};

