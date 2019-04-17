var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Jchen125",
    database: "bamazon"
});


//establish the connection
connection.connect(function(error) {
    if (error) throw error;
    console.log("connected as id " + connection.threadId);

    showTable()
});

function showTable() {
    connection.query("SELECT * FROM products", function(error, response) {
        if (error) throw error;

        for (i = 0; i < response.length; i++) {
            console.log("-------------------------\n",
                "-FOR SALE-\n",
                "\nID: " + response[i].item_id,
                "\nProduct: " + response[i].product_name,
                "\nPrice: " + response[i].price,
                "\nStock: " + response[i].stock_quantity,
                "\n-------------------------\n"
            );
        }

        start(response);   
    });
};

function start (results) { 
  
    inquirer
        .prompt([
            {
                type: "list",
                name: "selectProduct",
                message: "What would you like to buy?",
                choices: function() {
                    var choiceArrayProduct = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArrayProduct.push(results[i].product_name.toString());
                    }
                    return choiceArrayProduct;
                }
            },

            {
            type: "input",
            name: "selectNumUnits",
            message: "How many would you like to buy?"
            }
        ])
        .then (function(answer){
            CheckUnits(answer.selectProduct, answer.selectNumUnits);
        });
};

function CheckUnits(Item, NumUnits){

    connection.query(`SELECT stock_quantity FROM products WHERE "${Item}" = products.product_name`, function(error, results) {
        if (error){
            throw error;
        }
        else if (parseInt(NumUnits) > results[0].stock_quantity) {
            console.log ("Insufficient quantity - cannot complete the order!")
            connection.end();
        }
        else if (parseInt(NumUnits) <= results[0].stock_quantity) {
  
        updateUnits(Item, NumUnits, results[0].stock_quantity);
        connection.end();
        };
    })
}

function updateUnits(Item, NumUnits, stock_quantity){
    console.log("Updating stock...");
    connection.query(
        `UPDATE products SET stock_quantity = ${stock_quantity-NumUnits} WHERE "${Item}" = product_name`, function(error, results){
            if (error){
                throw error;
            }
            console.log("Order has been placed!");
        }
    )
}