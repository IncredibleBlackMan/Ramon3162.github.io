let entriesUrl = 'https://thee-diary-app.herokuapp.com/api/v1/entries';

const getEntries = () => {
    fetch(entriesUrl, {
      headers: {
        'Authorization' : `Bearer ${sessionStorage.getItem("token")}`,
        'Content-type' : 'application/json;'
      }
    })
    .then(response => response.json())
    .then(entriesData => {
      if(entriesData.message === "All entries found successfully"){
        let i;
        for(i = 0; i < entriesData.Entries.length; i++){
          document.getElementById('entry-data').innerHTML += `
          <tr id="${entriesData.Entries[i].id}" onclick="getSingleTableEntry(this.id)">
            <td></td>
            <td>
              <a href="javascript:void(0);">${entriesData.Entries[i].title}</a>
            </td>
            <td>${entriesData.Entries[i].date_posted}</td>
            <td></td>
          </tr>`
        }
      }else{
        let table = document.getElementById('entry-data');
        table.style.display = "none";
        document.getElementById('message').innerHTML = entriesData.message;
      }
    })
  }