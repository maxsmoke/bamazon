const mysql = require("mysql");

let DataDisplayer = function(connection) {
 
    this.connection = connection;
    this.connection.query("Select * from products", function(err, results) {
      //code for displaying readable format for the data.
      results.forEach(function(data) {
        console.log(
          `ID:${data.item_id} - Item: ${data.item_name} - Price: $${data.price} - Quantity: ${data.stock_quantity} - Department: ${data.department_name}`
        );
      });

      //adds space between the items and the prompt
      console.log("\n");
      return this.results;
    });
  };

 

module.exports = DataDisplayer;
