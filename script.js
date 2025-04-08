// const products = [
//     { id: 1, name: "Ray-Ban RB0840V Mega Wayfarer", price: 129.99, category: "sunglasses", frameType: "metal", color: "gold", quantity: 0, image: "./images/products/1.png" },
//     { id: 2, name: "Retro Round", price: 89.99, category: "prescription", frameType: "acetate", color: "tortoise", quantity: 0, image: "images/retro-round.jpg" },
//     { id: 3, name: "Sport Xtreme", price: 159.99, category: "sports", frameType: "plastic", color: "black", quantity: 0, image: "images/sport-xtreme.jpg" },
//     { id: 4, name: "Kids Sparkle", price: 69.99, category: "kids", frameType: "plastic", color: "pink", quantity: 0, image: "images/kids-sparkle.jpg" },
//     { id: 5, name: "Designer Cat-Eye", price: 199.99, category: "sunglasses", frameType: "acetate", color: "red", quantity: 0, image: "images/designer-cat-eye.jpg" },
//     { id: 6, name: "Bifocal Pro", price: 149.99, category: "prescription", frameType: "metal", color: "silver", quantity: 0, image: "images/bifocal-pro.jpg" },
//     { id: 7, name: "Cycling Goggles", price: 179.99, category: "sports", frameType: "wrap", color: "blue", quantity: 0, image: "images/cycling-goggles.jpg" },
//     { id: 8, name: "Junior Safety", price: 59.99, category: "kids", frameType: "plastic", color: "blue", quantity: 0, image: "images/junior-safety.jpg" },
//     { id: 9, name: "Polarized Wayfarer", price: 139.99, category: "sunglasses", frameType: "acetate", color: "black", quantity: 0, image: "images/polarized-wayfarer.jpg" },
//     { id: 10, name: "Progressive Lenses", price: 299.99, category: "prescription", frameType: "metal", color: "gunmetal", quantity: 0, image: "images/progressive-lenses.jpg" }
// ];
let products = []; // Initialize an empty array for products
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProduct = null;
let activeCategory = 'all'; // Default category
let activeFrameType = 'all'; // Default frame type

function showSection(section) {
    // Hide all sections initially
    document.querySelector('.category-container').style.display = 'none';
    document.querySelector('.product-container').style.display = 'none';
    document.getElementById('productDetail').style.display = 'none';
    document.getElementById('aboutUs').style.display = 'none';
    document.getElementById('contact').style.display = 'none';
    document.getElementById('makingGlasses').style.display = 'none';
    document.getElementById('makingSunglasses').style.display = 'none';
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'none'; // Hide callback section
    document.getElementById('shoppingCart').style.display = 'none'; // Hide shopping cart section
    document.getElementById('hero').style.display = 'block'; // Hide shopping cart section

    // Show the selected section
    switch (section) {
        case "about-us":
            document.getElementById('aboutUs').style.display = 'block'; // Show About Us section
            break;
        case "contact":
            document.getElementById('contact').style.display = 'block'; // Show Contact section
            break;
        case "making-glasses":
            document.getElementById('makingGlasses').style.display = 'block'; // Show Our Team section
            break;
        case "making-sunglasses":
            document.getElementById('makingSunglasses').style.display = 'block'; // Show Our Process section
            break;
        case "login":
            document.getElementById('login').style.display = 'block'; // Show Login section
            document.getElementById('hero').style.display = 'none'; // Show Shopping Cart section
            break;
        case "register":
            document.getElementById('register').style.display = 'block'; // Show Register section
            document.getElementById('hero').style.display = 'none'; // Show Shopping Cart section
            break;
        case "shopping-cart":
            document.getElementById('shoppingCart').style.display = 'block'; // Show Shopping Cart section
            document.getElementById('hero').style.display = 'none'; // Show Shopping Cart section
            initShoppingCart();
            break;
        case "product-detail":
            document.getElementById('productDetail').style.display = 'block'; // Show Product Detail section
            document.getElementById('detailQuantity').value = 1; // Reset quantity to 1
            break;
        default:
            document.querySelector('.category-container').style.display = 'block';
            document.querySelector('.product-container').style.display = 'block';

            
            applyFilters(); // Apply filters when showing the home section
            break;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetch('products.json') // Fetch the products from the JSON file
        .then(response => response.json())
        .then(data => {
            // Update the price to the discounted price if it exists
            products = data.map(product => {
                if (product.discountedPrice) {
                    const price = product.price;
                    product.price = product.discountedPrice; // Set price to discounted price
                    product.discountedPrice = price; // Store original price in discountedPrice
                }
                return product;
            });

            renderProducts(products); // Render products initially
            setupModalListeners();
            updateCartCount();

            // Ensure the product detail section is hidden initially
            showSection("home");
        });
});

