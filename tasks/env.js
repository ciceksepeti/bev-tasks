/*
 * bev-tasks-env
 * http://gruntjs.com/
 *
 */

'use strict';

module.exports = function(grunt) {

    grunt.registerTask('env', 'Configure environment', function (env) {
        var config = grunt.config('env');
        if(!config){
          grunt.log.error("No 'env' task is defined");
          return;
        }
        
        env = grunt.option('env') || process.env.GRUNT_ENV || env || Object.keys(config.data)[0]; // [dev, live]
        var data = config.data[env];
        var file = {};
        
        var setConfig = function(obj,write){
          var item;
          for(item in obj){
            if(item === "file")
              setConfig(obj[item],true);
            else
              grunt.config(item, obj[item]);
              if(write)
                file[item] = obj[item];
          }
        }
        
        setConfig(data);
        
        grunt.config('env_name', env);
        grunt.log.write('Current environment: '['cyan']);
        grunt.log.writeln(env['cyan'].bold);
        
        grunt.file.write(config.dest, JSON.stringify(file));
    });

};
