const mysql = require("mysql");
const inquirer = require("inquirer");
 let DataDisplayer = require("./dataDisplayFunc.js");
// let myPrompts = require("./promptFunctions.js");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  
  
  getData();
  //asycrhonis issue
  // let dataGrab = new DataDisplayer(connection);
  // let results = dataGrab;
  // customerPrompt(results);
});



function getData() {
  connection.query("Select * from products", function(err, results) {
    //code for displaying readable format for the data.
    results.forEach(function(data) {
      console.log(
        `ID:${data.item_id} - Item: ${data.item_name} - Price: $${data.price} - Quantity: ${data.stock_quantity} - Department: ${data.department_name}`
      );
    });

    //adds space between the items and the prompt
    console.log("\n");

    //function for asking for customer input
    customerPrompt(results);
  });
}

function customerPrompt(results) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "itemSelected",
        message: "Select the ID of the item you would like: ",
        validate: function(input) {
          let done = this.async();

          if (isNaN(input)) {
            done("Provide a number");
            return;
          }
          done(null, true);
        }
      },
      {
        input: "input",
        name: "numberPurchased",
        message: "How many would you like?",
        validate: function(input) {
          let done = this.async();

          if (isNaN(input)) {
            done("Provide a number");
            return;
          }
          done(null, true);
        }
      }
    ])
    .then(function(answers) {
      // save the users responses into a usable integer variable
      // itemChosen is  -1 because of array index notation.
      let itemChosen = parseInt(answers.itemSelected - 1);

      let desiredAmt = parseInt(answers.numberPurchased);

      // saved into a variable for legibility
      let databaseQty = results[itemChosen].stock_quantity;

      //checks if database quantity is less than the users desired amount
      if (databaseQty < desiredAmt) {
        console.log("No no no! Insuffcient Quantity!");
        customerPrompt(results);
        connection.end();
      } else {
        console.log("\nItem added to your cart!");

        let stockLeft = databaseQty - desiredAmt;
        console.log(stockLeft);

        let sqlcommand =
          "UPDATE products SET stock_quantity =" +
          stockLeft +
          " WHERE item_id=" +
          (itemChosen +
          1);

        connection.query(sqlcommand, function(err, res) {
          console.log("\nDatabase Updated." );
        });
        connection.query(`SELECT stock_quantity FROM products WHERE item_id=${itemChosen+1}`, function(err,result){
          console.log(`${result[0].stock_quantity} items left.`);
        });
        connection.end();
      }
    });
}
