const cart = [];

    const addCartBtn = document.getElementById('addCartBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const cartItemsList = document.getElementById('cartItems');
    const totalPriceElem = document.getElementById('totalPrice');

    addCartBtn.addEventListener('click', () => {
      const rows = document.querySelectorAll('table tr[data-product]');
      let total = 0;

      rows.forEach(row => {
        const product = row.dataset.product;
        const price = parseFloat(row.dataset.price);
        const quantity = parseInt(row.querySelector('input[type="number"]').value);

        const existingProduct = cart.find(item => item.product === product);

        if (existingProduct) {
          existingProduct.quantity = quantity;
        } else {
          cart.push({ product, price, quantity });
        }

        total += price * quantity;
      });

      updateCartSummary(total);
    });

    clearCartBtn.addEventListener('click', () => {
      cart.length = 0; // Clear the cart array
      updateCartSummary(0);
    });

    function updateCartSummary(total) {
      cartItemsList.innerHTML = '';
      cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.product} x${item.quantity}</span> <span>${(item.price * item.quantity).toFixed(2)}php</span>`;
        cartItemsList.appendChild(li);
      });

      totalPriceElem.textContent = `${total.toFixed(2)}php`;
    }