const API_URL = 'https://swapi.dev/api/';

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const cerrar = document.getElementsByClassName("cerrar-modal")[0];

    if (cerrar) {
        cerrar.onclick = function() {
            modal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});



function cargarListaPersonajes() {
    const listaPersonajes = document.getElementById('personajes-listado');
    
    if (!listaPersonajes) {
        return; 
    }

    fetch(`${API_URL}people/`)
        .then(response => response.json())
        .then(data => {
            const personajes = data.results;
            listaPersonajes.innerHTML = ''; 

            personajes.forEach(personaje => {
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
        })
        .catch(error => {
            console.error('Error al cargar la lista de personajes:', error);
            listaPersonajes.innerHTML = '<li>Hubo un error al obtener los datos.</li>';
        });
}

cargarListaPersonajes();