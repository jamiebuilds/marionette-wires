import './plugins';
import Backbone from 'backbone';
import $ from 'jquery';

import Application from './application/application';

import ModalService from './modal/service';
import HeaderService from './header/service';
import FlashesService from './flashes/service';

import IndexRouter from './index/router';
import ColorsRouter from './colors/router';
import BooksRouter from './books/router';

let app = new Application();

ModalService.setup({
  container: app.layout.overlay
});

HeaderService.setup({
  container: app.layout.header
});

FlashesService.setup({
  container: app.layout.flashes
});

$(document).ajaxError(() => {
  FlashesService.add({
    type: 'danger',
    title: 'Server Error'
  });
});

app.index = new IndexRouter({
  container: app.layout.content
});

app.colors = new ColorsRouter({
  container: app.layout.content
});

app.books = new BooksRouter({
  container: app.layout.content
});

Backbone.history.start();
