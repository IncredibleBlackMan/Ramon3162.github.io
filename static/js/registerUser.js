let signupUrl = 'https://thee-diary-app.herokuapp.com/auth/signup';

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