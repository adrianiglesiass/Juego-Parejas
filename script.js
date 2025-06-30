let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let valor1 = null;
let valor2 = null;
let aciertos = 0;
let movimientos = 0;
let temporizador = false;
let timer = 50;
let timerInicial = 50;
let tiempoRegresivoId = null;

let winAudio = new Audio("./sounds/win.wav");
let loseAudio = new Audio("./sounds/lose.wav");
let clickAudio = new Audio("./sounds/click.wav");
let rightAudio = new Audio("./sounds/right.wav");
let wrongAudio = new Audio("./sounds/wrong.wav");

let mostrarAciertos = document.getElementById("aciertos");
let tiempoRestante = document.getElementById("t-rest");
let mostrarMovimientos = document.getElementById("movimientos");

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
	return Math.random() - 0.5;
});

function contarTiempo() {
	tiempoRegresivoId = setInterval(() => {
		timer--;
		tiempoRestante.innerHTML = `Tiempo: ${timer} segundos`;
		if (timer == 0) {
			clearInterval(tiempoRegresivoId);
			bloquearTarjetas();
			loseAudio.play();
		}
	}, 1000);
}

function bloquearTarjetas() {
	for (let i = 0; i <= 15; i++) {
		let tarjetaBloqueada = document.getElementById(i);
		tarjetaBloqueada.innerHTML = `<img src="./images/${numeros[i].png}"`;
		tarjetaBloqueada.disabled = true;
	}
}

function destapar(id) {
	if (temporizador == false) {
		contarTiempo();
		temporizador = true;
	}
	tarjetasDestapadas++;

	if (tarjetasDestapadas == 1) {
		tarjeta1 = document.getElementById(id);
		valor1 = numeros[id];
		tarjeta1.innerHTML = `<img src="./images/${valor1}.png">`;
		clickAudio.play();
		tarjeta1.disabled = true;
	} else if (tarjetasDestapadas == 2) {
		tarjeta2 = document.getElementById(id);
		valor2 = numeros[id];
		tarjeta2.innerHTML = `<img src="./images/${valor2}.png">`;
		tarjeta2.disabled = true;
		movimientos++;
		mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

		if (valor1 == valor2) {
			tarjetasDestapadas = 0;
			aciertos++;
			mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

			if (aciertos == 8) {
				clearInterval(tiempoRegresivoId);
				mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
				mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
				tiempoRestante.innerHTML = `Fantastico: ${timerInicial - timer} segundos`;
				winAudio.play();
			}
		} else {
			setTimeout(() => {
				tarjeta1.innerHTML = "";
				tarjeta2.innerHTML = "";
				tarjeta1.disabled = false;
				tarjeta2.disabled = false;
				tarjetasDestapadas = 0;
				wrongAudio.play();
			}, 700);
		}
	}
}
