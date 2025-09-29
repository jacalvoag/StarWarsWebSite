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
    listaPersonajes.innerHTML = ''; // Limpiar lista

    if (datos.length === 0) {
        listaPersonajes.innerHTML = '<li>No se encontraron resultados.</li>';
        return;
    }

    datos.forEach(personaje => {
        const li = document.createElement('li');
        li.textContent = personaje.name; 
        
        li.addEventListener('click', () => {
            const modal = document.getElementById('modal');
            const modalCuerpo = document.getElementById('modal-cuerpo');
            const modalTitulo = document.getElementById('modal-titulo'); 

            modalTitulo.textContent = `Detalles de ${personaje.name}`;
            
            const detalles = `
Nombre: ${personaje.name}
Altura: ${personaje.height} cm
Peso: ${personaje.mass} kg
Color de Pelo: ${personaje.hair_color}
Color de Ojos: ${personaje.eye_color}
            `;
            
            modalCuerpo.innerHTML = detalles.replace(/\n/g, '<br>');
            modal.style.display = "block";
        });
        
        listaPersonajes.appendChild(li);
    });
}



function buscarDatos() {
    const input = document.getElementById('busqueda-input');
    const busqueda = input.value.toLowerCase();
    
    // Filtramos sobre el array global de datos
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