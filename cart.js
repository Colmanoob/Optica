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

function showProductDetails(productId) {
    const product = products.find(p => p.id === productId); // Find the product by ID

    if (product) {
        // Update the product detail section with the product information
        document.getElementById('detailProductName').textContent = product.name;

        // Calculate the discount percentage if applicable
        const discountPercentage = product.discountedPrice
            ? Math.round((Math.abs(product.price - product.discountedPrice) / product.discountedPrice) * 100)
            : null;

        // Display the price with the original price and discount percentage if available
        const priceDisplay = product.discountedPrice
            ? `<span class="text-dark">$${product.price.toFixed(2)}</span> 
               <small class="text-muted text-decoration-line-through">$${product.discountedPrice.toFixed(2)}</small>
               ${`<span class="badge bg-dark ms-2">${discountPercentage}% OFF</span>`}`
            : `$${product.price.toFixed(2)}`;

        document.getElementById('detailProductPrice').innerHTML = priceDisplay;

        document.getElementById('detailProductDescription').textContent = product.description;
        document.getElementById('frameTypeValue').textContent = product.frameType; // Set frame type
        document.getElementById('colorValue').textContent = product.color; // Set color
        document.getElementById('detailQuantity').value = 1;
        document.getElementById('detailProductImage').src = product.image; // Set product image

        // Hide the product grid and show the product detail section
        showSection("product-detail");
    }
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
