import nprogress from 'nprogress';
import Backbone from 'backbone';
import FormBehavior from '../../forms/behavior';
import _ from 'lodash';
import View from '../../common/view';
import template from './template.hbs';

export default class ColorsEditView extends View {
  get template() {
    return template;
  }

  get className() {
    return 'colors colors--edit container';
  }

  get behaviors() {
    return {
      form: { behaviorClass: FormBehavior }
    };
  }

  templateHelpers() {
    return {
      errors: this.model.validationError
    };
  }

  initialize() {
    _.bindAll(this, 'handleSaveSuccess');
  }

  events() {
    return {
      'submit form': 'handleSubmit'
    };
  }

  handleSubmit() {
    var errors = this.model.validate(this.form);

    if (!errors) {
      nprogress.start();
      this.model
        .save(this.form)
        .done(this.handleSaveSuccess);
    } else {
      this.model.validationError = errors;
      this.render();
    }
  }

  handleSaveSuccess() {
    Backbone.history.navigate('colors/' + this.model.id, { trigger: true });
  }
}
