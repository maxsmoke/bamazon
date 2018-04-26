const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database");

  managerPrompt();
});

function managerPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "selector",
        message: "What would you like to do manager?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product",
          "Exit"
        ],
        default: "View Products for Sale"
      }
    ])
    .then(function(commands) {
      switch (commands.selector) {
        case "View Products for Sale":
          // lists every available item
          getData();
          managerPrompt();
          break;
        case "View Low Inventory":
          // list all items with an inventory count lower than five
          viewLow();
          managerPrompt();
          break;
        case "Add to Inventory":
          //display a prompt that will let the manager add more of any item currently in the store
          addInv();
          managerPrompt();
          break;
        case "Add New Product":
          //allows the manager to add a new product to the store
          addNewProduct();
          managerPrompt();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });

  function getData() {
    connection.query("Select * from products", function(err, results) {
      //code for displaying readable format for the data.
      console.log("\n");
      results.forEach(function(data) {
        console.log(
          `ID:${data.item_id} - Item: ${data.item_name} - Price: $${data.price} - Quantity: ${data.stock_quantity} - Department: ${data.department_name}\n`
        );
      });
      //adds space between the items and the prompt
      console.log("\n");
    });
  }

  //TODO complete function
  function viewLow() {
    connection.query(``, function(err, results) {});
  }

 // TODO finish query
  function addInv() {
    inquirer
      .prompt([
        { type: "input", name: "itemSelect", message: "Which item ID?" },
        { type: "input", name: "amount", message: "How many?" }
      ])
      .then(function(input) {
        connection.query(``, function(err, results) {});
      });
      // TODO show updated row
      console.log("Item quantity updated!")
  }

  //NEEDS TESTING
  function addNewProduct() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "item",
          message: "What's the name of the item?"
        },
        {
          type: "list",
          name: "department",
          message: "What's the department?",
          choices: [
            "Clothing",
            "Construction",
            "Electronics",
            "Grocery",
            "Widgets",
            "Miscellaneous"
          ]
        },
        {
          type: "input",
          name: "price",
          message: "What's the price of the item (in dollars)?"
        },
        {
          type: "input",
          name: "quantity",
          message: "How many are we putting into our warehouse?"
        }
      ])
      .then(function(input) {
        connection.query(
          `INSERT INTO products \(item_name, department_name, price, stock_quantity\) VALUES\(${input.item},${input.department},${input.price},${input.quantity}\)`,
          function(err, results) {
            console.log("New product Added!");
            getData();
          }
        );
      });
  }
}
