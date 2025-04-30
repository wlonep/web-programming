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
	changeColor();
	window.addEventListener("click", (e) => { 
		if (typeof(window[e.target.id]) == "function") {
			const exec = new Function(`return ${e.target.id}`)();
			exec();
		}
	})
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


var WORD_LIST = ["apple", "obdurate", "verisimilitude", "defenestrate", "obsequious",
				"dissonant", "today", "idempotent"];
const MAX_GUESSES = 6;
var guesses = "";
var guessCount = MAX_GUESSES;
var word;

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

function newGame () {
	word = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
	guessCount = MAX_GUESSES;
	guesses = "";
	document.querySelector('#guessLetter').disabled = false;
	document.querySelector('#hguess').value = "";
	updatePage();
}

function guessLetter() {
	const letter = document.querySelector('#hguess').value;
	if (guesses.indexOf(letter) >= 0 || 
		document.querySelector('#guessstr').innerHTML.indexOf(guesses) < 0) 
		return;
	guesses += letter;
	if (word.indexOf(letter) < 0) {
		guessCount--;
	}
	updatePage();
}

function updatePage() {
	let src = `hangman/hangman${guessCount}.gif`;
	document.querySelector('#hangmanpic').src = src;
	const clue = document.querySelector('#clue');
	let content = "";
	for (let i = 0; i < word.length; i++) {
		if (guesses.indexOf(word.charAt(i)) >= 0)
			content += `${word.charAt(i)} `;
		else
			content += '_ ';
	}
	clue.innerText = content;

	const guessStr = document.querySelector('#guessstr');
	if (guessCount === 0)
		guessStr.innerHTML = 'You Lose';
	else if (content.indexOf('_') < 0)
		guessStr.innerHTML = 'You Win';
	else {
		guessStr.innerHTML = `Guesses : ${guesses}`;
	}
}

function innerTest() {
	const input = prompt();
	document.querySelector('#innerTest').innerHTML = input;
}

function changeImage() {
	let img1 = 'img1.png';
	let img2 = 'img2.jpg';

	if (img.src.includes(img1))
		img.src = img2;
	else
		img.src = img1;
}

var colorNames = ["maroon", "red", "orange", "yellow", "olive", "purple", "fuchsia", 
	"white", "lime", "green"," navy", "blue", "aqua", "teal", "black", "silver", "gray"]

function ctCreate() {
	console.log(1)
	const table = document.querySelector('#colorTable');
	for (let i = 0; i < colorNames.length; i++) {
		let elem = document.createElement('div');
		elem.setAttribute("class", "ctbox");
		elem.style.cssText = "display: inline-block;width: 60px; padding: 10px;"
		elem.style.backgroundColor = colorNames[i];
		elem.innerText = colorNames[i];
		table.appendChild(elem);
	}
}

function removeColorTable() {
	const table = document.getElementById('colorTable');
	const box = table.querySelectorAll('.ctbox');
	for (let i = 0; i < box.length; i++) {
		table.removeChild(box[i]);
	}

	// const table = document.getElementById('colorTable');
	// table.replaceChildren();
	// while (table.hasChildNodes())
	// 	table.removeChild(table.firstChild)
	// // Array.from(table.childNodes).forEach((e) => table.removeChild(e))
	/*const box = Array.from(table.childNodes);

	for (let i = 0; i < box.length; i++) {
		table.removeChild(box[i]);
	}*/
}

var colorCount = 0;
var colorChange;

function changeColor() {
	let backColors = ["green", "yellow"];
	let textColors = ["red", "blue"];
	colorChange = setInterval(() => {
		const target = document.querySelector('#target');
		target.style.backgroundColor = backColors[colorCount % 2];
		target.style.color = textColors[colorCount % 2];
		colorCount++;
	}, 1000);
}

function stopTextColor() {
	clearInterval(colorChange);
}

function moveBox() {
	const box = document.querySelector('#animate');
	var pos = 0;
	const move = setInterval(() => {
		if (pos >= 350) clearInterval(move);
		pos++;
		box.style.top = `${pos}px`;
		box.style.left = `${pos}px`;
	}, 5)
}