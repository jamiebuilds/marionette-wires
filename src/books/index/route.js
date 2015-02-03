import Route from '../../common/route';
import storage from '../storage';

export default Route.extend({
  fetch() {
    return storage.findAll().then(collection => {
      this.collection = collection;
    });
  },

  onEnter() {
    var id = this.collection.first().get('id');
    this.navigate('books/' + id, {
      trigger: true,
      replace: true
    });
  }
});
