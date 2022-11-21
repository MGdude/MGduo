class Api {
    static #instance = null;
    static getInstance() {
      if(this.#instance == null) {
        this.#instance = new Api();
      }
      return this.#instance;
    }

    getMusicListApi() {
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
}

class MsuicList {
    static #instance = null;
    static getInstance() {
      if(this.#instance == null) {
        this.#instance = new MsuicList();
      }
      return this.#instance;
    }

    getMusicList() {
        const musicList = Api.getInstance().getMusicListApi();
        const mainContent = document.querySelector(".main-content");
        mainContent.innerHTML = "";

        musicList.forEach(music => {
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
}


window.onload = () => {
    MsuicList.getInstance().getMusicList();
}