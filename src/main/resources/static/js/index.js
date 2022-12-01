class Api {
    static #instance = null;
    static getInstance() {
      if(this.#instance == null) {
        this.#instance = new Api();
      }
      return this.#instance;
    }

    getMusicAllListApi(filter) {
        let responseData = null;
        $.ajax({
            async: false,
            type: "get",
            url: "/api/music/all",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify(filter),
            success: response => {
                responseData = response.data;
                console.log(response.data);
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData;
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

    getFilterApi() {

    }
}

class MusicEvent {
    #musicList;
    
    constructor() {
        this.getMusicType();
        this.getMusicList();
        this.addMusicBtn();
    }

    getMusicType() {
        const searchUrl = decodeURI(location.search);
        const param = new URLSearchParams(searchUrl);
        const search = param.get("search");
        const filter = encodeURI(AsideEvent.getInstance().getUrlParam());

        if(search != null) {
          this.#musicList = Api.getInstance().getSearchApi(search);
        }else {
           this.#musicList = Api.getInstance().getMusicAllListApi(filter);
        }
        console.log(this.#musicList);
    }

    getMusicList() {
        const mainContent = document.querySelector(".main-content");
        mainContent.innerHTML = "";
        if (this.#musicList.length > 0) {
            this.#musicList.forEach(music => {
                mainContent.innerHTML += `
                <div class="main-infolist">
                    <div class="main-info">
                        <div class="main-img">
                            <img src="https://i.ytimg.com/vi/${music.url}/hqdefault.jpg" alt="">
                        </div>
                        <div class="title">곡명: ${music.title}</div>
                        <div class="singer">가수명: ${music.singer}</div>
                        <div class="tag">#${music.categoryName}(${music.genderName}) #${music.genreName} #${music.seasonName}</div>
                    </div>
                </div>
                `;
            });
        }else {
            alert("음악이 없습니다.")
            location.href = "/";
        }
    }

    addMusicBtn() {
        this.#musicList.forEach((music,index) => {
            const mainInfo = document.querySelectorAll(".main-info")[index];
            mainInfo.onclick = () => {
                location.href = "/music/" + music.musicId;
            }
        });
    }
}

class AsideEvent {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new AsideEvent();
    }
    return this.#instance;
  }

  #urlParams;

  constructor() {
    this.init();
    this.getCategoryEvent();
    this.getGenderEvent();
    this.getGenreEvent();
    this.getSeasonEvent();
  }
  
  init() {
    this.#urlParams = {
      "category" : 0,
      "gender" : 0,
      "genre" : 0,
      "season" : 0
    }
  }

  getCategoryEvent() {

    document.querySelectorAll(".category-radio").forEach(category => {
      category.onclick = () => {
        if(this.#urlParams.category == category.value) {
          category.checked = false;
          this.#urlParams.category = 0;
        }else {
          this.#urlParams.category = category.value;
        }
        // let formData = new FormData(document.querySelector("form"));
        // formData.forEach((v, k) => {
        //   if(k == "category"){
        //     this.#urlParams.category = v;
        //   }
        //   console.log("k = " + k);
        //   console.log("v = " + v);
        // });
        console.log(this.#urlParams);
      }
    });
  }

  getGenderEvent() {

    document.querySelectorAll(".gender-radio").forEach(gender => {
      gender.onclick = () => {
        if(this.#urlParams.gender == gender.value) {
          gender.checked = false;
          this.#urlParams.gender = 0;
        }else {
          this.#urlParams.gender = gender.value;
        }
        // let formData = new FormData(document.querySelector("form"));
        // formData.forEach((v, k) => {
        //   if(k == "gender") {
        //     this.#urlParams.gender = v;
        //   }
        // });
        console.log(this.#urlParams);
      }
    });
  }

  getGenreEvent() {

    document.querySelectorAll(".genre-radio").forEach(genre => {
      genre.onclick = () => {
        if(this.#urlParams.genre == genre.value) {
          genre.checked = false;
          this.#urlParams.genre = 0;
        }else {
          this.#urlParams.genre = genre.value;
        }
        // let formData = new FormData(document.querySelector("form"));
        // formData.forEach((v, k) => {
        //   if(k == "genre") {
        //     this.#urlParams.genre = v;
        //   }
        // });
        console.log(this.#urlParams);
      }
    });
  }

  getSeasonEvent() {

    document.querySelectorAll(".season-radio").forEach(season => {
      season.onclick = () => {
        if(this.#urlParams.season == season.value) {
          season.checked = false;
          this.#urlParams.season = 0;
        }else {
          this.#urlParams.season = season.value;
        }
        // let formData = new FormData(document.querySelector("form"));
        // formData.forEach((v, k) => {
        //   if(k == "season") {
        //     this.#urlParams.season = v;
        //   }
        // });
        console.log(this.#urlParams);
      }
    });
  }
  
  getUrlParam() {
    return this.#urlParams;
  }
}

window.onload = () => {
//    let preUrl = localStorage.preUrl;
//    localStorage.removeItem("preUrl");
//    if(preUrl != null) {
//        location.replace(preUrl);
//    }
    PrincipalDtl.getInstance();
    HeaderEvent.getInstance();
    new SearchEvent();
    new AsideEvent();
    new MusicEvent();
    
}