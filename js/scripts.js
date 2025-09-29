const API_URL = 'https://swapi.dev/api/';


function cargarEstadisticasIniciales() {
    const totalPersonajes = document.getElementById('total-personajes');
    if (!totalPersonajes) {
        return; 
    }


    Promise.all([
        fetch(API_URL).then(res => res.json()), 
    ])
    .then(([recursos]) => {
        return Promise.all([
            fetch(recursos.people).then(res => res.json()),
            fetch(recursos.starships).then(res => res.json()),
            fetch(recursos.planets).then(res => res.json())
        ]);
    })
    .then(([datosPersonajes, datosNaves, datosPlanetas]) => {
        
        const totalNaves = document.getElementById('total-naves');
        const totalPlanetas = document.getElementById('total-planetas');
        
        totalPersonajes.textContent = datosPersonajes.count;
        totalNaves.textContent = datosNaves.count;
        totalPlanetas.textContent = datosPlanetas.count;
    })
    .catch(error => {
        console.error('Error al cargar las estadísticas:', error);
        document.querySelectorAll('.stat-card p').forEach(p => {
            p.textContent = 'Error de carga';
        });
    });
}




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


function inicializarApp() {
    cargarEstadisticasIniciales();
    cargarListaPersonajes();
    cargarListaNaves();
    cargarListaPlanetas();
}

inicializarApp();