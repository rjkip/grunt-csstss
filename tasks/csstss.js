/*
 * grunt-csstss
 * https://github.com/rjkip/grunt-css-tss
 *
 * Copyright (c) 2013 Reinier Kip
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('csstss', 'Compiles CSS to TSS (Titanium Style Sheet).', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({});

    var csstss = require("csstss");    

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Join CSS
      var css = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join("\n");

      // Compile CSS.
      var tss = csstss(css);

      // Write the destination file.
      grunt.file.write(f.dest, tss);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
