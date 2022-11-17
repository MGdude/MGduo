class AddEventService {
    #titleInputObj;
    #singerInputObj;
    #infoInputObj;
    #linkInputObj;
    #categoryInputObj;
    #genderInputObj;
    #genreInputObj;
    #seasonInputObj;WE
    #addButton;

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

        this.init();
        this.addTitleEvent();
        this.addSingerEvent();
        this.addInfoEvent();
        this.addLinkEvent();
        this.addCategoryEvent();
        this.addGenderEvent();
        this.addGenreEvent();
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
    }

    addTitleEvent() {
        this.#titleInputObj.onkeyup = () => {
            if(this.#titleInputObj.value.length != 0) {
                this.#singerInputObj.disabled = false;
            }else {
                this.#singerInputObj.disabled = true;
            }
        }
    }

    addSingerEvent() {
        this.#singerInputObj.onkeyup = () => {
            if(this.#singerInputObj.value.length != 0) {
                this.#infoInputObj.disabled = false;
            }else {
                this.#infoInputObj.disabled = true;
            }
        }
    }

    addInfoEvent() {
        this.#infoInputObj.onkeyup = () => {
            if(this.#infoInputObj.value.length != 0) {
                this.#linkInputObj.disabled = false;
            }else {
                this.#linkInputObj.disabled = true;
            }
        }
    }

    addLinkEvent() {
        this.#linkInputObj.onkeyup = () => {
            if(this.#linkInputObj.value.length != 0) {
                this.#categoryInputObj.disabled = false;
            }else {
                this.#categoryInputObj.disabled = true;
            }
        }
    }

    addCategoryEvent() {
        this.#categoryInputObj.onchange = () => {
            if(this.#categoryInputObj.value.length != "none") {
                this.#genderInputObj.disabled = false;
            }else {
                this.#genderInputObj.disabled = true;
            }
        }
    }

    addGenderEvent() {
        this.#genderInputObj.onchange = () => {
            if(this.#genderInputObj.value.length != "none") {
                this.#genreInputObj.disabled = false;
            }else {
                this.#genreInputObj.disabled = true;
            }
        }
    }
    
    addGenreEvent() {
        this.#genreInputObj.onchange = () => {
            if(this.#genreInputObj.value.length != "none") {
                this.#seasonInputObj.disabled = false;
            }else {
                this.#seasonInputObj.disabled = true;
            }
        }
    }

    addSeasonEvent() {
        this.#seasonInputObj.onchange = () => {
            if(this.#seasonInputObj.value.length != "none") {
                this.#addButton.disabled = false;
            }else {
                this.#addButton.disabled = true;
            }
        }
    }
}

