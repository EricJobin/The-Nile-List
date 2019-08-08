//----------------------  Global Variables  --------------------------
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,
	user: "newuser",
	password: "r00tr00t",
	database: "nilelistdb"
});

//----------------------  Do Program Stuff  -------------

function displayStock(callback){ // Calls all products from database and displays them on screen
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | $" + res[i].price);
        }
        console.log("\n");
        callback() //Using a callback ensures that program will only move onto next step after items have been displayed.
    })
}

function offerSale(){ //Use this as a callback in displayStock to see if user wants to buy anything else or stop shopping
    inquirer.prompt({
        type: "confirm",
        message: "Would you like to buy some wares?",
        name: "confirm",
        default: false
    })
    .then(function(inquirerResponse) {
        if (inquirerResponse.confirm == true) {
            doShopping()
        }
        else{quit()}
    })
}

function doShopping(){
    inquirer.prompt([
        {
            type: "input",
            message: "Which item would you like to buy? Please enter the ID #",
            name: "itemWant"
        },
        {
            type: "input",
            message: "How many of these would you like to buy?",
            name: "buyQty"
        },
    ])
    .then(function(inquirerResponse) {
        if (inquirerResponse.buyQty <0 || (inquirerResponse.buyQty%1)!=0){ // Verifies Qty is a positive, and a whole number
            console.log("Sorry, we only sell positive integers of quantity\n")
            setTimeout(function(){displayStock(offerSale)}, 2500) //Timeout gives user time to read prompt before stock is displayed again.
            return
        }

        var query = `SELECT * FROM products WHERE item_id = ?`;

        connection.query(query, inquirerResponse.itemWant, function (error, results) {
            if (error) throw err;
            if(results[0]==undefined){ //If ID# DNE kicks user to displayStock()
                console.log("I'm sorry, but this item doesn't exist"); 
                setTimeout(function(){displayStock(offerSale)}, 2500)
                return
            }
            else if (inquirerResponse.buyQty > results[0].stock_quantity){ //If trying to buy more than stock on hand
                console.log(`I'm sorry, but we only have ${results[0].stock_quantity} left in stock\n`); 
                setTimeout(function(){displayStock(offerSale)}, 2500)
                return
            }
            else { //We process the transaction here
                var bill = inquirerResponse.buyQty * results[0].price;
                console.log(`Thank you for your order. You will be billed $${bill} for your order\n
                You will recieve ${inquirerResponse.buyQty} ${results[0].product_name}
                `)

                var newQty = results[0].stock_quantity - inquirerResponse.buyQty;
                connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newQty, results[0].item_id], function (error){
                    if (error) throw error;
                });

                setTimeout(function(){displayStock(offerSale)}, 2500)
            }
        });      
    })
}

function quit(){
    console.log("Thank you for shopping at The Nile List")
    connection.end();
}

displayStock(offerSale)
