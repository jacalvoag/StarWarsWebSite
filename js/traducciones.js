const TRADUCCIONES_ES = {
    // Colores y Apariencia
    'n/a': 'Desconocido',
    'none': 'Ninguno',
    'unknown': 'Desconocido',
    'brown': 'Marrón',
    'blue': 'Azul',
    'green': 'Verde',
    'yellow': 'Amarillo',
    'black': 'Negro',
    'white': 'Blanco',
    'red': 'Rojo',
    'auburn': 'Castaño rojizo',
    'fair': 'Claro',
    'gold': 'Dorado',
    'grey': 'Gris',
    'gray': 'Gris',
    'light': 'Claro',
    'dark': 'Oscuro',
    'blond': 'Rubio',
    'Auburn, white': 'Castaño, blanco',

    // Climas 
    'temperate': 'Templado',
    'arid': 'Árido',
    'hot': 'Caliente',
    'frozen': 'Congelado',
    'murky': 'Turbio',
    'humid': 'Húmedo',

    // Terrenos y Otros
    'rocky': 'Rocoso',
    'mountain': 'Montañoso',
    'grasslands': 'Praderas',
    'city': 'Ciudad',
    'ocean': 'Océano',
    'desert': 'Desierto',
};



function traducir(valor) {
    if (!valor) return 'N/A';
    const traducido = TRADUCCIONES_ES[valor.toLowerCase()];
    
    return traducido || valor.charAt(0).toUpperCase() + valor.slice(1);
}