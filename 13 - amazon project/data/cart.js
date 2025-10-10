export const cart = JSON.parse(localStorage.getItem("cart")) || [];

export function save(){
    localStorage.setItem("cart", JSON.stringify(cart))
}

export function addToCart(productId) {
    if(cart.filter(item => item.productId == productId).length > 0) { // sees if any exist
        const cartItem = cart.find((item) => item.productId == productId) // get item
        cartItem.quantity++; // update data
    } else { // else, if not in cart, add to cart
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: 1,
        })
    }

   save()
}