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
        else if (inquirerResponse.menuOption=="Add New Product"){addNew()}
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
            console.log("All items well stocked!\n"); 
            setTimeout(function(){menu()}, 2500) // ****** Change to callback?
            return
        }
        for (var i = 0; i < res.length; i++) {
            console.log(`ID: ${res[i].item_id}  ||  Product: ${res[i].product_name}  ||  $${res[i].price}  ||  Stock: ${res[i].stock_quantity}`);
        }
        console.log("\n");
        callback() //Using a callback ensures that program will only move onto next step after items have been displayed.
    })
}

function addNew(){
    inquirer.prompt([
        {
            type: "input",
            message: "What is the new product name?",
            name: "newName"
        },
        {
            type: "list",
            message: "What department sells this item?",
            choices: ["Household Goods", "Medicine and Chemistry", "Tools and Hardware", "Odd Odds and Ends"],
            name: "newDept"
        },
        {
            type: "input",
            message: "What will this item sell for?",
            name: "newPrice"
        },
        {
            type: "input",
            message: "How much stock should we order?",
            name: "newStock"
        },
    ])
    .then(function(inquirerResponse) {
        var newPrice = parseFloat(inquirerResponse.newPrice).toFixed(2);

        if (inquirerResponse.newStock <0 || (inquirerResponse.newStock%1)!=0){ // Verifies Qty is a positive, and a whole number
            console.log("Sorry, we only order whole positive integers of stock\n")
    
            return
        }

        confirmNewItem(inquirerResponse.newName, inquirerResponse.newDept , newPrice, inquirerResponse.newStock);
        
        // callback() //Menu popping up before confirmNewItem() has finished. WHY????
    })
}

function confirmNewItem(nn, nd, np, ns){
    inquirer.prompt(
        {
            type: "confirm",
            message: `The New item will be:\n
            Product: ${nn}\n
            Department: ${nd}\n
            $${np}\n
            Stock: ${ns}\n
            Is this Ok?
            `,
            name: "confirm",
            default: false
        }
    )
    .then(function(inquirerResponse) {
        if (inquirerResponse.confirm == false){
            console.log("Returning to Main Menu")
            setTimeout(function(){menu()}, 2500)
            return;
        }
        insertItem(nn, nd, np, ns, menu);
    })
}

function insertItem(nn, nd, np, ns, callback){
    var query = `INSERT INTO products VALUES(0, "${nn}", "${nd}", ${np}, ${ns})`;
    connection.query(query, function (error, results) {
        if (error) throw error;
    })
    callback()
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

            if(results[0]==undefined){ //If ID# DNE kicks user to displayStock()
                console.log("I'm sorry, but this item doesn't exist"); 
                setTimeout(function(){menu()}, 2500)
                return
            }
            else { //We add stock to the DB here
                var newQty = parseInt(results[0].stock_quantity) + parseInt(inquirerResponse.buyQty); // 
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


menu()