import { solveSudoku } from "./solveSudoku";
import {useState, useEffect} from 'react';
import {sudokuBoard} from './boards'

function App() {

  const [board, setBoard] = useState(sudokuBoard);
  const [solvedBoard, setSolvedBoard] = useState([])
  const [moves, setMoves] = useState([]);
  const [movesCounter, setMovesCounter] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [presentSolution, setPresentSolution] = useState(false);
  


  // Solving the borad

  useEffect(() => {
  
    let {board:newBoard, moves:newMoves} = solveSudoku(sudokuBoard.map(row => row.map(el => el)))
    setSolvedBoard(newBoard)
    setMoves(newMoves);
  }, [])
  

  // Animating each step

  useEffect(() => {
    
    if(moves.length > 0 && showSolution){

      let timeoutId = 0;
      if (movesCounter < moves.length){
        // console.log(movesCounter)

        let updatedBoard = board.map(row => row.map(el => el));
        let [row, col, newVal] = moves[movesCounter];
        updatedBoard[row][col] = newVal;
        timeoutId = setTimeout((board, setBoard, updatedBoard) => {
          console.log('inside')
          setBoard(board => updatedBoard)
          setMovesCounter(movesCounter => movesCounter + 1)

        }, 100, board, setBoard, updatedBoard);
      }
      if (timeoutId > 0) {
        return  () => clearTimeout(timeoutId);
      } else {
        setShowSolution(false)
        setMovesCounter(0);
        setBoard(sudokuBoard);
        setPresentSolution(true);
      }
    }
    }, [movesCounter, solvedBoard, moves, showSolution, board])


  return (
    <div className="App">

          
      <div className="container">

      <button className="show-solution" onClick={() => setShowSolution(!showSolution)}>{!showSolution ? `Solve Board` : `Pause`}</button>

      <div className="initial-board">
        {board.map((row, rowIdx) => <div className={`board-row ${rowIdx}`} key={`row-${rowIdx}`}>{row.map((el,elIdx) => <span className={`board-el ${elIdx}`} key={`el-${elIdx}`}> {el } </span>)}</div>)}
       </div> 
    
       {presentSolution &&  <div className="initial-board">
        {solvedBoard.map((row, rowIdx) => <div className={`board-row ${rowIdx}`} key={`row-${rowIdx}`}>{row.map((el,elIdx) => <span className={`board-el ${elIdx}`} key={`el-${elIdx}`}> {el } </span>)}</div>)}
       </div>}
    
      </div>
    </div>


  );
}

export default App;
