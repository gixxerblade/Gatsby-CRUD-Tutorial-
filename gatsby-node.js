const path = require(`path`)
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`)
}
// Create blog pages dynamically
exports.onCreateWebpackConfig = ({
    stage,
    actions,
    getConfig
  }) => {
    if (stage === 'build-html') {
      actions.setWebpackConfig({
        externals: getConfig().externals.concat(function(context, request, callback) {
          const regex = /^@?firebase(\/(.+))?/;
          // exclude firebase products from being bundled, so they will be loaded using require() at runtime.
          if (regex.test(request)) {
            return callback(null, 'umd ' + request);
          }
          callback();
        })
      });
    }
  };