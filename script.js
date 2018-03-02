$(document).ready(function(){
  gameBoard.create();

  // $('.tile').click(function(event){
  //   let tile = event.currentTarget;
  //   if((tile.classList.contains('red') && game.turn === 'player1') ||
  //      (tile.classList.contains('white') && game.turn === 'player2')) {
  //       checkers[].selectChecker(tile);
  //   }
  // });
  $('.checker').click(function(event){
    let checker = event.currentTarget;
    let tile = event.currentTarget.parentElement;
    console.log(tiles[tile.id]);
    $('div.isSelected').removeClass('.isSelected');
    checker.classList.add('isSelected');
  })
});

var tiles = [];
var checkers = [];

function Checker(color, position) {
  this.color = color;
  this.player = '';
  this.color === 'red' ? this.player = 'player1' : this.player = 'player2';
  this.position = position;
  this.selectChecker = function() {
    console.log(checker);
    tile.classList.add('isSelected');
  }
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
  }
}

var game = {
  player1Score: 0,
  player2Score: 0,
  turn: 'player1',
  changeTurns: function(){
    console.log('change turns');
  }
}



