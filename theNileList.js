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

connection.connect(function(err) {
	if (err) throw err;
    //Functions to run here
    displayStock(offerSale)
    // offerSale()
});

function displayStock(callback){

    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Product: " + res[i].product_name + " | $" + res[i].price);
        }
        callback()
    })
    // quit()
}

// CREATE TABLE products(
//     item_id INTEGER NOT NULL AUTO_INCREMENT,
//     product_name VARCHAR(50),
//     department_name VARCHAR(30),
//     price DECIMAL(5,2),
//     stock_quantity INTEGER(10),
//     PRIMARY KEY (item_id)
// );

function offerSale(){
    inquirer.prompt({
        type: "confirm",
        message: "\nWould you like to buy some wares?",
        name: "confirm",
        default: false
    })
    .then(function(inquirerResponse) {
        // console.log(`response: ${inquirerResponse.confirm}`)
        if (inquirerResponse.confirm == true) {
            // console.log("Call Shopping Stuff Here");
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
        console.log(`Want: ${inquirerResponse.itemWant}, Qty: ${inquirerResponse.buyQty}`)


        var query = `SELECT * FROM products WHERE item_id = ?`;

        // connection.query(query, inquirerResponse.itemWant, function (error, results, fields) {
        connection.query(query, inquirerResponse.itemWant, function (error, results) {
              if (error) throw err;
              if(results==undefined){console.log("Item does not exist"); return}
              console.log(`results: ${results}`);
              console.log(results)

              console.log("------------------------------------------")
            //   console.log(stock_quantity)
              console.log(results[0].stock_quantity)
            //   console.log(results.RowDataPacket)

            }
        );
      
        quit()
    })

}


// 6. The app should then prompt users with two messages.
//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.    ---Verify qty is positive && #
// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.
// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.


function quit(){
    console.log("Thank you for shopping at The Nile List")
    connection.end();
}