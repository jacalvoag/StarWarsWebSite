const API_URL = 'https://swapi.dev/api/';


function cargarEstadisticasIniciales() {
    // Solo se ejecuta en la página de inicio
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

cargarEstadisticasIniciales();



function cargarListaPersonajes() {
    // Apuntamos al contenedor <ul> en personajes.html
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
                listaPersonajes.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error al cargar la lista de personajes:', error);
            listaPersonajes.innerHTML = '<li>Hubo un error al obtener los datos.</li>';
        });
}

cargarListaPersonajes();