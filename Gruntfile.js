module.exports = function(grunt) {
  /*Grab the configuration file (which is gitignored) to set the appropriate environmental variables and API Keys
      Please Make Sure:
                    1)env.config.js is a javascript file or module.exports won't work
                    2)env.config.js is gitignored or our API keys will be publicly visible
  */
  var localConfig;
  try {
    localConfig = require('./env.config');
  } catch(e) {
    localConfig = {};
  }

  grunt.initConfig({
    karma: {
      options: {
        // point all tasks to karma config file
        configFile: 'karma.conf.js'
      },
      unit: {
        singleRun: true
      },
      continuous: {
        // keep karma running in the background
        background: true
      },
      travis: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    watch: {
      karma: {
        // run the continuous karma task when on file change
        files: ['client/app/app.js','client/app/home/homeCtrl.js', 'Spec/unit/auth.js'],
        tasks: ['karma:continuous:run'] 
      }
    },
    env : {
      options : {
      //Shared Options Hash
      },
      dev : {
        NODE_ENV : 'development',
        DEST     : 'builds/dev',
        config: localConfig
      },
      build : {
        NODE_ENV : 'production',
        DEST     : 'builds/production',
        config: localConfig
      },
      all: localConfig
    }
  });
 
  // load the Grunt task
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //will run our unit tests once and report the results in Karma
  grunt.registerTask('unit-test', ['karma:unit']);

  //Use development mode while working on our codebae, it will watch for any file changes and run karma continuously
  grunt.registerTask('devmode', ['env:dev','printEnv', 'karma:continuous:start', 'watch:karma']); 

  //Test is what Travis uses to run our test suite, it is initiated in the 'scripts' section in package.json
  grunt.registerTask('test', ['karma:travis']);

 //Task to check what current env variables are (useful for debugging)
  grunt.registerTask('printEnv', 'prints a message with an env var', function() { 
    console.log('Env var in subsequent grunt task: ' + process.env.DEST, process.env);
  });

  /*These tasks will eventually be what we run for development and production, at the moment they are 
    just placeholders that print out the Node environmental variables 
  */
  grunt.registerTask('prod', ['env:build', 'printEnv']);
  grunt.registerTask('dev',  ['env:dev', 'printEnv']);
};