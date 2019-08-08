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
        else if (inquirerResponse.menuOption=="Add to Inventory"){}
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
    var query = "SELECT * FROM products WHERE stock_quantity < 8";
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




function quit(){
    console.log("Thank you for maintaining inventory at The Nile List")
    connection.end();
}

//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

menu()