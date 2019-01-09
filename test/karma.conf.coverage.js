/**
 * Copyright 2019 PhenixP2P Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global module __dirname process */
var path = require('path');
var puppeteerExecutablePath = require('puppeteer').executablePath();
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

console.log('Coverage is using puppeteer chrome [%s]', puppeteerExecutablePath);

process.env.CHROME_BIN = puppeteerExecutablePath;

module.exports = function(config) {
    config.set({
        // Base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../src',

        // Frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],

        // List of files / patterns to load in the browser
        files: [
            '../test/test-runner.js'
        ],

        // List of files to exclude
        exclude: [
            'src/main.js'
        ],

        // Preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {'../test/test-runner.js': ['webpack', 'sourcemap']},

        webpack: {
            devtool: 'inline-source-map',
            plugins: [
                new CaseSensitivePathsPlugin()
            ],
            resolve: {alias: {'rtc': path.resolve(__dirname, '../src/rtc')}} // Resolve test dependencies to src
        },

        webpackMiddleware: {stats: 'errors-only'},

        // Test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],

        coverageReporter: {
            dir: path.resolve(__dirname, '../coverage'),
            reporters: [
                {
                    type: 'json',
                    subdir: '.'
                },
                {
                    type: 'html',
                    subdir: '.'
                },
                {
                    type: 'lcov',
                    subdir: '.'
                },
                {type: 'teamcity'},
                {type: 'text-summary'}
            ]
        },

        // Web server port
        port: 9877,

        // Enable / disable colors in the output (reporters and logs)
        colors: true,

        // Level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['ChromeHeadlessCustom'],

        customLaunchers: {
            'ChromeHeadlessCustom': {
                base: 'ChromeHeadless',
                flags: ['--no-sandbox']
            }
        },

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Calculating the coverage output sometimes takes longer than the default
        // Default = 10000 ms
        browserNoActivityTimeout: 20000
    });
};