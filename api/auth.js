module.exports = function(api) {
  api.route('/api/v1/login')
    .get(function(req, res) {
      res.send(200);
    });
};
