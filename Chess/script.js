"use strict;"

/* Defines some useful variables */
const body = document.querySelector('body');
const board = document.querySelector('#board');
board.addEventListener('mousedown', preventdefault)
function preventdefault(event) { event.preventDefault(); }

const rules = document.querySelector('#rules');
const winners = document.querySelector('#winners');
const history = document.querySelector('#history');
const column_width = `${(window.screen.availWidth - 800) / 2}px`
rules.style.width = column_width;
history.style.width = column_width;
const button = document.querySelector('button');
button.addEventListener('click', start);
/* start() used to be located here, until I needed to reset all the game variables. Now it is no longer here. */

function win(white_wins) {
	/*
	Implementation of winning; occurs when a king is captured. White wins if white_wins == true.
	Players can keep playing if they want. Otherwise, they can press the restart button.
	*/
	text = document.createElement('div');
	if (white_wins) text.textContent = 'White wins!';
	else text.textContent = 'Black wins!';
	winners.appendChild(text);
}

/*
Makes the game more fun. Activated using an old cheat code (if you want to use it, read the code and figure it out).
In all seriousness, a feature that stops the board from flipping and allows any move to be made. Pawns can promote backwards. You have been warned.
*/
let godmode = false;
let godmode_arr = [];
document.addEventListener('keydown', activate_godmode);
function arraysEqual(a, b) {
	/*
	Does what it says it does.
	*/
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) return false;
	}
	return true;
}
function activate_godmode(event) {
	/*
	Does what it says it does.
	*/
	const correct = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
	if (correct.includes(event.key)) godmode_arr.push(event.key);
	else godmode_arr = [];
	if (godmode_arr.length >= 10 && arraysEqual(godmode_arr.slice(-10), correct)) {
		godmode = true;
	}
}


let selected = null;
let current_turn = 'w';
function select(event) {
	/*
	Select a piece.
	*/
	event.preventDefault();
	const target = event.currentTarget;
	/* If the square selected has a piece on it: */
	if (target.children.length) {
		/* If you are allowed to select the piece, select it. */
		if (selected == null && (target.children[0].classList.contains(current_turn) | godmode)) {
			selected = target.children[0];
			toggle(selected);
		/* If the already selected piece is on this square, deselect it. */
		} else if (selected == target.children[0]) {
			toggle(selected);
			selected = null;
		}
	}
}

let move_counter = 1;
let move_text = null;
function move(event) {
	/*
	Move the selected piece.
	*/
	/* If no piece is selected or a piece is moving to it's own square, return. */
	if (selected == null) return;
	const target = event.currentTarget;
	if (selected.parentElement == target) return;
	/* If the move is legal, continue. */
	if (legal_moves(selected).includes(target) | godmode) {
		toggle(selected);
		/* If the move is game ending, display an end of game message. */
		if (target.children.length && target.children[0].classList.contains('king')) {
			/* Game over */
			if (selected.classList.contains('king')) easter_egg();
			else win(target.children[0].classList.contains('b'));
		}
		/* Clears all existing children. */
		target.innerHTML = '';
		target.appendChild(selected);
		/* Checks pawn promotion criteria. */
		if (selected.classList.contains('pawn') && (target['row'] == 0 | target['row'] == 7)) promote(selected);
		/* Displays the move in the move history tab. */
		const type = selected['type'];
		const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
		const col = letters[target['col']];
		const row = 8 - target['row'];
		if (current_turn == 'w' | godmode) {
			move_text = document.createElement('div');
			move_text.textContent = `${move_counter}. White: ${type} ${col}${row}`;
			history.appendChild(move_text);
		}
		if (current_turn == 'b' | godmode) {
			move_text.textContent += `, Black: ${type} ${col}${row}`;
			move_counter++;
		}
		/* Passes gameplay to the next player. */
		nextTurn();
	} else { toggle(selected); }
	/* Unselect the selected piece. */
	selected = null;
}

