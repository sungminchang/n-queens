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
  var solution = new Board({n:n});
  rookHelper(0, solution, false);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution.rows()));
  return solution.rows();
};
//========= End findNRooks ==========

//========= countNRooks ===========
// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n:n});

  var spots = [][board.get('n')] = 0;

  var solutionCount = rookHelper(0, board, true);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};
//========= End countNRooks ==========


//========= START findNQueensSolution ============
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n:n}); //fixme
  queenHelper(0, solution, false);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution.rows()));
  return solution.rows();
};

//========= END findNQueensSolution ============

//========= START countNQueensSolutions ============
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({n:n});
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
  for(var i = 0; i < numberOfRows; i++){
    // Since the current state of board is good, augment it
    // and pass that recursively
    board.togglePiece(numberOfRooksPlaced,i);

    // If the board has any conflicts
    if(board.hasColConflictAt(i)){
      // Remove augmentation and proceed to next option
    board.togglePiece(numberOfRooksPlaced,i);
      continue;
    }

    sum += rookHelper(numberOfRooksPlaced+1, board, count);

    // Return if we just want to find a single solution
    if(sum && !count)
      return sum;

    // Remove augmentation
    board.togglePiece(numberOfRooksPlaced,i);
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
  // If the board has any conflicts, return 0
  if(board.hasAnyColConflicts() ||
     board.hasAnyMajorDiagonalConflicts() ||
     board.hasAnyMinorDiagonalConflicts()){
      return 0;
  }

  // If the # of rows === # of rooks placed, we have found a solution
  if(numberOfRows === numberOfQueensPlaced){
      return 1;
  }

  // Loop through the current row
  for(var i = 0; i < numberOfRows; i++){
    // Since the current state of board is good, augment it
    // and pass that recursively
    board.togglePiece(numberOfQueensPlaced,i);
    sum += queenHelper(numberOfQueensPlaced+1, board, count);

    // Return if we just want to find a single solution
    if (sum && !count)
      return sum;

    board.togglePiece(numberOfQueensPlaced,i);
  }
  return sum;
}

//========= End Helper Functions ========
