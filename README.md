# bamazon

##Welcome to my Bamazon App using Node.js and mySQL!

*This is a basic application that manipulates a SQL database with JavaScript code.
*User input is processed through inquirer.js. 

###How bamazonCustomer.js Works

*1. The **bamazonCustomer.js** file first connects to the database server port.
*2. The **getData()** begins the logic of the program by first displaying the items in the database. 
*3. It then runs **customerPrompt()** which captures user input in two inquirer input functions. The first asks to "Select the ID of the item you would like: " and the second "How many would you like?".
4. Both of these inquires have a validation method so that the user is forced to put a number input.
*5. To save us from possible trouble on the answers returned from inquirer. We sanitize the variables in the **.then** portion of the inquirer prompt  by converting them to integers. Inquirer always returns strings.
*6. A check is conducted with an **if** statement. We exit the program if the user desires more items then the store can supply. 
* The **else** statement means the user requested an acceptable amount of items. 
*7. We now run a**connect.query** function to update the quantity in the database and a second query to display the changes made to the item rows. 

###Image
![Bamazon Customer in Action](/assets/images/bamazonCustomer.JPG)
Format: ![Alt Text](url)
*===================================================

##BamazonManager.js
*This file has four functions for altering the database. *View Products for Sale*, *View Low Inventory*, *Add to Inventory*, *Add New Product* and an *Exit* function.

###How it works
*We connect to the database and jump into the **managerPrompt()**function which contains our inquire prompts. The user is limited in their choices so an input would bring an unecessary need to validate user input.
*Once the user selects what they would like to do we run their command through a switch, each case labeled as one of the choices and lead to their respective functions. 

###Functions
*There are four functions:
*1. *getData()*, is nearly identical to what it was in the *bamazonCustomer.js* file. It returns the database data. 
*2. *viewLow()* sends query logic where the item_quantity < 5 and returns them to the user.
*3. *addInv()* begins a new inquirer prompt to gather what item the user wants and how many they want to add to the quantity. We then select the appropriate row in the database and update it with the new quantity information. 
*4. *addNewProduct()* also begins with an inquirer prompt to gather a few new variables. The **name** of the item; the **department**; the item **price** and the **quantity** to be stored in the database/warehouse. With this information we conduct another query and insert the new row into the database and call **getData** once more to display the new database. 

####Images
![View in Action](/assets/images/bamazonManagerView.JPG)
Format: ![Alt Text](url)


![Low Quantity in Action](/assets/images/bamazonManagerLow.JPG)
Format: ![Alt Text](url)

*addInv and addNewProduct are having asynchronisity issues and are still works in progress.*

*However, addNewProduct does work on occasion*  