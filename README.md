# Optica: An Eyeglasses Online Store

## Introduction

**Trends**

- The pandemic accelerated online shopping, with more consumers turning to eCommerce for eyewear purchases.

**Benefits**

- The convenience of online shopping has revolutionized the way we purchase goods, including Eyeglasses.
- One of the biggest advantages of buying online is convenience. You can shop at any time, from anywhere, without the need to visit a physical store. This is particularly beneficial for busy individuals who may not have the time to schedule an appointment or for those living in remote areas where access to optical stores is limited. Online shopping also allows you to browse a vast selection of frames and compare prices across multiple retailers in just a few minutes.
- When it comes to price, online retailers often have the advantage. Lower overhead costs mean that online stores can offer products at significantly reduced price, some of them also frequently run promotions and discounts. Additionally, online platforms often offer a wider range of prices, from high-end products to more affordable alternatives.
- Many of the online retailers are increasingly offering customizable options, improve customer service by allowing customers various choices for their selection.

**Products and Services Description**

- Product: Optica Eyeglasses
- Premium Quality: Lightweight frames and high-quality lenses for durability.
- Stylish Variety: Available in multiple styles and colors to suit every personality.
- Comfort Fit: Designed for all-day wear and ease of use.
- Versatile Use: Ideal for everyday wear or special occasions.
- Convenient Shopping: Easy online purchase to find your perfect pair.

**Why Eyeglasses?**

- Growing Market: Increasing demand for eyewear, driven by trends in online shopping.
- Convenience: Consumers prefer the ease of purchasing eyeglasses online without visiting physical stores.
- Wide Selection: Online platforms can showcase a vast variety of styles and brands, appealing to diverse customer preferences.
- Price Competitiveness: Online retailers often offer better prices and promotions due to lower overhead costs.
- Accessibility: Online shopping makes eyewear accessible to individuals in remote areas with limited optical store options.

## Functional Requirements Specification (FRS)

**1\. Introduction**

**1.1 Purpose**

- This document specifies the functional requirements for an e-commerce website dedicated to selling eyeglasses. It aims to provide a clear framework for development, ensuring both user satisfaction and effective management for administrators.

**1.2 Scope**

- The website will include features for user account management, product browsing, shopping cart functionality, checkout processes, and administrative controls. The target audience includes general consumers looking for eyeglasses and administrators managing the website's operations.

**2\. Functional Requirements**

**2.1 User Registration and Authentication**

**FR-1:** **User Registration**

- **Description:** Users can create an account to access personalized features.
- **Inputs:**
- Email address (must be unique)
- Password (minimum 8 characters, at least one uppercase letter, one number)
- First name and last name
- Phone number (optional)
- **Outputs:**
- Success message with a confirmation email link.
- **Validation:**
- Email format validation
- Password strength validation

**FR-2:** **User Login/Logout**

- **Description:** Users can log in and log out of their accounts.
- **Inputs:**
- Email address
- Password
- **Outputs:**
- Redirect to user dashboard upon successful login.
- Redirect to homepage upon logout.

**FR-3:** **Password Reset**

- **Description:** Users can reset their passwords if forgotten.
- **Inputs:**
- Registered email address
- **Outputs:**
- Email with password reset link.

**2.2 Product Catalog**

**FR-4:** **Display Products**

- **Description:** The system shall display a list of eyeglasses.
- **Outputs:**
- Product images (minimum of three views)
- Product name
- Price
- Short description
- Availability status

**FR-5:** **Product Filtering**

- **Description:** Users can filter products to find specific types.
- **Filters:**
- Frame Type (e.g., full-rim, semi-rimless, rimless)
- Gender (men, women, unisex)
- Material (plastic, metal, wood)
- Price Range (sliders for minimum and maximum)

**FR-6:** **Product Sorting**

- **Description:** Users can sort the displayed products.
- **Options:**
- Price (ascending/descending)
- Popularity
- Newest Arrivals

**2.3 Product Details Page**

**FR-7:** **Detailed Product Information**

- **Description:** Users can access detailed information for each product.
- **Outputs:**
- High-resolution images (zoom feature)
- Comprehensive description
- Specifications (dimensions, weight, lens type)
- Customer reviews and ratings
- Related products section

