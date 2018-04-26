const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err){
    if(err) throw err;
    getData();
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
      managerPrompt(results);
    });
  }


function managerPrompt(results){
    inquirer.prompt({}).then(function(commands){});
}
