module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		eslint: {
			gruntfile: {
				options: {
					rules: {
						camelcase: [0],
						'global-require': [0]
					}
				},
				files: {
					src: ['Gruntfile.js']
				}
			},
			buildfile: {
				options: {
					globals: ['LEGACY_SUPPORT', 'svgpolyfill'],
					rules: {
						'no-magic-numbers': [0],
						'no-unused-vars': [0]
					}
				},
				files: {
					src: ['lib/svgpolyfill.js']
				}
			}
		},
		jscs: {
			gruntfile: {
				options: {
					requireCamelCaseOrUpperCaseIdentifiers: null
				},
				files: {
					src: ['Gruntfile.js']
				}
			},
			buildfile: {
				files: {
					src: ['lib/svgpolyfill.js']
				}
			}
		},
		uglify: {
			build: {
				files: {
					'dist/svgpolyfill.js': ['dist/svgpolyfill.legacy.js']
				},
				options: {
					beautify: {
						beautify: true,
						bracketize: true
					},
					compress: {
						global_defs: {
							LEGACY_SUPPORT: false
						}
					},
					mangle: false,
					preserveComments: 'some'
				}
			},
			buildmin: {
				files: {
					'dist/svgpolyfill.min.js': ['dist/svgpolyfill.legacy.js']
				},
				options: {
					compress: {
						global_defs: {
							LEGACY_SUPPORT: false
						}
					},
					mangle: true,
					preserveComments: false
				}
			},
			legacy: {
				files: {
					'dist/svgpolyfill.legacy.js': ['dist/svgpolyfill.legacy.js']
				},
				options: {
					beautify: {
						beautify: true,
						bracketize: true
					},
					compress: {
						global_defs: {
							LEGACY_SUPPORT: true
						}
					},
					mangle: false,
					preserveComments: 'some'
				}
			},
			legacymin: {
				files: {
					'dist/svgpolyfill.legacy.min.js': ['dist/svgpolyfill.legacy.js']
				},
				options: {
					compress: {
						global_defs: {
							LEGACY_SUPPORT: true
						}
					},
					mangle: true,
					preserveComments: false
				}
			}
		},
		umd: {
			build: {
				options: {
					src: 'lib/svgpolyfill.js',
					dest: 'dist/svgpolyfill.legacy.js',
					globalAlias: 'svgpolyfill',
					objectToExport: 'svgpolyfill'
				}
			}
		},
		watch:  {
			files: ['lib/svgpolyfill.js'],
			tasks: ['test', 'build']
		}
	});

	require('load-grunt-tasks')(grunt);

	// npm run test
	grunt.registerTask('test', ['eslint', 'jscs']);

	// npm run build, grunt build
	grunt.registerTask('build', ['test', 'umd', 'uglify']);

	// npm run watch, grunt build:watch
	grunt.registerTask('build:watch', ['build', 'watch']);

	// grunt
	grunt.registerTask('default', ['build']);
};
