/*
 * bev-tasks-contents
 * http://gruntjs.com/
 *
 */

'use strict';

var fse = require('fs-extra');

module.exports = function(grunt) {

  
      grunt.registerTask('contents', 'Copy contents to related paths', function () {
        var config = grunt.config('contents');
        var dest = config.dest;
        var src = config.src;
        var version = grunt.config('isProd') ? 'min' : 'orj';

        for (var key in src) {
            grunt.log.writeln(JSON.stringify(key)['cyan']);

            try {
                var content = src[key];
                var path = content.path;

                //grunt.log.writeln(path + ' - ' + JSON.stringify(content));

                for (var item in content) {
                    if (item != 'path') {
                        var files = content[item];
                        var hasVersion = false;

                        if (!Array.isArray(files)) {
                            if (files[version]) {
                                files = files[version];
                                hasVersion = true;
                            }

                            files = [files];
                        }

                        for (var file in files) {
                            try {
                                file = files[file];
                                var srcFile = [path, file].join('/');
                                var destFile = [dest, key, file].join('/');
                                fse.copySync(srcFile, destFile);
                                grunt.log.writeln('- '['cyan'] + srcFile['grey'] + ' copied to ' + destFile['cyan'] + (hasVersion ? ' (' + version + ')' : ''));
                            }
                            catch (e) {
                                grunt.log.error(e);
                            }
                        }
                    }
                }
            }
            catch (e) {
                grunt.log.error(e);
            }

        }
    });


};
