const showEditEntry = () => {
    const entryId = sessionStorage.getItem("id");
    fetch( `https://thee-diary-app.herokuapp.com/api/v1/entries/${entryId}`, {
      headers: {
       'Authorization' : `Bearer ${sessionStorage.getItem("token")}`,
       'Content-type' : 'applicatin/json;'
      }
    })
    .then(response => response.json())
    .then(entryData => {
      if(entryData.message === "Entry retrieved successfully"){
        document.getElementById("title").value = entryData.Entry.title;
        document.getElementById("entry").value = entryData.Entry.description;
        document.getElementById("form-input-edit").innerHTML +=
        `<input type="button" value="Publish Entry" onclick="editEntry(this.id)" id="${entryData.Entry.id}" class="submit-btn">`;
      }else{
        document.getElementById('message').innerHTML = entryData.message;
      }
    })
  }