function promote(pawn) {
	/*
	Promotes a pawn to a queen. Usually, you can choose what piece to promote to, but oh well. A queen will have to do.
	*/
	let color = '';
	if (pawn.classList.contains('w')) color = 'w';
	else if (pawn.classList.contains('b')) color = 'b';
	/*
	piece.classList.remove('pawn');
	We leave the class 'pawn' on the queen, because it doesn't change anything (because it's funny).
	Initially, it was so that en passant rules would apply to the queen as well, but I determined that en passant was too difficult.
	*/
	let type = 'queen';
	/* Because their kings move like queens anyways. */
	if (godmode) type = 'king';
	pawn.classList.add(type);
	pawn.src = `pics/${type}${color}.png`;
}



function legal_moves(piece) {
	/*
	Helper function. Returns which squares a piece can move to.
	*/
	const legal = {'pawn': legal_pawn, 'knight': legal_knight, 'bishop': legal_bishop,
		'rook': legal_rook, 'queen': legal_queen, 'king': legal_king};
	const row = piece.parentElement['row'];
	const col = piece.parentElement['col'];
	let color = '';
	if (piece.classList.contains('w')) color = 'w';
	else if (piece.classList.contains('b')) color = 'b';
	for (const type of Object.keys(legal)) {
		if (piece.classList.contains(type)) return legal[type](row, col, color);
	}
	return [];
}

function in_board(row, col, color) {
	/*
	Returns true if the given row and column are in the board, false otherwise.
	*/
	return -1 < row && row < 8 && -1 < col && col < 8;
}

function is_fair_move(row, col, color) {
	/*
	Returns a list with two parameters:
	1: true if a color of the given piece can move to the given row and column, false otherwise.
	2: true if the current square is occupied (stop moving in this direction), false otherwise.
	*/
	if (board.children[row].children[col].children.length) {
		return [!board.children[row].children[col].children[0].classList.contains(color), true];
	} else return [true, false];
}

function legal_pawn(row, col, color) {
	/*
	Returns which squares a pawn can move to.
	*/
	let direction = 0;
	if (color == 'w') direction = -1;
	else if (color == 'b') direction = 1;
	const ret = [];
	/* Capture Moves */
	for (let j = -1; j < 2; j += 2) {
		if (in_board(row + direction, col + j)) {
			const info = is_fair_move(row + direction, col + j, color);
			const is_legal = info[0];
			const has_piece = info[1];
			if (is_legal && has_piece) ret.push(board.children[row + direction].children[col + j]);
		}
	}
	/* Forward Moves */
	for (let i = 1; i < 3; i++) {
		if (in_board(row + i * direction, col)) {
			const info = is_fair_move(row + i * direction, col, color);
			const is_legal = info[0];
			const stop_moving = info[1];
			/* Can not capture pieces when moving forward. */
			if (stop_moving) break;
			if (is_legal) ret.push(board.children[row + i * direction].children[col]);
		}
		if (row != 1 && row != 6) break;
	}
	/* En passant: skipped because too complicated. */
	return ret;
}

function legal_knight(row, col, color) {
	/*
	Returns which squares a knight can move to.
	*/
	ret = [];
	for (let i = -1; i < 2; i+=2) {
		for (let j = -1; j < 2; j+=2) {
			if (in_board(row + i, col + 2 * j)) {
				const info = is_fair_move(row + i, col + 2 * j, color);
				const is_legal = info[0];
				if (is_legal) ret.push(board.children[row + i].children[col + 2 * j]);
			}
			if (in_board(row + 2 * i, col + j)) {
				const info = is_fair_move(row + 2 * i, col + j, color);
				const is_legal = info[0];
				if (is_legal) ret.push(board.children[row + 2 * i].children[col + j]);
			}
		}
	}
	return ret;
}

function legal_bishop(row, col, color) {
	/*
	Returns which squares a bishop can move to.
	*/
	ret = [];
	function add_diag(dirx, diry) {
		/* Goes in a specific direction */
		for (let i = 1; i < 8; i++) {
			if (in_board(row + i * dirx, col + i * diry)) {
				const info = is_fair_move(row + i * dirx, col + i * diry, color);
				const is_legal = info[0];
				const stop_moving = info[1];
				if (is_legal) ret.push(board.children[row + i * dirx].children[col + i * diry]);
				if (stop_moving) break;
			}
		}
	}
	/* Adds all four diagonal directions */
	add_diag(1, 1);
	add_diag(1, -1);
	add_diag(-1, 1);
	add_diag(-1, -1);
	return ret;
}

