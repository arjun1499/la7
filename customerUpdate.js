req = ""
query = ""
results = ""

customerUpdate.onshow = function() {
  drpUpdate.clear()
  query = "SELECT name from customer"
   req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=elb82977&pass=" + pw + "&database=elb82977&query=" + query)

  if (req.status == 200) { //transit worked.
    results = JSON.parse(req.responseText)
    console.log(results)
  }
  if (results.length == 0) {
    // if no customers in a table brings back this message
    console.log("There are no customers to Update.")
  } else {
    //a loop that adds all the customers in the array to the dropdown.
    for (i = 0; i <= results.length - 1; i++)
      drpUpdate.addItem(results[i])
  }
}
//great global variable to save choosen name 
let oldName = ''

drpUpdate.onclick = function(s) {
  // check to see if dropdown was clicked
  if (typeof(s) == "object")
    return
  else {
    drpUpdate.value = s // make dropdown show the choice the user made
    oldName = s
  }
}


btnUpdate.onclick = function() {
  let newName = inpNewName.value

  let found = false
  for (i = 0; i <= results.length - 1; i++)
    // console.log(`FOUND IS false and name is ${results[i]}`)
    if (oldName == results[i]) {
      found = true
      break
    }

  if (found == false)
    console.log("That customer name is not in the database.")
  else if (found == true) {
    query = `UPDATE customer SET name = '${newName}' WHERE name = '${oldName}'`
    //alert(query)
     req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=elb82977&pass=" + pw + "&database=elb82977&query=" + query)

    if (req.status == 200) { //transit worked.
      if (req.responseText == 500) { // means the update succeeded
       console.log(`You have successfully changed the customers name!`)
        // reset controls to original state
        inpNewName.value = ""
        drpUpdate.value = "Customer"
      } else
        console.log(`There was a problem changing the Customers name.`)
    } else
      // transit error
      console.log(`Error: ${req.status}`);
  } // found is true
  // loat txtarea
  query = "SELECT name from customer"
   req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=elb82977&pass=" + pw + "&database=elb82977&query=" + query)

  if (req.status == 200) { //transit worked.
    results = JSON.parse(req.responseText)
  }
 if (results.length == 0) {
    // if no customers in a table brings back this message
    NSB.MsgBox("There are no customers in tabel.")
  } else {
    // putting new list of customers into txtDelete
    let customersUpdate = ""
    for (i = 0; i <= results.length - 1; i++)
      customersUpdate = customersUpdate + results[i] + "\n"
    // change value of text area
    txtUpdate.value = customersUpdate
  }
}