// Unified filter function to apply all active filters
function applyFilters() {
    // Get the current price range values
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0; // Default to 0 if empty
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || 300; // Default to Infinity if empty

    // Get the selected frame type
    const frameTypeCheckboxes = document.querySelectorAll('.form-check-input');
    const selectedFrameType = Array.from(frameTypeCheckboxes).find(checkbox => checkbox.checked)?.id.replace('frameType', '').toLowerCase() || 'all';

    // Filter products based on the active category, price range, and frame type
    const filteredProducts = products.filter(product => {
        const isInCategory = activeCategory === 'all' || product.category === activeCategory;
        const isInPriceRange = product.price >= minPrice && product.price <= maxPrice;
        const isInFrameType = selectedFrameType === 'all' || product.frameType === selectedFrameType;
        return isInCategory && isInPriceRange && isInFrameType;
    });

    // Render the filtered products
    renderProducts(filteredProducts);
}

// Filter by category
function filterByCategory(category) {
    activeCategory = category; // Update the active category
    applyFilters(); // Apply all filters
    updateCategoryActiveState(activeCategory); // Update the active state of the category
}

// Filter by price
function filterByPrice() {
    applyFilters(); // Apply all filters
}

// Filter by frame type
function filterByFrameType(frameType) {
    // Get all frame type checkboxes
    const frameTypeCheckboxes = document.querySelectorAll('.form-check-input');

    // Uncheck all other checkboxes except the one that was clicked
    frameTypeCheckboxes.forEach(checkbox => {
        if (checkbox.id !== `frameType${frameType.charAt(0).toUpperCase() + frameType.slice(1)}`) {
            checkbox.checked = false;
        }
    });

    applyFilters(); // Apply all filters
}

