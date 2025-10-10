import { cart } from "../../data/cart.js"
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
    let itemsTotalCents = 0;
    let shippingTotalCents = 0;

    cart.forEach((item) => {
        const productId = item.productId
        const product = products.find((product) => product.id == productId)

        itemsTotalCents += (product.priceCents * item.quantity)

        const deliveryOption = item.deliveryOptionId
        shippingTotalCents += deliveryOptions.find((option) => option.id == deliveryOption).priceCents
    })

    const totalBeforeTaxCents = itemsTotalCents + shippingTotalCents
    const taxCents = (totalBeforeTaxCents * 0.1)

    const totalCents =  totalBeforeTaxCents + taxCents
    
    let cartQuantity = 0;
    cart.forEach((item) => {
        cartQuantity += item.quantity
    })
    const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(itemsTotalCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingTotalCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>`

    const paymentSummary = document.querySelector(".payment-summary") 
    paymentSummary.innerHTML = paymentSummaryHTML   
}