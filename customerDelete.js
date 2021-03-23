// global variables for database calls
req = ""
query = ""
results = ""

customerDelete.onshow = function() {
  drpDelete.clear()
  query = "SELECT name from customer"
   req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=elb82977&pass=" + pw + "&database=elb82977&query=" + query)

  if (req.status == 200) { //transit worked.
    customerDeleteR = JSON.parse(req.responseText)
    console.log(customerDeleteR)
  }
  if (customerDeleteR.length == 0) {
    // if no customers in a table brings back this message
    NSB.MsgBox("There are no customers to delete.")
  } else {
    //a loop that adds all the customers in the array to the dropdown.
    for (i = 0; i <= customerDeleteR.length - 1; i++)
      drpDelete.addItem(customerDeleteR[i])
  }
}

drpDelete.onclick = function(s) {
  // check to see if dropdown was clicked
  if (typeof(s) == "object")
    return
  else {
    drpDelete.value = s // make dropdown show the choice the user made
    let DeleteName = s
    // make sure the customers name is in the database before you try to delete it
    let found = false
    for (i = 0; i <= customerDeleteR.length - 1; i++) {
      if (DeleteName == customerDeleteR[i]) {
        found = true;
        break;
      }
    }
    if (found == false)
     txtDelete.value = `That customer is not in the database.${DeleteName} \n ${customerDeleteR}`
    else if (found == true) {
      query = "DELETE FROM customer WHERE name = " + '"' + DeleteName + '"'
       req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=elb82977&pass=" + pw + "&database=elb82977&query=" + query)
      
      if (req.status == 200) { //transit worked.
        if (req.responseText == 500) // means the insert succeeded
          console.log(`You have successfully deleted the customer named ${DeleteName}`)
        else
          console.log(`There was a problem deleting ${DeleteName} from the database.`)
      } else {
        // transit error
        console.log(`Error: ${req.status}`);
      }
    }
    // run the ajax to get the new list of customers
    query = `SELECT name from customer`
     req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=elb82977&pass=" + pw + "&database=elb82977&query=" + query)

    if (req.status == 200) { //transit worked.
      //save the sate of the customer 
      customerAfterDelete = JSON.parse(req.responseText)
    } else {
      // transit error
      console.log(`Error: ${req.status}`);
    }
    // putting new list of customers into txtDelete
    let customersLeft = ""
    for (i = 0; i <= customerAfterDelete.length - 1; i++)
      customersLeft = customersLeft + customerAfterDelete[i] + "\n"
    // change value of text area
    txtDelete.value = customersLeft
  }
}
btnNextPage1.onclick=function(){
  ChangeForm(customerAdd)
}