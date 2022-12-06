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
        const searchUrl = decodeURI(location.search);
        const param = new URLSearchParams(searchUrl);
        const search = param.get("search");  
        const filter = AsideEvent.getInstance().getUrlParam(); 
        
        if(search != null) {
          this.#musicList = Api.getInstance().getSearchApi(search);
        }else {
           this.#musicList = Api.getInstance().getMusicAllListApi(filter);
        }
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

  categoryValue = 0;
  genderValue = 0;
  genreValue = 0;
  seasonValue = 0;
  #urlParams;
  #categoryRadio;
  #genderRadio;
  #genreRadio;
  #seasonRadio;

  constructor() {
    this.init();
    this.getCategoryEvent();
    this.getGenderEvent();
    this.getGenreEvent();
    this.getSeasonEvent();
  }
  
  init() {
    this.#categoryRadio = document.querySelectorAll(".category-radio");
    this.#categoryRadio.forEach(category => {
      if(category.checked){
        this.categoryValue = category.value;
      }
    })
    this.#genderRadio = document.querySelectorAll(".gender-radio");
    this.#genderRadio.forEach(gender => {
      if(gender.checked){
        this.genderValue = gender.value;
      }
    })
    this.#genreRadio = document.querySelectorAll(".genre-radio");
    this.#genreRadio.forEach(genre => {
      if(genre.checked){
        this.genreValue = genre.value;
      }
    })
    this.#seasonRadio = document.querySelectorAll(".season-radio");
    this.#seasonRadio.forEach(season => {
      if(season.checked){
        this.seasonValue = season.value;
      }
    })

    this.#urlParams = {
      "categoryId" : this.categoryValue,
      "genderId" : this.genderValue,
      "genreId" : this.genreValue,
      "seasonId" : this.seasonValue
    }
  }

  getCategoryEvent() {
    this.#categoryRadio.forEach(category => {
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
    this.#genderRadio.forEach(gender => {
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
    this.#genreRadio.forEach(genre => {
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
    this.#seasonRadio.forEach(season => {
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