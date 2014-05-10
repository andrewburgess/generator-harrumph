'use strict';
var util = require('util');
var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var dive = require('dive');


var AngularGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log('\n');
    this.log(fs.readFileSync(path.join(__dirname, 'stan.txt'), { encoding: 'utf-8' }));

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('Harrumph! Harrumph harrumph harrumph!'));

    var prompts = [{
      name: 'projectName',
      message: 'Enter the project name:',
      default: path.basename(process.cwd())
    }, {
      name: 'api',
      message: 'Enter path for your API:'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.moduleName = props.projectName.replace(/\s/g, '');
      this.api = props.api;

      done();
    }.bind(this));
  },

  app: function () {
    var self = this;
    var done = this.async();

    dive(path.join(__dirname, 'templates'), { all: true, directories: true }, function (err, currentPath) {
      var stats = fs.lstatSync(currentPath);

      if (stats.isDirectory()) {
        var dir = currentPath.replace(path.join(__dirname, 'templates'), '');
        if (dir[0] === '/') {
          dir = dir.substring(1);
        }
        self.mkdir(dir);
      } else {
        if (path.basename(currentPath) && path.basename(currentPath)[0] === '_') {
          self.template(currentPath, currentPath.replace(path.join(__dirname, 'templates'), '').substring(1).replace(path.basename(currentPath), path.basename(currentPath).substring(1)));
        } else {
          self.copy(currentPath, currentPath.replace(path.join(__dirname, 'templates'), '').substring(1));
        }
      }
    }, function () {
      done();
    });
  }
});

module.exports = AngularGenerator;
