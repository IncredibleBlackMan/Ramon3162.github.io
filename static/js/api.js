let signupUrl = 'https://thee-diary-app.herokuapp.com/auth/signup';
let loginUrl = 'https://thee-diary-app.herokuapp.com/auth/login';
let entriesUrl = 'https://thee-diary-app.herokuapp.com/api/v1/entries';

const registerUser = () => {
  fetch(signupUrl, {
    method: 'POST',
    body: JSON.stringify({
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      confirm_password: document.getElementById('confirm_password').value
    }),
    headers: {
      'Content-type': 'application/json;'
    }
    })
    .then(response => response.json())
    .then(registerData => {
      if(registerData.message === "User created successfully"){
        window.location.replace("./login.html");
        console.log(registerData.User.user_id);
        sessionStorage.setItem("user_id", registerData.User.user_id);
      }else{
          document.getElementById('error-message').innerHTML = registerData.message;
      }
  })
}
  
const loginUser = () => {
  fetch(loginUrl, {
    method: 'POST',
    body: JSON.stringify({
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    }),
    headers: {
      'Content-type' : 'application/json;'
    }
  })
  .then(response => response.json())
  .then(loginData => {
      if(loginData.message === "Login successfull"){
          window.location.href = "./entry_list.html";
          let id = loginData.User.user_id;
          sessionStorage.setItem("userId", id);
          sessionStorage.setItem("token",loginData.token);
      }else{
          document.getElementById('error-message').innerHTML = loginData.message;
      }
  })
}

const getUser = () => {
  const userId = sessionStorage.getItem("userId");
  console.log(userId);
  fetch( `https://thee-diary-app.herokuapp.com/users/${userId}`, {
    headers: {
     'Authorization' : `Bearer ${sessionStorage.getItem("token")}`,
     'Content-type' : 'applicatin/json;'
    }
  })
  .then(response => response.json())
  .then(userData => {
  if(userData.message === "User retrieved successfully"){
    if(window.location.href === "https://ramon3162.github.io/profile.html"){
      console.log(userData.message);    
      document.getElementById("username").innerHTML += `<h2>${userData.User.username}</h2>`;
      document.getElementById("status").innerHTML += `<p>${userData.User.status}</p>`;
      document.getElementById("entry-number").innerHTML = `(${userData.User.entries})`;
    }else{
      document.getElementById("username").value = userData.User.username;
      document.getElementById("status").value = userData.User.status;
      document.getElementById("email").value = userData.User.email;
    }    
  }else{
    document.getElementById('message').innerHTML = userData.message;
  }
  })
}

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

const editSingleEntry = (entryId) => {
  sessionStorage.setItem("id", entryId);
  window.location.replace("./edit_entry.html");
}

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

const updateUser = () => {
  const userId = sessionStorage.getItem("userId");
  fetch( `https://thee-diary-app.herokuapp.com/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      status: document.getElementById('status').value
    }),
    headers: {
      'Authorization' : `Bearer ${sessionStorage.getItem("token")}`,
      'Content-type' : 'application/json;'
    }
  })
  .then(response => response.json())
  .then(userData => {
    if(userData.message === "User data updated successfully"){
      window.location.replace("./profile.html");
    }else{
      document.getElementById("message").innerHTML = userData.message;
    }
  })
}

const logout = () => {
  sessionStorage.clear();
  window.location.replace("./index.html");
}
    