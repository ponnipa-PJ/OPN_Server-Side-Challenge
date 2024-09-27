**Coding**

**Basic** - Cart service that can manage items.
* Cart can be created
* Product can be added to cart via product id
* Cart can be updated via product id. This update must be an absolute update
i.e. updating product id 1 with quantity of 10 will update the cart product id 1 in cart to quantity of 10
* Product can be remove from cart via product id
* Cart can be destroy

**Utilities** - Functions that save consumers effort.
* Can check if product already exists
* Can check if cart is empty
* Can list all items in cart
* Can count number of unique items in cart
* Can return the total amount of items in cart

**Discount** - Sometimes customer apply coupon or voucher.
* Discount should be apply to cart which directly changes the total amount of the cart
* Discount should have a name identifier
* Discount should be calculated as
    * fixed where cart is deducted according to the discounted amount
    * percentage where cart is deducted as a percentage from the total amount but not exceeding the maximum set with the discount.
    A cart with the total of 2,000 THB with a 10% discount and maximum of 100 THB will only apply 100 THB discount.
* Should be able to remove discount by name

**Freebie** - "Buy A get B for free!"
* Freebie should be able to be apply to the cart with the following conditions
    * If a cart contains the a product then add freebie product into the cart
        * i.e. if a cart contain product 1 then add product 2 with quantity 1 to the cart