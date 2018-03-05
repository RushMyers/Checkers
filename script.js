$(document).ready(function(){
  GameBoard.create();
  GameBoard.setCheckers();

  //select which checker to move
  $('div').on("click", 'div.checker', function selectChecker(event){
    let checkerElement = event.currentTarget;
    let $checkerElement = $(checkerElement);
    let checker = checkers[$checkerElement.data('id')];

    // make sure checker belongs to player
    if (Game.currentPlayer === checker.player) {
    // only one checker at a time can be selected
      $('.isSelected').removeClass('isSelected')
      checkerElement.classList.add('isSelected');
    }
  });

  //select tile on which to place checker
  $('.tile').click(function selectTile(event){
    if (Game.isGameOver()) {
      return;
    };

    let selectedChecker = checkers[$('.isSelected').data('id')];
    let tile = tiles[event.currentTarget.id];

    if($('.isSelected').length != 0 && GameBoard.isEmpty(event.currentTarget)) {
      if (selectedChecker.canJumpTo(tile)){
        selectedChecker.jump(tile);
      }
      if(GameBoard.isLegalMove(tile, selectedChecker)){
        selectedChecker.makeMove(event.currentTarget,$('.isSelected').data('id'))
      }
    }
  });

  $('.playAgain').click(function playAgain() {
    newGame();
  })
});
var tiles = [];
var checkers = [];

function Checker(color, position) {
  this.color = color;
  this.player = '';
  this.color === 'red' ? this.player = 'player1' : this.player = 'player2';
  this.position = position;
  this.king = false;

  this.makeKing = function() {
    this.king = true;
  };

  this.canBeKing = function() {
    if (this.position[0] === 0 || this.position[0] === 7) {
      return true;
    }

    return false;
  }

  this.addKingElement = function(checkerElement) {
    if (checkerElement.has('.fa-chess-king').length) {
      return;
    }

    checkerElement.append("<i class='fas fa-chess-king king'></i>");
  },

  this.jump = function (tile) {
    let checkerId = $('.isSelected').data('id');
    let tileId = tiles.indexOf(tile);
    let jumpedCheckerIndex = this.getJumpedCheckerIndex(tile);

    GameBoard.removeChecker(checkers[jumpedCheckerIndex]);
    Game.scorePoint(this.player);

    $("[data-id=" + jumpedCheckerIndex + "]").remove();

    let $newChecker;

    if (this.player === 'player1') {
      GameBoard.board[this.position[0]][this.position[1]] = 0;
      this.position = tile;
      GameBoard.board[this.position[0]][this.position[1]] = 1;

      $('.isSelected').parent().removeClass('red').empty();

      $newChecker = $('<div/>');
      $newChecker.addClass('checker red-checker')
                 .attr('data-id', checkerId);

      $(`#${tileId}`).append($newChecker);
    } else {
      GameBoard.board[this.position[0]][this.position[1]] = 0;
      this.position = tile;
      GameBoard.board[this.position[0]][this.position[1]] = 2;

      $('.isSelected').parent().removeClass('white').empty();

      $newChecker = $('<div/>');
      $newChecker.addClass('checker white-checker')
                 .attr('data-id', checkerId);

      $(`#${tileId}`).append($newChecker);
    }

    if (this.canBeKing()) {
      this.makeKing();
      this.addKingElement($newChecker);
    };

    if (this.king) {
      this.addKingElement($newChecker);
    }

    Game.checkForWin();
    Game.changeTurns();
  };

  this.makeMove = function(newTile, checkerId) {
    let $newChecker;

    if (this.color === 'red') {
      GameBoard.board[this.position[0]][this.position[1]] = 0;
      $('.isSelected').parent().removeClass('red').empty();
      this.position = tiles[newTile.id];

      GameBoard.board[this.position[0]][this.position[1]] = 1;

      $newChecker = $('<div/>');
      $newChecker.addClass('checker red-checker')
                 .attr('data-id', checkerId);

      $(newTile).addClass('red').append($newChecker);

    } else if (this.color === 'white') {
      GameBoard.board[this.position[0]][this.position[1]] = 0;
      $('.isSelected').parent().removeClass('white').empty();
      this.position = tiles[newTile.id];
      GameBoard.board[this.position[0]][this.position[1]] = 2;

      $newChecker = $('<div/>');
      $newChecker.addClass('checker white-checker')
                   .attr('data-id', checkerId);

      $(newTile).addClass('white').append($newChecker);

    }

    if (this.canBeKing()) {
      this.makeKing();
      this.addKingElement($newChecker);
    };

    if (this.king) {
      this.addKingElement($newChecker);
    };

    Game.changeTurns();

  };

  this.canJumpTo = function(tile) {
    let x = this.position[1]
    let y = this.position[0];

    if (this.king) {
        if (
          (GameBoard.hasEnemy([y + 1, x + 1]) &&
           y + 2 === tile[0] &&
           x + 2 === tile[1]) ||
          (
           (GameBoard.hasEnemy([y + 1, x - 1]) &&
            y + 2 === tile[0] &&
            x - 2 === tile[1])
           )) {
            return true;
          }

        if (
            (GameBoard.hasEnemy([y-1, x-1]) &&
             y-2 === tile[0] &&
             x-2 === tile[1]) ||
            (
             (GameBoard.hasEnemy([y-1, x+1]) &&
              y-2 === tile[0] &&
              x+2 === tile[1])
            )
          ) {
        return true;
      }
    }

    if (this.player === 'player1') {
      if (
          (GameBoard.hasEnemy([y-1, x-1]) &&
           y-2 === tile[0] &&
           x-2 === tile[1]) ||
          (
           (GameBoard.hasEnemy([y-1, x+1]) &&
            y-2 === tile[0] &&
            x+2 === tile[1])
          )
        ) {
      return true;
      }
    } else if (this.player === 'player2') {
      if (
          (GameBoard.hasEnemy([y+1, x-1]) &&
           y+2 === tile[0] &&
           x-2 === tile[1]) ||
          (
           (GameBoard.hasEnemy([y+1, x+1]) &&
            y+2 === tile[0] &&
            x +2 === tile[1])
           )
        ) {
      return true;
      }
    }
  };

  this.getJumpedCheckerIndex = function(targetTile) {
    let y = ((targetTile[0] - this.position[0])/2) + this.position[0];
    let x = ((targetTile[1] - this.position[1])/2) + this.position[1];

    for (checkerIndex in checkers) {
      if(checkers[checkerIndex].position[0] === y && checkers[checkerIndex].position[1] === x) {
        return checkerIndex;
      }
    }
  };

};

