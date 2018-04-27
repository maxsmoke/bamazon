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
          //managerPrompt();
          connection.end();
          break;
        case "Add New Product":
          //allows the manager to add a new product to the store
          addNewProduct();
       // managerPrompt();
       connection.end();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });

  function getData() {
    connection.query("SELECT * FROM products", function(err, results) {
      //code for displaying readable format for the data.
      console.log("\n");
      results.forEach(function(data) {
        console.log(
          `ID:${data.item_id} - Item: ${data.item_name} - Price: $${data.price} - Quantity: ${data.stock_quantity} - Department: ${data.department_name}`
        );
      });
      //adds space between the items and the prompt
      console.log("\n");
    });
  }

  //TODO complete function
  function viewLow() {
    connection.query(
      "SELECT  item_id FROM products WHERE stock_quantity < 5;",
      function(err, results) {
        let lowCountItems = [];
        results.forEach(function(item) {
          lowCountItems.push(item.item_id);
        });

        console.log("\nItems with low stock.");

        lowCountItems.forEach(function(data) {
          connection.query(
            `SELECT item_id, item_name, department_name, price, stock_quantity FROM products
        WHERE item_id=${data}`,
            function(err, result) {
              console.log(
                `ID:${result[0].item_id} - Item: ${result[0].item_name} - Price: $${result[0].price} - Quantity: ${result[0].stock_quantity} - Department: ${result[0].department_name}\n`
              );
            }
          );
        });
        console.log("\n");
      }
    );
  }

  // TODO finish query
  function addInv() {
    inquirer
      .prompt([
        { type: "input", name: "itemSelect", message: "Which item ID?" },
        { type: "input", name: "amount", message: "How many?" }
      ])
      .then(function(input) {
        let quantity = 0;
        let addition = parseInt(input.amount);
        let newQuantity = 0;

        // its that damn asynchronisity!!!!!!
        connection.query(`SELECT stock_quantity FROM products WHERE item_id=${input.itemSelect}`, function(err, result){
          console.log("quantity ", result[0].stock_quantity);
          quantity = result[0].stock_quantity;
          console.log('quant type ',typeof(quantity));
          console.log("added together ", addition + quantity)
          newQuantity = addition + quantity;
          console.log("newquantity ", newQuantity);
        });

        connection.query(`UPDATE products SET stock_quantity =${quantity} WHERE item_id=${input.itemSelect}`,
          function(err, results) {
            
            console.log(quantity);
            console.log("Item quantity updated!");
          }
        );
        
      });
    // TODO show updated row
  
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
          `INSERT INTO products \(item_name, department_name, price, stock_quantity\) VALUES\('${input.item}','${input.department}',${input.price},${input.quantity}\)`,
          function(err, results) {
            console.log("New product Added!");
            getData();
          }
        );
      });
  }
}
