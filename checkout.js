let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    document.getElementById('deliveryDate').setAttribute('min', today);
    toggleAddressField();
    renderCheckoutItems();
    updateCheckoutTotalPrice();
});

function completePurchase(event) {
    // Prevent the default form submission
    event.preventDefault();
    
    // Check if the form is valid
    const form = document.getElementById('contactForm');
    if (!form.checkValidity()) {
        // If the form is not valid, show validation messages
        form.reportValidity();
        return; // Stop further execution
    }
    
    // Get values from the new fields
    const deliveryMethod = document.getElementById('deliveryMethod').value;
    const deliveryDate = document.getElementById('deliveryDate').value;
    const address = deliveryMethod === 'pickup' ? '' : document.getElementById('address').value; // Get address only if not pickup
    const paymentMethod = document.getElementById('paymentMethod').value;

    // Notify the user that the purchase is complete
    alert(`Purchase complete!\nDelivery Method: ${deliveryMethod}\nDelivery Date: ${deliveryDate}\nAddress: ${address}\nPayment Method: ${paymentMethod}`);
    cancelCheckout();
}

function cancelCheckout() {
    // Clear the cart from local storage
    localStorage.removeItem('cart');
    
    // Redirect to the home page
    window.location.href = "./index.html"; // Change this to your home page URL if different
}

function renderCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    checkoutItemsContainer.innerHTML = ''; // Clear the container

    if (cart.length === 0) {
        checkoutItemsContainer.innerHTML = '<p>Your cart is empty.</p>'; // Show message if cart is empty
        return;
    }

    cart.forEach(item => {
        const checkoutItem = `
            <div class="col-md-4 mb-4">
                <div class="card product-card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">$${item.price.toFixed(2)} x ${item.quantity}</p>
                        <p class="card-text">Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>
            </div>
        `;
        checkoutItemsContainer.innerHTML += checkoutItem;
    });
}

function updateCheckoutTotalPrice() {
    const totalPriceElement = document.getElementById('checkoutTotalPrice');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.textContent = total.toFixed(2);
}

function toggleAddressField() {
    const deliveryMethod = document.getElementById('deliveryMethod').value;
    const addressField = document.getElementById('addressField');
    const addressInput = document.getElementById('address');

    if (deliveryMethod === 'pickup') {
        addressField.style.display = 'none'; // Hide the address field
        addressInput.required = false; // Make the address field not required
    } else {
        addressField.style.display = 'block'; // Show the address field
        addressInput.required = true; // Make the address field required
    }
}
