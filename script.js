$(document).ready(function(){
  GameBoard.create();
  GameBoard.setCheckers();

  $('div').on("click", 'div.checker', function selectChecker(event){ //select which checker to move
    let checkerElements = Array.from(document.getElementsByClassName('checker'));
    let checkerElement = event.currentTarget;
    let checker = checkers[checkerElement.id]
    if (Game.currentPlayer === checker.player) {  // make sure checker belongs to player *TODO: export this check
      checkerElements.forEach(function(checker) { // only one checker can be selected at a time
        checker.classList.remove('isSelected');
      });
      checkerElement.classList.add('isSelected');
    }
  });

  $('.tile').click(function selectTile(event){ //select tile on which to place checker
    let selectedChecker = checkers[$('.isSelected').attr('id')];
    let selectedTile = tiles[event.currentTarget.id];
    if($('.isSelected').length != 0 && GameBoard.isEmpty(event.currentTarget)) {
      if (selectedChecker.canJump(selectedTile)){
        selectedChecker.jump(selectedTile);
      }
      if(GameBoard.isLegalMove(selectedTile, selectedChecker)){
        selectedChecker.makeMove(event.currentTarget,$('.isSelected').attr('id'))
      }
    }
  });
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
  this.makeMove = function(newTile, checkerId) {
    if(this.color === 'red'){
      GameBoard.board[this.position[0]][this.position[1]] = 0;
      $('.isSelected').parent().removeClass('red').empty();
      this.position = tiles[newTile.id]; //update position of checker
      GameBoard.board[this.position[0]][this.position[1]] = 1;
      let $redChecker = document.createElement('div'); // *TODO - change all this to jquery
      $redChecker.classList.add('checker', 'red-checker');
      $redChecker.setAttribute('id', checkerId);
      $(newTile).addClass('red').append($redChecker);
      Game.changeTurns();
    }
    else if (this.color === 'white'){
      GameBoard.board[this.position[0]][this.position[1]] = 0;
      $('.isSelected').parent().removeClass('white').empty();
      this.position = tiles[newTile.id];
      GameBoard.board[this.position[0]][this.position[1]] = 2;
      let $whiteChecker = document.createElement('div'); //*TODO - change all this to jquery
      $whiteChecker.classList.add('checker', 'white-checker');
      $whiteChecker.setAttribute('id', checkerId);
      $(newTile).addClass('white').append($whiteChecker);
      Game.changeTurns();
    }
  };
  this.canJump = function(tile) {
    let x = this.position[1]
    let y = this.position[0];
    if (this.player === 'player1'){
      if((GameBoard.hasEnemy([y-1, x-1]) && y-2 === tile[0] &&
          x-2 === tile[1]) || ((GameBoard.hasEnemy([y-1, x+1]) &&
            y-2 === tile[0] && x+2 === tile[1]))) {
              return true
      }
    } else if(this.player === 'player2'){
          if((GameBoard.hasEnemy([y+1, x-1]) && y+2 === tile[0] &&
              x-2 === tile[1]) || ((GameBoard.hasEnemy([y+1, x+1]) &&
                y+2 === tile[0] && x +2 === tile[1]))){
            return true;
          }
      }
  };
  this.jump = function(tile) {
    console.log(tile);
  };
};

var Game = {
  player1Score: 0,
  player2Score: 0,
  currentPlayer: 'player1',
  changeTurns: function(){
    this.currentPlayer === 'player1' ? this.currentPlayer = 'player2'
      : this.currentPlayer = 'player1';
  }
}
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
  create: function() {
    let tileNo = 0;
    let checkerNo = 0;
    this.board.forEach(function(row, i) { //creates all the dark and light squares based off board array
      row.forEach(function(column, j) {
        if (i%2 === 0) {
          if(j%2 === 1 && column == 2) {
            $('.board').append("<div class='tile dark white' id="+tileNo+"></div>");
            tiles[tileNo] = [i, j];
            tileNo++;
            checkers[checkerNo] = new Checker('white', [i, j]);
            checkerNo++
          } else if(j%2 === 1 && column == 1){
              $('.board').append("<div class='tile dark red' id="+tileNo+"></div>");
              tiles[tileNo] = [i, j];
              tileNo++;
              checkers[checkerNo] = new Checker('red', [i, j]);
              checkerNo++
          } else if(j%2 ===1){
              $('.board').append("<div class='tile dark' id="+tileNo+"></div>");
              tiles[tileNo] = [i, j];
              tileNo++;
          } else if(j%2 === 0){
              $('.board').append("<div class='tile light' id="+tileNo+"></div>");
              tiles[tileNo] = [i, j];
              tileNo++;
          }
        } if(i%2 === 1){
            if( j%2 === 0 && column === 2 ) {
              $('.board').append("<div class='tile dark white' id="+tileNo+"></div>");
              tiles[tileNo] = [i, j];
              tileNo++;
              checkers[checkerNo] = new Checker('white', [i, j]);
              checkerNo++
            } else if(j%2===0 && column === 1) {
                $('.board').append("<div class='tile dark red' id="+tileNo+"></div>");
                tiles[tileNo] = [i, j];
                tileNo++;
                checkers[checkerNo] = new Checker('red', [i, j]);
                checkerNo++
            } else if(j%2===0) {
                $('.board').append("<div class='tile dark' id="+tileNo+"></div>");
                tiles[tileNo] = [i, j];
                tileNo++;
            } else if(j%2 === 1){
                $('.board').append("<div class='tile light' id="+tileNo+"></div>");
                tiles[tileNo] = [i, j];
                tileNo++;
            }
        }
      });
    });
    let $whiteChecker = $("<div/>").addClass("checker white-checker"); //create checkers
    let $redChecker = $("<div/>").addClass("checker red-checker");
    $('.white').append($whiteChecker);
    $('.red').append($redChecker);
  },
  setCheckers: function() {
    let checkers = Array.from(document.getElementsByClassName('checker'));
    checkers.forEach(function(checker, i){
      checker.setAttribute('id', i);
    });
  },
  isLegalMove: function(tile, checker){
    if(checker.player === 'player1'){
      if(checker.position[0] > tile[0] &&
         ((checker.position[1] === tile[1] + 1) ||
          checker.position[1] === tile[1] -1)) {
          return true;
      }
    } else if(checker.player === 'player2'){
        if(checker.position[0] < tile[0] &&
          ((checker.position[1] === tile[1] + 1) ||
           checker.position[1] === tile[1] -1)) {
            return true;
          }
      }
  },
  isEmpty: function(tile){
    return $(tile).find('div.checker').length === 0;
  },
  hasEnemy: function(position){
    if(Game.currentPlayer === 'player1'){
      return this.board[position[0]][position[1]] === 2;
    } else return this.board[position[0]][position[1]] === 1;
  }
}
