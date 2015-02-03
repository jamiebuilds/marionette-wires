import View from '../../common/view';
import template from './template.hbs';

export default View.extend({
  template: template,
  modelEvents: {
    'all': 'render'
  }
});
