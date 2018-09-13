const getSingleTableEntry = (entryId) => {
    sessionStorage.setItem("id", entryId);
    window.location.replace("./entry.html");
}

const showSingleEntry = () => {
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
      document.getElementById('title-section').innerHTML += 
      `<h2>${entryData.Entry.title}</h2>
      <p>${entryData.Entry.date_posted}</p>`;
      document.getElementById('diary-content').innerHTML +=
      `<p>${entryData.Entry.description}</p>`;
      document.getElementById('edit-icons').innerHTML +=
      `<a href="javascript:void(0);"><i class="fa fa-pencil" id="${entryData.Entry.id}" onclick="editSingleEntry(this.id)"></i></a>
      <a href="javascript:void(0);"><i class="fa fa-trash" id="${entryData.Entry.id}" onclick="deleteEntry(this.id)"></i></a>`;
    }else{
      document.getElementById('message').innerHTML = entryData.message;
    }
    })
  }