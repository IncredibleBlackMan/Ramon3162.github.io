let loginUrl = 'https://thee-diary-app.herokuapp.com/auth/login';

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