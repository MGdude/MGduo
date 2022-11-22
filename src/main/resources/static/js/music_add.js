class AddEventService {
    #titleInputObj;
    #singerInputObj;
    #infoInputObj;
    #linkInputObj;
    #categoryInputObj;
    #genderInputObj;
    #genreInputObj;
    #seasonInputObj;
    #addButton;
    #responseCategoryData;
    #responseGenderData;
    #responseGenreData;
    #responseSeasonData;

    constructor() {
        this.#titleInputObj = document.querySelectorAll(".inputs")[0];
        this.#singerInputObj = document.querySelectorAll(".inputs")[1];
        this.#infoInputObj = document.querySelectorAll(".inputs")[2];
        this.#linkInputObj = document.querySelectorAll(".inputs")[3];
        this.#categoryInputObj = document.querySelectorAll(".inputs")[4];
        this.#genderInputObj = document.querySelectorAll(".inputs")[5];
        this.#genreInputObj = document.querySelectorAll(".inputs")[6];
        this.#seasonInputObj = document.querySelectorAll(".inputs")[7];
        this.#addButton = document.querySelector(".add-button");

        this.#responseCategoryData = Api.getInstance().getCategoryApi();
        this.#responseGenderData = Api.getInstance().getGenderApi();
        this.#responseGenreData = Api.getInstance().getGenreApi();
        this.#responseSeasonData = Api.getInstance().getSeasonApi();

        this.init();
        this.addTitleEvent();
        this.addSingerEvent();
        this.addInfoEvent();
        this.addLinkEvent();
        this.addCategoryEvent();
        this.addGenderEvent();
        this.addGenreEvent();
        this.addSeasonEvent();
    }

    init() {
        this.#singerInputObj.disabled = true;
        this.#infoInputObj.disabled = true;
        this.#linkInputObj.disabled = true;
        this.#categoryInputObj.disabled = true;
        this.#genderInputObj.disabled = true;
        this.#genreInputObj.disabled = true;
        this.#seasonInputObj.disabled = true;
        this.#addButton.disabled = true;

        this.#categoryInputObj.innerHTML = `<option value="0">분류</option>`;
        this.#genderInputObj.innerHTML = `<option value="0">성별</option>`;
        this.#genreInputObj.innerHTML = `<option value="0">장르</option>`;
        this.#seasonInputObj.innerHTML = `<option value="0">계절</option>`;
    }

    addTitleEvent() {
        this.#titleInputObj.onkeyup = () => {
            if(this.#titleInputObj.value.length == 0) {
                this.#singerInputObj.disabled = true;
            }else {
                this.#singerInputObj.disabled = false;
            }
        }
    }

    addSingerEvent() {
        this.#singerInputObj.onkeyup = () => {
            if(this.#singerInputObj.value.length == 0) {
                this.#infoInputObj.disabled = true;
            }else {
                this.#infoInputObj.disabled = false;
            }
        }
    }

    addInfoEvent() {
        this.#infoInputObj.onkeyup = () => {
            if(this.#infoInputObj.value.length == 0) {
                this.#linkInputObj.disabled = true;
            }else {
                this.#linkInputObj.disabled = false;
            }
        }
    }

    addLinkEvent() {
        this.#linkInputObj.onkeyup = () => {
            if(this.#linkInputObj.value.length == 0) {
                this.#categoryInputObj.disabled = true;
            }else {
                this.#categoryInputObj.disabled = false;
                this.#categoryInputObj.innerHTML = `<option value="0">분류</option>`;
                this.#responseCategoryData.forEach(data => {
                    this.#categoryInputObj.innerHTML += `
                    <option value="${data.optionId}">${data.optionName}</option>
                    `;
                });
            }
        }
    }

    addCategoryEvent() {
        this.#categoryInputObj.onchange = () => {
            if(this.#categoryInputObj.value == "0") {
                this.#genderInputObj.disabled = true;
            }else if(this.#categoryInputObj.value == "1") {
                this.#genderInputObj.disabled = false;
                this.#genderInputObj.innerHTML = `<option value="0">성별</option>`;
                this.#responseGenderData.forEach(data => {
                    if (data.optionName == "coed"){
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

    addGenderEvent() {
        this.#genderInputObj.onchange = () => {
            if(this.#genderInputObj.value == "0") {
                this.#genreInputObj.disabled = true;
            }else {
                this.#genreInputObj.disabled = false;
                this.#genreInputObj.innerHTML = `<option value="0">장르</option>`;
                this.#responseGenreData.forEach(data => {
                    this.#genreInputObj.innerHTML += `
                    <option value="${data.optionId}">${data.optionName}</option>
                    `;
                });
            }
        }
    }
    
    addGenreEvent() {
        this.#genreInputObj.onchange = () => {
            if(this.#genreInputObj.value == "0") {
                this.#seasonInputObj.disabled = true;
            }else {
                this.#seasonInputObj.disabled = false;
                this.#seasonInputObj.innerHTML = `<option value="0">계절</option>`;
                this.#responseSeasonData.forEach(data => {
                    this.#seasonInputObj.innerHTML += `
                    <option value="${data.optionId}">${data.optionName}</option>
                    `;
                });
            }
        }
    }

    addSeasonEvent() {
        this.#seasonInputObj.onchange = () => {
            if(this.#seasonInputObj.value == "0") {
                this.#addButton.disabled = true;
            }else {
                this.#addButton.disabled = false;
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
                console.log(response.data);
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
                console.log(response.data);
                console.log(response.data[0].optionId);
                console.log(response.data[0].optionName);
                console.log(response.data[1].optionId);
                console.log(response.data[1].optionName);
                console.log(response.data[2].optionId);
                console.log(response.data[2].optionName);
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
                console.log(response.data);
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
}

class MusicAdd {
    static #instance = null;

    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MusicAdd();
        }
        return this.#instance;
    }

    addApi() {
        const addButton = document.querySelector(".add-button");

        addButton.onclick = () => {
            let youtubeUrl = document.querySelectorAll(".inputs")[3].value;
            console.log(youtubeUrl);
            youtubeUrl = youtubeUrl.substring(youtubeUrl.lastIndexOf('/') + 1);
            if (youtubeUrl.includes('=')) {
                youtubeUrl = youtubeUrl.substring(youtubeUrl.lastIndexOf('=') + 1);
            }

            const musicData = {
                "userName" : "user_name",
                "title" : document.querySelectorAll(".inputs")[0].value,
                "singer" : document.querySelectorAll(".inputs")[1].value,
                "info" : document.querySelectorAll(".inputs")[2].value,
                "url" : youtubeUrl,
                "categoryId" : document.querySelectorAll(".inputs")[4].value,
                "genderId" : document.querySelectorAll(".inputs")[5].value,
                "genreId" : document.querySelectorAll(".inputs")[6].value,
                "seasonId" : document.querySelectorAll(".inputs")[7].value
            }
            console.log(musicData);
            $.ajax({
                async: false,
                type: "post",
                url: "/api/music/add",
                contentType: "application/json",// 전송할 데이터가 json인 경우
                data: JSON.stringify(musicData), // 전송할 데이터가 있으면
                success: (response) => {
                    alert("Music 등록 완료");
                    location.replace("/");
                },
                error: (error) => {
                    console.log(error.responseJSON.data);
                    Object.values(error.responseJSON.data).forEach((errormessage,index) => {
                        if (index == 0){
                            alert("Music 등록 실패\n" + errormessage);
                        }
                    });
                }
            });
        }
    }
}
window.onload = () => {
    new AddEventService();
    MusicAdd.getInstance().addApi();
}