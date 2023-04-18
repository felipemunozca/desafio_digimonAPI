/**** VARIABLES ****/

/* Traer variables desde el HTML. */
var formularioBuscar = document.querySelector('#formulario-buscar');
var nombreDigimon = document.querySelector('#nombre-digimon');


/**** EVENTOS ****/

window.addEventListener('load', consultarApi);

formularioBuscar.addEventListener('submit', function (e){
    e.preventDefault();

    if (nombreDigimon.value == "") {
        alert('Debes escribir un nombre antes de presionar el botón Buscar.')
    } else {
        buscarDigimonPorNombre(nombreDigimon.value)
        limpiarFormulario()
    }
});


/**** FUNCIONES ****/

/* Función para conectarse a la API del desafió. */
async function consultarApi(){
    try {
        var respuesta  = await fetch('https://digimon-api.vercel.app/api/digimon');
        var datos = await respuesta.json();

        // console.log(datos);
        imprimirDatos(datos);
    } catch (error) {
        console.log(error)
    }
}

/* Función para imprimir todos los Digimon en tarjetas. */
function imprimirDatos(datos){
    var contenido = document.querySelector('#tarjeta');

    for (let temp of datos) {
        contenido.innerHTML += `

        <div class="card m-3 ${temp.level}" style="width: 14rem;">
            <img src="${temp.img}" class="card-img-top pt-2" alt="...">
            <div class="card-body ">
                <p>Nombre: <strong>${temp.name}</strong></p>
                <p>Nivel: <strong>${temp.level}</strong> </p>
            </div>
        </div>
        `
    };
}

/* Función para conectarse a otra API, esta vez solo con un nombre. */
async function buscarDigimonPorNombre(nombreDigimon) {
    try {
        var respuesta  = await fetch(`https://www.digi-api.com/api/v1/digimon/${nombreDigimon}`);
        var datos = await respuesta.json();
        // console.log(respuesta)

        if (datos.message == 'Digimon not found') {
            alert('El nombre del DIGIMON que buscas no existe en nuestros registros o esta mal escrito.')
            return;
        }

        imprimirDatosUnDigimon(datos)
    } catch (err) {
        console.log(err)
    }
}

/* Función para imprimir la información del Digimon buscado. */
function imprimirDatosUnDigimon(datos){
    var contenido = document.querySelector('#contenido');
    // var card = document.querySelector('#card-buscar');
    
    /* Se crean variables para corregir el problema de las descripciones en distintos idiomas. */
    var historia;
    var lenguaje_1 = datos.descriptions[0].language;
    var lenguaje_2 = datos.descriptions[1].language;

    if (lenguaje_1 == "en_us") {
        historia = datos.descriptions[0].description;
    } 
    if (lenguaje_2 == "en_us") {
        historia = datos.descriptions[1].description;
    }

    var detalles = `
        <div class="card mb-3 d-block">
            <div class="row g-0">
                <div class="col-md-5 text-center pt-2 separador">
                    <h3 class="card-title mt-1">${datos.name}</h3>
                    <img src="${datos.images[0].href}" class="img-fluid rounded-start" alt="${datos.name}">
                </div>
                <div class="col-md-7">
                    <div class="card-body">
                        <p class="card-text"><strong>Descripción:</strong> ${historia}</p>
                        <p class="card-text"><strong>Nivel:</strong> ${datos.levels[0].level}</p>
                        <p class="card-text"><strong>Tipo:</strong> ${datos.types[0].type}</p>
                        <p class="card-text"><strong>Atributo:</strong> ${datos.attributes[0].attribute}</p>
                    </div>
                </div>
            </div>
        </div>
        
    `;

    // card.className = "card mb-3 d-block";
    contenido.innerHTML = detalles;
}

function limpiarFormulario() {
    nombreDigimon.value = "";
}


/**** JQUERY ****/

$("#menu-1").click(function(){
    $('#seccion-listar').show();
    $('#seccion-buscar').hide();
    limpiarFormulario();
    nombreDigimon.focus();
    var contenido = document.querySelector('#contenido');
    contenido.innerHTML = "";
});

$("#menu-2").click(function(){
    $('#seccion-listar').hide();
    $('#seccion-buscar').show();
    limpiarFormulario();
    nombreDigimon.focus();
    var contenido = document.querySelector('#contenido');
    contenido.innerHTML = "";
});