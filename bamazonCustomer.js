var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazonDB",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    inquirer.prompt([
        {
            name: "action",
            message: "Welcome to Bamazon.  Please select an option:",
            choices: [
                "Display All Items For Sale",
                "Purchase Your Product",
            ],
            type: "list"
        }
    ]).then(function (response) {
        switch (response.action) {
            case "Display All Items For Sale":
                displayAllItems();
                break;
            case "Purchase Your Product":
                purchaseProduct();
                break;
            default:
                break;
        }
    });
}

function displayAllItems() {
    connection.query("SELECT * FROM products", function (err, data) {
        for (var i = 0; i < data.length; i++) {
            console.log(`ITEM ID: ${data[i].item_id} - NAME: ${data[i].product_name} - PRICE: ${data[i].price}`);
        }
        console.log("---------------------------------------------------");
        start();
    });
}

function purchaseProduct() {
    inquirer.prompt([
        {
            name: "item_id",
            message: "Please Enter the ID of Product You Want to Purchase",
            type: "input"
        },
        {
            name: "stock_quantity",
            message: "Please Enter the Number of Units You Want to Purchase",
            type: "input"
        }
    ]).then(function (answer) {
        connection.query("SELECT product_name, price, stock_quantity FROM products WHERE item_id=?", answer.item_id, function (err, data) {

            console.log(`You would like to buy ${answer.stock_quantity} at $${data[0].price} each`)
            console.log("---------------------------------------------------")

            if (data[0].stock_quantity >= answer.stock_quantity) {
                var newQuantity = data[0].stock_quantity - answer.stock_quantity;
                
                connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [newQuantity, answer.item_id], function (err, data) {
                    if (err) {
                        throw err;
                    }
                });
                var total = data[0].price * answer.stock_quantity;
                console.log(`Your purchase has been made! Your total coast for ${answer.stock_quantity} of ${data[0].product_name} is $${total}`)
            } else {
                console.log(`Sorry, your order cannot be completed. There is an insufficient stock quantity for ${data[0].product_name}. This product will be back in stock soon!`);
            }
            start();
        });
    });
};
