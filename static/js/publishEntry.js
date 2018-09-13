let entriesUrl = 'https://thee-diary-app.herokuapp.com/api/v1/entries';

const publishEntry = () => {
    fetch(entriesUrl, {
      method: 'POST',
      body: JSON.stringify({
        title: document.getElementById('title').value,
        description: document.getElementById('description').value
      }),
      headers: {
        'Authorization' : `Bearer ${sessionStorage.getItem("token")}`,
        'Content-type' : 'application/json;'
      }
    })
    .then(response => response.json())
    .then(data => {
      if(data.message === "Entry created successfully"){
        window.location.href = "./entry_list.html";
        sessionStorage.setItem("id", data.Entry.id);
      }else{
        document.getElementById('message').innerHTML = data.message;
      }
    })
  }