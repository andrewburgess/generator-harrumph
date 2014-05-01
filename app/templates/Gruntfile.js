// Generated on 2014-04-05 using generator-angular-fullstack 1.3.3
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var config = require('./config');
var path = require('path');

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },
    express: {
      options: {
        port: config.server.port
      },
      dev: {
        options: {
          script: 'app.js',
          debug: true
        }
      },
      prod: {
        options: {
          script: 'dist/app.js',
          node_env: 'production'
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%= express.options.port %>'
      }
    },
    watch: {
      js: {
        files: ['<%= yeoman.app %>/js/**/*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: true
        }
      },
      mochaTest: {
        files: ['test/server/**/*.js'],
        tasks: ['mochaTest']
      },
      jsTest: {
        files: ['test/client/spec/**/*.js'],
        tasks: ['newer:jshint:test', 'livetest']
      },
      styles: {
        files: ['<%= yeoman.app %>/stylus/**/*.styl'],
        tasks: ['stylus', 'newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/views/**/*.{html,jade}',
          '{.tmp,<%= yeoman.app %>}/css/**/*.css',
          '{.tmp,<%= yeoman.app %>}/js/**/*.js',
          '<%= yeoman.app %>/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ],

        options: {
          livereload: true
        }
      },
      express: {
        files: [
          'app.js',
          'server.js',
          'routes/**/*.js',
          'config/**/*.js',
          'lib/**/*.{js,json}'
        ],
        tasks: ['newer:jshint:server', 'express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      },
      bower: {
        files: ['bower.json', '<%= yeoman.app %>/bower_components/**/*.*'],
        tasks: ['bowerInstall'],
        options: {
          event: ['added', 'deleted'],
        }
      },
      fileblocks: {
        files: [ '<%= yeoman.app %>/js/**/*.js' ],
        tasks: [ 'fileblocks' ],
        options: {
          event: ['added', 'deleted']
        }
      }
    },

    stylus: {
      compile: {
        options: {
          compress: true,
          paths: ['node_modules/grunt-contrib-stylus/node_modules'],
          use: [require('fluidity')]
        },
        files: {
          '<%= yeoman.app %>/css/style.css': 'app/stylus/style.styl'
        },
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      server: {
        src: [ 'lib/**/*.js', 'routes/**/*.js', 'config/**/*.js', '!config/**/config.dev.js']
      },
      all: [
        '<%= yeoman.app %>/js/**/*.js',
        '!<%= yeoman.app %>/js/vendor/**/*.js'
      ],
      test: {
        src: ['test/client/spec/**/*.js'],
        options: {
          jshintrc: 'test/.jshintrc'
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*',
            '!<%= yeoman.dist %>/Procfile'
          ]
        }]
      },
      heroku: {
        files: [{
          dot: true,
          src: [
            'heroku/*',
            '!heroku/.git*',
            '!heroku/Procfile'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: '**/*.css',
          dest: '.tmp/css/'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/css',
          src: '**/*.css',
          dest: '<%= yeoman.app %>/css'
        }]
      }
    },

    // Use nodemon to run server in debug mode with an initial breakpoint
    nodemon: {
      debug: {
        script: 'app.js',
        options: {
          nodeArgs: ['--debug-brk'],
          env: {
            PORT: config.server.port
          },
          callback: function (nodemon) {
            nodemon.on('log', function (event) {
              console.log(event.colour);
            });

            // opens browser on initial server start
            nodemon.on('config:update', function () {
              setTimeout(function () {
                require('open')('http://localhost:8080/debug?port=5858');
              }, 500);
            });
          }
        }
      }
    },

    // Automatically inject Bower components into the app
    bowerInstall: {
      app: {
        src: '<%= yeoman.app %>/views/index.html',
        ignorePath: '<%= yeoman.app %>/',
        exclude: [
          'json3', 'es5-shim'
        ]
      }
    },

    fileblocks: {
      scripts: {
        src: '<%= yeoman.app %>/views/index.html',
        blocks: {
         'app': {
            src: [ 'js/**/*.js', '!js/vendor/**/*.js' ],
            cwd: 'app'
          },
          'vendor': {
            src: [ 'js/vendor/**/*.js' ],
            cwd: 'app'
          }
        },
        options: {
          removeFiles: true
        }
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/public/js/**/*.js',
            '<%= yeoman.dist %>/public/css/**/*.css',
            '<%= yeoman.dist %>/public/img/**/*.{png,jpg,jpeg,webp,svg}',
            '<%= yeoman.dist %>/public/css/fonts/*'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: ['<%= yeoman.app %>/views/index.html'],
      options: {
        dest: '<%= yeoman.dist %>/public'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/views/**/*.html'],
      jade: ['<%= yeoman.dist %>/views/**/*.jade'],
      css: ['<%= yeoman.dist %>/public/css/**/*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>/public'],
        patterns: {
          jade: require('usemin-patterns').jade
        }
      }
    },

    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/js',
          src: '*.js',
          dest: '.tmp/concat/js'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>/public',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            'bower_components/**/*',
            'img/**/*',
            'fonts/**/*',
            'flash/**/*'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/views',
          dest: '<%= yeoman.dist %>/views',
          src: '**/*.{html,jade}'
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/public/img',
          src: ['generated/*']
        }, {
          expand: true,
          dest: '<%= yeoman.dist %>',
          src: [
            'package.json',
            'server.js',
            'app.js',
            'config/**/*',
            'routes/**/*',
            'lib/**/*'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/bower_components/fontawesome/fonts',
          dest: '<%= yeoman.dist %>/public/fonts',
          src: '**/*'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/css',
        dest: '.tmp/css/',
        src: '**/*.css'
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles'
      ]
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Test settings
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      liveunit: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    mochaTest: {
      options: {
        reporter: 'mocha-jenkins-reporter'
      },
      src: ['test/server/**/*.js']
    },

    protractor: {
      options: {

      },
      app: {
        configFile: 'e2e.conf.js'
      }
    },

    env: {
      test: {
        NODE_ENV: 'test',
        JUNIT_REPORT_PATH: path.join(__dirname, 'test', 'reports', 'server', 'server-xunit.xml')
      },
      livetest: {
        NODE_ENV: 'livetest'
      }
    }
  });

  // Used for delaying livereload until after server has restarted
  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['newer:jshint', 'updateBlocks', 'build', 'express:prod', 'open', 'express-keepalive']);
    }

    grunt.task.run([
      'newer:jshint',
      'clean:server',
      'bowerInstall',
      'stylus',
      'concurrent:server',
      'autoprefixer',
      'express:dev',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', function(target) {
    if (target === 'server') {
      return grunt.task.run([
        'env:test',
        'mochaTest'
      ]);
    }

    else if (target === 'client') {
      return grunt.task.run([
        'clean:server',
        'env:test',
        'concurrent:test',
        'autoprefixer',
        'express:dev',
        'karma:unit',
        'protractor'
      ]);
    }

    else grunt.task.run([
      'test:server',
      'test:client'
    ]);
  });

  grunt.registerTask('livetest', function () {
    return grunt.task.run([
      'karma:liveunit'
    ]);
  });

  grunt.registerTask('build', [
    'jshint',
    'clean:dist',
    'stylus',
    'bowerInstall',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('updateBlocks', [
    'bowerInstall',
    'fileblocks'
  ]);

  grunt.registerTask('heroku', function () {
    grunt.log.warn('The `heroku` task has been deprecated. Use `grunt build` to build for deployment.');
    grunt.task.run(['build']);
  });

  grunt.registerTask('default', [
    'newer:jshint',
    'updateBlocks',
    'test',
    'build'
  ]);
};