var Game = {
  player1Score: 0,
  player2Score: 0,
  currentPlayer: 'player1',
  winner: null,

  isGameOver: function() {
    return this.winner ? true : false;
  },

  checkForWin: function() {
    if (this.player1Score === 12) {
      this.winner = 'player1';
    } else if (this.player2Score === 12) {
      this.winner = 'player2';
    }

    if (this.isGameOver()) {
      if (this.currentPlayer === 'player1') {
        if (window.confirm('Player one wins! Play again?')) {
          this.newGame();
        }
      } else if (this.currentPlayer === 'player2') {
        if (window.confirm('Player two wins! Play again?')) {
          this.newGame();
        }
      }
    }
  },

  changeTurns: function(){
    this.currentPlayer === 'player1' ? this.currentPlayer = 'player2'
      : this.currentPlayer = 'player1';
  },

  scorePoint: function(player){
    player === 'player1' ? this.player1Score ++ : this.player2Score ++ ;
    this.updateScoreBoard(player);
  },

  updateScoreBoard: function(player){
    if (player === 'player1') {
      $('.player-1-score').append('<div class="won-checker white"></div>');
    } else if (player === 'player2') {
      $('.player-2-score').append('<div class="won-checker red"></div>');
    }
  },

  newGame: function(){
   location.reload();
  }
};

