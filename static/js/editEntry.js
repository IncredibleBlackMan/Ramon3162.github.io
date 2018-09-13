const editSingleEntry = (entryId) => {
  sessionStorage.setItem("id", entryId);
  window.location.replace("./edit_entry.html");
}

const editEntry = (entryId) => {
    fetch( `https://thee-diary-app.herokuapp.com/api/v1/entries/${entryId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: document.getElementById('title').value,
        description: document.getElementById('entry').value
      }),
      headers: {
        'Authorization' : `Bearer ${sessionStorage.getItem("token")}`,
        'Content-type' : 'application/json;'
      }
    })
    .then(response => response.json())
    .then(entryData => {
      if(entryData.message === "Entry updated successfully"){
        window.location.replace("./entry_list.html");
      }else{
        document.getElementById('message').innerHTML = entryData.message;
      }
    })
  }