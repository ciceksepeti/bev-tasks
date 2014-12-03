/*
 * bev-tasks-teamcity
 * http://gruntjs.com/
 *
 */

'use strict';

var teamcity = require('teamcity-properties');

module.exports = function (grunt) {

    grunt.registerTask('teamcity', 'Configure teamcity for cordova build', function () {
        var config = grunt.config('teamcity-cordova');
        var device = teamcity["device"];
        grunt.task.run("cordova:" + device);
    });

};
