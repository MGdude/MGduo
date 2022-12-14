class SelectService {
    #categoryInputObj;
    #genderInputObj;
    #genreInputObj;
    #seasonInputObj;

    #responseCategoryData;
    #responseGenderData;
    #responseGenreData;
    #responseSeasonData;

    constructor() {
        this.#categoryInputObj = document.querySelectorAll(".inputs")[4];
        this.#genderInputObj = document.querySelectorAll(".inputs")[5];
        this.#genreInputObj = document.querySelectorAll(".inputs")[6];
        this.#seasonInputObj = document.querySelectorAll(".inputs")[7];

        this.#responseCategoryData = Api.getInstance().getCategoryApi();
        this.#responseGenderData = Api.getInstance().getGenderApi();
        this.#responseGenreData = Api.getInstance().getGenreApi();
        this.#responseSeasonData = Api.getInstance().getSeasonApi();

        this.selectInputEvent();
        this.selectCategoryEvent();
    }

    selectInputEvent() {
        this.#categoryInputObj.innerHTML = `<option value="0">분류</option>`;
        this.#genderInputObj.innerHTML = `<option value="0">성별</option>`;
        this.#genreInputObj.innerHTML = `<option value="0">장르</option>`;
        this.#seasonInputObj.innerHTML = `<option value="0">계절</option>`;

        this.#responseCategoryData.forEach(data => {
            this.#categoryInputObj.innerHTML += `
            <option value="${data.optionId}">${data.optionName}</option>
            `;
        });
        this.#responseGenderData.forEach(data => {
            this.#genderInputObj.innerHTML += `
            <option value="${data.optionId}">${data.optionName}</option>
            `;
        });
        this.#responseGenreData.forEach(data => {
            this.#genreInputObj.innerHTML += `
            <option value="${data.optionId}">${data.optionName}</option>
            `;
        });
        this.#responseSeasonData.forEach(data => {
            this.#seasonInputObj.innerHTML += `
            <option value="${data.optionId}">${data.optionName}</option>
            `;
        });
    }

    selectCategoryEvent() {
        this.#categoryInputObj.onchange = () => {
            if(this.#categoryInputObj.value == "0") {
            }else if(this.#categoryInputObj.value == "1") {
                this.#genderInputObj.innerHTML = `<option value="0">성별</option>`;
                this.#responseGenderData.forEach(data => {
                    if (data.optionId == 3){
                        return false;
                    }
                    this.#genderInputObj.innerHTML += `
                    <option value="${data.optionId}">${data.optionName}</option>
                    `;
                });
            }else {
                this.#genderInputObj.disabled = false;
                this.#genderInputObj.innerHTML = `<option value="0">성별</option>`;
                this.#responseGenderData.forEach(data => {
                    this.#genderInputObj.innerHTML += `
                    <option value="${data.optionId}">${data.optionName}</option>
                    `;
                });
            }
        }
    }
}

class Api {
    static #instance = null;
    static getInstance() {
      if(this.#instance == null) {
        this.#instance = new Api();
      }
      return this.#instance;
    }

    getCategoryApi() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/music/option/category",
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData;
    }

    getGenderApi() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/music/option/gender",
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData;
    }

    getGenreApi() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/music/option/genre",
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData;
    }

    getSeasonApi() {
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/music/option/season",
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

    getMusicApi() {
        const url = location.href;
        const musicId = url.substring(url.lastIndexOf("/") + 1)
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "/api/music/" + musicId, 
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData;
    }

    updateMusicApi(musicUpdateData) {
        $.ajax({
            async: false,
            type: "put",
            url: "/api/music/update/" + musicUpdateData.musicId,
            contentType: "application/json",// 전송할 데이터가 json인 경우
            data: JSON.stringify(musicUpdateData), // 전송할 데이터가 있으면
            success: (response) => {
                alert("Music 수정 완료");
                location.replace("/music/" + musicUpdateData.musicId);
            },
            error: (error) => {
                console.log(error.responseJSON.data);
                Object.values(error.responseJSON.data).forEach((errormessage,index) => {
                    if (index == 0){
                        alert("Music 수정 실패\n" + errormessage);
                    }
                });
            }
        });
    }
}

class Music {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new Music();
        }
        return this.#instance;
    }

    #musicUserCheck;
    #adminCheck;
    constructor() {
        this.#musicUserCheck = UserCheckService.getInstance().musicUserCheck();
        this.#adminCheck = UserCheckService.getInstance().adminCheck();
        this.getMusicData();
        this.updateMusicEvent();
        this.cancelEvent();
    }

    getMusicData() {
        const musicData = Api.getInstance().getMusicApi();

        document.querySelectorAll(".inputs")[0].value = musicData.title;
        document.querySelectorAll(".inputs")[1].value = musicData.singer;
        document.querySelectorAll(".inputs")[2].value = musicData.info;
        document.querySelectorAll(".inputs")[3].value = musicData.url;
        document.querySelectorAll(".inputs")[4].value = musicData.categoryId;
        document.querySelectorAll(".inputs")[5].value = musicData.genderId;
        document.querySelectorAll(".inputs")[6].value = musicData.genreId;
        document.querySelectorAll(".inputs")[7].value = musicData.seasonId;
    }
    updateMusicEvent() {
        const updateButton = document.querySelector(".update-button");

        updateButton.onclick = () => {    
            if(this.#musicUserCheck || this.#adminCheck){
                let youtubeUrl = document.querySelectorAll(".inputs")[3].value;
                youtubeUrl = youtubeUrl.substring(youtubeUrl.lastIndexOf('/') + 1);
                if (youtubeUrl.includes('=')) {
                    youtubeUrl = youtubeUrl.substring(youtubeUrl.lastIndexOf('=') + 1);
                }
                const url = location.href;
                const musicId = url.substring(url.lastIndexOf("/") + 1)

                const musicUpdateData = {
                    "musicId" : musicId,
                    "title" : document.querySelectorAll(".inputs")[0].value,
                    "singer" : document.querySelectorAll(".inputs")[1].value,
                    "info" : document.querySelectorAll(".inputs")[2].value,
                    "url" : youtubeUrl,
                    "categoryId" : document.querySelectorAll(".inputs")[4].value,
                    "genderId" : document.querySelectorAll(".inputs")[5].value,
                    "genreId" : document.querySelectorAll(".inputs")[6].value,
                    "seasonId" : document.querySelectorAll(".inputs")[7].value
                }
                Api.getInstance().updateMusicApi(musicUpdateData);
            }else {
                alert("권한이 없는 사용자입니다.");
                location.replace("/");
            }
        }
    }

    cancelEvent() {
        const cancelButton = document.querySelector(".cancel-button");

        const url = location.href;
        const musicId = url.substring(url.lastIndexOf("/") + 1)
        cancelButton.onclick = () => {
            if(confirm("수정을 취소합니다.")){
                location.replace("/music/" + musicId);
            }
        }
    }
}

class UserCheckService {
    static #instance = null;
    static getInstance() {
      if(this.#instance == null) {
        this.#instance = new UserCheckService();
      }
      return this.#instance;
    }
    #responseData;
    #principal;
  
    constructor() {
        this.#responseData = Api.getInstance().getMusicApi();
        this.#principal = PrincipalDtl.getInstance().getResponseData();
    } 
  
    musicUserCheck() {
      if(this.#principal != ""){
        if(this.#principal.username == this.#responseData.username){
        return true;
        }
      }
      return false;
    }

    adminCheck() {
        if(this.#principal){
          if(this.#principal.user.role_id == 2){
            return true;
          }
        }
        return false;
    }
  }
window.onload = () => {
    PrincipalDtl.getInstance();
    HeaderEvent.getInstance();
    new SearchEvent();
    new SelectService();
    new Music();
}