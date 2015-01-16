import _ from 'lodash';
import Backbone from 'backbone';
import View from '../common/view';
import template from './template.hbs';

export default class HeaderView extends View {
  get template() {
    return template;
  }

  get tagName() {
    return 'nav';
  }

  get className() {
    return 'header navbar navbar-default navbar-fixed-top';
  }

  get attributes() {
    return {
      role: 'navigation'
    };
  }

  get collectionEvents() {
    return {
      'all': 'render'
    };
  }

  templateHelpers() {
    return {
      primaryItems   : this.serializeWhere({ type: 'primary' }),
      secondaryItems : this.serializeWhere({ type: 'secondary' })
    };
  }

  serializeWhere(props) {
    return _.invoke(this.collection.where(props), 'toJSON');
  }

  ui() {
    return {
      collapse: '#navbar-collapse'
    };
  }

  events() {
    return {
      'show.bs.collapse #navbar-collapse' : 'onCollapseShow'
    };
  }

  onCollapseShow() {
    this.listenToOnce(Backbone.history, 'route', function() {
      this.ui.collapse.collapse('hide');
    });
  }
}
