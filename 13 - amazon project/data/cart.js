export const cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
}, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
}];

export function addToCart(productId) {
    if(cart.filter(item => item.productId == productId).length > 0) { // sees if any exist
        const cartItem = cart.find((item) => item.productId == productId) // get item
        cartItem.quantity++; // update data
    } else { // else, if not in cart, add to cart
        cart.push({
            productId: productId,
            quantity: 1
        })
    }
}