function legal_rook(row, col, color) {
	/*
	Returns which squares a rook can move to.
	*/
	ret = [];
	function add_straight(dirx, diry) {
		/* Goes in a specific direction */
		for (let i = 1; i < 8; i++) {
			if (in_board(row + i * dirx, col + i * diry)) {
				const info = is_fair_move(row + i * dirx, col + i * diry, color);
				const is_legal = info[0];
				const stop_moving = info[1];
				if (is_legal) ret.push(board.children[row + i * dirx].children[col + i * diry]);
				if (stop_moving) break;
			}
		}
	}
	/* Adds all four cardinal directions */
	add_straight(1, 0);
	add_straight(-1, 0);
	add_straight(0, 1);
	add_straight(0, -1);
	return ret;
}

function legal_queen(row, col, color) {
	/*
	Returns which squares a queen can move to.
	*/
	return legal_bishop(row, col, color).concat(legal_rook(row, col, color));
}

function legal_king(row, col, color) {
	/*
	Returns which squares a king can move to.
	*/
	ret = [];
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			if (i == 0 && j == 0) continue;
			if (in_board(row + i, col + j)) {
				const info = is_fair_move(row + i, col + j, color);
				const is_legal = info[0];
				if (is_legal) ret.push(board.children[row + i].children[col + j]);
			}
		}
	}
	/* Castling: skipped because too complicated. */
	return ret;
}


function toggle(piece) {
	/*
	Highlights the legal moves for a piece.
	*/
	piece.parentElement.classList.toggle('selected');
	for (const square of legal_moves(piece)) {
		square.classList.toggle('highlight');
	}
}


function nextTurn() {
	/*
	Flips the board. This allows for local play. Makes it the next player's turn.
	Another option was to code a Chess Bot (or try to find an API), which is above my pay grade.
	*/
	if (godmode) return;
	board.classList.toggle('flipped');
	for (const row of board.children) {
		for (const square of row.children) {
			square.classList.toggle('flipped');
		}
	}
	if (current_turn == 'w') current_turn = 'b';
	else current_turn = 'w';
}



function start() {
	/*
	Resets all game state variables, including the board. Then (re)creates the board and the pieces.
	Happens at the beginning of the game, and whenever players press the restart button.
	*/
	winners.innerHTML = '';
	history.innerHTML = '';
	board.innerHTML = '';
	selected = null;
	godmode = false;
	if (current_turn == 'b') nextTurn();
	move_counter = 1;
	move_text = null;
	for (let row = 0; row < 8; row++) {
		const curr_row = document.createElement('div');
		curr_row.style.height = '80px';
		for (let col = 0; col < 8; col++) {
			const square = document.createElement('div');
			square['row'] = row;
			square['col'] = col;
			square.classList.add('square', ['white', 'black'][(row + col) % 2]);

			square.addEventListener('mousedown', select);
			square.addEventListener('mouseup', move);

			let type = null;
			if (row == 0 | row == 7) type = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'][col];
			if (row == 1 | row == 6) type = 'pawn';
			if (type) {
				const piece = new Image();
				let color = '';
				if (row > 4) color = 'w';
				else color = 'b';
				piece.src = `pics/${type}${color}.png`;
				piece.classList.add('piece', type, color);
				piece['type'] = type;
				square.appendChild(piece);
			}

			curr_row.appendChild(square);
		}

		board.appendChild(curr_row);
	}
}
start()

function easter_egg() {
	/*
	Surely nobody would read the code all the way to the end. Surely?
	Occurs when one king takes the other king. Why? Because it's funny.
	*/
	meme = document.createElement('div');
	/* A reference to Minecraft */
	meme.textContent = 'How Did We Get Here?';
	winners.appendChild(meme);
}
/* One extra line so that the file can be 400 lines long. */