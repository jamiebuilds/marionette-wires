import nprogress from 'nprogress';
import {history} from 'backbone';
import FormBehavior from '../../forms/behavior';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import storage from '../storage';

export default ItemView.extend({
  template: template,
  className: 'colors colors--edit container',

  behaviors: {
    form: { behaviorClass: FormBehavior }
  },

  templateHelpers() {
    return {
      errors: this.model.validationError
    };
  },

  events: {
    'submit form': 'handleSubmit'
  },

  handleSubmit() {
    let errors = this.model.validate(this.form);

    if (errors) {
      this.model.validationError = errors;
      this.render();
    } else {
      nprogress.start();
      this.model.set(this.form);
      storage.save(this.model).then(() => {
        history.navigate('colors/' + this.model.id, { trigger: true });
      });
    }
  }
});
