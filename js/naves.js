const API_URL = 'https://swapi.dev/api/';

let todasLasNaves = [];

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
    const listaNaves = document.getElementById('naves-listado');
    listaNaves.innerHTML = ''; 

    if (datos.length === 0) {
        listaNaves.innerHTML = '<li>No se encontraron resultados.</li>';
        return;
    }

    datos.forEach((nave) => {
        const li = document.createElement('li');
        li.textContent = nave.name; 
        
        li.addEventListener('click', () => {
            const modal = document.getElementById('modal');
            const modalCuerpo = document.getElementById('modal-cuerpo');
            const modalTitulo = document.getElementById('modal-titulo'); 

            modalTitulo.textContent = `Detalles de ${nave.name}`;

            modalCuerpo.innerHTML = `
                <div class="modal-linea"><strong>Nombre:</strong> ${nave.name}</div>
                <div class="modal-linea"><strong>Modelo:</strong> ${nave.model}</div>
                <div class="modal-linea"><strong>Fabricante:</strong> ${nave.manufacturer}</div>
                <div class="modal-linea"><strong>Costo:</strong> ${nave.cost_in_credits} créditos</div>
                <div class="modal-linea"><strong>Tripulación:</strong> ${nave.crew}</div>
            `;
            
            modal.style.display = "block";
        });
        
        listaNaves.appendChild(li);
    });
}



function buscarDatos() {
    const input = document.getElementById('busqueda-input');
    const busqueda = input.value.toLowerCase();
    
    const datosFiltrados = todasLasNaves.filter(item => {
        return item.name.toLowerCase().includes(busqueda);
    });

    renderizarLista(datosFiltrados);
}



async function cargarTodasLasNaves(url = `${API_URL}starships/`) {
    const listaNaves = document.getElementById('naves-listado');
    if (!listaNaves) return;
    
    try {
        const respuesta = await fetch(url);
        const datos = await respuesta.json();
        
        todasLasNaves = todasLasNaves.concat(datos.results);

        if (datos.next) {
            await cargarTodasLasNaves(datos.next);
        } else {
            renderizarLista(todasLasNaves);
A
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
        listaNaves.innerHTML = '<li>Hubo un error al obtener todos los datos.</li>';
    }
}

cargarTodasLasNaves();