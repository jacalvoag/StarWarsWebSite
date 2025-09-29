const API_URL = 'https://swapi.dev/api/';

function cargarListaNaves() {
    const listaNaves = document.getElementById('naves-listado');

    if (!listaNaves) {
        return;
    }

    fetch(`${API_URL}starships/`)
        .then(response => response.json())
        .then(data => {
            const naves = data.results;
            listaNaves.innerHTML = ''; 

            naves.forEach(nave => {
                const li = document.createElement('li');
                li.textContent = nave.name;

                li.addEventListener('click', () => {
                    const detalles = `
                        Nombre: ${nave.name}
                        Modelo: ${nave.model}
                        Fabricante: ${nave.manufacturer}
                        Costo: ${nave.cost_in_credits} créditos
                        Tripulación: ${nave.crew}
                    `;
                    alert(detalles);
                });
                
                listaNaves.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al cargar la lista de naves:', error);
            listaNaves.innerHTML = '<li>Hubo un error al obtener los datos.</li>';
        });
}

cargarListaNaves();