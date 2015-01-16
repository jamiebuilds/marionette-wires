import Backbone from 'backbone';
import $ from 'jquery';
Backbone.$ = $;
import Marionette from 'backbone.marionette';
import 'bootstrap';
import 'backbone.syphon';
import 'backbone-query-parameters';

// start the marionette inspector
if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}
