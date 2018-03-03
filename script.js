$(document).ready(function(){
  gameBoard.create();
  gameBoard.setCheckers();
  });

  $('.checker').click(function(event){
    let checkerElements = Array.from(document.getElementsByClassName('checker'));
    let checkerElement = event.currentTarget;
    let checker = checkers[checkerElement.id]
    if (game.currentPlayer === checker.player) {  // make sure checker belongs to player
      checkerElements.forEach(function(checker) { // only one checker can be selected at a time
        checker.classList.remove('isSelected');
      });
      checkerElement.classList.add('isSelected');
    }
  });

  $('.tile').click(function(event){
    if($('.isSelected').length != 0) {
      let selectedChecker = checkers[$('.isSelected').attr('id')];
      if(isLegalMove(tiles[event.currentTarget.id], selectedChecker)){
        makeMove(event.currentTarget, selectedChecker, $('.isSelected').attr('id'))
      }
    }
  });
  function makeMove(newTile, checker, checkerId){
    console.log('make move', newTile, checker, $('.isSelected').parent());
    console.log(checkerId);
    if(checker.color === 'red'){
      $('.isSelected').parent().removeClass('red').empty();
      checker.position = tiles[newTile.id];
      let $redChecker = document.createElement('div');
      $redChecker.classList.add('checker', 'red-checker');
      $redChecker.setAttribute('id', checkerId);
      newTile.classList.add('red');
      newTile.appendChild($redChecker);
      game.changeTurns();
    } else if (checker.color === 'white'){
      $('.isSelected').parent().removeClass('white').empty();
      checker.position = tiles[newTile.id];
      let $whiteChecker = document.createElement('div');
      $whiteChecker.classList.add('checker', 'white-checker');
      $whiteChecker.setAttribute('id', checkerId);
      newTile.classList.add('white');
      newTile.appendChild($whiteChecker);
      game.changeTurns();
    }
  }
  function isLegalMove(tile, checker){
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
          } else return false;
      }
  }


var tiles = [];
var checkers = [];

function Checker(color, position) {
  this.color = color;
  this.player = '';
  this.color === 'red' ? this.player = 'player1' : this.player = 'player2';
  this.position = position;
}

var gameBoard = {
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
    this.board.forEach(function(row, i) {
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
    let $whiteChecker = $("<div/>").addClass("checker white-checker");
    let $redChecker = $("<div/>").addClass("checker red-checker");
    $('.white').append($whiteChecker);
    $('.red').append($redChecker);
  },
  setCheckers: function() {
    let checkers = Array.from(document.getElementsByClassName('checker'));
    checkers.forEach(function(checker, i){
      checker.setAttribute('id', i);
    });
  }
}

var game = {
  player1Score: 0,
  player2Score: 0,
  currentPlayer: 'player1',
  changeTurns: function(){
    this.currentPlayer === 'player1' ? this.currentPlayer = 'player2'
      : this.currentPlayer = 'player1';
  }
}



