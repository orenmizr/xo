//var app = require('../app');
var Events = require('ampersand-events');
var assign = require('lodash.assign');

var config = require('../config');

var gameCtrl = {};
Events.createEmitter(gameCtrl);

assign(gameCtrl, {
  init: function (options) {
    this.model = options.model;
    this.setListeners();



    this.play();
  },

  setListeners: function () {
    this.listenTo(this.model, 'change:currentPosition', this.currentPositionChanged);
    this.listenTo(this.model, 'board:update', this.onBoardUpdate)

  },


  play: function () {
    console.log('game:play');

  },

  currentPositionChanged: function () {
    console.log('gameCtrl:currentPositionChanged');
    if (this.isValidMove()) {
      this.updateBoard();
    }
  },

  isValidMove: function () {
    return (this.model.currentSymbol === config.CONST.EMPTY)

  },

  updateBoard: function () {
    var row = this.model.currentPosition.row, col = this.model.currentPosition.col;
    this.model.board[row][col] = this.model.currentPlayer.symbol;
    this.model.trigger('board:update',{row: row, col: col});
    window.xboard = this.model.board;
  },

  onBoardUpdate: function () {
    if(this.isGameOver()) {
      alert('game over');
    }
    else {
      this.switchTurns()
    }
  },

  isGameOver: function () {
    return (this._isRowStreak() && this._isColStreak() && this._isDiagStreak());
  },


  // HELPERS

  _isRowStreak: function () {
    var r = this.currentPosition.row, c = this.currentPosition.col, b = this.board, s = this.currentPlayer.Symbol;
    var isStreak = true;
    for (var i = 0; i < c.length; i++) {
      if (b[r][i] !== s) {
        isStreak = false;
        break;
      }
    }
    return isStreak;
  },

  _isColStreak: function () {
    var r = this.currentPosition.row, c = this.currentPosition.col, b = this.board, s = this.currentPlayer.Symbol;
    var isStreak = true;
    for (var i = 0; i < r.length; i++) {
      if (b[i][c] !== s) {
        isStreak = false;
        break;
      }
    }
    return isStreak;
  },

  _isDiagStreak: function () {
    var r = this.currentPosition.row, c = this.currentPosition.col, b = this.board, s = this.currentPlayer.Symbol;
    var isStreak = true;

    if ((r == c) || (r + c == config.board.cols - 1 )) {
      // first diag \
      for (var i = 0, j = 0; i < r.length; i++, j++) {
        if (b[i][j] !== s) {
          isStreak = false;
          break;
        }
      }
      if (isStreak == false) {
        return isStreak;
      }
      // second diag / if needed
      for (i = 0, j = config.board.cols - 1; i < r.length; i++, j--) {
        if (b[i][j] !== s) {
          isStreak = false;
          break;
        }
      }

      return isStreak;

    }

  }
});


module.exports = gameCtrl;
