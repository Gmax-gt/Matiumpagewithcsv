document.addEventListener("DOMContentLoaded", function() {
    // Form handling code...
    
    // Cargar productos del carrito desde localStorage
    loadCartProducts();

    // Event listener para los botones "Añadir al carrito" para los productos del HTML
    document.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.item');
            const title = product.querySelector('h5').textContent;
            const price = product.querySelector('.price').textContent;

            addToCart(title, price);
        });
    });
    
    // Event listener para abrir y cerrar el carrito
    const btnCart = document.querySelector('.container-cart-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');

    btnCart.addEventListener('click', () => {
        containerCartProducts.classList.toggle('hidden-cart');
    });

    // Event listener para eliminar producto del carrito
    document.querySelector('.row-product').addEventListener('click', function(event) {
        if (event.target.classList.contains('icon-close')) {
            // Obtener el elemento del producto que se va a eliminar
            const productElement = event.target.closest('.cart-product');
            
            // Obtener el título del producto que se va a eliminar
            const title = productElement.querySelector('.titulo-producto-carrito').textContent;

            // Filtrar el producto del array allProducts
            allProducts = allProducts.filter(product => product.title !== title);

            // Guardar en localStorage
            localStorage.setItem('cartProducts', JSON.stringify(allProducts));

            // Mostrar los productos actualizados en el carrito
            showCartProducts();
        }
    });
    // Event listener para el botón "Vaciar Carrito"
    const emptyCartButton = document.querySelector('.btn-empty-cart');
    emptyCartButton.addEventListener('click', () => {
        allProducts = [];
        localStorage.setItem('cartProducts', JSON.stringify(allProducts));
        showCartProducts();
    });
    // Event listener para el botón "Ir a Pagar"
    const goToPayButton = document.querySelector('.btn-go-to-pay');
    goToPayButton.addEventListener('click', () => {
        window.location.href = 'pago.html'; // Cambia 'pago.html' a la URL de tu página de pago
    });
});



// Variable para almacenar los productos del carrito
let allProducts = [];

// Función para mostrar los productos en el carrito
const showCartProducts = () => {
    const rowProduct = document.querySelector('.row-product');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartTotal = document.querySelector('.cart-total');
    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');

    // Limpiar HTML del carrito
    rowProduct.innerHTML = '';

    // Variables para calcular el total y cantidad de productos
    let total = 0;
    let totalOfProducts = 0;

    // Iterar sobre todos los productos en el carrito
    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
        `;

        rowProduct.appendChild(containerProduct);

        // Calcular el total y cantidad de productos
        total += parseInt(product.quantity) * parseInt(product.price.slice(1));
        totalOfProducts += product.quantity;
    });

    // Mostrar o ocultar mensaje de carrito vacío y total
    if (allProducts.length === 0) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    // Actualizar total y cantidad de productos en el carrito
    valorTotal.textContent = `$${total}`;
    countProducts.textContent = totalOfProducts;
};

// Función para agregar producto al carrito
const addToCart = (title, price) => {
    const exists = allProducts.some(product => product.title === title);

    if (exists) {
        // Incrementar la cantidad si el producto ya está en el carrito
        allProducts = allProducts.map(product => {
            if (product.title === title) {
                return { ...product, quantity: product.quantity + 1 };
            } else {
                return product;
            }
        });
    } else {
        // Agregar nuevo producto al carrito
        allProducts.push({
            title: title,
            price: price,
            quantity: 1
        });
    }

    // Guardar en localStorage
    localStorage.setItem('cartProducts', JSON.stringify(allProducts));

    // Mostrar los productos actualizados en el carrito
    showCartProducts();
};

// Función para cargar productos del carrito desde localStorage al cargar la página
const loadCartProducts = () => {
    const storedProducts = localStorage.getItem('cartProducts');
    if (storedProducts) {
        allProducts = JSON.parse(storedProducts);
        showCartProducts();
    }
};
