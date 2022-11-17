const registerBtn = document.querySelector(".regist");

registerBtn.onclick = () => {
    const accountInputs = document.querySelectorAll(".login-content input");
    
    let user = {
        userName: accountInputs[0].value,
        password: accountInputs[1].value
    }

    console.log(user);
}
