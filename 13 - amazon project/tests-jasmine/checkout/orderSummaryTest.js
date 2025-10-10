import { cart, loadFromStorage } from "../../data/cart.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { renderPaymentSummary } from "../../scripts/checkout/paymentSummary.js";

describe("test suite: render order summary", () => {
    it("displays cart", () => {
        document.querySelector(".test-container").innerHTML = "<div class='order-summary'></div>"

        spyOn(localStorage, "setItem")
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: 1
            }, {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: 2,
            }])
        })
        loadFromStorage() 

        renderOrderSummary()

        expect(document.querySelectorAll(".cart-item-container").length).toEqual(2)
        cart.forEach((item) => {
            expect(document.querySelector(`.quantity-id-${item.productId} span > .quantity-label`).innerHTML).toEqual(`${item.quantity}`)
        })
        
    })

    it("element deleted on request", () => {
        document.querySelector(".test-container").innerHTML = "<div class='order-summary'></div> <div class='payment-summary'></div>"

        spyOn(localStorage, "setItem")
        spyOn(localStorage, "getItem").and.callFake(() => {
            return JSON.stringify([{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                deliveryOptionId: 1
            }, {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                deliveryOptionId: 2,
            }])
        })
        loadFromStorage() 

        renderOrderSummary()
        renderPaymentSummary()

        document.querySelector(`.delete-id-${cart[0].productId}`).click()
        expect(document.querySelectorAll(".cart-item-container").length).toEqual(1)
    })
})