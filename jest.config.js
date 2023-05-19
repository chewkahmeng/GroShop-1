module.exports = {
    reporters: [
      'default',
      [ 'jest-junit', {
        outputDirectory: testreport,
        outputName: report,
      } ]
    ]
  };