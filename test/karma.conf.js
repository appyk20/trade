/*global
  module
*/
'use strict';
module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'client/bower_components/jquery/dist/jquery.js',
      'client/bower_components/lodash/dist/lodash.js',
      'client/bower_components/d3/d3.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/angular-route/angular-route.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/bower_components/ng-grid/ng-grid-2.0.11.min.js',
      'client/bower_components/angular-cookies/angular-cookies.min.js',
      'client/bower_components/angularLocalStorage/src/angularLocalStorage.js',
      'client/bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
      'http://cdn.kendostatic.com/2014.1.318/js/kendo.all.min.js',
      'client/bower_components/angular-kendo/angular-kendo.js',
      'node_modules/socket.io/node_modules/socket.io-client/dist/socket.io.js',
      'client/config/*.js',
      'client/common/**/*.js',
      'client/pages/**/*.js',
      'test/unit/**/*_spec.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine', 'sinon'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-sinon',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};