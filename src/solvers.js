/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard,
// with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = null; //fixme
  var board = new Board({n:n});

  var rookHelper = function(numberOfRooksPlaced, board){
    // Base Cases
    var numberOfRows = board.get("n");
    if(board.hasAnyRowConflicts() || board.hasAnyColConflicts()){
      return false;
    }

    if(numberOfRows === numberOfRooksPlaced){
      solution = board.rows();
      return true;
    }

    // Loop through the current row
    for(var i = 0; i < numberOfRows; i++){

      // Current state of board is good, augment a new board
      // and pass that recursively
      board.rows()[numberOfRooksPlaced][i] = 1;
      if(rookHelper(numberOfRooksPlaced+1, board))
        return true;
      board.rows()[numberOfRooksPlaced][i] = 0;
    }
  }
  rookHelper(0, board);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

window.rookHelper = function(n) {

  if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
    return;
  }

  if (n === -1) {
    return 1;
  } 

return 1 + rookHelper(n-1);

}

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

var board = new Board({n:4});

  var solutionCount = rookHelper(n).call(board);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  var solution = board.rows(); //fixme
  var arrOfBoards = {};

  var queenHelper = function(numberOfQueensPlaced, board){
    // Base Cases
    var numberOfRows = board.get("n");
    if(board.hasAnyRowConflicts() || board.hasAnyColConflicts()
    || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()){
        return false;
    }

    if(numberOfRows === numberOfQueensPlaced){
      var key = JSON.stringify(board.rows());
      if(arrOfBoards[key] !== true){
        solution = board.rows();
        return true;
      }
    }

    // Loop through the current row
    for(var i = 0; i < numberOfRows; i++){

      // Current state of board is good, augment a new board
      // and pass that recursively
      board.rows()[numberOfQueensPlaced][i] = 1;
      if(queenHelper(numberOfQueensPlaced+1, board))
        return true;
      board.rows()[numberOfQueensPlaced][i] = 0;
    }
  }
  queenHelper(0, board);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n:n});

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
