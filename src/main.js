import './plugins';
import Backbone from 'backbone';

import Application from './application/application';

import ModalModule from './modal/module';
import HeaderModule from './header/module';
import FlashesModule from './flashes/module';
import IndexModule from './index/module';
import ColorsModule from './colors/module';
import BooksModule from './books/module';

let app = new Application();

app.module('modal', {
  moduleClass: ModalModule,
  container: app.layout.overlay
});

app.module('header', {
  moduleClass: HeaderModule,
  container: app.layout.header
});

app.module('flashes', {
  moduleClass: FlashesModule,
  container: app.layout.flashes
});

app.module('index', {
  moduleClass: IndexModule,
  container: app.layout.content
});

app.module('colors', {
  moduleClass: ColorsModule,
  container: app.layout.content
});

app.module('books', {
  moduleClass: BooksModule,
  container: app.layout.content
});

Backbone.history.start();