**FR-8:** **Add to Cart Functionality**

- **Description:** Users can add products to their shopping cart.
- **Inputs:**
- Quantity selection
- Frame color selection (if applicable)
- **Outputs:**
- Confirmation message indicating the product has been added.

**2.4 Shopping Cart**

**FR-9:** **View Shopping Cart**

- **Description:** Users can view items in their cart.
- **Outputs:**
- List of products with thumbnails, names, quantities, and prices
- Subtotal and estimated shipping cost
- Total cost

**FR-10:** **Cart Modification**

- **Description:** Users can modify items in the cart.
- **Functionality:**
- Update quantities (increase/decrease)
- Remove items
- Apply discount codes (validations for codes)

**2.5 Checkout Process**

**FR-11:** **Checkout Initiation**

- **Description:** Users can proceed to checkout.
- **Outputs:**
- Summary of items in the cart
- Option to continue shopping or proceed to checkout

**FR-12:** **Shipping Information**

- **Description:** Users must enter shipping details.
- **Inputs:**
- Full name
- Shipping address (street, city, state, zip code)
- Phone number (optional)

**FR-13:** **Payment Information**

- **Description:** Users must enter payment details.
- **Inputs:**
- Credit/Debit card number
- Expiry date
- CVV code
- Billing address (if different from shipping)
- **Outputs:**
- Confirmation of payment processing

**FR-14:** **Order Confirmation**

- **Description:** Users receive an order confirmation.
- **Outputs:**
- Order summary including order number, items purchased, total cost, estimated delivery date
- Email confirmation with tracking information

**2.6 User Account Management**

**FR-15:** **View Order History**

- **Description:** Users can view their past orders.
- **Outputs:**
  - List of previous orders with details (order number, date, status, total cost)

**FR-16:** **Profile Management**

- **Description:** Users can update their account information.
- **Inputs:**
- New shipping address
- Phone number
- Payment methods (add or remove)
- **Outputs:**
  - Confirmation message upon successful updates

**2.7 Admin Panel**

**FR-17:** **Product Management**

- **Description:** Admins can manage product listings.
- **Functionality:**
- Add new products (image upload, description, pricing)
- Edit existing product details
- Remove products from the catalog

**FR-18:** **Order Management**

- **Description:** Admins can manage customer orders.
- **Outputs:**
  - View all orders with details (customer information, order status)
  - Update order status (processing, shipped, delivered, canceled)

**FR-19:** **Sales and Inventory Reports**

- **Description:** Admins can generate reports.
- **Outputs:**
  - Sales reports (daily, weekly, monthly)
  - Inventory status (low stock alerts)

**2.8 Search Functionality**

**FR-20:** **Search Products**

- **Description:** Users can search for specific eyeglasses.
- **Inputs:**
  - Keywords related to the product
- **Outputs:**
  - Search results list with relevant products

**2.9 Responsive Design**

**FR-21:** **Mobile Compatibility**

- **Description:** The website shall be responsive.
- **Requirements:**
- Adapt layout for mobile devices
- Ensure all functionalities (browsing, cart, checkout) are accessible on mobile

**2.10 Testing and Quality Assurance**

**FR-22:** **Testing Protocols**

- **Description:** The system shall undergo rigorous testing.
- **Types of Testing:**
  - **Unit Testing:** Test individual components for expected outputs.
  - **Integration Testing:** Ensure all components work together seamlessly.
  - **User Acceptance Testing (UAT):** Gather feedback from actual users to identify usability issues.

**3\. Non-Functional Requirements**

**3.1 Performance**

- The website shall load within 3 seconds on standard broadband connections.

**3.2 Security**

- All sensitive data must be encrypted using SSL.
- Implement secure payment processing through PCI-compliant service providers.

**3.3 Usability**

- The interface shall follow design best practices to ensure an intuitive user experience.
- Accessibility standards (WCAG 2.1) must be met to accommodate users with disabilities.

**3.4 Compatibility**

- The website shall function correctly on major browsers (Chrome, Firefox, Safari, Edge) and mobile devices (iOS and Android).

