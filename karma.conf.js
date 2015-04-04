module.exports = function(config){
    config.set({
    /*  root path location that will be used to resolve all relative paths in files and exclude sections, 
          Should always be the root of our project
    */
    
    basePath : '',
 
    // files to include, ordered by dependencies
    files : [
      //These are the library dependency files we need to run our tests
      'client/lib/bower_components/angular/angular.js',
      'client/lib/bower_components/angular-mocks/angular-mocks.js',
 
      //These are the actual files in our codebase we want to test
      'client/app/**/*.js',
 
      //These are the spec unit test files where our tests lives
      'Spec/unit/home.js'
    ],

    // files to exclude
    exclude : [
    ],
 
    //Karma can watch for changes on files but we are doing the watching with Grunt instead
    autoWatch : false,
 
    //Our testing frameworks (e.g. Jasmine, Chai, Mocha) we will have jasmine and sinon (eventually)
    frameworks: ['jasmine'],
 
    //The browsers we want to test against, we can add others such as ie
    browsers : ['Chrome', 'PhantomJS', 'Firefox'],
 
    //Reports the result of our tests, progress is the default
    reporters: ['progress'],
 
    // map of preprocessors that is used mostly for plugins (none for now)
    preprocessors: {
 
    },
 
    /*Karma plugins we need to run karma and our tests
         We need a browser launcher for each browser we want to use
         We also need karmas framework plugins
         Phamtom.js is our headless browser
    */
    plugins : [
        'karma-junit-reporter',
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-jasmine',
        'karma-phantomjs-launcher'
    ]
  });
};