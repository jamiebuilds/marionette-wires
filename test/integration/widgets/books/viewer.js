module.exports = function() {
  var Widget = this.Widget;

  Widget.BooksViewer = Widget.extend({
    root: '.books__viewer',
    getTitle: function() {
      return this.read('.books__title h1');
    }
  });
};
