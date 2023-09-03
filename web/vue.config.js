module.exports = {
  lintOnSave : true,
  devServer  : {
    host    : 'localhost',
    https   : false,
    port    : 8080,
    overlay : {
      warnings : false,
      errors   : false
    }
  }
};
