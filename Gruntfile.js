module.exports = function(grunt) {

	grunt.initConfig({
	
		watch: {
			grunt: {
				files: "Gruntfile.js",
				options: { reload: true },
			},
			js: {
				files: "src/js/*.js",
				tasks: ["build-js"],
			},
			templates: {
				files: "src/templates/*.html",
				tasks: ["build-templates"],
			},
			css: {
				files: "src/css/**.css",
				tasks: ["build-css"],
			},
			index: {
				files: "src/index.html",
				tasks: ["build-index"],
			}
		},
		
		clean: {
			build: ["build/**"],
			templates: ["build/utopia-templates.js"],
		},
		
		ngtemplates: {
			utopia: {
				cwd: "src/templates",
				src: "*.html",
				dest: "build/utopia-templates.js",
			}
		},
		
		uglify: {
			js: {
				files: {
					"build/js/utopia.min.js": [ "src/js/*.js", "<%= ngtemplates.utopia.dest %>" ]
				},
				options: {
					sourceMap: true,
				}
			}
		},
		
		cssmin: {
			css: {
				files: {
					"build/css/utopia.min.css": ["src/css/*.css", "!src/css/utopia-print.css"],
				}
			}
		},
		
		copy: {
			misc: {
				expand: true,
				cwd: "src",
				src: [ "js/lib/*", "fonts/*", "img/*", "data/*" ],
				dest: "build/",
			},
			css: {
				expand: true,
				cwd: "src",
				src: [ "css/utopia-print.css" ],
				dest: "build/",
			},
			csslib: {
				expand: true,
				cwd: "src/css/lib",
				src: [ "*.css" ],
				dest: "build/css/",
			},
			index: {
				expand: true,
				cwd: "src",
				src: [ "index.html" ],
				dest: "build/",
			},
		},
	
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.registerTask('build-js', ["uglify"]);
	grunt.registerTask('build-templates', ["ngtemplates","build-js","clean:templates"]);
	grunt.registerTask('build-css', ["cssmin","copy:css"]);
	grunt.registerTask('build-index', ["copy:index"]);
	
	grunt.registerTask('default', ["clean","build-templates","build-css","build-index","copy:misc"]);
	
};
