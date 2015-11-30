'use strict';

var app = require('ampersand-app');
//var State = require('./models/AppState');
var GameModel = require('./models/GameModel');
var GameView = require('./views/GameView');
var gameCtrl = require('./controllers/gameCtrl');

app.extend({
  //state: new State()
  gameModel: new GameModel(),

  blastoff: function () {
    console.log('app has started');
    this.setListeners();
    gameCtrl.init({model: this.gameModel});


    //this.setupBoardView
  },

  setListeners: function () {
    this.listenToOnce(this, 'dom:ready', this.show);
  },





  show: function () {
    console.log('app:show');
    this.gameView = new GameView({
      model:  this.gameModel,
      el: document.getElementById("host")
    });
  }
});


module.exports = app;
