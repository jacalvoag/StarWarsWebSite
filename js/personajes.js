const API_URL = 'https://swapi.dev/api/';

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
                mostrarDetallesPersonaje(personaje);
                });
                listaPersonajes.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al cargar la lista de personajes:', error);
            listaPersonajes.innerHTML = '<li>Hubo un error al obtener los datos.</li>';
        });
}


function mostrarDetallesPersonaje(personaje) {
    const detalles = `
        Nombre: ${personaje.name}
        Altura: ${personaje.height} cm
        Peso: ${personaje.mass} kg
        Color de Pelo: ${personaje.hair_color}
        Planeta Natal URL: ${personaje.homeworld}
    `;
    alert(detalles);
}

cargarListaPersonajes();