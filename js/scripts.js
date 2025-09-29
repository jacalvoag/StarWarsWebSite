
const API_URL = 'https://swapi.dev/api/';


function cargarEstadisticasIniciales() {
    fetch(API_URL)
        .then(respuesta => respuesta.json()) 
        .then(datos => {
            return fetch(datos.people)
        })
        .then(respuestaPersonajes => respuestaPersonajes.json())
        .then(datosPersonajes => {
            
            const totalPersonajes = document.getElementById('total-personajes');
            if (totalPersonajes) { 
                totalPersonajes.textContent = datosPersonajes.count;
            }
        })
        .catch(error => {
            console.error('Error al cargar las estadísticas:', error);
            // Mostrar un mensaje de error simple en la interfaz
            const totalPersonajes = document.getElementById('total-personajes');
            if (totalPersonajes) {
                totalPersonajes.textContent = 'Error de carga';
            }
        });



        
}


cargarEstadisticasIniciales();

