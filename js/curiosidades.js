/* ==========================================================================
   LÓGICA PARA DATOS CURIOSOS AL AZAR (Trayectoria.html)
   ========================================================================== */

// 1. Declaración del Array con los datos curiosos extraídos del texto original
const datosCuriosos = [
    "Laurie Anderson fue una de las primeras artistas en combinar performance, música experimental y tecnología en la escena del arte contemporáneo.",
    "Su tema 'O Superman' se convirtió en un éxito inesperado en 1981 y llegó al segundo puesto en los rankings del Reino Unido.",
    "Diseñó su propio violín eléctrico que le permitía tocar sonidos digitales y activar efectos con sensores.",
    "En 2002 fue nombrada la primera artista residente de la NASA, desarrollando obras inspiradas en la exploración espacial.",
    "Su instalación de realidad virtual 'Chalkroom' recibió el premio a mejor experiencia inmersiva en el Festival de Cine de Venecia en 2017.",
    "Utiliza su propia voz alterada digitalmente como herramienta narrativa y estética en muchas de sus obras."
];

// 2. Captura de los elementos del DOM
const botonCurioso = document.querySelector('#boton-curioso');
const textoCurioso = document.querySelector('#texto-curioso');

// 3. Evento de escucha (Event Listener) para el clic del usuario
botonCurioso.addEventListener('click', function() {
    
    // Generamos un número entero aleatorio basado en la cantidad de elementos del array
    let indiceAleatorio = Math.floor(Math.random() * datosCuriosos.length);
    
    // Inyectamos el texto correspondiente a ese índice en el HTML
    textoCurioso.textContent = datosCuriosos[indiceAleatorio];
    
});