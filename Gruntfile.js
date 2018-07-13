module.exports = function(grunt) {

  grunt.initConfig({
  	files:{
  		server: ['./app.js', './app_server/routes/*.js', './app_server/controllers/*.js', './app_api/**/*.js', './bin/www'],
  		compass: ['./compass/*.scss'],
  		livereload: [
  			'./app_server/views/*.pug', './public/css/style.css', './public/js/**/*.js', './public/js/*.js'

  			],
		concat: ['./public/js/*.js', './public/js/**/*js'],
		uglify: ['./public/js/app.concat.js']
  	},
  	express: {
	    options: {
	      // Override defaults here
	    },
	    dev: {
	      	options: {
	        	script: './bin/www'
	      	}
	    },
	    prod: {
	      	options: {
	        	script: '.bin/www',
	        	node_env: 'production'
	      	}
	    },
	    test: {
	      	options: {
	        	script: 'bin/www',
	        	node_env: 'test'
      		}
    	}
  		
  	},
  	compass:{
  		dist:{
  			options:{
  				sassDir: './compass',
  				cssDir: './public/css'
  			}
  		}
  	},
    jshint: {
      	files: ['Gruntfile.js', './server/routes/*.js', './public/js/**/*.js'],
      	options: {
        	globals: {
          		jQuery: true
        	}
      	}
    },
    concat: {
	    options: {
	      	separator: ';',
	    },
	    dist: {
	      	src: ['<%= files.concat %>'],
	      	dest: './public/js/app.concat.js',
	    },
	},
	uglify: {
		options: {
			mangle: false
		},
		files: {'./public/js/app.min.js': ['<%= files.uglify %>']}
	},
    watch: {
    	options:{
    		livereload: true
    	},
    	express: {
	      	files:  [ '<%= files.server %>' ],
	      	tasks:  [ 'express:dev' ],
	      	options: {
    			spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
	      	}
    	},
    	compass: {
    		files: [ '<%= files.compass %>'],
    		tasks: ['compass:dist']
    	},
    	concat: {
    		files: ['<%= files.concat %>'],
    		tasks: ['concat:dist']
    	},
    	uglify:{
    		files: ['<%= files.uglify %>'],
    		tasks: ['uglify']
    	},
    	html: {
    		files: ['<%= files.livereload %>']
    	}
      //files: ['<%= jshint.files %>'],
      //tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html2js');

  grunt.registerTask('default', ['express:dev', 'watch']);

};
