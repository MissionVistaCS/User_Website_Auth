var
  express = require('express'),
  fs = require('fs'),
  path = require('path'),
  router = express.Router();

/**
 * returns all folder names in `srcpath` directory
 * @param srcpath {String} Directory you want to get folder names from
 * @return {Array} all folder names in `srcpath` directory
 */
function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    path.resolve(__dirname, file);
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
};

/**
  To create a hash out of a password
  And to check if one hash is the same as another
*/
String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

String.prototype.SameAsHash = function(y) {
  if(this.hashCode() == y)
  {
    return true;
  }
  return false;
}

/**
 * function is called when file is `required`
 */
module.exports = function(app) {
  // Use /api prefix for all routes
  app.use('/api', router);

  // Get all folder names in current directory
  var folders = getDirectories(__dirname);
  for (var i = folders.length - 1; i >= 0; i--) {
    // Call every route file in each folder
    fs.readdirSync(__dirname + '/' + folders[i]).forEach(function(file) {
      if (file == 'index.js') return;
      
      var name = file.substr(0, file.indexOf('.'));
      require('./' + folders[i] + '/' + name)(router);
    });
  };
};