 export function solveSudoku(board){

    const moves = [];

    const printBoard = (board) => board.forEach(row => console.log(row.toString()));

    const validateRow = (row, suggestedValue) => {
        
       return !board[row].includes(suggestedValue)
    }

    const validateBox = (row, col, suggestedValue) => {
            
       let rowOffset = Math.floor(row / 3);
       let colOffset = Math.floor(col / 3);
       
       for (let i = 0; i < 3; i++){ 
           for (let j = 0; j < 3; j++){
               if(board[i + 3*rowOffset][j + 3*colOffset] === suggestedValue) {                
                    return false
                }
           }
       }
       return true;

    }

    const validateColumn = (col, suggestedValue) => {
        
        for (let i = 0; i < board.length; i++){
            if (board[i][col] === suggestedValue) return false
        }
        return true;
    }


    const validateMove = (row, col, suggestedValue) => {
        return validateColumn(col, suggestedValue) && validateRow(row, suggestedValue) && validateBox(row, col, suggestedValue)
    }

    
    const solve = () => {
    
        for (let i = 0; i < board.length; i++){
            for (let j = 0; j < board.length ; j++){  
                for (let k = 1; k <= board.length && board[i][j] === 0; k++){     
                    if (validateMove(i, j, k)) {

                        moves.push([i, j, k]);

                        board[i][j] = k
                        if (solve()){
                            return true
                        } else {

                            moves.push([i, j, 0]);


                            //reset
                            board[i][j] = 0;
                        }
                    }
                } 
                if(board[i][j]===0) return false;
            }
        } 
       return board;
    }    

    solve();
    board.forEach(row =>  row.includes(0) ? console.log(`Board not solved! check validity`) : null );
    // printBoard(board);
    // console.log(moves)
    return {board, moves};

}


//  const sudokuBoard = [
//     [1, 0 ,2 ,0, 0, 0, 0, 0, 9],
//     [0, 0 ,0 ,0, 4, 0, 0, 0, 0],
//     [0, 0 ,3 ,0, 0, 6, 6, 0, 0],
//     [3, 0 ,0 ,0, 0, 0, 0, 0, 8],
//     [0, 0 ,0 ,0, 0, 0, 0, 0, 0],
//     [0, 0 ,0 ,0, 0, 0, 0, 0, 0],
//     [6, 0, 0, 7, 0, 0, 0, 0, 0], 
//     [0, 0, 0, 0, 0, 0, 0, 0, 5], 
//     [0, 0, 0, 4, 0, 0, 0, 0, 0]
// ];

// const sudokuBoard = [
//     [0, 0 ,0 ,0, 1, 0, 0, 0, 0],
//     [0, 9 ,0 ,0, 0, 0, 2, 0, 0],
//     [0, 0 ,3 ,5, 0, 4, 0, 6, 0],
//     [3, 0 ,0 ,0, 0, 0, 0, 0, 4],
//     [0, 0 ,0 ,0, 0, 8, 0, 0, 0],
//     [0, 0 ,4 ,7, 0, 6, 0, 5, 0],
//     [0, 0, 7, 0, 8, 0, 0, 0, 0], 
//     [2, 0, 0, 1, 0, 7, 6, 0, 0], 
//     [0, 0, 0, 0, 3, 0, 0, 1, 0]
// ]

// let sudokuBoard =  [
//     [
//       0, 2, 6, 0, 0,
//       0, 8, 1, 0
//     ],
//     [
//       3, 0, 0, 7, 0,
//       8, 0, 0, 6
//     ],
//     [
//       4, 0, 0, 0, 5,
//       0, 0, 0, 7
//     ],
//     [
//       0, 5, 0, 1, 0,
//       7, 0, 9, 0
//     ],
//     [
//       0, 0, 3, 9, 0,
//       5, 1, 0, 0
//     ],
//     [
//       0, 4, 0, 3, 0,
//       2, 0, 5, 0
//     ],
//     [
//       1, 0, 0, 0, 3,
//       0, 0, 0, 2
//     ],
//     [
//       5, 0, 0, 2, 0,
//       4, 0, 0, 9
//     ],
//     [
//       0, 3, 8, 0, 0,
//       0, 4, 6, 0
//     ]
//   ]


// let input = `	2	6				8	1	
// 3			7		8			6
// 4				5				7
// 5		1		7		9	
// 3	9		5	1		
// 4		3		2		5	
// 1				3				2
// 5			2		4			9
// 3	8				4	6	`;



// input = input.split('\n').map(row => row.split('\t').map(el => el === '' ? 0 : el));

// console.log(input);


// sudokuBoard = sudokuBoard.map(row => row.map(el => parseInt(el)));

//   solveSudoku(sudokuBoard);

// sudokuBoard = sudokuBoard.map(row => row.map(el => parseInt(el)));

//  console.log(sudokuBoard)