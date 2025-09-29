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
                    const modal = document.getElementById('modal');
                    const modalCuerpo = document.getElementById('modal-cuerpo');
                    const modalTitulo = document.getElementById('modal-titulo');

                    modalTitulo.textContent = `Detalles de ${planeta.name}`;
                    
                    const detalles = `
Nombre: ${planeta.name}
Clima: ${planeta.climate}
Terreno: ${planeta.terrain}
Población: ${planeta.population}
Diámetro: ${planeta.diameter}
                    `;
                    
                    modalCuerpo.innerHTML = detalles.replace(/\n/g, '<br>');
                    modal.style.display = "block";
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