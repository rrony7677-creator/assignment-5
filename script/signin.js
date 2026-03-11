const singBtn = document.getElementById("btn-signIn");

singBtn.addEventListener('click', (event) => {

    event.preventDefault()

    const userNameField = document.getElementById("signIn-userName");
    const userPasswordField = document.getElementById("signIn-password");

    const userValue = userNameField.value.trim();
    const passwordValue = userPasswordField.value.trim();

    if(userValue !== "admin"){
        alert('Invalid userName! please try again')
        return
    }

    // check password
    if (passwordValue !== "admin123") {
      alert("Invaild password! please try again");
      return;
    }

    alert('Login Succesefull!')
    window.location.href = 'home.html';
});