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

//======= findNRooks ========
window.findNRooksSolution = function(n) {
  var board = new Board({n:n});

  // Assign an array member to board
  // Init to false
  board.history = new Array(n);
  for(var i = 0; i < n;i++){
    board.history[i] = false;
  }
  rookHelper(0, board, false);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
  return board.rows();
};
//========= End findNRooks ==========

//========= countNRooks ===========
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n:n});
  board.history = new Array(n);
    for(var i = 0; i < n;i++){
    board.history[i] = false;
  }

  var solutionCount = rookHelper(0, board, true);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
//========= End countNRooks ==========


//========= START findNQueensSolution ============
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n:n});
  board.history = new Array(n);
  for(var i = 0; i < n;i++){
    board.history[i] = false;
  }

  queenHelper(0, board, false);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  return board.rows();
};

//========= END findNQueensSolution ============

//========= START countNQueensSolutions ============
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n:n});
  board.history = new Array(n);
  for(var i = 0; i < n;i++){
    board.history[i] = false;
  }

  var solutionCount = queenHelper(0, board, true);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
//========= END countNQueensSolutions ============

//========= Helper Functions ============

// Function: rookHelper
// numberOfRooksPlaced: # of rooks current placed on board
// board: A reference to a board object
// count: A boolean determining whether to stop at first solution or continue
// This function will find all solutions unless count=false
// and return the # of solutions possible for n-rooks.
// This will augment the board passed in by reference
var rookHelper = function(numberOfRooksPlaced, board, count){
  var numberOfRows = board.get("n");
  var sum = 0;
  // If the # of rows === # of rooks placed, we have found a solution
  if(numberOfRows === numberOfRooksPlaced){
    return 1;
  }

  // Loop through the current row
  for (var i = 0; i < board.history.length; i++) {
    if (board.history[i] === false) {
      // Augment the board and occupy a new spot on the history
      board.togglePiece(numberOfRooksPlaced,i);
      board.history[i] = true;

      sum += rookHelper(numberOfRooksPlaced+1, board, count);

      // Return if we just want to find a single solution
      if(sum && !count)
        return sum;

      // Remove augmentation on both board and history
      board.togglePiece(numberOfRooksPlaced,i);
      board.history[i] = false;
    }
    else{
      continue;
    }
  }
  return sum;
}

// Function: queenHelper
// numberOfQueensPlaced: # of queens current placed on board
// board: A reference to a board object
// count: A boolean determining whether to stop at first solution or continue
// This function will find all solutions unless count=false
// and return the # of solutions possible for n-queens.
// This will augment the board passed in by reference
var queenHelper = function(numberOfQueensPlaced, board, count){
  var numberOfRows = board.get("n");
  var sum = 0;
  // If the # of rows === # of rooks placed, we have found a solution
  if(numberOfRows === numberOfQueensPlaced){
      return 1;
  }

  // Loop through the current row
  for(var i = 0; i < numberOfRows; i++){
    if (board.history[i] === false) {
      // Augment the board and occupy a new spot on the history
      board.togglePiece(numberOfQueensPlaced,i);
      board.history[i] = true;

      if(board.hasAnyQueenConflictsOn(numberOfQueensPlaced,i)) {
        board.togglePiece(numberOfQueensPlaced,i);
        board.history[i] = false;
        continue;
      }

      sum += queenHelper(numberOfQueensPlaced+1, board, count);

      // Return if we just want to find a single solution
      if (sum && !count)
        return sum;

      board.togglePiece(numberOfQueensPlaced,i);
      board.history[i] = false;
    }
    else{
      continue;
    }
  }
  return sum;
}

//========= End Helper Functions ========
