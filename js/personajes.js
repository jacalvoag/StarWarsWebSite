const API_URL = 'https://swapi.dev/api/';

let todosLosPersonajes = [];

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const cerrar = document.getElementsByClassName("cerrar-modal")[0];

    if (cerrar) {
        cerrar.onclick = function() { modal.style.display = "none"; }
    }

    window.onclick = function(event) {
        if (event.target == modal) { modal.style.display = "none"; }
    }
});



function renderizarLista(datos) {
    const listaPersonajes = document.getElementById('personajes-listado');
    listaPersonajes.innerHTML = ''; 

    if (datos.length === 0) {
        listaPersonajes.innerHTML = '<li>No se encontraron resultados.</li>';
        return;
    }

    datos.forEach((personaje) => {
        const li = document.createElement('li');

        li.textContent = personaje.name;
        
        li.addEventListener('click', () => {
            const modal = document.getElementById('modal');
            const modalCuerpo = document.getElementById('modal-cuerpo');
            const modalTitulo = document.getElementById('modal-titulo'); 

            modalTitulo.textContent = `Detalles de ${personaje.name}`;

            modalCuerpo.innerHTML = `
                <div class="modal-linea"><strong>Nombre:</strong> ${personaje.name}</div>
                <div class="modal-linea"><strong>Altura:</strong> ${personaje.height} cm</div>
                <div class="modal-linea"><strong>Peso:</strong> ${personaje.mass} kg</div>
                <div class="modal-linea"><strong>Color de Pelo:</strong> ${personaje.hair_color}</div>
                <div class="modal-linea"><strong>Color de Ojos:</strong> ${personaje.eye_color}</div>
            `;
            
            modal.style.display = "block";
        });
        
        listaPersonajes.appendChild(li);
    });
}



function buscarDatos() {
    const input = document.getElementById('busqueda-input');
    const busqueda = input.value.toLowerCase();
    
    const datosFiltrados = todosLosPersonajes.filter(item => {
        return item.name.toLowerCase().includes(busqueda);
    });

    renderizarLista(datosFiltrados);
}



async function cargarTodosLosPersonajes(url = `${API_URL}people/`) {
    const listaPersonajes = document.getElementById('personajes-listado');
    if (!listaPersonajes) return;
    
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        
        todosLosPersonajes = todosLosPersonajes.concat(datos.results);

        if (datos.next) {
            await cargarTodosLosPersonajes(datos.next);
        } else {
            renderizarLista(todosLosPersonajes);

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
        listaPersonajes.innerHTML = '<li>Hubo un error al obtener todos los datos.</li>';
    }
}

cargarTodosLosPersonajes();