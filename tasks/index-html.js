/*
 * bev-tasks-index-html
 * http://gruntjs.com/
 *
 */

'use strict';

var pp = require('preprocess');
var _ = require('underscore');

module.exports = function(grunt) {

   //Generator for index.html
    grunt.registerTask('index', 'Generate index.html depending on configuration', function () {
        try {
            var config = grunt.config('index');
            var src = config.src;
            var devices = config.devices;
            var platforms = config.platforms;
            var dest = config.dest;
            var tmpl = grunt.file.read(src);
            var callback = config.callback;

            ////Custom delimiters
            //grunt.template.addDelimiters('customDelimiters', '<#', '#>');
            //grunt.template.setDelimiters('customDelimiters');

            if (devices && platforms) {

                platforms.forEach(function (platform,pi) {

                    devices.forEach(function (device,di) {
                        var outFile = [dest, platform, device].join('/') + '.html';
                        var config = _.extend({
                          device: device,
                          platform: platform,
                        },callback ? callback(device,platform,dest,src) : {});
                        
                        var content = pp.preprocess(tmpl, config);

                        grunt.file.write(outFile, content);
                        grunt.log.ok('File generated for [' +  platform[['magenta','grey'][pi]] + '|' + device['cyan'] + '] \t in ' + outFile);
                    });
                });
            }
        }
        catch (e) {
            grunt.log.error(e);
        }
    });

};
