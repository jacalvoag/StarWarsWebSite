const API_URL = 'https://swapi.dev/api/';

let todosLosPlanetas = [];

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const cerrar = document.getElementsByClassName("cerrar-modal")[0];

    if (cerrar) {
        cerrar.onclick = function() { modal.style.display = "none"; }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});



function renderizarLista(datos) {
    const listaPlanetas = document.getElementById('planetas-listado');
    listaPlanetas.innerHTML = ''; 

    if (datos.length === 0) {
        listaPlanetas.innerHTML = '<li>No se encontraron resultados.</li>';
        return;
    }

    datos.forEach((planeta) => {
        const li = document.createElement('li');
        li.textContent = planeta.name;
        
        li.addEventListener('click', () => {
            const modal = document.getElementById('modal');
            const modalCuerpo = document.getElementById('modal-cuerpo');
            const modalTitulo = document.getElementById('modal-titulo'); 

            modalTitulo.textContent = `Detalles de ${planeta.name}`;

            modalCuerpo.innerHTML = `
                <div class="modal-linea"><strong>Nombre:</strong> ${planeta.name}</div>
                <div class="modal-linea"><strong>Clima:</strong> ${traducir(planeta.climate)}</div>
                <div class="modal-linea"><strong>Terreno:</strong> ${traducir(planeta.terrain)}</div>
                <div class="modal-linea"><strong>Población:</strong> ${planeta.population}</div>
                <div class="modal-linea"><strong>Diámetro:</strong> ${planeta.diameter} km</div>
            `;
            
            modal.style.display = "block";
        });
        
        listaPlanetas.appendChild(li);
    });
}



function buscarDatos() {
    const input = document.getElementById('busqueda-input');
    const busqueda = input.value.toLowerCase();
    
    const datosFiltrados = todosLosPlanetas.filter(item => {
        return item.name.toLowerCase().includes(busqueda);
    });

    renderizarLista(datosFiltrados);
}



async function cargarTodosLosPlanetas(url = `${API_URL}planets/`) {
    const listaPlanetas = document.getElementById('planetas-listado');
    if (!listaPlanetas) return;
    
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        
        todosLosPlanetas = todosLosPlanetas.concat(datos.results);

        if (datos.next) {
            await cargarTodosLosPlanetas(datos.next);
        } else {
            renderizarLista(todosLosPlanetas);

            const busquedaBoton = document.getElementById('busqueda-boton');
            const busquedaInput = document.getElementById('busqueda-input');

            busquedaBoton.addEventListener('click', buscarDatos);
            busquedaInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    buscarDatos();
                }
            });
        }

    } catch(error) {
        console.error('Error al cargar datos:', error);
        listaPlanetas.innerHTML = '<li>Hubo un error al obtener todos los datos.</li>';
    }
}

cargarTodosLosPlanetas();