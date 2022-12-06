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
        },
        error: (error) => {
          console.log(error);
        }
      });
      return responseData;
    }

    getLikeApi(username) {
      let responseData = null;
      $.ajax({
        async: false,
        type: "get",
        url: "/api/account/like/" + username,
        dataType: "json",
        success: (response) => {
          responseData = response.data;
          console.log(responseData);
        },
        error: (error) => {
          console.log(error)
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
        this.getRegisterBtnEvent();
        this.getLikeBtnEvent();
    }

    getMusicType() {
        let url = location.href;
        let username = url.substring(url.lastIndexOf("/") + 1);

        if(username != null) {
          this.#musicList = Api.getInstance().getUserInfoApi(username);
        }

        this.getMusicList();
    }

    getRegisterBtnEvent() {
      let url = location.href;
      let username = url.substring(url.lastIndexOf("/") + 1);
      const registerMusicBtn = document.querySelector(".register-music");
      registerMusicBtn.onclick = () => {
        this.#musicList = Api.getInstance().getUserInfoApi(username);
        this.getMusicList();
        console.log("registerApi Test");
      }
    }

    getLikeBtnEvent() {
      let url = location.href;
      let username = url.substring(url.lastIndexOf("/") + 1);
      const likeMusicBtn = document.querySelector(".like-music");
      likeMusicBtn.onclick = () => {
        this.#musicList = Api.getInstance().getLikeApi(username);
        this.getMusicList();
        console.log("likeApi Test");
      }
    }

    getMusicList() {
        const mainContent = document.querySelector(".main-content");
        console.log(this.#musicList);
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

class Aside {
  constructor() {
    this.getUsername();
  }
  getUsername() {
    let url = location.href;
    let username = url.substring(url.lastIndexOf("/") + 1);
    const asideEvent = document.querySelector(".main-aside");

    asideEvent.innerHTML = "";
    if(username != null) {
      asideEvent.innerHTML = `
      <ul class="test"> ${username}'s List
        <input type="radio" class="register-music" name="category" id="register-music" value="1" checked/>
        <li><label for="register-music" class="register"> - 등록 음악</label></li>
        <input type="radio" class="like-music" name="category" id="like-music" value="2"/>
        <li><label for="like-music" class="like"> - 좋아요</label></li>
      </ul>
      `;
    } 

  }
}



window.onload = () => {
    PrincipalDtl.getInstance();
    HeaderEvent.getInstance();
    new SearchEvent();
    new Aside();
    new MusicEvent();
    
}