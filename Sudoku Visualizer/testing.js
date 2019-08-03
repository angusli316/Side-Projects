var iterate = 0;
var tempIt = 0;
var dict = [];

function createSudokuBoard(){
	var board = document.getElementById('SudokuBoard');
	board.style = "border: 3px solid"
	var ctxt = board.getContext("2d");
	ctxt.clearRect(0, 0 , board.width, board.height);
	for(i = 1; i < 9; i++){
		var hLines = board.getContext("2d");
		hLines.lineWidth = 0.25;
		if(i % 3 === 0){
			hLines.lineWidth = 3;
		}
		hLines.beginPath();
		hLines.moveTo(0, i*(board.height/9));
		hLines.lineTo(450, i*(board.height/9));
		hLines.stroke();
		var vLines = board.getContext("2d");
		vLines.lineWidth = 0.25;
		if(i % 3 === 0){
			vLines.lineWidth = 3;
		}
		vLines.beginPath();
		vLines.moveTo(i*(board.width/9), 0);
		vLines.lineTo(i*(board.width/9), 450);
		vLines.stroke();
	}
	var buttonChange = document.getElementById('SudokuButton');
	buttonChange.onlick = buttonChange.setAttribute("disabled", "");
	var sudBoard= new Array(9);
	for(i = 0; i < 9; i++){
		sudBoard[i] = new Array(9);
	}
	for(i = 0; i < 9; i++){
		for(j = 0; j < 9; j++){
			sudBoard[i][j] = 0;
		}
	}
	solve(sudBoard);
	sudokuSwitching(sudBoard);
	removeRandomCells(sudBoard);
	console.log(sudBoard);
	for(i = 0; i < 9; i++){
		for(j = 0; j < 9; j++){
			if(sudBoard[i][j] != 0){
				var number = sudBoard[i][j];
				ctxt.font = "32px Arial";
				ctxt.s
				ctxt.fillText(number, (j*50) + 16, ((i+1)*50) - 12);
			}
		}
	}
	flag = false;
	var solveButton = document.createElement('Button');
	solveButton.id = 'SolveButton';
	solveButton.innerHTML = 'Visualize Solution Algorithm';
	solveButton.onclick = animate;
	document.body.appendChild(solveButton);
	solveVisualizer(sudBoard, flag);
}
	
var checkPossibleDigit = function (theNumbers, row, col, numberInput){
	var temp = theNumbers;
	for(i = 0; i < 9; i++){
		if(temp[i][col] === numberInput && i != row){
			return false;
		}
	}
	for(j = 0; j < 9; j++){
		if(temp[row][j] === numberInput && j != col){
			return false;
		}
	}
	var tempRow = Math.floor(row / 3);
	var tempCol = Math.floor(col / 3);
	var startRow = tempRow * 3;
	var startCol = tempCol * 3;
	for(k = startRow; k < startRow + 3; k++){
		for(l = startCol; l < startCol + 3; l++){
			if(temp[k][l] === numberInput && k != row && l != col){
				return false;
			}
		}
	}
	return true;
}

var findInvalidLocation = function (theNumbers){
	for(i = 0; i < 9; i++){
		for(j = 0; j < 9; j++){
			if(theNumbers[i][j] === 0){
				var row_col = [i, j];
				return row_col;
			}
		}
	}
	var falseRow = [10, 10];
	return falseRow;
}

var solve = function (theNumbers){
	var my_array = findInvalidLocation(theNumbers);
	if(my_array[0] === 10){
		return true;
	}
	for(let i = 1; i <= 9; i++){
		var temp = i;
		if(checkPossibleDigit(theNumbers, my_array[0], my_array[1], temp)){
			theNumbers[my_array[0]][my_array[1]] = temp;
			if(solve(theNumbers)){
				return true;
			}
			else{
				theNumbers[my_array[0]][my_array[1]] = 0;
			}
		}
	}
	return false;
}

