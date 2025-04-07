function calc() {
	const x = document.querySelector('#x').value;
	const y = document.querySelector('#y').value;
	const sum = document.querySelector('#sum');

	sum.value = parseInt(x) + parseInt(y);
}

let computerNumber = Math.floor(Math.random() * 100);
let nGuesses = 0;

function numGuess() {
	const input = parseInt(document.querySelector('#user').value);
	const guess = document.querySelector('#guesses');
	const hint = document.querySelector('#result');

	if (input === computerNumber) hint.value = "정답";
	else if (input < computerNumber) hint.value = "작음";
	else if (input > computerNumber) hint.value = "큼";
	else hint.value = "오류";
	nGuesses++;
	guess.value = nGuesses;
}

function replay() {
	computerNumber = Math.floor(Math.random() * 100);
	nGuesses = 0;
	document.querySelector('#user').value = "";
	document.querySelector('#guesses').value = "";
	document.querySelector('#result').value = "";
	document.querySelector('#answer').value = computerNumber;
}