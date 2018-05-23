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
            message: "Welcome to Bamazon. Please choose an option:",
            choices: [
                "View Products for Sale",
                "View Low Inventory",
                "Add to Inventory",
                "Add New Product"
            ],
            type: "list"
        }
    ]).then(function (response) {
        switch (response.action) {
            case "View Products for Sale":
                productsForSale();
                break;
            case "View Low Inventory":
                viewLowInventory();
                break;
            case "Add to Inventory":
                addToInventory();
                break;
            case "Add New Product":
                addNewProduct();
            default:
                break;
        }
    });
}

function productsForSale() {
    connection.query("SELECT * FROM products", function (err, data) {
        if (err) {
            throw err;
        }

        for (var i = 0; i < data.length; i++) {
            console.log(`ITEM ID: ${data[i].item_id} - NAME: ${data[i].product_name} - PRICE: ${data[i].price} - QUANTITY: ${data[i].stock_quantity}`);
        }
        console.log("------------------------------------------------------------------------");
        start();
    });
}

function viewLowInventory() {
    connection.query("SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity < 5", function (err, data) {
        if (err) {
            throw err;
        }

        for (var i = 0; i < data.length; i++) {
            console.log(`ITEM ID: ${data[i].item_id} - NAME: ${data[i].product_name} - QUANTITY: ${data[i].stock_quantity}`);
        }
        console.log("------------------------------------------------------------------------");
        start();
    });
}

function addToInventory() {
    inquirer.prompt([
        {
            name: "item_id",
            message: "Please Enter the ID of the Product You Want to Increase in Stock: ",
            type: "input"
        },
        {
            name: "stock_quantity",
            message: "Please Enter the Amount of Stock You Want to Add: ",
            type: "input"
        }
    ]).then(function (answer) {
        connection.query("SELECT product_name, price, stock_quantity FROM products WHERE item_id=?", answer.item_id, function (err, data) {

            console.log("---------------------------------------------------")
            console.log(`You would like to add ${answer.stock_quantity} more of ${data[0].product_name}`)
            console.log("---------------------------------------------------")

            var newStock = data[0].stock_quantity + parseInt(answer.stock_quantity);

            connection.query("UPDATE products SET stock_quantity=? WHERE item_id=?", [newStock, answer.item_id], function (err, data) {
                if (err) {
                    throw err;
                } else {
                    console.log(`The Stock Quantity has been updated from ${answer.stock_quantity} units to ${newStock} units`)
                    console.log("---------------------------------------------------")
                }
                start();
            });
        });
    });
};

function addNewProduct() {
    inquirer.prompt([
        {
            name: "product_name",
            message: "Please Enter Name of Product You Want to Add: ",
            type: "input"
        },
        {
            name: "department_name",
            message: "Please Enter the Depeartment For This Product: ",
            type: "input"
        },
        {
            name: "price",
            message: "Please Enter the Price For This Product (0.00): ",
            type: "input"
        },
        {
            name: "stock_quantity",
            message: "Please Enter a Stock Quantity For This Product: ",
            type: "input"
        }
    ]).then(function (answer) {
        connection.query("INSERT INTO products SET ?", answer, function (err, data) {
            if (err) {
                throw err;
            } else {
                console.log("New Product has been added!")
                console.log("---------------------------------------------------")
            }
            start();
        });
    });
}

