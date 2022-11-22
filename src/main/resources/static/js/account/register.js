class Option {
    #userName;
    #password;
    #passwordChk;
    #registerBtn;
    #cancleBtn;

    constructor() {
        this.#userName = document.querySelectorAll(".login-content input")[0];
        this.#password = document.querySelectorAll(".login-content input")[1];
        this.#passwordChk = document.querySelectorAll(".login-content input")[2];
        this.#registerBtn = document.querySelector(".regist");
        this.#cancleBtn = document.querySelector(".cancle");
        this.init();
        this.passwordEvent();
        this.registerBtnEvent();
        this.cancleEvent();
    }

    init() {
        this.#password.disabled = true;
        this.#passwordChk.disabled = true;
        this.#registerBtn.disabled = true;
    }

    passwordEvent() {
        this.#userName.onkeyup = () => {
            if(this.#userName.value.length != 0) {
                this.#password.disabled = false;
                this.#passwordChk.disabled = false;
            }else {
                this.#password.disabled = true;
                this.#passwordChk.disabled = true;
            }
        }
    }

    registerBtnEvent() {
        this.#passwordChk.onkeyup = () => {
            if(this.#passwordChk.value.length != 0) {
                this.#registerBtn.disabled = false;
            }else {
                this.#registerBtn.disabled = true;
            }
        }
    }

    cancleEvent() {
        this.#cancleBtn.onclick = () => {
            location.href = "/index";
        }
    }



}

class UserData {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserData();
        }
        return this.#instance;
    }

    getUserApi() {
        const registBtn = document.querySelector(".regist");

        registBtn.onclick = () => {
            let user = {
                "username" : document.querySelectorAll(".login-content input")[0].value,
                "password" : document.querySelectorAll(".login-content input")[1].value,
                "passwordChk" : document.querySelectorAll(".login-content input")[2].value
            }

            $.ajax({
                async: false,
                type: "post",
                url: "/api/account/register",
                contentType: "application/json",
                data: JSON.stringify(user),
                dataType: "json",
                success: (response, textStatus, request) => {
                    console.log(response);
                    const successURI = request.getResponseHeader("Location");
                    location.replace(successURI + "?username=" + response.data);
                },
                error: (error) => {
                    if(error.responseJSON.data.username != undefined && error.responseJSON.data.password != undefined) {
                        alert(error.responseJSON.data.username + "\n" + error.responseJSON.data.password);
                    }else if(error.responseJSON.data.username != undefined){
                        alert(error.responseJSON.data.username);
                    }else if(error.responseJSON.data.password != undefined){
                        alert(error.responseJSON.data.password)
                    }else {
                        alert(error.responseJSON.data.passwordChk)
                    }
                    console.log(error.responseJSON.data);
                }
    
            });
        }

    }

}

class BtnEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new BtnEvent();
        }
        return this.#instance;
    }

    btnEvent() {
        const cancelBtn = document.querySelector(".cancel-button");
           
        cancelBtn.onclick = () => {
            location.href = "/";
        }
      }
}

window.onload = () => {
    PrincipalDtl.getInstance();
    HeaderEvent.getInstance();
    BtnEvent.getInstance().btnEvent();
    new Option();
    UserData.getInstance().getUserApi();
}
