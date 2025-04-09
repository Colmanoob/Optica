// let cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from local storage

function initShoppingCart() {
    cart = JSON.parse(localStorage.getItem('cart')) || []; // Load cart from local storage
    renderCartItems(); // Render cart items
    updateTotalPrice(); // Update total price display
}

function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear the container

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>'; // Show message if cart is empty
        return;
    }

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;

        const cartItem = `
            <div class="col-md-4 mb-4">
                <div class="card product-card h-100">
                    <a href="#" class="product-link" onclick="showProductDetails(${item.id})">
                        <img src="${item.image}" class="card-img-top" alt="${item.name}" style="height: 100px; object-fit: cover;">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">
                            <a href="#" class="product-link" onclick="showProductDetails(${item.id})">${item.name}</a>
                        </h5>
                        <p class="card-text">$${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <input type="number" class="form-control" value="${item.quantity}" min="1" id="quantity-${item.id}" onchange="updateQuantity(${index}, this.value)">
                            <button class="btn btn-danger ms-2" onclick="removeFromCart(${item.id})">Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        cartItemsContainer.innerHTML += cartItem; // Append the cart item to the container
    });

    updateTotalPrice(); // Update the total price
}



function updateQuantity(index, quantity) {
    console.log("start onChange");
    cart[index].quantity = parseInt(quantity);
    console.log("updateQuantity: ",cart);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    renderCartItems(); // Re-render cart items
    updateTotalPrice();
  }

  function updateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPrice');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    console.log("removeFromCart: ",cart);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
    renderCartItems(); // Re-render cart items
    updateTotalPrice(); // Update total price
    updateCartCount();
}

function cancelCart() {
    if (confirm('Are you sure you want to cancel your cart?')) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart)); // Update local storage
        updateTotalPrice();
        updateCartCount();
        goBackToHome();
    }
  }

  function goBackToHome() {
    showSection("home");
    
  }

function goToAboutUs()
{
    
    showSection("about-us");

}

function goToContact()
{
    
    showSection("contact");
    
}

function redirectToCheckout()
{
    if (cart === undefined || cart.length == 0) {
        alert(`You cannot checkout when the shopping cart is empty!`);
        return;
    }
    window.location.href = "./checkout.html";
}
