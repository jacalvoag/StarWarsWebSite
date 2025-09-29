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

cargarEstadisticasIniciales();