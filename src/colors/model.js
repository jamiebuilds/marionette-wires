import Model from '../common/model';

export default class ColorsModel extends Model {
  get urlRoot() {
    return '/api/colors';
  }

  get defaults() {
    return {
      active: false
    };
  }

  validate(attrs) {
    var errors = [];

    if (attrs.name === '') {
      errors.push('Missing "name" field');
    }

    if (attrs.hex === '') {
      errors.push('Missing "hex" field');
    }

    return errors.length > 0 ? errors : undefined;
  }
}