var GameBoard = {
  board: [
    [ 0, 2, 0, 2, 0, 2, 0, 2],
    [ 2, 0, 2, 0, 2, 0, 2, 0],
    [ 0, 2, 0, 2, 0, 2, 0, 2],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 0],
    [ 0, 1, 0, 1, 0, 1, 0, 1],
    [ 1, 0, 1, 0, 1, 0, 1, 0],
  ],

  createCheckerElement: function(xPos, yPos, color) {
    // will abstract into separate method later
  },

  create: function() {
    let tileNo = 0;
    let checkerNo = 0;

    const $board = $('.board');
    //creates all the dark and light squares based off board array
    this.board.forEach(function(row, i) {
      row.forEach(function(column, j) {
        if (i % 2 === 0) {
          if (j % 2 === 1 && column == 2) {
            $board.append(`<div class="tile dark white" id="${tileNo}" pos="${i}, ${j}"></div>`);

            tiles[tileNo] = [i, j];
            tileNo++;

            checkers[checkerNo] = new Checker('white', [i, j]);
            checkerNo++
          } else if(j % 2 === 1 && column == 1){
              $board.append(`<div class="tile dark red" id="${tileNo}" pos="${i}, ${j}"></div>`);

              tiles[tileNo] = [i, j];
              tileNo++;

              checkers[checkerNo] = new Checker('red', [i, j]);
              checkerNo++;
          } else if(j % 2 === 1){
              $board.append(`<div class="tile dark" id="${tileNo}" pos="${i}, ${j}"></div>`);

              tiles[tileNo] = [i, j];
              tileNo++;
          } else if(j % 2 === 0){
              $board.append(`<div class="tile light" id="${tileNo}" pos="${i}, ${j}"></div>`);

              tiles[tileNo] = [i, j];
              tileNo++;
          }
        } if (i % 2 === 1) {
            if(j % 2 === 0 && column === 2 ) {
              $board.append(`<div class="tile dark white" id="${tileNo}" pos="${i}, ${j}"></div>`);

              tiles[tileNo] = [i, j];
              tileNo++;

              checkers[checkerNo] = new Checker('white', [i, j]);
              checkerNo++;
            } else if(j%2===0 && column === 1) {
                $board.append(`<div class="tile dark red" id="${tileNo}" pos="${i}, ${j}"></div>`);

                tiles[tileNo] = [i, j];
                tileNo++;

                checkers[checkerNo] = new Checker('red', [i, j]);
                checkerNo++;
            } else if(j%2===0) {
                $board.append(`<div class="tile dark" id="${tileNo}" pos="${i}, ${j}"></div>`);

                tiles[tileNo] = [i, j];
                tileNo++;
            } else if(j%2 === 1){
                $board.append(`<div class="tile light" id="${tileNo}" pos="${i}, ${j}"></div>`);

                tiles[tileNo] = [i, j];
                tileNo++;
            }
        }
      });
    });
    //create checkers
    let $whiteChecker = $("<div/>").addClass("checker white-checker");
    let $redChecker = $("<div/>").addClass("checker red-checker");

    $('.white').append($whiteChecker);
    $('.red').append($redChecker);
  },

  setCheckers: function() {
    let checkers = Array.from(document.getElementsByClassName('checker'));

    checkers.forEach(function(checker, i){
      checker.setAttribute('data-id', i);
    });
  },

  isLegalMove: function(tile, checker){
    const checkerY = checker.position[0];
    const checkerX = checker.position[1];
    const tileY = tile[0];
    const tileX = tile[1];

    if (checkerX === tileX || checkerY === tileY) {
      return false;
    }

    if (checker.king) {
      const isXChangeValid = checkerX === tileX + 1 || checkerX === tileX - 1;
      const isYChangeValid = checkerY === tileY + 1 || checkerY === tileY - 1;

      return isYChangeValid && isXChangeValid;
    }

    if (checker.player === 'player1') {
      if (checkerY > tileY &&
         ((checkerX === tileX + 1) ||
          checkerX === tileX -1)) {
          return true;
      }
    } else if(checker.player === 'player2'){
        if(checkerY < tileY &&
          ((checkerX === tileX + 1) ||
           checkerX === tileX -1)) {
            return true;
          }
      }
  },

  isEmpty: function(tile) {
    return $(tile).find('div.checker').length === 0;
  },

  hasEnemy: function(position){
    if (!this.board[position[0]] || !this.board[position[0]][position[1]]) {
      return true;
    }

    if (Game.currentPlayer === 'player1') {
      return this.board[position[0]][position[1]] === 2;
    } else {
      return this.board[position[0]][position[1]] === 1;
    }
  },

  removeChecker: function(checker) {
    GameBoard.board[checker.position[0]][checker.position[1]] = 0;
  }
}
