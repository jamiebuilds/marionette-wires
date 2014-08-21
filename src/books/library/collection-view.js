var CollectionView = require('src/common/collection-view');
var ItemView = require('./item-view');

module.exports = CollectionView.extend({
  className: 'list-group',
  childView: ItemView
});
