import Marionette from 'backbone.marionette';

export default class Store extends Marionette.Object {
  constructor() {
    this.records = new this.collection();
    this.listenToOnce(this.records, 'sync', () => {
      this._hasSynced = true;
    });
    super(...arguments);
  }

  _ensureModel(model) {
    if (model instanceof this.model) {
      return model;
    } else if (typeof model === 'object') {
      return new this.model(model);
    } else {
      return new this.model({ id: model });
    }
  }

  insert(model) {
    this.records.add(model);
    return Promise.resolve(model);
  }

  save(model) {
    var record = this.records.get(model);
    model = this._ensureModel(model);
    return Promise.resolve(model.save()).then(() => {
      if (!record) {
        this.insert(model);
      }
      return model;
    });
  }

  find(model) {
    var record = this.records.get(model);
    if (record) {
      return Promise.resolve(record);
    } else {
      model = this._ensureModel(model);
      return Promise.resolve(model.fetch()).then(() => {
        return this.insert(model);
      });
    }
  }

  findAll(force) {
    if (this._hasSynced && !force) {
      return Promise.resolve(this.records);
    } else {
      return Promise.resolve(this.records.fetch()).then(() => {
        return this.records;
      });
    }
  }
}