var sudokuSwitching = function(theNumbers){
	var numberOfSwitches = Math.floor(Math.random() * 5000) + 5000;
	var counter = 0;
	while(counter != numberOfSwitches){
		var temp = Math.floor(Math.random() * 2);
		if(temp === 0){
			rowSwitch(theNumbers);
		}
		else if(temp === 1){
			colSwitch(theNumbers);
		}
		counter++;
	}
}

var rowSwitch = function(theNumbers){
	var pickedRow = Math.floor(Math.random() * 9);
	var randInc = Math.floor(Math.random() * 2);
	var switchedStack = Math.floor(pickedRow / 3);
	var switchedRow = (switchedStack * 3) + randInc;
	var temp = theNumbers[pickedRow];
	theNumbers[pickedRow] = theNumbers[switchedRow];
	theNumbers[switchedRow] = temp;
}

var colSwitch = function(theNumbers){
	var pickedCol = Math.floor(Math.random() * 9);
	var randInc = Math.floor(Math.random() * 2);
	var switchedStack = Math.floor(pickedCol / 3);
	var switchedCol = switchedStack * 3 + randInc;
	for(i = 0; i < 9; i++){
		var temp = theNumbers[i][pickedCol];
		theNumbers[i][pickedCol] = theNumbers[i][switchedCol];
		theNumbers[i][switchedCol] = temp;
	}
}

var removeRandomCells = function(theNumbers){
	var numCellsRmv = Math.floor(Math.random() * 5) + 45;
	var counter = 0;
	while(counter != numCellsRmv){
		var randRow = Math.floor(Math.random() * 9);
		var randCol = Math.floor(Math.random() * 9);
		if(theNumbers[randRow][randCol] === 0){
			continue;
		}
		else{
			theNumbers[randRow][randCol] = 0;
			counter++;
		}
	}
}

var drawBoard = function(theNumbers){
	var board = document.getElementById('SudokuBoard');
	var ctxt = board.getContext("2d");
	ctxt.clearRect(0, 0 , board.width, board.height);
	for(i = 1; i < 9; i++){
		var hLines = board.getContext("2d");
		hLines.lineWidth = 0.25;
		if(i % 3 === 0){
			hLines.lineWidth = 3;
		}
		hLines.beginPath();
		hLines.moveTo(0, i*(board.height/9));
		hLines.lineTo(450, i*(board.height/9));
		hLines.stroke();
		var vLines = board.getContext("2d");
		vLines.lineWidth = 0.25;
		if(i % 3 === 0){
			vLines.lineWidth = 3;
		}
		vLines.beginPath();
		vLines.moveTo(i*(board.width/9), 0);
		vLines.lineTo(i*(board.width/9), 450);
		vLines.stroke();
	}
	for(i = 0; i < 9; i++){
		for(j = 0; j < 9; j++){
			if(theNumbers[i][j] != 0){
				var number = theNumbers[i][j];
				ctxt.font = "32px Arial";
				ctxt.s
				ctxt.fillText(number, (j*50) + 16, ((i+1)*50) - 12);
			}
		}
	}
}

var solveVisualizer = function (theNumbers, flag){
	var my_array = findInvalidLocation(theNumbers);
	if(my_array[0] === 10){
		flag = true;
		return true;
	}
	for(let i = 1; i <= 9; i++){
		var temp = i;
		if(checkPossibleDigit(theNumbers, my_array[0], my_array[1], temp)){
			theNumbers[my_array[0]][my_array[1]] = temp;
			let oldArray = theNumbers.map(inner => inner.slice());
			dict[iterate] = oldArray;
			iterate++;
			if(solveVisualizer(theNumbers, flag)){
				return true;
			}
			else{
				theNumbers[my_array[0]][my_array[1]] = 0;
				let oldArray2 = theNumbers.map(inner => inner.slice());
				dict[iterate] = oldArray2;
				iterate++;
			}
		}
	}
	return false;
}

var animate = function(){
	if(tempIt < iterate){
		drawBoard(dict[tempIt]);
		tempIt++;
		setTimeout(() => {
			animate(dict, iterate, tempIt)}, 100);

	}
}

