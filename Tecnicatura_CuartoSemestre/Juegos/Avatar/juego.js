class Personaje {
    constructor(nombre, foto, vidas = 3) {
        this.nombre = nombre;
        this.foto = foto;
        this.vidas = vidas;
        this.ataqueActual = null;
    }

    recibirDano() {
        this.vidas--;
    }

    estaVivo() {
        return this.vidas > 0;
    }

    resetear() {
        this.vidas = 3;
        this.ataqueActual = null;
    }
}

class Ataque {
    constructor(nombre, debilContra = null) {
        this.nombre = nombre;
        this.debilContra = debilContra;
    }

    venceA(otroAtaque) {
        return this.debilContra === otroAtaque.nombre;
    }
}

class Juego {
    constructor() {
        this.jugador = null;
        this.enemigo = null;
        this.ataques = this.inicializarAtaques();
        this.personajes = this.inicializarPersonajes();
        this.interfaz = new Interfaz();
    }

    inicializarAtaques() {
        return {
            'Punio': new Ataque('Punio', 'Barrida'),
            'Patada': new Ataque('Patada', 'Punio'),
            'Barrida': new Ataque('Barrida', 'Patada')
        };
    }

    inicializarPersonajes() {
        // Crear objetos Avatar como en el ejemplo de las imágenes
        let zuko = new Personaje('Zuko', 'assets/zuko.png', 3);
        let katara = new Personaje('Katara', 'assets/katara.png', 3);
        let aang = new Personaje('Aang', 'assets/aang.png', 3);
        let toph = new Personaje('Toph', 'assets/toph.png', 3);
        let sokka = new Personaje('Sokka', 'assets/sokka.png', 3);
        let azula = new Personaje('Azula', 'assets/azula.png', 3);
        
        let avatares = [];
        avatares.push(zuko, katara, aang, toph, sokka, azula);
        
        return avatares;
    }

    generarPersonajesEnDOM() {
        // Capturamos el elemento en el HTML como en el ejemplo de las imágenes
        const contenedorTarjetas = document.getElementById('contenedorTarjetas');
        let opcionAvatares = '';

        // Recorremos el array de avatares con forEach como se muestra en las imágenes
        // Este formato es el más utilizado en e-commerce para agregar elementos
        // Con esto pasamos de tener una página estática a una página dinámica
        this.personajes.forEach((avatar) => {
            opcionAvatares = `
                <div class="personaje-option">
                    <input type="radio" name="personaje" id="${avatar.nombre.toLowerCase()}" />
                    <label for="${avatar.nombre.toLowerCase()}">
                        <img src="${avatar.foto}" alt="${avatar.nombre}" class="personaje-imagen">
                        <span>${avatar.nombre}</span>
                    </label>
                </div>
            `;
            contenedorTarjetas.innerHTML += opcionAvatares;
        });
    }

    seleccionarPersonajeJugador(personaje) {
        this.jugador = personaje;
        this.seleccionarPersonajeEnemigo();
        this.interfaz.mostrarSeleccionAtaque();
    }

    seleccionarPersonajeEnemigo() {
        const indiceAleatorio = this.aleatorio(0, this.personajes.length - 1);
        this.enemigo = this.personajes[indiceAleatorio];
        this.interfaz.mostrarPersonajes(this.jugador.nombre, this.enemigo.nombre);
    }

    realizarAtaque(nombreAtaque) {
        this.jugador.ataqueActual = this.ataques[nombreAtaque];
        this.ataqueAleatorioEnemigo();
        this.combate();
    }

    ataqueAleatorioEnemigo() {
        const ataquesDisponibles = Object.keys(this.ataques);
        const indiceAleatorio = this.aleatorio(0, ataquesDisponibles.length - 1);
        const nombreAtaque = ataquesDisponibles[indiceAleatorio];
        this.enemigo.ataqueActual = this.ataques[nombreAtaque];
    }

    combate() {
        let resultado;

        if (this.jugador.ataqueActual.nombre === this.enemigo.ataqueActual.nombre) {
            resultado = "EMPATE";
        } else if (this.jugador.ataqueActual.venceA(this.enemigo.ataqueActual)) {
            resultado = "GANASTE";
            this.enemigo.recibirDano();
        } else {
            resultado = "PERDISTE";
            this.jugador.recibirDano();
        }

        this.interfaz.actualizarVidas(this.jugador.vidas, this.enemigo.vidas);
        this.interfaz.crearMensaje(this.jugador.ataqueActual.nombre, this.enemigo.ataqueActual.nombre, resultado);
        this.revisarVidas();
    }

    revisarVidas() {
        if (!this.enemigo.estaVivo()) {
            this.interfaz.crearMensajeFinal("FELICITACIONES!!! HAS GANADO 🤩🥳🎉");
        } else if (!this.jugador.estaVivo()) {
            this.interfaz.crearMensajeFinal("QUE PENA, HAS PERDIDO 😢😭😭😭");
        }
    }

    reiniciar() {
        if (this.jugador) this.jugador.resetear();
        if (this.enemigo) this.enemigo.resetear();
        this.interfaz.reiniciar();
    }

    aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

class Interfaz {
    constructor() {
        // Solo capturamos elementos que ya existen en el HTML estático
        this.sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
        this.botonPersonajeJugador = document.getElementById('boton-personaje');
        this.sectionReiniciar = document.getElementById('reiniciar');
        this.botonReiniciar = document.getElementById('boton-reiniciar');
        this.sectionSeleccionarPersonaje = document.getElementById('seleccionar-personaje');
        this.spanPersonajeJugador = document.getElementById('personaje-jugador');
        this.spanPersonajeEnemigo = document.getElementById('personaje-enemigo');
        this.spanVidasJugador = document.getElementById('vidas-jugador');
        this.spanVidasEnemigo = document.getElementById('vidas-enemigo');
        this.sectionMensaje = document.getElementById('mensajes');
    }

    // Método para capturar elementos después de generar HTML dinámico
    inicializarElementosDinamicos() {
        this.botonesAtaque = document.querySelectorAll('#seleccionar-ataque button');
    }

    iniciar() {
        // PRIMERO: Generar HTML dinámico de personajes (desde la clase Juego)
        juego.generarPersonajesEnDOM();
        
        this.sectionSeleccionarAtaque.style.display = 'none';
        this.botonPersonajeJugador.addEventListener('click', () => this.seleccionarPersonajeJugador());
        this.sectionReiniciar.style.display = "none";

        document.getElementById("reglas-del-juego").style.display = "none";
        document.getElementById('boton-reglas').addEventListener('click', () => this.mostrarReglas());

        document.getElementById('boton-jugar').style.display = 'none';
        document.getElementById('seleccionar-personaje').style.display = 'block';

        // DESPUÉS: Inicializar elementos dinámicos cuando el HTML ya existe
        this.inicializarElementosDinamicos();

        this.botonesAtaque.forEach(boton => {
            boton.addEventListener('click', (event) => {
                const ataque = event.target.dataset.ataque;
                juego.realizarAtaque(ataque);
            });
        });

        this.botonReiniciar.addEventListener('click', () => this.reiniciar());
    }

    mostrarReglas() {
        document.getElementById("reglas-del-juego").style.display = "block";
        document.getElementById('boton-jugar').style.display = 'block';
        document.getElementById('boton-reglas').style.display = 'none';
        document.getElementById('seleccionar-personaje').style.display = 'none';
        document.getElementById('boton-jugar').addEventListener('click', () => this.seleccionarPersonajeJugador());
    }

    seleccionarPersonajeJugador() {
        this.sectionSeleccionarAtaque.style.display = 'block';
        document.getElementById('boton-reglas').style.display = 'none';
        this.sectionSeleccionarPersonaje.style.display = 'none';

        document.getElementById("reglas-del-juego").style.display = "none";
        document.getElementById('boton-reglas').style.display = 'none';

        // Buscar el personaje seleccionado dinámicamente
        let personajeSeleccionado = null;
        const radioButtons = document.querySelectorAll('input[name="personaje"]');
        
        for (let radio of radioButtons) {
            if (radio.checked) {
                // Encontrar el objeto personaje correspondiente
                personajeSeleccionado = juego.personajes.find(personaje => 
                    personaje.nombre.toLowerCase() === radio.id
                );
                break;
            }
        }

        if (!personajeSeleccionado) {
            this.mostrarError('Selecciona un personaje');
            return;
        }

        juego.seleccionarPersonajeJugador(personajeSeleccionado);
    }

    mostrarError(mensaje) {
        const mensajeError = document.createElement("p");
        mensajeError.innerHTML = mensaje;
        mensajeError.style.color = "red";
        this.sectionSeleccionarPersonaje.appendChild(mensajeError);

        setTimeout(() => {
            this.sectionSeleccionarPersonaje.removeChild(mensajeError);
        }, 2000);
        this.reiniciar();
    }

    mostrarSeleccionAtaque() {
        this.sectionSeleccionarAtaque.style.display = 'block';
    }

    mostrarPersonajes(nombreJugador, nombreEnemigo) {
        this.spanPersonajeJugador.innerHTML = nombreJugador;
        this.spanPersonajeEnemigo.innerHTML = nombreEnemigo;
    }

    actualizarVidas(vidasJugador, vidasEnemigo) {
        this.spanVidasJugador.innerHTML = vidasJugador;
        this.spanVidasEnemigo.innerHTML = vidasEnemigo;
    }

    crearMensaje(ataqueJugador, ataqueEnemigo, resultado) {
        const parrafo = document.createElement('p');
        parrafo.innerHTML = `Tu personaje atacó con ${ataqueJugador}, el personaje del enemigo atacó con ${ataqueEnemigo} ${resultado}`;
        this.sectionMensaje.appendChild(parrafo);
    }

    crearMensajeFinal(resultado) {
        // Mostrar la sección de reiniciar
        this.sectionReiniciar.style.display = "block";

        // Agregar el mensaje final
        const parrafo = document.createElement('p');
        parrafo.innerHTML = resultado;
        parrafo.style.fontSize = '1.3em';
        parrafo.style.fontWeight = 'bold';
        parrafo.style.textAlign = 'center';
        parrafo.style.color = '#ff6b00';
        parrafo.style.textShadow = '0 0 10px rgba(255, 100, 0, 0.8)';
        this.sectionMensaje.appendChild(parrafo);

        // Deshabilitar botones de ataque
        if (this.botonesAtaque && this.botonesAtaque.length > 0) {
            this.botonesAtaque.forEach(boton => {
                boton.disabled = true;
            });
        }
    }

    reiniciar() {
        location.reload();
    }
}

let juego;

function iniciarJuego() {
    juego = new Juego();
    juego.interfaz.iniciar();
}
window.addEventListener('load', iniciarJuego);