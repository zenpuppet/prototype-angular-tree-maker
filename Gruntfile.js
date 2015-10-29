module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "assets/bo.css": "compilers/bootstrap.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['js/**/*.js','compilers/**/*.less','dev/less/**/*.less',"./*.html","./views/**/*.html"], // which files to watch
        tasks: ['less','surge'],
        options: {
          nospawn: true
        }
      }
    },
    
    surge: {
         'accusoft_ux_workflow.surge.sh': {
           options: {
             // The path or directory to your compiled project
             project: '.',
             // The domain or subdomain to deploy to
             domain: 'ux_accusoft_ia.surge.sh'
           }
         }
       }
    
  });

  // Load in the grunt-surge plugin
  grunt.loadNpmTasks('grunt-surge'); 

  // Add a `grunt deploy` task that runs Surge
  grunt.registerTask('default', ['less', 'watch']);
};
