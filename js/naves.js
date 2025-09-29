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
                    const modal = document.getElementById('modal');
                    const modalCuerpo = document.getElementById('modal-cuerpo');
                    const modalTitulo = document.getElementById('modal-titulo'); 

                    modalTitulo.textContent = `Detalles de ${nave.name}`;
                    
                    const detalles = `
Nombre: ${nave.name}
Modelo: ${nave.model}
Fabricante: ${nave.manufacturer}
Costo: ${nave.cost_in_credits} créditos
Tripulación: ${nave.crew}
                    `;
                    
                    modalCuerpo.innerHTML = detalles.replace(/\n/g, '<br>');
                    modal.style.display = "block";
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