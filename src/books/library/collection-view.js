var CollectionView = require('../../common/collection-view');
var ItemView = require('./item-view');

module.exports = CollectionView.extend({
  className: 'list-group',
  childView: ItemView
});
