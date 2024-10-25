// Array de ofertas (puedes agregar más objetos aquí)
const ofertas = [
    {
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQRe4Kxuwb-e1CP3k5myOfcOdALaZJTYQX2A&s',
        titulo: '15% con MercadoPago los miércoles.',
        descripcion: 'Comprando mínimo $15.000, sin tope de reintegro, todos los miércoles.',
        dia: 'Miércoles', // Filtro por día
        supermercado: 'Supermercados', // Filtro por supermercado
        metodoPago: 'MercadoPago' // Filtro por método de pago
    },
    {
        imagen: 'https://e7.pngegg.com/pngimages/466/438/png-clipart-carrefour-logo-carrefour-logo-icons-logos-emojis-iconic-brands-thumbnail.png',
        titulo: '30% con Banco Nación los miércoles.',
        descripcion: 'Compras realizadas en 1 pago, tope de reintegro de $10.000 por miércoles.',
        dia: 'Miércoles',
        supermercado: 'Supermercados',
        metodoPago: 'Banco Nación'
    },
    {
        imagen: 'https://cdn.worldvectorlogo.com/logos/coto.svg',
        titulo: '25% con MercadoPago los viernes.',
        descripcion: 'Sin tope de reintegro.',
        dia: 'Viernes',
        supermercado: 'Supermercados',
        metodoPago: 'MercadoPago'
    }
];


let filtroDia = 'General'; // Valor por defecto
let filtroSupermercado = 'General'; // Valor por defecto
let filtroPago = 'General'; // Valor por defecto

// Función para generar ofertas en el DOM, ahora filtrando por los carruseles seleccionados
function generarOfertas() {
    const ofertasContainer = document.getElementById('ofertas-container');
    ofertasContainer.innerHTML = ''; // Limpia el contenido
    let hayOfertas = false;

    ofertas.forEach(oferta => {
        // Verifica si la oferta coincide con los filtros seleccionados
        const diaCoincide = filtroDia === 'General' || oferta.dia === filtroDia;
        const supermercadoCoincide = filtroSupermercado === 'General' || oferta.supermercado === filtroSupermercado;
        const metodoPagoCoincide = filtroPago === 'General' || oferta.metodoPago === filtroPago;

        // Si la oferta coincide con todos los filtros, la mostramos
        if (diaCoincide && supermercadoCoincide && metodoPagoCoincide) {
            hayOfertas = true;
            const ofertaElement = document.createElement('div');
            ofertaElement.classList.add('oferta');

            ofertaElement.innerHTML = `
                <img src="${oferta.imagen}" alt="${oferta.titulo}">
                <div class="oferta-contenido">
                    <h3>${oferta.titulo}</h3>
                    <p>${oferta.descripcion}</p>
                </div>
            `;

            ofertasContainer.appendChild(ofertaElement);
        }
    });
    if (!hayOfertas) {
        const mensajeElement = document.createElement('p');
        mensajeElement.textContent = 'No hay ofertas disponibles para los filtros seleccionados.';
        mensajeElement.style.textAlign = 'center'; // Centrar el mensaje
        mensajeElement.style.color = '#666'; // Color gris suave
        ofertasContainer.appendChild(mensajeElement);
    }
}

// Función para manejar selección de filtros en los carruseles
function inicializarCarruseles() {
    // Selecciona todos los carruseles
    const carruseles = document.querySelectorAll('.carrusel');

    carruseles.forEach(carrusel => {
        // Marca el primer botón como seleccionado al cargar la página
        const firstItem = carrusel.querySelector('.carrusel-item');
        firstItem.classList.add('seleccionado');

        // Añade evento click para cambiar la selección
        carrusel.addEventListener('click', (event) => {
            if (event.target.classList.contains('carrusel-item')) {
                // Elimina la clase de selección del anterior seleccionado
                carrusel.querySelector('.seleccionado').classList.remove('seleccionado');
                // Añade la clase de selección al nuevo botón
                event.target.classList.add('seleccionado');

                // Actualiza el filtro según el carrusel
                if (carrusel.id === 'dias-carrusel') {
                    filtroDia = event.target.textContent;
                } else if (carrusel.id === 'supermercados-carrusel') {
                    filtroSupermercado = event.target.textContent;
                } else if (carrusel.id === 'pagos-carrusel') {
                    filtroPago = event.target.textContent;
                }

                // Filtra y genera ofertas según las selecciones actuales
                generarOfertas();
            }
        });
    });
}

// Llamamos a las funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    generarOfertas(); // Genera las ofertas al inicio
    inicializarCarruseles(); // Inicializa los carruseles
});