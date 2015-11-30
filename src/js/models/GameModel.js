var AmpersandState = require('ampersand-state');
var config = require('../config');

module.exports = AmpersandState.extend({
  props: {
    board: 'array',
    currentPlayer: 'object',
    isGameOver:  ['boolean', true, false],
    players: 'array',
    dataset: 'object'
  },

  derived: {
    currentPosition: {
      deps: ['dataset'],
      fn: function () {
        var self = this;
        return {
          row: parseInt(self.dataset.row, 10),
          col: parseInt(self.dataset.col, 10)
        };
      }
    },
    currentSymbol: {
      deps: ['dataset'],
      fn: function () {
        return this.dataset.symbol;
      }
    }
  },

  initialize: function () {
    this.initializeBoard();
    this.initializePlayers();
    this.initializeTurn();
  },

  initializeBoard: function () {
    var rows= config.boardSize, cols= config.boardSize;
    var b = [];
    for(var r=0;r<rows;r++){
      b[r] = [];
      for(var c=0;c<cols;c++){
        b[r][c] = '';
      }
    }
    this.board = b;
  },

  initializePlayers: function () {
    this.players = [{
      symbol: 'X',
      name: 'player1'
    },
      {
        symbol: 'O',
        name: 'player2'
      }
    ]
  },

  initializeTurn: function () {
    this.currentPlayer = this.players[0];
  }
});
