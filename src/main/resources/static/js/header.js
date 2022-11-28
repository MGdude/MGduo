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
  }

  changeBtn() {
    const responseData = PrincipalDtl.getInstance().getResponseData();
    const loginBtn = document.querySelector(".login-btn");
    const logoutBtn = document.querySelector(".logout-btn");
    const registBtn = document.querySelector(".regist-btn");
    const addmusicBtn = document.querySelector(".addmusic-btn");
    if(responseData == "") {
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

class SearchApi {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new SearchApi();
    }
    return this.#instance;
  }

  getSearchApi(search) {
    let responseData = null;
    $.ajax({
      async: false,
      type: "get",
      url: "/api/" + search,
      dataType: "json",
      success: (response) => {
        responseData = response.data;
        console.log(responseData);
      },
      error: (error) => {
        console.log(error);
      }
    });
    return responseData;
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

  #searchList;

  constructor() { 
    this.getSearchList();
  }

  getSearchList() {
    const searchBtn = document.querySelector(".search-img");
    
    searchBtn.onclick = () => {
      const search = document.querySelector(".search").value;
      console.log(search);
      this.#searchList = SearchApi.getInstance().getSearchApi(search);
      console.log(this.#searchList);
      this.getSearchListEvent();
      this.getMusicBtnEvent();
    }
  }

  getSearchListEvent() {
    const mainContent = document.querySelector(".main-content");
    mainContent.innerHTML = "";

    if(this.#searchList != null) {
      if(this.#searchList.length > 0) {
        this.#searchList.forEach(search => {
          mainContent.innerHTML += `
            <div class="main-infolist">
                <div class="main-info">
                    <div class="main-img">
                        <img src="https://i.ytimg.com/vi/${search.url}/hqdefault.jpg" alt="">
                    </div>
                    <div class="title">곡명: ${search.title}</div>
                    <div class="singer">가수명: ${search.singer}</div>
                    <div class="tag">#${search.categoryName}(${search.genderName}) #${search.genreName} #${search.seasonName}</div>
                </div>
            </div>
          `;
        });
      }
    }
    
  }
  
  getMusicBtnEvent() {
    if(this.#searchList != null)
    this.#searchList.forEach((music, index) => {
      const mainInfo = document.querySelectorAll(".main-info")[index];
      mainInfo.onclick = () => {
        location.href = "/music/" + music.id;
      }
    });
  }
}