function renderProducts(productsArray) {
    const productsGrid = document.querySelector('#productsGrid');
    productsGrid.innerHTML = ''; // Clear the grid

    productsArray.forEach(product => {
        const discountPercentage = product.discountedPrice
            ? Math.round((Math.abs(product.price - product.discountedPrice) / product.discountedPrice) * 100)
            : null;

        const priceDisplay = product.discountedPrice
            ? `<span class="text-dark">$${product.price.toFixed(2)}</span> 
               <small class="text-muted text-decoration-line-through">$${product.discountedPrice.toFixed(2)}</small>
               ${discountPercentage ? `<span class="badge bg-dark ms-2">${discountPercentage}% OFF</span>` : ''}`
            : `$${product.price.toFixed(2)}`;

        const productCard = `
            <div class="col-md-4 mb-4" id="product-${product.id}"> <!-- Dynamic ID based on product ID -->
                <div class="card product-card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${priceDisplay}</p>
                        <div class="d-flex justify-content-between small">
                            <span class="badge bg-secondary">${product.category}</span>
                            <span class="text-muted">${product.color}</span>
                        </div>
                        <button class="btn btn-primary w-100 mt-3 view-detail product-button" 
                            data-id="${product.id}">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsGrid.innerHTML += productCard; // Append the product card to the grid
    });

    setupModalListeners(); // Ensure modal listeners are set up for the new cards
}

function setupModalListeners() {
    document.querySelectorAll('.view-detail').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            currentProduct = products.find(p => p.id === productId);
            
            if (currentProduct) {
                // Update the product detail section with current product information
                document.getElementById('detailProductName').textContent = currentProduct.name;
                document.getElementById('detailProductPrice').textContent = `$${currentProduct.price.toFixed(2)}`;
                document.getElementById('detailProductDescription').textContent = currentProduct.description;
                document.getElementById('frameTypeValue').textContent = currentProduct.frameType; // Set frame type
                document.getElementById('colorValue').textContent = currentProduct.color; // Set color
                document.getElementById('detailQuantity').value = 1;
                document.getElementById('detailProductImage').src = currentProduct.image;

                showSection("product-detail"); // Show product detail section
            }
        });
    });
}



function updateCategoryActiveState(selectedCategory) {
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
        if (card.dataset.category === selectedCategory) {
            card.classList.add('active');
        }
    });
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
    console.log("cart count: ", cartCount.textContent);
    cartCount.classList.add('animate__animated', 'animate__bounceIn');
    setTimeout(() => cartCount.classList.remove('animate__bounceIn'), 1000);
}

function updatePriceDisplay() {
    const priceRange = document.getElementById('priceRange');
    const priceValueDisplay = document.getElementById('priceValue');
    priceValueDisplay.textContent = `$${priceRange.value}.00`; // Update the displayed price
}

function addToCart()
{
    if (currentProduct) {
        const quantity = parseInt(document.getElementById('detailQuantity').value);
        if (quantity > 0) {
            const existingItem = cart.find(item => item.id === currentProduct.id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.push({
                    id: currentProduct.id,
                    name: currentProduct.name,
                    price: currentProduct.price,
                    quantity: quantity,
                    image: currentProduct.image, // Ensure the image is included
                    description: currentProduct.description
                });
            }
            
            currentProduct.quantity += quantity; // Update the quantity in the product array
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            alert(`${quantity} ${currentProduct.name} added to cart!`);
        }
    }
}

function submitCallbackForm(event) {
    event.preventDefault();

    var name = document.getElementById('callbackName').value;
    var phone = document.getElementById('callbackPhone').value;
    var email = document.getElementById('callbackEmail').value;
    var message = document.getElementById('callbackMessage').value;

    // Clear any previous error messages
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    let hasErrors = false;

    if (!name) {
        displayError('callbackName', 'Please enter your name.');
        hasErrors = true;
    }

    if (!phone) {
        displayError('callbackPhone', 'Please enter your phone number.');
        hasErrors = true;
    }

    if (!email) {
        displayError('callbackEmail', 'Please enter your email address.');
        hasErrors = true;
    } else {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            displayError('callbackEmail', 'Please enter a valid email address.');
            hasErrors = true;
        }
    }

    if (!message) {
        displayError('callbackMessage', 'Please enter your message.');
        hasErrors = true;
    }

    if (hasErrors) {
        return;
    }

    alert('Callback requested!');
}

function displayError(fieldId, errorMessage) {
    var field = document.getElementById(fieldId);
    var errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#b45942';
    errorDiv.innerText = errorMessage;
    field.parentNode.appendChild(errorDiv);
}

// Function to handle login form submission
function handleLogin(section, event) {
    event.preventDefault();
    
    // Check if the form is valid
    const form = document.getElementById(section+'Form');
    if (!form.checkValidity()) {
        // If the form is not valid, show validation messages
        form.reportValidity();
        return; // Stop further execution
    }

    const email = document.getElementById(section+'Email').value;
    const password = document.getElementById(section+'Password').value;

   
    // Simulate successful login
    localStorage.setItem('userEmail', email); // Store user email in localStorage
    if (section === 'register') 
    {
        displayUser(document.getElementById('registerName').value); // Display username in the navbar    
        alert('Registration successful!')
    }
    else
    {
        displayUser(email.split('@')[0]); // Display username in the navbar
        alert('Login successful!');
    }
    
    showSection('home'); // Redirect to the home section
}



// Function to display the user's email or username in the navbar
function displayUser(email) {
    const userDisplay = document.getElementById('userDisplay');
    userDisplay.textContent = `Welcome, ${email}`;
    userDisplay.style.display = 'inline'; // Make the user display visible
}

// Check if a user is already logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
        displayUser(storedEmail); // Display the stored email in the navbar
    }
});