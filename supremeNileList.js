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

function menu(){
    console.log("Welcome to The Nile List Inventory Management System")
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory","Add New Product","Quit"],
        name: "menuOption"
    })
    .then(function(inquirerResponse) {
        console.log(inquirerResponse.menuOption);
        if (inquirerResponse.menuOption=="View Products for Sale" ){products(menu)}
        else if (inquirerResponse.menuOption=="View Low Inventory"){lowQty(menu)}
        else if (inquirerResponse.menuOption=="Add to Inventory"){buyInv()}
        else if (inquirerResponse.menuOption=="Add New Product"){}
        else if (inquirerResponse.menuOption=="Quit"){quit()}
        else{console.log("That went sideways"); quit()};
    })
}

function products(callback){ // Calls all products from database and displays them on screen
    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id}  ||  Product: ${res[i].product_name}  ||  $${res[i].price}  ||  Stock: ${res[i].stock_quantity}`);
        }
        console.log("\n");
        callback() //Using a callback ensures that program will only move onto next step after items have been displayed.
    })
}

function lowQty(callback){
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    connection.query(query, function(err, res) {
        if (err) throw err;
        if(res[0]==undefined){ //If all items have minimum stock levels
            console.log("All items well stocked!"); 
            setTimeout(function(){menu()}, 2500)
            return
        }
        for (var i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id}  ||  Product: ${res[i].product_name}  ||  $${res[i].price}  ||  Stock: ${res[i].stock_quantity}`);
        }
        console.log("\n");
        callback() //Using a callback ensures that program will only move onto next step after items have been displayed.
    })

}

function buyInv(){
    inquirer.prompt([
        {
            type: "input",
            message: "Which item would you like to restock? Please enter the ID #",
            name: "itemWant"
        },
        {
            type: "input",
            message: "How many of these would you like to order?",
            name: "buyQty"
        },
    ])
    .then(function(inquirerResponse) {
        if (inquirerResponse.buyQty <0 || (inquirerResponse.buyQty%1)!=0){ // Verifies Qty is a positive, and a whole number
            console.log("Sorry, we only order whole positive integers of stock\n")
            setTimeout(function(){menu()}, 2500) //Timeout gives user time to read prompt before stock is displayed again.
            return
        }

        var query = `SELECT * FROM products WHERE item_id = ?`;
        connection.query(query, inquirerResponse.itemWant, function (error, results) {
            if (error) throw err;

            var newQty = parseInt(results[0].stock_quantity) + parseInt(inquirerResponse.buyQty);

            if(results[0]==undefined){ //If ID# DNE kicks user to displayStock()
                console.log("I'm sorry, but this item doesn't exist"); 
                setTimeout(function(){menu()}, 2500)
                return
            }

            else { //We process the transaction here
                console.log(`
                You have ordered ${inquirerResponse.buyQty} units of ${results[0].product_name}. We now have ${newQty} in stock
                `)

                connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newQty, results[0].item_id], function (error){
                    if (error) throw error;
                });

                setTimeout(function(){menu()}, 2500)
            }
        });      
    })
}











function quit(){
    console.log("Thank you for maintaining inventory at The Nile List")
    connection.end();
}


//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

menu()