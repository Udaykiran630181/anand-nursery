document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    displayCart();

    // Add to Cart Functionality
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let plantName = this.getAttribute("data-name");
            let plantPrice = parseFloat(this.getAttribute("data-price"));

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({ name: plantName, price: plantPrice });
            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();
            alert(plantName + " added to cart!");
        });
    });

    // Clear Entire Cart
    document.getElementById("clear-cart")?.addEventListener("click", function () {
        localStorage.removeItem("cart");
        displayCart();
        updateCartCount();
    });
});

// Update Cart Count in Navbar
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").textContent = cart.length;
}

// Display Cart Items with Remove Option
function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItems = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    if (cartItems) {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;

            let li = document.createElement("li");
            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
            li.innerHTML = `
                ${item.name} - ₹${item.price} 
                <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Remove</button>
            `;
            cartItems.appendChild(li);
        });

        cartTotal.textContent = total;

        // Remove Individual Items
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                let updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
                updatedCart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(updatedCart));

                displayCart();
                updateCartCount();
            });
        });
    }
}
