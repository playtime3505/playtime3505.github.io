const items = [
    { name: "Eating three meals per day", price: 4.5, quantity: 0, unit: "Kilograms CO₂" },
    { name: "Driving a car for an hour (in city)", price: 3.4, quantity: 0, unit: "Kilograms CO₂" },
    { name: "Hot shower (10 minutes)", price: 2, quantity: 0, unit: "Kilograms CO₂" },
    { name: "Using a cooking oven", price: 0.7, quantity: 0, unit: "Kilograms CO₂" },
    { name: "Using a washing machine", price: 0.3, quantity: 0, unit: "Kilograms CO₂" },
    { name: "Heating a home", price: 7, quantity: 0, unit: "Kilograms CO₂" },
    { name: "Using a smartphone (1 hour)", price: 0.18, quantity: 0, unit: "Kilograms CO₂" },
    { name: "Using a lightbulb (100W)", price: 0.17, quantity: 0, unit: "Kilograms CO₂" }
];

const cartContainer = document.getElementById("cart");
const totalPriceElement = document.getElementById("total-price");
const message = document.getElementById("message");
const retryBtn = document.getElementById("retry-btn");
const retryMessage = document.getElementById("retry-message");
const resetBtn = document.getElementById("reset-btn");

function updateCart() {
    cartContainer.innerHTML = "";

    items.forEach((item, index) => {
        const itemRow = document.createElement("div");
        itemRow.classList.add("item");

        itemRow.innerHTML = `
            <span>${item.name} - ${item.price.toFixed(2)} ${item.unit}</span>
            <div>
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span class="quantity">${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        `;

        cartContainer.appendChild(itemRow);
    });
}

function changeQuantity(index, amount) {
    if (items[index].quantity + amount >= 0) {
        items[index].quantity += amount;
        updateCart();
    }
}

function calculateTotal() {
    let total = 0;
    items.forEach(item => {
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `${total.toLocaleString("en").replace(/,/g, " ")} Kilograms CO₂`;

    if (total < 65000000000 && total > 0) {
        message.textContent = "You did not emit more carbon emissions than the top 100 polluting companies do in a day";
        message.className = "message error";
        message.style.display = "block";
        retryBtn.style.display = "block";
    } else if (total === 0) {
        message.textContent = "You have not produced any carbon emissions!";
        message.className = "message error";
        message.style.display = "block";
        retryBtn.style.display = "none";
    } else {
        message.textContent = "Congratulations! You polluted the planet as much as the top 100 polluting companies";
        message.className = "message success";
        message.style.display = "block";
        retryBtn.style.display = "none";
        retryMessage.style.display = "none";
    }
}

function showRetryMessage() {
    retryMessage.textContent = "Based on reports, the top 100 companies responsible for CO₂ emissions release about 65 million tons (65 000 000 000 kg) of CO₂ and other greenhouse gases per day!* For you to reach that amount you would need to eat more than 43 billion meals. (Average based on reports measuring the cumulative emissions from 1988 until 2015. The daily emissions value was calculated by dividing the total emissions by 27 years, which was then divided by 365 days.)";
    retryMessage.style.display = "block";
}

function resetCart() {
    // Reset all item quantities to 0
    items.forEach(item => item.quantity = 0);

    // Update the cart to reflect the changes
    updateCart();

    // Reset total and hide messages
    totalPriceElement.textContent = "0.00 CO₂";
    message.style.display = "none";
    retryMessage.style.display = "none";
    retryBtn.style.display = "none";

    // Change the text of the reset button dynamically
    resetBtn.textContent = "Reset Successful";
    
    // Change it back to "Reset Cart" after 2 seconds
    setTimeout(() => {
        resetBtn.textContent = "Reset";
    }, 2000);
}

// Initialize the cart
updateCart();