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