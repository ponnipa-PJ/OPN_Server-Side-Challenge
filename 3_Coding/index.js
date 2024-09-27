class Cart {
    constructor() {
        this.items = {};
        this.discounts = {};
    }

    // Create a new cart
    createCart() {
        this.items = {};
        this.discounts = {};
    }

    // Add product to the cart
    addProduct(productId, quantity) {
        if (quantity <= 0) return;
        this.items[productId] = (this.items[productId] || 0) + quantity;
    }

    // Update product quantity in the cart
    updateProduct(productId, quantity) {
        if (quantity < 0) {
            delete this.items[productId]; // Remove product if quantity is 0 or less
        } else if (quantity > 0) {
            this.items[productId] = quantity;
        }
    }

    // Remove product from the cart
    removeProduct(productId) {
        delete this.items[productId];
    }

    // Destroy the cart
    destroy() {
        this.items = {};
        this.discounts = {};
    }

    // Check if a product exists in the cart
    productExists(productId) {
        return this.items.hasOwnProperty(productId);
    }

    // Check if the cart is empty
    isEmpty() {
        return Object.keys(this.items).length === 0;
    }

    // List all items in the cart
    listItems() {
        return this.items;
    }

    // Count number of unique items in the cart
    countUniqueItems() {
        return Object.keys(this.items).length;
    }

    // Get total amount of items in the cart
    totalAmount() {
        return Object.values(this.items).reduce((sum, quantity) => sum + quantity, 0);
    }

    // Apply a discount
    applyDiscount(name, type, value, maxAmount = null) {
        this.discounts[name] = { type, value, maxAmount };
    }

    // Remove a discount by name
    removeDiscount(name) {
        delete this.discounts[name];
    }

    // Calculate the total with applied discounts
    calculateTotal() {
        let total = this.totalAmount();

        for (const discount of Object.values(this.discounts)) {
            if (discount.type === 'fixed') {
                total -= discount.value;
            } else if (discount.type === 'percentage') {
                let discountAmount = (total * discount.value) / 100;
                if (discount.maxAmount !== null) {
                    discountAmount = Math.min(discountAmount, discount.maxAmount);
                }
                total -= discountAmount;
            }
        }

        return Math.max(total, 0);
    }

    // Handle freebies
    applyFreebie(freebieProductId, requiredProductId) {
        if (this.productExists(requiredProductId)) {
            this.addProduct(freebieProductId, 1); // Add one freebie to the cart
        }
    }
}

// Create Cart
const cart = new Cart();
console.log('Create Cart:', cart.listItems());

// Adding products
cart.addProduct('1', 2); // Add 2 of product 1
cart.addProduct('2', 3); // Add 3 of product 2
console.log('Cart Items:', cart.listItems());

// Updating product quantity
cart.updateProduct('1', 10); // Update product 1 = 10
console.log('Updated Cart Items:', cart.listItems());

// Removing a product
cart.removeProduct('2');
console.log('After Removing Product 2:', cart.listItems());

// Adding products
cart.addProduct('2', 2000);

// Checking if product exists
console.log('Does product 1 exist?', cart.productExists('1'));

// Checking if the cart is empty
console.log('Is cart empty?', cart.isEmpty());

// Counting unique items
console.log('Unique items count:', cart.countUniqueItems());

// Total amount of items
console.log('Total amount of items:', cart.totalAmount());

// Applying discounts
cart.applyDiscount('DIS10', 'percentage', 10, 100);
console.log('Total after discount:', cart.calculateTotal());

// Remove discount by name
cart.removeDiscount('DIS10');
console.log('Total after delete discount by name:', cart.calculateTotal());

// Applying freebies
cart.applyFreebie('2', '1');
console.log('Cart after applying freebie:', cart.listItems());

// Destroying the cart
cart.destroy();
console.log('Cart after destruction:', cart.listItems());