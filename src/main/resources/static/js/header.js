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

  getResponseData() {
    return this.#responseData;
  }

}

class HeaderEvent {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new HeaderEvent();
    }
    return this.#instance;
  }

  constructor() {
    this.btnEvent();
    this.changeBtn();
  }

  btnEvent() {
    const logoImgBtn = document.querySelector(".logo-img");
    const loginBtn = document.querySelector(".login-btn");
    const logoutBtn = document.querySelector(".logout-btn");
    const registBtn = document.querySelector(".regist-btn");
    const addMusicBtn = document.querySelector(".addmusic-btn");
    const userInfo = document.querySelector(".user-info");
    const userName = PrincipalDtl.getInstance().getPrincipalData().username;

    logoImgBtn.onclick = () => {
      location.href = "/";
    }

    loginBtn.onclick = () => {
      location.href = "/login";
    }

    logoutBtn.onclick = () => {
      location.href = "/logout";
    }

    registBtn.onclick = () => {
      location.href = "/register";
    }

    addMusicBtn.onclick = () => {
      location.href = "/music_add";
    }

    userInfo.onclick = () => {
      location.href = "/userInfo/" + userName;
    }

  }

  changeBtn() {
    const responseData = PrincipalDtl.getInstance().getResponseData();
    const loginBtn = document.querySelector(".login-btn");
    const logoutBtn = document.querySelector(".logout-btn");
    const registBtn = document.querySelector(".regist-btn");
    const addmusicBtn = document.querySelector(".addmusic-btn");
    const userInfo = document.querySelector(".user-info");
    const userName = PrincipalDtl.getInstance().getPrincipalData().username;
    userInfo.innerHTML = "";

    if(responseData == "") {
      loginBtn.classList.remove("invisible");
      logoutBtn.classList.add("invisible");
      registBtn.classList.remove("invisible");
      addmusicBtn.classList.add("invisible");
      userInfo.classList.add("invisible");
    }else {
      loginBtn.classList.add("invisible");
      logoutBtn.classList.remove("invisible");
      registBtn.classList.add("invisible");
      addmusicBtn.classList.remove("invisible");
      userInfo.classList.remove("invisible");
      userInfo.innerHTML += `
        ${userName}님 환영합니다.
      `;
    }
  }
}

class SearchEvent {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new SearchEvent();
    }
    return this.#instance;
  }

  constructor() { 
    this.getSearchList();
  }

  getSearchList() {
    const searchBtn = document.querySelector(".search-img");
    
    searchBtn.onclick = () => {
      const search = document.querySelector(".search").value;
      if (search != ""){
        location.href = "/?search=" + search;
      }
    }
  }

}