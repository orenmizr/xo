var View = require('ampersand-view');
var templates = require('../templates');

module.exports = View.extend({
  template: templates.board,
  autoRender: true,
  initialize: function() {
    console.log('view:initializing');
    this.setListeners();
  },

  setListeners: function () {
    this.listenTo(this.model, 'board:update', this.onBoardChange)
  },

  events: {
    'click .cell': 'onCellClick'
  },

  onCellClick: function (e) {
    console.log(e.target.dataset);
    this.model.set({dataset: e.target.dataset});
    console.log(this.model.currentPosition);
    console.log('symbol:', this.model.currentSymbol);
  },

  onBoardChange: function (pos) {
    var id = '' + this.model.currentPosition.row + this.model.currentPosition.col;
    document.getElementById(id).innerHTML = this.model.currentPlayer.symbol;
  }
});
