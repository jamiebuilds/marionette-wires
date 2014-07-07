var CollectionView = require('../classes/collection-view');
var ItemView = require('./item-view');

module.exports = CollectionView.extend({
  childView: ItemView,
  className: 'container'
});
