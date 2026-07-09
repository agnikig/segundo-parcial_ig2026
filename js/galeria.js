/* ==========================================================================
   LÓGICA PARA LA GALERÍA DINÁMICA DE OBRAS (trayectoria.html)
   ========================================================================== */

// 1. Declaración del Array de Objetos con 5 obras del artista
const obrasArtista = [
    {
        nombre: "O Superman",
        anio: 1981,
        imagen: "img/superman.jpg" 
    },
    {
        nombre: "Big Science",
        anio: 1982,
        imagen: "img/bigscience.jpg"
    },
    {
        nombre: "Mister Heartbreak",
        anio: 1984,
        imagen: "img/misterheartbreak.jpg"
    },
    {
        nombre: "Home of the Brave",
        anio: 1986,
        imagen: "img/homeofthebrave.jpg"
    },
    {
        nombre: "Chalkroom",
        anio: 2017,
        imagen: "img/anderson-1.jpg"
    }
];

// 2. Captura de elementos del DOM
const mosaicoObras = document.querySelector('#mosaico-obras');
const botonDiseno = document.querySelector('#boton-diseno');

// 3. Generación dinámica de la galería mediante un bucle
// Creamos una variable acumuladora vacía
let estructuraGaleria = "";

// Recorremos el array de objetos con un ciclo for
for (let i = 0; i < obrasArtista.length; i++) {
    // Armamos la tarjeta HTML para cada obra inyectando las propiedades del objeto
    estructuraGaleria += `
        <article class="tarjeta-obra">
            <img src="${obrasArtista[i].imagen}" alt="Obra: ${obrasArtista[i].nombre}">
            <div class="info-obra">
                <h3>${obrasArtista[i].nombre}</h3>
                <p>Año: ${obrasArtista[i].anio}</p>
            </div>
        </article>
    `;
}

// Inyectamos todo el string acumulado en nuestro contenedor del HTML
mosaicoObras.innerHTML = estructuraGaleria;

// ==========================================================================
// FUNCIONALIDAD EXTRA: CAMBIO DE DISEÑO VISUAL
// ==========================================================================
botonDiseno.addEventListener('click', function() {
    // Si contiene la clase, la elimina; si no, la agrega.
    if (mosaicoObras.classList.contains('diseno-alternativo')) {
        mosaicoObras.classList.remove('diseno-alternativo');
    } else {
        mosaicoObras.classList.add('diseno-alternativo');
    }
});