var mysql = require("mysql");
var inquirer = require("inquirer");
var _ = require("lodash");

var itemArray = [];
var idArray = [];
var id, quantity;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

function beginConnection(){
    connection.connect(function(err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
    });
}

function printTable() {
    connection.query("SELECT * FROM products", function(err, result, fields) {
        if (err) throw err;
        result.forEach(function(currentValue, index, array) {
            var item = result[index];
            console.log("id:" + result[index].item_id + " || "
            + result[index].product_name  + "\n--> department: "
            + result[index].department_name  + " | cost: $"
            + result[index].price  + " | # in stock: "
            + result[index].stock_quantity + "\n-------------\n");
            itemArray.push({
                item_id: item.item_id,
                product_name: item.product_name,
                department_name: item.department_name,
                price: item.price,
                stock_quantity: item.stock_quantity
            });
        });
        askQuestions();
    });
}

customerLoop();

function askQuestions(){
    itemArray.forEach(function(value, index, array){
        idArray.push(value.item_id + "");
    });
    inquirer.prompt([{
        type: 'list',
        name: 'itemId',
        message: 'Select the ID of the item to buy: ',
        choices: idArray
    }]).then(function (answers) {
        id = answers.itemId;
        inquirer.prompt([{
            type: 'input',
            name: 'itemQuantity',
            message: 'How many would you like to buy? \n(must be an integer, must be equal to or less than current stock)'
        }]).then(function (answers) {
            quantity = answers.itemQuantity;
            // use lodash to locate correct item
            var item = _.find(itemArray, {item_id: parseInt(id)});
            var newQuantity = item.stock_quantity - parseInt(quantity);
            if (newQuantity < 0) {
                console.log(`There are only ${item.stock_quantity} ${item.product_name} in stock. Purchase failed, please try again.`);
                return;
            }
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newQuantity
            }, {
                item_id: id
            }], function(err, result, fields) {});
            var totalCost = Number(item.price) * parseInt(quantity);
            console.log(`--------\nYour purchase of ${parseInt(quantity)} ${item.product_name} cost you: \n\$${totalCost.toFixed(2)}\n-------------`);
            connection.end();
        });
    });
}

function customerLoop() {
    beginConnection();
    printTable();
}

