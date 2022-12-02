class Api {
    static #instance = null;
    static getInstance() {
      if(this.#instance == null) {
        this.#instance = new Api();
      }
      return this.#instance;
    }

    getUserInfoApi(username) {
      let responseData = null;
      $.ajax({
        async: false,
        type: "get",
        url: "/api/account/userInfo/" + username,
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

    getMusicAllListApi(filter) {
        let responseData = null;
        $.ajax({
            async: false,
            type: "get",
            url: "/api/music/all",
            dataType: "json",
            data: filter,
            success: response => {
                responseData = response.data;
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
        },
        error: (error) => {
          console.log(error);
        }
      });
      return responseData;
    }
}

class MusicEvent {
    #musicList;
    
    constructor() {
        this.getMusicType();
    }

    getMusicType() {
        let url = location.href;
        let username = url.substring(url.lastIndexOf("/") + 1);
        console.log(username);

        if(username != null) {
          this.#musicList = Api.getInstance().getUserInfoApi(username);
        }
        console.log(this.#musicList);
        this.getMusicList();
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
        }
        this.addMusicBtn();
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
      "categoryId" : 0,
      "genderId" : 0,
      "genreId" : 0,
      "seasonId" : 0
    }
  }

  getCategoryEvent() {

    document.querySelectorAll(".category-radio").forEach(category => {
      category.onclick = () => {
        if(this.#urlParams.categoryId == category.value) {
          category.checked = false;
          this.#urlParams.categoryId = 0;
        }else {
          this.#urlParams.categoryId = category.value;
        }
        new MusicEvent;
      }
    });
  }

  getGenderEvent() {

    document.querySelectorAll(".gender-radio").forEach(gender => {
      gender.onclick = () => {
        if(this.#urlParams.genderId == gender.value) {
          gender.checked = false;
          this.#urlParams.genderId = 0;
        }else {
          this.#urlParams.genderId = gender.value;
        }
        new MusicEvent;
      }
    });
  }

  getGenreEvent() {

    document.querySelectorAll(".genre-radio").forEach(genre => {
      genre.onclick = () => {
        if(this.#urlParams.genreId == genre.value) {
          genre.checked = false;
          this.#urlParams.genreId = 0;
        }else {
          this.#urlParams.genreId = genre.value;
        }
        new MusicEvent;
      }
    });
  }

  getSeasonEvent() {

    document.querySelectorAll(".season-radio").forEach(season => {
      season.onclick = () => {
        if(this.#urlParams.seasonId == season.value) {
          season.checked = false;
          this.#urlParams.seasonId = 0;
        }else {
          this.#urlParams.seasonId = season.value;
        }
        new MusicEvent;
      }
    });
  }
  
  getUrlParam() {
    return this.#urlParams;
  }



}

window.onload = () => {
    PrincipalDtl.getInstance();
    HeaderEvent.getInstance();
    new SearchEvent();
    new AsideEvent();
    new MusicEvent();
    
}