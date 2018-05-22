# bamazon

Bamazon is an Amazon-like storefront that uses mySQL and Node.js, along with mySQL and inquirer npm packages. With Bamazon, users are shown a list of products that are available for purchase.  This application takes in users orders and updates the store's inventory based on those orders.

When initializing the bamazon.js application, you will be asked whether you want to display all of the products for sale or if you want to purchase your product.

![Initialize App](images/initializeapp.png)

If the user chooses "Display All Products For Sale," the available product names, id's, and prices will be displayed.

![Display Products for Sale](images/displayproducts.png)

Once they have seen what is available, they can choose the option "Purchase Your Product," which will prompt the two questions: \

    1) Please Enter the ID of Product You Want to Purchase \
    2) Please Enter the Number of Units You Want to Purchase \

The user is then shown that they are wanting to purchase a specific number of units for a certain price.

![Purchase Product](images/purchaseproduct.png)

Once the customer has placed their order, the application checks to see if the store has enough of the chosen product in stock to complete the customer's request order.

If the order can be complete, the user will be shown their total cost and the database will reflect the new remaining quantity.

![Purchase Made](images/purchasemade.png)

If not, the order will not go through and the customer will be prompted with the following phrase:

![Display Products for Sale](images/purchasenotcomplete.png)

