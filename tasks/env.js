/*
 * bev-tasks-env
 * http://gruntjs.com/
 *
 */

'use strict';

module.exports = function(grunt) {

      grunt.registerTask('env', 'Configure environment', function (env) {
        //Setting default environment / TODO: it should be overwritten when deploy project on octopus.
        env = grunt.option('env') || process.env.GRUNT_ENV || env || grunt.config('env') || 'dev'; // [dev, live]
        grunt.config('env', env);

        grunt.log.write('Current environment: '['cyan']);
        grunt.log.writeln(grunt.config('env')['cyan'].bold);

        grunt.config('isProd', env != 'dev');
        grunt.config('isDev', env == 'dev');

        grunt.task.run('json_generator:' + env);
    });

};
