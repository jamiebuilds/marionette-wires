import nprogress from 'nprogress';
import Backbone from 'backbone';
import FormBehavior from '../../forms/behavior';
import View from '../../common/view';
import template from './template.hbs';

import storage from '../storage';

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

  events() {
    return {
      'submit form': 'handleSubmit'
    };
  }

  handleSubmit() {
    var errors = this.model.validate(this.form);

    if (errors) {
      this.model.validationError = errors;
      this.render();
    } else {
      nprogress.start();
      this.model.set(this.form);
      storage.save(this.model).then(() => {
        Backbone.history.navigate('colors/' + this.model.id, { trigger: true });
      });
    }
  }
}
