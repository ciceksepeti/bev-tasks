/*
 * bev-tasks-cordova
 * http://gruntjs.com/
 *
 */

'use strict';

var fse = require('fs-extra');
var path = require('path');
var cordova = require('cordova');

module.exports = function (grunt) {

    grunt.registerTask('cordova', 'Prepare then build cordova', function (device) {
        if (!device) {
            grunt.log.error("No device is defined");
            return;
        }

        grunt.log.ok("Cordova builds have been prepearing..");

        try {
            var config = grunt.config('cordova');
            var build = config.build;
            var cdv = config.cdv;

            var prepareDevice = function (device) {

                grunt.log.ok("Cordova:" + device["cyan"] + " content has been prepearing..");

                //Set variables
                var buildFolder = build ? build + "/" : "";
                var index = buildFolder + device + ".html";

                var cdvFolder = cdv ? cdv + "/" : "";
                var cdv_www = cdvFolder + "www/";
                var cdv_merges = cdvFolder + "merges/" + device + "/";

                //Clear previous content
                fse.removeSync(cdv_www);
                fse.removeSync(cdv_merges);

                //Copy new content
                fse.copySync(buildFolder, cdv_www);
                var htmlFiles = grunt.file.expand([cdv_www + "*.html"]);
                htmlFiles.forEach(function (file) {
                    fse.removeSync(file);
                });
                fse.copySync(index, cdv_merges + "index.html");

                grunt.log.ok("Cordova:" + device["cyan"] + " content has been prepeared..");
            };

            var self = this;
            var lastDir = process.cwd();

            var done = function done() {
                var callback = self.async();
                return function over() {
                    grunt.log.writeln('The Cordova build run successfully.');
                    process.chdir(lastDir);
                    callback();
                    grunt.log.ok("Cordova:" + device["cyan"] + " content has been built..");
                };
            };

            var buildDevice = function (devices) {
                grunt.log.ok("Cordova:" + device["cyan"] + " content has been building..");
                process.chdir(cdv);
                cordova.raw["build"].call(null, devices).done(done());
            };

            var devices = [];
            if (device == "android" || device == "all") {
                prepareDevice("android");
                devices.push("android");
            }

            if (device == "ios" || device == "all") {
                prepareDevice("ios");
                devices.push("ios");
            }

            if (devices.length)
                buildDevice(devices);

        } catch (e) {
            grunt.log.error(e);
        }

    });


};
