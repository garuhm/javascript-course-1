products.forEach((product) => {
    const html = `<div class="product-container" id="${product.id}">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;

    const productsGrid = document.querySelector(".products-grid")
    productsGrid.innerHTML += html
})

const addToCartsBtns = document.querySelectorAll(".add-to-cart-button")
addToCartsBtns.forEach((btn) => {
    btn.addEventListener(("click"), function(e) {
        const productId = btn.dataset.productId

        if(cart.filter(item => item.id == productId).length > 0) {
            const cartItem = cart.find((item) => item.id == productId)
            cartItem.quantity++;
        } else {
            cart.push({
                id: productId,
                productId: products.find((item) => item.id == productId).name,
                quantity: 1
            })
        }

        let cartQuantity = 0;
        cart.forEach((item) => {
            cartQuantity += item.quantity
        })

        const cartAmountText = document.querySelector(".cart-link .cart-quantity")
        cartAmountText.innerHTML = cartQuantity
    })
})