function calc() {
	const x = document.querySelector('#x').value;
	const y = document.querySelector('#y').value;
	const sum = document.querySelector('#sum');

	sum.value = parseInt(x) + parseInt(y);
}