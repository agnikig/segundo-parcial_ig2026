/* ==========================================================================
   GESTIÓN DE REPOSITORIO 
   ========================================================================== */

// 1. Declaración de variables globales del sistema
let tiempoTransferencia = 0;
let costoAlmacenamiento = 0;
let cantidadObrasTotal = 0;
let obrasCargadas = []; // Array vacío para guardar los Objetos de cada obra

// 2. Captura de elementos del DOM (Módulo de Configuración)
const inputTiempo = document.querySelector('#tiempo-transferencia');
const inputCosto = document.querySelector('#costo-almacenamiento');
const inputCantidad = document.querySelector('#cantidad-obras');
const botonFijar = document.querySelector('#boton-fijar-cantidad');

// Captura de elementos del DOM (Módulo de Carga de Obras)
const formularioObras = document.querySelector('#formulario-obras');
const camposObras = document.querySelector('#campos-obras'); // El fieldset
const inputNombre = document.querySelector('#nombre-obra');
const inputDuracion = document.querySelector('#duracion-obra');
const inputPeso = document.querySelector('#peso-obra');
const botonCargar = document.querySelector('#boton-cargar-obra');
const spanContador = document.querySelector('#contador-carga');
const spanTotal = document.querySelector('#total-carga');

// Captura de elementos del DOM (Panel de Resultados)
const botonCalcular = document.querySelector('#boton-calcular');
const botonReiniciar = document.querySelector('#boton-reiniciar');
const bloqueResultados = document.querySelector('#bloque-resultados');

// ==========================================================================
// EVENTO 1: FIJAR CANTIDAD (Validación y habilitación de carga)
// ==========================================================================
botonFijar.addEventListener('click', function() {
    // Tomamos los valores y los convertimos a números
    let tiempo = parseInt(inputTiempo.value);
    let costo = parseFloat(inputCosto.value);
    let cantidad = parseInt(inputCantidad.value);

    // Validación estricta con condicional IF
    if (isNaN(tiempo) || tiempo <= 0 || isNaN(costo) || costo < 0 || isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingresá valores numéricos válidos y mayores a cero en la configuración.");
    } else {
        // Si todo es válido, guardamos en las variables globales
        tiempoTransferencia = tiempo;
        costoAlmacenamiento = costo;
        cantidadObrasTotal = cantidad;

        // Actualizamos la interfaz visual
        spanTotal.textContent = cantidadObrasTotal;
        
        // Bloqueamos el primer formulario (deshabilitamos inputs y botón)
        inputTiempo.disabled = true;
        inputCosto.disabled = true;
        inputCantidad.disabled = true;
        botonFijar.disabled = true;

        // Habilitamos el segundo formulario para empezar a cargar
        camposObras.disabled = false;
        formularioObras.classList.remove('formulario-bloqueado'); // Quitamos la opacidad del CSS
    }
});

// ==========================================================================
// EVENTO 2: CARGAR OBRA INDIVIDUAL (Creación de Objetos y Array)
// ==========================================================================
botonCargar.addEventListener('click', function() {
    let nombre = inputNombre.value.trim();
    let duracion = parseInt(inputDuracion.value);
    let peso = parseFloat(inputPeso.value);

    // Validamos los datos de la obra
    if (nombre === "" || isNaN(duracion) || duracion <= 0 || isNaN(peso) || peso <= 0) {
        alert("Completá correctamente el nombre, la duración y el peso de la obra.");
    } else {
        // Creamos un OBJETO con los datos de la obra ingresada
        let nuevaObra = {
            nombreObra: nombre,
            duracionObra: duracion,
            pesoObra: peso
        };

        // Guardamos el objeto en el ARRAY
        obrasCargadas.push(nuevaObra);

        // Actualizamos el contador visual
        spanContador.textContent = obrasCargadas.length;

        // Limpiamos los inputs para la siguiente carga
        inputNombre.value = "";
        inputDuracion.value = "";
        inputPeso.value = "";
        inputNombre.focus();

        // Condicional: ¿Ya llegamos al límite fijado?
        if (obrasCargadas.length === cantidadObrasTotal) {
            // Deshabilitamos la carga
            camposObras.disabled = true;
            formularioObras.classList.add('formulario-bloqueado');
            
            // Habilitamos el botón para calcular los resultados
            botonCalcular.disabled = false;
            alert("Carga finalizada. Ya podés calcular los resultados.");
        }
    }
});

