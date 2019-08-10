# The-Nile-List

This is a node js application that mimics an online store like Amazon or Craigslist, but uses a CLI and bash terminal to display items and take in commands. This application was developed to practice making node cli applications, using npm packages, and making them work with a local MySQL database.

### Prerequisites

The following npm packages are required for this program:

inquirer: "^6.5.0",<br/>
mysql: "^2.17.1"

## Program Operation

After the required dependencies have been installed the program can be started by using the terminal CLI. There are two applications that can be used, theNileList.js, which is designed for users to browse and purchase items, and supremeNileList.js, which is for supervisors to monitor and maintain stock.<br/>

## User Mode

theNileList.js can be started by typing 'node theNileList.js' in the terminal.

![Start](/images/101.png?raw=true "Command to start program")

Once this is done the user will be presented with a list showing the wares for sale:

![Menu](/images/102.png?raw=true "Items for sale")

Under this menu the user will be prompted if they want to buy anything. If they choose yes then they will be prompted for which item they want and how many.

![Buy](/images/103.png?raw=true "Purchasing an item")

The user will then be shown how much the total order costs, and what they will be receiving. They will then again be shown the list of items and asked if they want to purchase wares. The user may make as many purchases as they wish, and will only exit once they no longer wish to buy anything.

![Quit](/images/104.png?raw=true "Exiting")

### Error Handling

If the user attempts to buy an item not listed, or tries to buy a quantity that is greater than what is in stock, or orders a negative or fractional stock quantity, they will be told that they may not do so and be returned to the purchase wares prompt.

![NoItem](/images/105.png?raw=true "Item DNE")
![NoStock](/images/106.png?raw=true "Tries to buy more than what's in stock")
![WrongQty](/images/107.png?raw=true "User tried ordering a negative number")


## Supervisor Mode

supremeNileList.js can be started by typing 'node supremeNileList.js' in the terminal.

![Start](/images/201.png?raw=true "Command to start program")

The user will be shown a menu of options available to supervisors.

![Menu](/images/202.png?raw=true "Options Menu")

The first option will display all items available in the database.

![Items](/images/203.png?raw=true "Items Menu")

The second option allows the user to view just the items that are low in stock (under 5 units).

![LowStock](/images/204.png?raw=true "Low Stock Menu")

The third options allows the supervisor to replenish stock of an item.

![BuyStock](/images/205.png?raw=true "Replenish Stock")

The fourth option allows the supervisor to add a new item to the database. The program will prompt the supervisor for the name of the new item, allows the supervisor to pick a department from a list of departments, set the price of the item, and the initial quantity to carry of the item. The supervisor will then be shown the attributes for the item they're adding, and asked to confirm that they are correct before adding the item to the database.

![NewItem](/images/206.png?raw=true "Adding a new Item")

The final option allows the supervisor to exit the program if they do not wish to perform any further actions.

![Quit](/images/207.png?raw=true "Quit")