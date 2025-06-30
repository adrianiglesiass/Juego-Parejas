let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let valor1 = null;
let valor2 = null;
let aciertos = 0;
let temporizador = false;
let timer = 50;
let timerInicial = 50;
let tiempoRegresivoId = null;

let mostrarAciertos = document.getElementById("aciertos");
let tiempoRestante = document.getElementById("t-rest");
let mostrarMovimientos = document.getElementById("movimientos");

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
	return Math.random() - 0.5;
});

function destapar(id) {
	const boton = document.getElementById(id);
	boton.innerText = numeros[id];
	boton.disabled = true;
	tarjetasDestapadas++;

	if (tarjetasDestapadas === 1) {
		tarjeta1 = boton;
		valor1 = numeros[id];
	} else if (tarjetasDestapadas === 2) {
		tarjeta2 = boton;
		valor2 = numeros[id];
	}
}

function contarTiempo() {
	tiempoRegresivoId = setInterval(() => {
		timer--;
		tiempoRestante.innerHTML = `Tiempo: ${timer} segundos`;
		if (timer == 0) {
			clearInterval(tiempoRegresivoId);
			bloquearTarjetas();
		}
	});
}

function bloquearTarjetas() {}
