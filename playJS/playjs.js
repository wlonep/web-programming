window.onload = () => {
	setCTime();
	const doc = document.querySelector('#gugudan');
	let content = '<tr>'
	for (let i = 2; i < 10; i++) {
		content += `<th>${i}단</th>`
	}
	content += "</tr>"
	for (let i = 1; i < 10; i++) {
		content += "<tr>"
		for (let j = 2; j < 10; j++) {
			content += `<td>${j}x${i}=${i * j}</td>`
		}
		content += "</tr>"
	}
	doc.innerHTML = content;
}

function calc() {
	const x = document.querySelector('#x').value;
	const y = document.querySelector('#y').value;
	const sum = document.querySelector('#sum');

	sum.value = parseInt(x) + parseInt(y);
}

let computerNumber = Math.floor(Math.random() * 100 + 1);
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

function setCTime() {
	const now = new Date();
	document.querySelector('#ctime').innerHTML = `${now.toLocaleDateString("en-US", {month: "short"})} 
	${now.getDate()} 
	${String(now.getHours()).padStart(2, 0)}:${String(now.getMinutes()).padStart(2, 0)}:${String(now.getSeconds()).padStart(2, 0)}`
	setTimeout(setCTime, 100);
}


var WORD_LIST = ["obdurate", "verisimilitude", "defenestrate", "obsequious",
				"dissonant", "today", "idempotent"];

function showWordList() {
	document.querySelector('#wordList').innerText = WORD_LIST.join(", ");
	// document.querySelector('#wordList').innerText = WORD_LIST.toString()
}

function addWord() {
	const word = prompt("새로운 단어를 입력하세요");
	if (WORD_LIST.includes(word)) {
		alert("이미 존재하는 단어입니다.")
	} else {
		WORD_LIST.push(word);
		showWordList();
	}
}

function sortWord() {
	WORD_LIST.sort();
	showWordList();
}

function shuffleWord() {
	for (let i = WORD_LIST.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		let temp = WORD_LIST[i];
		WORD_LIST[i] = WORD_LIST[j];
		WORD_LIST[j] = temp;
	}
	showWordList();
}