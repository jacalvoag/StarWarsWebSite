const API_URL = 'https://swapi.dev/api/';

function cargarListaPlanetas() {
    const listaPlanetas = document.getElementById('planetas-listado');

    if (!listaPlanetas) {
        return;
    }

    fetch(`${API_URL}planets/`)
        .then(response => response.json())
        .then(data => {
            const planetas = data.results;
            listaPlanetas.innerHTML = ''; 

            planetas.forEach(planeta => {
                const li = document.createElement('li');
                li.textContent = planeta.name;

                li.addEventListener('click', () => {
                    const detalles = `
Nombre: ${planeta.name}
Clima: ${planeta.climate}
Terreno: ${planeta.terrain}
Población: ${planeta.population}
Diámetro: ${planeta.diameter}
                    `;
                    alert(detalles);
                });
                
                listaPlanetas.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al cargar la lista de planetas:', error);
            listaPlanetas.innerHTML = '<li>Hubo un error al obtener los datos.</li>';
        });
}

cargarListaPlanetas();