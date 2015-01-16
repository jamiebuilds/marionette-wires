import _ from 'lodash';
import CompositeView from '../../common/composite-view';
import Collection from '../../common/collection';
import ItemView from './item-view';
import template from './composite-template.hbs';

export default class ColorsIndexView extends CompositeView {
  get template() {
    return template;
  }

  get className() {
    return 'colors colors--index container';
  }

  initialize(options) {
    this.state = { start: 0, limit: 20 };
    this.models = options.collection.models;
    delete this.collection;
    this.state.start = (options.page - 1) * this.state.limit;
  }

  get childView() {
    return ItemView;
  }

  get childViewContainer() {
    return 'div.list-group';
  }

  get collectionEvents() {
    return {
      'change': 'render'
    };
  }

  onBeforeRender() {
    var filtered = _.chain(this.models)
      .drop(this.state.start)
      .take(this.state.limit)
      .value();

    this.collection = new Collection(filtered);
  }

  templateHelpers() {
    var total   = Math.floor(this.models.length / this.state.limit) + 1;
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
}
