let cart = [];
let total = 0;

// Agregar evento a los botones "Agregar al carrito"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const pizza = button.parentElement;
        const name = pizza.getAttribute('data-name');
        const price = parseFloat(pizza.getAttribute('data-price'));

        // Agregar la pizza al carrito
        cart.push({ name, price });
        total += price;

        updateCart();
    });
});

// Función para actualizar el carrito
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });

    document.getElementById('total-price').textContent = `Total: $${total.toFixed(2)}`;
    document.getElementById('cart-count').textContent = cart.length; // Actualiza el contador del carrito
}

// Función para abrir el modal
function openModal() {
    document.getElementById('cart-modal').classList.remove('hidden');
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('cart-modal').classList.add('hidden');
}

// Evento para abrir el modal al hacer clic en el ícono del carrito
document.getElementById('cart-icon').addEventListener('click', (event) => {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
    openModal();
});

// Evento para finalizar el pedido
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('El carrito está vacío.');
        return;
    }

    const orderDetails = cart.map(item => `${item.name} - $${item.price.toFixed(2)}`).join('%0A');
    const message = `Hola, quiero hacer un pedido:%0A${orderDetails}%0ATotal: $${total.toFixed(2)}`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`; // Reemplaza 1234567890 con el número de WhatsApp de la pizzería

    window.open(whatsappUrl, '_blank');
});

// Evento para cerrar el modal al hacer clic en la "X"
document.querySelector('.close-button').addEventListener('click', closeModal);

// Cerrar el modal al hacer clic fuera del contenido del modal
window.addEventListener('click', (event) => {
    const modal = document.getElementById('cart-modal');
    if (event.target === modal) {
        closeModal();
    }
});