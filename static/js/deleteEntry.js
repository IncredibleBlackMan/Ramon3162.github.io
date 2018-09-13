const deleteEntry = (entryId) => {
    let confirmation = confirm("Are you sure you want to delete this entry?");
    if(confirmation == true){
      fetch( `https://thee-diary-app.herokuapp.com/api/v1/entries/${entryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization' : `Bearer ${sessionStorage.getItem("token")}`,
          'Content-type' : 'application/json;'
        }
        })
        .then(response => response.json())
        .then(data => {
          if(data.message === "Entry deleted successfully"){
            document.location.replace("./entry_list.html");
          }else{
            document.getElementById('message').innerHTML = data.message;
          }
      })
    }
  }