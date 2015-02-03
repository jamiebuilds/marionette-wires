import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import _ from 'lodash';

export default Marionette.Object.extend({
  constructor() {
    if (this.channelName) {
      this.channel = Radio.channel(_.result(this, 'channelName'));
    }

    Marionette.Object.apply(this, arguments);
  },

  start() {
    this.triggerMethod('before:start');
    this._isStarted = true;
    this.triggerMethod('start');
  },

  stop() {
    this.triggerMethod('before:stop');
    this._isStarted = false;
    this.triggerMethod('stop');
  },

  isStarted() {
    return this._isStarted === true;
  }
});
