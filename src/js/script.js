var app = require('./app');
var domready = require('domready');

domready(function(){
  app.trigger('dom:ready');
});

app.blastoff();
