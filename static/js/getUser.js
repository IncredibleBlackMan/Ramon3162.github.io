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