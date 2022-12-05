module.exports = {
  platforms: {
    css: {
      buildPath: 'dist/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: {
          // Look here 👇
          outputReferences: true,
        },
      }],
      transformGroup: 'css',
    },
    js: {
      buildPath: 'dist/js/',
      transforms: ['name/js/es6'],
      // map the array of token file paths to style dictionary output files
      files: [{
        format: 'javascript/es6',
        destination: 'var.js',
      }],
    },
    scss: {
      buildPath: 'dist/scss/',
      files: [
        {
          destination: '_variables.scss',
          format: 'scss/variables',
        },
      ],
      transformGroup: 'scss',
    },
  },
  source: [
    'src/**/*.tokens.json',
  ],
};
