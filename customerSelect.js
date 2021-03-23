// global variables for database calls
let req = ""
let query = ""
let results = ""
let pw = "Zone1259" // put your database password here
let userName = 'elb82977'

customerSelect.onshow=function(){
  drpCustomer.clear()
  query = "SELECT name from customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=elb82977&pass=" + pw + "&database=elb82977&query=" + query)

  if (req.status == 200) { //transit worked.
    customerSelectR = JSON.parse(req.responseText)
    console.log(customerSelectR)
  }
  if (customerSelectR.length == 0) {
    // if no customers in a table brings back this message
    NSB.MsgBox("There are no customers found.")
  } else {
    //a loop that adds all the customers in the array to the dropdown.
    for (i = 0; i <= customerSelectR.length - 1; i++)
      drpCustomer.addItem(customerSelectR[i])
  }
}

drpCustomer.onclick=function(s){
  // this 'if' kicks user out if they  just clicked on control 
  // but not on one item in the list.
  if (typeof(s) == "object")
    return
  else { // the user picked something
    console.log(s)
    drpCustomer.value = s // make dropdown show the choice the user made
    query = `SELECT state from customer WHERE name = '${s}'`
    //Grab the state of the customer chosen
     req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=elb82977&pass=" + pw + "&database=elb82977&query=" + query)

    if (req.status == 200) { //transit worked.
      //save the sate of the customer 
      customerSelectState = JSON.parse(req.responseText)
      console.log(customerSelectState)
    }
    query = `SELECT name from customer WHERE state = '${customerSelectState[0]}'`
    // get the other customers who have the same state
     req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=elb82977&pass=" + pw + "&database=elb82977&query=" + query)
    
    if (req.status == 200) { //transit worked.
      //save the sate of the customer 
      customerSelectSameState = JSON.parse(req.responseText)
      console.log(customerSelectSameState)
    }
    
    let customerMessage = ""
    for (i = 0; i <= customerSelectSameState.length - 1; i++)
      customerMessage = customerMessage + customerSelectSameState[i] + "\n"
    // clear txt and then change
    txtResults.value = customerMessage
  }  
}

btnNextPage.onclick=function(){
  ChangeForm(customerDelete)
}