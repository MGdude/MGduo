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
        // this.getMusicType();
        this.getRegisterBtnEvent();
    }

    getMusicType() {
        let url = location.href;
        let username = url.substring(url.lastIndexOf("/") + 1);

        if(username != null) {
          this.#musicList = Api.getInstance().getUserInfoApi(username);
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
    
    getRegisterBtnEvent() {
      const registerMusicBtn = document.querySelector(".register-music");
      registerMusicBtn.onclick = () => {
        this.getMusicType();
      }
    }

    getLikeBtnEvent() {
      const likeMusicBtn = document.querySelector(".like-music");
      likeMusicBtn.onclick = () => {

      }
    }
}



window.onload = () => {
    PrincipalDtl.getInstance();
    HeaderEvent.getInstance();
    new SearchEvent();
    new MusicEvent();
    
}