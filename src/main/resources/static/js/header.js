class PrincipalDtl {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new PrincipalDtl();
    }
    return this.#instance;
  }

  #responseData;
  constructor() {
    this.#responseData = this.getPrincipalData();
  }

  getPrincipalData() {
    let responseData = null;

    $.ajax({
      async: false,
      type: "get",
      url: "/api/account/principal",
      data: "json",
      success: (response) => {
        responseData = response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
    return responseData;
  }

  changeBtn() {
    const loginBtn = document.querySelector(".login-btn");
    const logoutBtn = document.querySelector(".logout-btn");
    const registBtn = document.querySelector(".regist-btn");
    const addmusicBtn = document.querySelector(".addmusic-btn");
    if(this.#responseData == "") {
      loginBtn.classList.remove("invisible");
      logoutBtn.classList.add("invisible");
      registBtn.classList.remove("invisible");
      addmusicBtn.classList.add("invisible");
    }else {
      loginBtn.classList.add("invisible");
      logoutBtn.classList.remove("invisible");
      registBtn.classList.add("invisible");
      addmusicBtn.classList.remove("invisible");
    }
  }
}

