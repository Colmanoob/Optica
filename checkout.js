let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date
    document.getElementById('deliveryDate').setAttribute('min', today);
    toggleAddressField();
    renderCheckoutItems();
    updateCheckoutTotalPrice();

    const creditCardLogos = document.querySelectorAll('.credit-card-logo');
    const selectedCardMessage = document.getElementById('selectedCardMessage');

    creditCardLogos.forEach(logo => {
        logo.addEventListener('click', () => {
            // Remove the 'selected' class from all logos
            creditCardLogos.forEach(card => card.classList.remove('selected'));

            // Add the 'selected' class to the clicked logo
            logo.classList.add('selected');

            // Update the selected card message
            const selectedCard = logo.getAttribute('data-card');
            // selectedCardMessage.textContent = `You have selected: ${selectedCard}`;
        });
    });
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
    if (confirm('Are you sure you want to cancel the order?')) {
        localStorage.removeItem('cart');
    
        // Redirect to the home page
        window.location.href = "./index.html"; // Change this to your home page URL if different
    }
    
}

function renderCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkoutItems');
    checkoutItemsContainer.innerHTML = ''; // Clear the container

    if (cart.length === 0) {
        checkoutItemsContainer.innerHTML = '<p>Your cart is empty.</p>'; // Show message if cart is empty
        return;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;

        const checkoutItem = `
            <div class="col-md-4 mb-4">
            
                <div class="card product-card h-100">
                <a href="#" class="product-link" style="cursor: default;">
                        <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 100px; object-fit: cover;">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">$${item.price.toFixed(2)} x ${item.quantity}</p>
                        <p class="card-text">Subtotal: $${itemTotal.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        `;
        checkoutItemsContainer.innerHTML += checkoutItem;
    });

    updateCheckoutTotalPrice(); // Update the total price
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
    const paymentMethod = document.getElementById('paymentMethod').value;
    const creditCardLogos = document.getElementById('creditCardLogos');

    if (deliveryMethod === 'pickup') {
        addressField.style.display = 'none'; // Hide the address field
        addressInput.required = false; // Make the address field not required
    } else {
        addressField.style.display = 'block'; // Show the address field
        addressInput.required = true; // Make the address field required
    }

    if (paymentMethod === 'creditCard') {
        creditCardLogos.style.display = 'block'; // Show credit card logos
    } else {
        creditCardLogos.style.display = 'none'; // Hide credit card logos
    }
}
