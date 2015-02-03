import _ from 'lodash';
import LayoutView from '../../common/layout-view';
import CollectionView from './collection-view';
import Collection from '../../common/collection';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'colors colors--index container',

  regions: {
    list: '.colors__list'
  },

  initialize(options) {
    this.state = { start: 0, limit: 20 };
    this.state.start = (options.page - 1) * this.state.limit;
  },

  onBeforeRender() {
    var filtered = _.chain(this.collection.models)
      .drop(this.state.start)
      .take(this.state.limit)
      .value();

    this.filteredCollection = new Collection(filtered);
  },

  onAttach() {
    this.collectionView = new CollectionView({
      collection: this.filteredCollection
    });

    this.list.show(this.collectionView);
  },

  templateHelpers() {
    var total   = Math.floor(this.collection.length / this.state.limit) + 1;
    var current = Math.floor(this.state.start / this.state.limit) + 1;

    var pages = _.times(total, function(index) {
      return {
        current : index + 1 === current,
        page    : index + 1
      };
    });

    var prev = current - 1 > 0     ? current - 1 : false;
    var next = current + 1 < total ? current + 1 : false;

    return {
      total   : total,
      current : current,
      pages   : pages,
      prev    : prev,
      next    : next
    };
  }
});