// ==========================================================================
// EVENTO 3: CALCULAR RESULTADOS (Ciclos FOR y lógica matemática)
// ==========================================================================
botonCalcular.addEventListener('click', function() {
    
    // Variables para los cálculos (acumuladores)
    let duracionTotal = 0;
    let pesoTotal = 0;
    
    // Variables para encontrar el máximo (Obra más larga)
    let obraMasLarga = obrasCargadas[0]; // Asumimos que la primera es la más larga inicialmente

    // CICLO FOR: Recorremos el array de objetos para calcular
    for (let i = 0; i < obrasCargadas.length; i++) {
        let obraActual = obrasCargadas[i];

        // Sumamos duraciones y pesos
        duracionTotal += obraActual.duracionObra;
        pesoTotal += obraActual.pesoObra;

        // Condicional para buscar la de mayor duración
        if (obraActual.duracionObra > obraMasLarga.duracionObra) {
            obraMasLarga = obraActual;
        }
    }

    // 1. Duración promedio
    let duracionPromedio = duracionTotal / cantidadObrasTotal;

    // 2. Tiempo de transferencia de la obra más larga (Peso * tiempoTransferencia)
    let tiempoDescargaMasLarga = obraMasLarga.pesoObra * tiempoTransferencia;

    // 3. Presupuesto anual (Peso total * costo mensual * 12 meses)
    let presupuestoAnual = pesoTotal * costoAlmacenamiento * 12;

    // INYECCIÓN AL DOM: Armamos el HTML con los resultados
    bloqueResultados.innerHTML = `
        <h3>Reporte Analítico del Repositorio</h3>
        <ul>
            <li><strong>Duración Total:</strong> ${duracionTotal} minutos.</li>
            <li><strong>Duración Promedio:</strong> ${duracionPromedio.toFixed(2)} minutos por obra.</li>
            <li><strong>Obra de Mayor Duración:</strong> "${obraMasLarga.nombreObra}" (${obraMasLarga.duracionObra} min). Su tiempo de transferencia es de ${tiempoDescargaMasLarga} ms.</li>
            <li><strong>Presupuesto Anual Estimado:</strong> $${presupuestoAnual.toFixed(2)}</li>
        </ul>
    `;

    // Deshabilitamos calcular y habilitamos reiniciar
    botonCalcular.disabled = true;
    botonReiniciar.disabled = false;
});

// ==========================================================================
// EVENTO 4: REINICIAR SISTEMA (Volver todo a cero)
// ==========================================================================
botonReiniciar.addEventListener('click', function() {
    // Vaciamos el array y reseteamos variables
    obrasCargadas = [];
    cantidadObrasTotal = 0;

    // Limpiamos los textos del DOM
    spanContador.textContent = "0";
    spanTotal.textContent = "0";
    bloqueResultados.innerHTML = "";

    // Habilitamos configuración
    inputTiempo.disabled = false;
    inputCosto.disabled = false;
    inputCantidad.disabled = false;
    botonFijar.disabled = false;
    
    // Vaciamos los valores de los inputs de config
    inputTiempo.value = "";
    inputCosto.value = "";
    inputCantidad.value = "";

    // Aseguramos que la carga quede bloqueada y los botones desactivados
    camposObras.disabled = true;
    formularioObras.classList.add('formulario-bloqueado');
    botonCalcular.disabled = true;
    botonReiniciar.disabled = true;
});