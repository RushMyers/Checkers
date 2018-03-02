$(document).ready(function(){
  setBoard();
  handleClicks();
});

var gameBoard = [
    [ 0, 2, 0, 2, 0, 2, 0, 2],
    [ 2, 0, 2, 0, 2, 0, 2, 0],
    [ 0, 2, 0, 2, 0, 2, 0, 2],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0],
    [ 1, 0, 1, 0, 1, 0, 1, 0],
    [ 0, 1, 0, 1, 0, 1, 0, 1],
    [ 1, 0, 1, 0, 1, 0, 1, 0],
]

var tiles = [];

function handleClicks(){
  $('div.white-checker').on("click", function( event) { selectChecker(event.target); });
  $('div.white-checker').on("click", function( event) { selectChecker(event.target); });
}

function setBoard() {
  let tileNo = 0;
  gameBoard.forEach(function(row, i) {
    row.forEach(function(column, j) {
      if (i%2 === 0) {
        if(j%2 === 1 && column == 2) {
          $('.board').append("<div class='tile dark white' id="+tileNo+"></div>");
          tiles[tileNo] = [i, j];
          tileNo++;
        } else if(j%2 === 1 && column == 1){
            $('.board').append("<div class='tile dark red' id="+tileNo+"></div>");
            tiles[tileNo] = [i, j];
            tileNo++;
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
          } else if(j%2===0 && column === 1) {
              $('.board').append("<div class='tile dark red' id="+tileNo+"></div>");
              tiles[tileNo] = [i, j];
              tileNo++;
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
  let $whiteChecker = $("<div/>").addClass("white-checker");
  let $redChecker = $("<div/>").addClass("red-checker");
  $('.white').append($whiteChecker);
  $('.red').append($redChecker);
}

function selectChecker(checker) {
  checker.classList.add('isSelected');
}


