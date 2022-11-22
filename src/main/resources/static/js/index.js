class Api {
    static #instance = null;
    static getInstance() {
      if(this.#instance == null) {
        this.#instance = new Api();
      }
      return this.#instance;
    }

    getMusicAllListApi() {
        let responseData = null;
        $.ajax({
            async: false,
            type: "get",
            url: "/api/music/all",
            dataType: "json",
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

    getMusicTypeListApi(type,value) {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/music/" + type + "/" + value,
            dataType: "json",
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
}

class MsuicAddEvent {
    #musicList;
    
    constructor() {
        this.getMusicType();
        this.getMusicList();
    }

    getMusicType() {
        let url = location.href;
        const value = url.substring(url.lastIndexOf("/") + 1);
        const type = url.slice(0,url.lastIndexOf("/")).substring(url.slice(0,url.lastIndexOf("/")).lastIndexOf("/")+1);

        if (value != "") {
            this.#musicList = Api.getInstance().getMusicTypeListApi(type,value);
        }else {
            this.#musicList = Api.getInstance().getMusicAllListApi();
        }
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
            alert("등록된 Music이 없습니다.")
            location.href = "/";
        }
    }
}


window.onload = () => {
    PrincipalDtl.getInstance();
    HeaderEvent.getInstance();
    new MsuicAddEvent();
}