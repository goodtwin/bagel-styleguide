/*global module, require*/
module.exports = function (grunt) {
  'use strict';

  var globalConfig = {
    docs: 'docs',
    styleguide: 'sample',
    dist: {
      root: ' dist',
      docs: 'dist/docs'
    }
  };

  grunt.initConfig({
    globalConfig: globalConfig,
    pkg: grunt.file.readJSON('./package.json'),
    assemble : {
      docs: {
        options: {
          assets: '<%= globalConfig.docs  %>/assets',
          flatten: false,
          partials: ['<%= globalConfig.docs  %>/partials/*.hbs'],
          layout: '<%= globalConfig.docs  %>/layouts/default.hbs',
          data: ['<%= globalConfig.docs  %>/data/*.{json,yml}','config.{json,yml}']
        },
        files: [{
          expand: true,
          cwd: '<%= globalConfig.styleguide  %>',
          src: ['**/*.hbs'],
          dest: '<%= globalConfig.dist.docs  %>'
        }]
      }
    },
    clean: {
      docs: {
        files : [
        {
          dot: true,
          src: ['<%= globalConfig.dist.docs  %>/*']
        }
        ]
      }
    },
    copy: {
      docs: {
        files: [
        {
          expand: true,
          cwd: '<%= globalConfig.docs  %>/assets/',
          src: ['images/*', 'javascripts/**/*.js'],
          dest: '<%= globalConfig.dist.docs  %>/assets/'
        },
        {
          expand: true,
          cwd: '<%= globalConfig.docs  %>/assets/',
          src: ['stylesheets/*.css'],
          dest: '<%= globalConfig.dist.docs  %>/'
        }
        ]
      }
    },
    sass: {
      styleguide: {
        files : {
          '<%= globalConfig.dist.docs  %>/stylesheets/styleguide.css': '<%= globalConfig.styleguide  %>/styleguide.scss'
        }
      },
    },
    watch: {
      hbs: {
        files: ['**/*.hbs'],
        tasks: ['assemble:docs']
      }
    }
  });

require('load-grunt-tasks')(grunt);
grunt.loadNpmTasks('assemble');

grunt.registerTask('default', ['build']);
grunt.registerTask('docs', ['copy:docs', 'sass:styleguide', 'assemble']);
grunt.registerTask('build', ['clean', 'docs']);

};
