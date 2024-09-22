document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('orderForm');
    const receiptContainer = document.getElementById('receiptContainer');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validateOrder();
    });

    function validateOrder() {
        // Call validation functions
        validateName();
        validatePhone();
        validateAddress();
        validateMessage();

        // If all validations pass, generate receipt
        if (isValid()) {
            generateReceipt();
        }
    }

    function validateName() {
        const nameInput = document.getElementById('nameInput');
        const nameRegex = /^[A-Za-z\s]{2,50}$/;
        if (!nameRegex.test(nameInput.value)) {
            alert("Invalid name. Please enter a valid name.");
            return false;
        }
        return true;
    }

    function validatePhone() {
        const phoneInput = document.getElementById('phoneInput');
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            alert("Invalid phone number. Please enter a valid 10-digit phone number.");
            return false;
        }
        return true;
    }

    function validateAddress() {
        const addressInput = document.getElementById('addressInput');
        if (addressInput.value.trim().length === 0) {
            alert("Address cannot be empty.");
            return false;
        }
        return true;
    }

    function validateMessage() {
        const messageInput = document.getElementById('messageInput');
        const maxChars = 100; // Adjust this value as needed
        if (messageInput.value.length > maxChars) {
            alert(`Message exceeds ${maxChars} characters.`);
            return false;
        }
        return true;
    }

    function isValid() {
        return validateName() && validatePhone() && validateAddress() && validateMessage();
    }

    function generateReceipt() {
        const formData = new FormData(form);
        const receiptData = {};

        formData.forEach((value, key) => {
            if (key !== 'sendOrder') {
                receiptData[key] = value;
            }
        });

        const receiptMessage = document.getElementById('receiptMessage');
        receiptMessage.innerHTML = `
            <h3>Order Confirmation</h3>
            <p>Date of Generation: ${new Date().toLocaleDateString()}</p>
            <ul>
                <li>Tagline: ${receiptData.tagline || ''}</li>
                <li>Color: ${receiptData.colour || ''}</li>
                <li>Size: ${receiptData.size || ''}</li>
                <li>Quantity: ${receiptData.quantity || ''}</li>
                <li>Delivery Date: ${receiptData.deliveryDate || ''}</li>
                <li>Name: ${receiptData.name || ''}</li>
                <li>Phone: ${receiptData.phone || ''}</li>
                <li>Address: ${receiptData.address || ''}</li>
                <li>Message: ${receiptData.message || ''}</li>
                <li>Total Cost: $${calculateTotalCost(receiptData)}</li>
            </ul>
        `;
        receiptContainer.style.display = 'block';
    }

    function calculateTotalCost(orderData) {
        // Simple calculation based on quantity
        const basePrice = 20;
        const pricePerItem = 5;
        return basePrice + (orderData.quantity || 0) * pricePerItem;
    }
});
    