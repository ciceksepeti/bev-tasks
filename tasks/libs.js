/*
 * bev-tasks-libs
 * http://gruntjs.com/
 *
 */

'use strict';

var concat = require('concatenate-files');
var fse = require('fs-extra');


module.exports = function (grunt) {

    grunt.registerTask('libs', 'Concat and min project libs then copy to related paths', function () {
        var config = grunt.config('libs');
        var dest = config.dest;
        var src = config.src;
        var cwd = config.cwd;
        var version = config.version || 'orj';

        var srcFiles = [];

        try {
            var destFile = [dest, 'libs.js'].join('/');
            for (var file in src) {
                var fileName = src[file][version];
                var srcFile = [cwd, fileName].join('/');
                srcFiles.push(srcFile);
            }

            var srcData = srcFiles.filter(function (filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {
                return grunt.file.read(filepath);
            }).join(grunt.util.linefeed);

            fse.outputFileSync(destFile, srcData, 'utf8');
            grunt.log.ok('Libraries are merged to ' + destFile['cyan'] + ' (' + version + ')');

        }
        catch (e) {
            grunt.log.error(e);
        }
    });

};
