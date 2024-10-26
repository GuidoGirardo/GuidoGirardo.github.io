// Definir categorías y subcategorías en un objeto
const categorias = {
    'Supermercados': ['Coto', 'Carrefour', 'Día'],
    'Farmacias': ['Farmacity', 'Farmacias Villegas'], // Nueva categoría y subcategorías
};

// Array de ofertas (puedes agregar más objetos aquí)
const ofertas = [
    {
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQRe4Kxuwb-e1CP3k5myOfcOdALaZJTYQX2A&s',
        titulo: '15% con MercadoPago los miércoles.',
        descripcion: 'Comprando mínimo $15.000, sin tope de reintegro, todos los miércoles.',
        dia: 'Miércoles', // Filtro por día
        categoria: 'Supermercados', // Filtro por supermercado
        metodoPago: 'MercadoPago', // Filtro por método de pago
        subcategoria: 'Día'
    },
    {
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS3R9FvC2I4gRnUVEYNHe5nPk464P5vOf_sQ&s',
        titulo: '30% con Banco Nación los miércoles.',
        descripcion: 'Compras realizadas en 1 pago, tope de reintegro de $10.000 por miércoles.',
        dia: 'Miércoles',
        categoria: 'Supermercados',
        metodoPago: 'Banco Nación',
        subcategoria: 'Carrefour'
    },
    {
        imagen: 'https://cotoofertas.com/wp-content/uploads/2020/08/coto.jpg',
        titulo: '25% con MercadoPago los viernes.',
        descripcion: 'Sin tope de reintegro.',
        dia: 'Viernes',
        categoria: 'Supermercados',
        metodoPago: 'MercadoPago',
        subcategoria: 'Coto'
    },
    {
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw0Bim1J-u-UeAtW_YjlUhFZ3ZPZazyB-b1w&s',
        titulo: 'Farmacias Villegas',
        descripcion: 'XD',
        dia: 'Martes',
        categoria: 'Farmacias',
        metodoPago: 'BBVA',
        subcategoria: 'Farmacias Villegas'
    }
];

let filtroDia = 'General';
let filtroCategoria = 'General';
let filtroPago = 'General';
let filtroSubcategoria = 'General';

// Generar ofertas iniciales
function generarOfertas() {
    const ofertasContainer = document.getElementById('ofertas-container');
    ofertasContainer.innerHTML = ''; 
    let hayOfertas = false;

    ofertas.forEach(oferta => {
        const diaCoincide = filtroDia === 'General' || oferta.dia === filtroDia;
        const categoriaCoincide = filtroCategoria === 'General' || oferta.categoria === filtroCategoria;
        const metodoPagoCoincide = filtroPago === 'General' || oferta.metodoPago === filtroPago;
        const subcategoriaCoincide = filtroSubcategoria === 'General' || oferta.subcategoria === filtroSubcategoria; 

        if (diaCoincide && categoriaCoincide && metodoPagoCoincide && subcategoriaCoincide) {
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
        mensajeElement.style.textAlign = 'center';
        mensajeElement.style.color = '#666';
        ofertasContainer.appendChild(mensajeElement);
    }
}

function inicializarCarruseles() {
    const carruseles = document.querySelectorAll('.carrusel');

    carruseles.forEach(carrusel => {
        const firstItem = carrusel.querySelector('.carrusel-item');
        firstItem.classList.add('seleccionado');

        carrusel.addEventListener('click', (event) => {
            if (event.target.classList.contains('carrusel-item')) {
                carrusel.querySelector('.seleccionado').classList.remove('seleccionado');
                event.target.classList.add('seleccionado');

                if (carrusel.id === 'dias-carrusel') {
                    filtroDia = event.target.textContent;
                } else if (carrusel.id === 'categoria-carrusel') {
                    filtroCategoria = event.target.textContent;

                    // Si se selecciona una categoría, muestra el carrusel de subcategorías
                    if (filtroCategoria in categorias) {
                        mostrarCarruselSubcategoria(categorias[filtroCategoria]);
                    } else {
                        ocultarCarruselSubcategoria();
                    }
                } else if (carrusel.id === 'pagos-carrusel') {
                    filtroPago = event.target.textContent;
                }

                generarOfertas();
            }
        });
    });
}

function mostrarCarruselSubcategoria(subcategorias) {
    const subcategoriaContainer = document.getElementById('subcategoria-container');
    subcategoriaContainer.innerHTML = `
        <div class="carrusel" id="subcategoria-carrusel">
            <div class="carrusel-item">General</div>
            ${subcategorias.map(sub => `<div class="carrusel-item">${sub}</div>`).join('')}
        </div>
    `;

    const subcategoriaCarrusel = document.getElementById('subcategoria-carrusel');
    const firstSubItem = subcategoriaCarrusel.querySelector('.carrusel-item');
    firstSubItem.classList.add('seleccionado');

    subcategoriaCarrusel.addEventListener('click', (event) => {
        if (event.target.classList.contains('carrusel-item')) {
            subcategoriaCarrusel.querySelector('.seleccionado').classList.remove('seleccionado');
            event.target.classList.add('seleccionado');
            filtroSubcategoria = event.target.textContent;
            generarOfertas();
        }
    });
}

function ocultarCarruselSubcategoria() {
    document.getElementById('subcategoria-container').innerHTML = '';
    filtroSubcategoria = 'General';
}

// Llamar a las funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    generarOfertas();
    inicializarCarruseles();
});