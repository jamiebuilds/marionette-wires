import nprogress from 'nprogress';
import View from '../../common/view';
import FormBehavior from '../../forms/behavior';
import _ from 'lodash';
import Backbone from 'backbone';
import template from './template.hbs';

export default class ColorsCreateView extends View {
  get template() {
    return template;
  }

  get className() {
    return 'colors colors--create container';
  }

  get behaviors() {
    return {
      form: { behaviorClass: FormBehavior }
    };
  }

  templateHelpers() {
    return {
      errors: this.errors
    };
  }

  initialize() {
    _.bindAll(this, 'handleSaveSuccess');
  }

  get events() {
    return {
      'submit form': 'handleSubmit'
    };
  }

  handleSubmit() {
    var errors = this.model.validate(this.form);

    if (!errors) {
      nprogress.start();
      this.model.save(this.form).done(this.handleSaveSuccess);
    } else {
      this.errors = errors;
      this.render();
    }
  }

  handleSaveSuccess() {
    this.collection.add(this.model);
    Backbone.history.navigate('colors', { trigger: true });
  }
}
