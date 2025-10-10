import { cart, save, updateDeliveryOption } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

import { renderPaymentSummary } from "./paymentSummary.js";

import { formatCurrency } from "../utils/money.js";

import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"

function updateCartHTML() {
  const orderSummary = document.querySelector(".order-summary")
  
  orderSummary.innerHTML = ""
    cart.forEach((item) => {
      const itemData = products.find((product) => product.id == item.productId)
      const deliveryOptionId = item.deliveryOptionId

      const today = dayjs()
      const deliveryDate = today.add(deliveryOptions.find((option) => option.id == deliveryOptionId).deliveryTime, "days").format("dddd, MMMM D")
  
      const itemHtml = `<div class="cart-item-container id-${itemData.id}">
              <div class="delivery-date">
                Delivery date: ${deliveryDate}
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${itemData.image}">
  
                <div class="cart-item-details">
                  <div class="product-name">
                    ${itemData.name}
                  </div>
                  <div class="product-price">
                    $${formatCurrency(itemData.priceCents)}
                  </div>
                  <div class="product-quantity quantity-id-${itemData.id}">
                    <span>
                      Quantity: <span class="quantity-label">${item.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                      Update
                    </span>
                    <span class="delete-quantity-link link-primary delete-id-${itemData.id}" data-product-id="${itemData.id}">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                </div>
              </div>
            </div>`

      orderSummary.innerHTML += itemHtml   
      deliveryOptionsHTML(item);
    })
}
function deliveryOptionsHTML(item) {
  deliveryOptions.forEach((option) => {
    const today = dayjs()
    const deliveryDate = today.add(option.deliveryTime, "days").format("dddd, MMMM D")

    const shippingHTML = `<div class="delivery-option" data-product-id="${item.productId}" data-delivery-option-id="${option.id}">
                    <input type="radio" ${option.id == item.deliveryOptionId ? "checked" : ""}
                      class="delivery-option-input"
                      name="delivery-option-${item.productId}" >
                    <div>
                      <div class="delivery-option-date">
                        ${deliveryDate}
                      </div>
                      <div class="delivery-option-price">
                        ${option.priceCents == 0 ? "FREE Shipping" : "$" + formatCurrency(option.priceCents) + " - Shipping"}
                      </div>
                    </div>
                  </div>`

     const optionsContainer = document.querySelector(`.id-${item.productId} .delivery-options`)   
     optionsContainer.innerHTML += shippingHTML;        
  })
}

export function renderOrderSummary() {
  updateCartHTML()
  
  const deleteLinks = document.querySelectorAll(".delete-quantity-link")
  deleteLinks.forEach((link) => {
    link.addEventListener("click", function(e) {
      const productId = link.dataset.productId
  
      cart.splice(cart.indexOf(cart.find((product) => product.productId == productId)), 1)
      save()
  
      const cartItem = document.querySelector(`.id-${productId}`)
      cartItem.remove()
      renderPaymentSummary()
    })
  })
  
  document.querySelectorAll(".delivery-option").forEach((option) => {
    option.addEventListener(("click"), function(e) {
      const {productId, deliveryOptionId} = option.dataset

      console.log(productId)
  
      updateDeliveryOption(productId, deliveryOptionId)
      renderOrderSummary()
      renderPaymentSummary()
    })
  })
}

