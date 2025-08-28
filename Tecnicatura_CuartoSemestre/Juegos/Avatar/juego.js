let ataqueJugador
let ataqueEnemigo
let vidasJugador = 3
let vidasEnemigo = 3

const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonPersonajeJugador = document.getElementById('boton-personaje');
const sectionReiniciar = document.getElementById('reiniciar');
const botonesAtaque = document.querySelectorAll('#seleccionar-ataque button');
const botonReiniciar = document.getElementById('boton-reiniciar');
const sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje');
const inputZuko = document.getElementById('zuko');
const inputKatara = document.getElementById('katara');
const inputAang = document.getElementById('aang');
const inputToph = document.getElementById('toph');
const spanPersonajeJugador = document.getElementById('personaje-jugador');
const spanPersonajeEnemigo = document.getElementById('personaje-enemigo');
const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');
const sectionMensaje = document.getElementById('mensajes');

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none';
    botonPersonajeJugador.addEventListener('click', seleccionarPersonajeJugador);
    sectionReiniciar.style.display = "none";

    document.getElementById("reglas-del-juego").style.display = "none";
    document.getElementById('boton-reglas').addEventListener('click', mostrarReglas);

    document.getElementById('boton-jugar').style.display = 'none';
    document.getElementById('seleccionar-personaje').style.display = 'block';

    botonesAtaque.forEach(boton => {
        boton.addEventListener('click', (event) => {
            ataqueJugador = event.target.dataset.ataque;
            ataqueAleatorioEnemigo();
        });
    });

    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function mostrarReglas() {
    document.getElementById("reglas-del-juego").style.display = "block";
    document.getElementById('boton-jugar').style.display = 'block';
    document.getElementById('boton-reglas').style.display = 'none';
    document.getElementById('seleccionar-personaje').style.display = 'none';
    document.getElementById('boton-jugar').addEventListener('click', seleccionarPersonajeJugador);
}

function seleccionarPersonajeJugador() {
    sectionSeleccionarAtaque.style.display = 'block';
    document.getElementById('boton-reglas').style.display = 'none';
    sectionSeleccionarPersonaje.style.display = 'none';

    document.getElementById("reglas-del-juego").style.display = "none";
    document.getElementById('boton-reglas').style.display = 'none';

    if (inputZuko.checked) {
        spanPersonajeJugador.innerHTML = 'Zuko';
    } else if (inputKatara.checked) {
        spanPersonajeJugador.innerHTML = 'Katara';
    } else if (inputAang.checked) {
        spanPersonajeJugador.innerHTML = 'Aang';
    } else if (inputToph.checked) {
        spanPersonajeJugador.innerHTML = 'Toph';
    } else {
        const mensajeError = document.createElement("p");
        mensajeError.innerHTML = 'Selecciona un personaje';
        mensajeError.style.color = "red";
        sectionSeleccionarPersonaje.appendChild(mensajeError);

        setTimeout(() => {
            sectionSeleccionarPersonaje.removeChild(mensajeError);
        }, 2000);
        reiniciarJuego();
        return;
    }
    seleccinarPersonajeEnemigo();
}

function seleccinarPersonajeEnemigo() {
    const personajeAleatorio = aleatorio(1, 4);

    if (personajeAleatorio === 1) {
        spanPersonajeEnemigo.innerHTML = 'Zuko';
    } else if (personajeAleatorio === 2) {
        spanPersonajeEnemigo.innerHTML = 'Katara';
    } else if (personajeAleatorio === 3) {
        spanPersonajeEnemigo.innerHTML = 'Aang';
    } else {
        spanPersonajeEnemigo.innerHTML = 'Toph';
    }
}

function ataqueAleatorioEnemigo() {
    const ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio === 1) {
        ataqueEnemigo = 'Punio';
    } else if (ataqueAleatorio === 2) {
        ataqueEnemigo = 'Patada';
    } else {
        ataqueEnemigo = 'Barrida';
    }
    combate();
}

function combate() {
    let resultado;

    if (ataqueEnemigo === ataqueJugador) {
        resultado = "EMPATE";
    } else if (
        (ataqueJugador === 'Punio' && ataqueEnemigo === 'Barrida') ||
        (ataqueJugador === 'Patada' && ataqueEnemigo === 'Punio') ||
        (ataqueJugador === 'Barrida' && ataqueEnemigo === 'Patada')
    ) {
        resultado = "GANASTE";
        vidasEnemigo--;
    } else {
        resultado = "PERDISTE";
        vidasJugador--;
    }

    spanVidasJugador.innerHTML = vidasJugador;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
    crearMensaje(resultado);
    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo === 0) {
        crearMensajeFinal("FELICITACIONES!!! HAS GANADO 🤩🥳🎉");
    } else if (vidasJugador === 0) {
        crearMensajeFinal("QUE PENA, HAS PERDIDO 😢😭😭😭");
    }
}

function crearMensajeFinal(resultado) {
    sectionReiniciar.style.display = "block";

    const parrafo = document.createElement('p');
    parrafo.innerHTML = resultado;
    sectionMensaje.appendChild(parrafo);

    botonesAtaque.forEach(boton => {
        boton.disabled = true;
    });
}

function crearMensaje(resultado) {
    const parrafo = document.createElement('p');

    parrafo.innerHTML = 'Tu personaje atacó con ' + ataqueJugador + ', el personaje del enemigo atacó con ' + ataqueEnemigo + ' ' + resultado;
    sectionMensaje.appendChild(parrafo);
}

function reiniciarJuego() {
    location.reload();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego);