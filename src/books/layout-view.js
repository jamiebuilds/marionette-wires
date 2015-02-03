import LayoutView from '../common/layout-view';
import template from './layout-template.hbs';

export default LayoutView.extend({
  template: template,
  className: 'container',
  regions: {
    library : '.books__library',
    viewer  : '.books__viewer'
  }
});
