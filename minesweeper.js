document.addEventListener('DOMContentLoaded', startGame)

/* Define your `board` object here!
 var board = {
  cells: [
    {row: 0, col: 0, isMine:false, hidden:true, surroundingMines:0 ,isMarked: false},
    {row: 0, col: 1, isMine:false, hidden:true, surroundingMines:0,isMarked: false},
    {row: 0, col: 2, isMine:false, hidden:true, surroundingMines:0,isMarked: false},
    {row: 1, col: 0, isMine:true, hidden:true, surroundingMines:0,isMarked: false},
    {row: 1, col: 1, isMine:false, hidden:true, surroundingMines:0,isMarked: false},
    {row: 1, col: 2, isMine:false, hidden:true, surroundingMines:0,isMarked: false},
    {row: 2, col: 0, isMine:false, hidden:true, surroundingMines:0,isMarked: false},
    {row: 2, col: 1, isMine:false, hidden:true, surroundingMines:0,isMarked: false},
    {row: 2, col: 2, isMine:false, hidden:true, surroundingMines:0,isMarked: false}
  ]
 }

 //Understanding Object & Array
 console.log("1.This is Object: --> board \n"+board)
 //You can access (get) a property on an object by using either dot notation
 console.log("2-1.Access&get a property: --> board.cells \n" + board.cells)
 //The value inside the brackets in bracket notation can be a string variable
 console.log("2-2.Using bracket notation with double quotation: --> board[\"cells\"] \n" + board["cells"])
 console.log("3-1.Using bracket & inded notation: --> board.cells[0] \n"+board.cells[0])
 console.log("3-2.Using bracket & inded notation with double quotation: --> board[\"cells\"][0] \n "+board["cells"][0])
 console.log("4.Accessing detailed property : --> board.cells[0].row \n"+ board.cells[0].row)*/

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
 //Dynamic create object is testing
var board = { cells:[] }
var boardCnt = 4 //board basic elements 3 X 3

function createBoard () {
  
  for (var i = 0; i < boardCnt; i++){
      for (var j =0; j < boardCnt; j++){
      board.cells.push ({row: i ,col: j, isMine: false, hidden: true, surroundingMines:0, isMarked: false })
    }

    //console.log("Dynamic Object->"+board.cells.length)
  }
}

function setMine () {
  var i = 0
  var maxMines = 5
  while (i < maxMines) {   
    var seqNo = getRandomInt(8)
    var tmpCnt = 0

    console.log('mine address-->'+seqNo)
    board.cells[seqNo].isMine = true;

    for (var j = 0; j < boardCnt*boardCnt; j++){
      if (board.cells[j].isMine == true){
        tmpCnt++
      }     
    }
 
    console.log('total mines-->'+ tmpCnt)
    i = tmpCnt
  
  }

}


function startGame () {
  //Dynamic board creation 
  createBoard()
  setMine ()
  for (var i = 0; i < board.cells.length; i++){
    var surrounding = countSurroundingMines(board.cells[i]) 
    board.cells[i].surroundingMines = surrounding   

    console.log('board.cells['+i+']'+board.cells[i].surroundingMines)
  }
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  for (var i = 0; i < board.cells.length; i++){
    var chkCell = board.cells[i]
    if (chkCell.isMine == true) {
      if (!chkCell.isMarked)
        return
    } else {
      if (chkCell.hidden) {
        return
      }
    }
  }
  lib.displayMessage('You are a winner!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  //getSurroundingCells (row, col) 
  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
  
  var cntTrue=0
  for (i = 0; i < surrounding.length; i++){
    if (surrounding[i].isMine == true){
      cntTrue++
    }
  }
  return cntTrue
}

