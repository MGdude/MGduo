class Api {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new Api();
    }
    return this.#instance;
  }

  getMusicApi() {
    let responseData = null;

    const url = location.href;
    const musicId = url.substring(url.lastIndexOf("/") + 1);

    $.ajax({
      async: false,
      type: "get",
      url: "/api/music/" + musicId,
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

  getCommentApi(){
    let responseData = null;

    const url = location.href;
    const musicId = url.substring(url.lastIndexOf("/") + 1);
    
    $.ajax({
      async: false,
      type: "get",
      url: "/api/comment/" + musicId,
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

  addCommentApi(commentData) {
    $.ajax({
      async: false,
      type: "post",
      url: "/api/comment/add",
      contentType: "application/json",
      data: JSON.stringify(commentData),
      success: (response) => {
        console.log(response);
        location.href = "/music/" + response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  musicDeleteApi(musicId) {
    $.ajax({
      async: false,
      type: "delete",
      url: "/api/music/delete/" + musicId,
      dataType: "json",
      success: (response) => {
        console.log("Music 삭제 완료.");
        location.href = "/";
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}


class MusicDtl {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new MusicDtl();
    }
    return this.#instance;
  }
  #responseData;
  #userCheck;
  constructor() {
    this.#responseData = Api.getInstance().getMusicApi();
    this.#userCheck = UserCheckService.getInstance().check();
    this.getMusicDtl();
    this.getMusicButton();
  }

  getMusicDtl() {
    const content = document.querySelector(".content");
    if(this.#responseData != null) {
      content.innerHTML += `
         <div class="video-size">
          <iframe class="video" src="https://www.youtube.com/embed/${this.#responseData.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="music-info">
          <p class="writer">작성자 : ${this.#responseData.username}</p>
          <p class="song-name">${this.#responseData.title}</p>
          <p class="singer">${this.#responseData.singer}</p>
          <p class="song-info">곡 설명 : ${this.#responseData.info}</p>
          <p class="youtube-link">유튜브 링크 : <a href="https://www.youtube.com/watch?v=${this.#responseData.url}">https://www.youtube.com/watch?v=${this.#responseData.url}</a></p>
          <div class="modify-btn">

          </div>
        </div>
      `;
    }
    
  }

  getMusicButton() {
    if(this.#userCheck){
      const button = document.querySelector(".modify-btn");
      button.innerHTML += `
        <button class="btn post-update-btn">수정</button>
        <button class="btn post-delete-btn">삭제</button>
      `;
      this.getMusicButtonEvent();
    }
  }

  getMusicButtonEvent() {
    const updateBtn = document.querySelector(".post-update-btn");
    const deleteBtn = document.querySelector(".post-delete-btn");
    
    updateBtn.onclick = () => {
      if(confirm("게시물을 수정하시겠습니까?")) {
        if(this.#userCheck){
          location.href = "/music_update/" + this.#responseData.id;
        }else {
          alert("권한이 없는 사용자입니다.");
        }
      }
    }

    deleteBtn.onclick = () => {
      if(confirm("게시물을 삭제하시겠습니까?")) {
        if(this.#userCheck){
          Api.getInstance().musicDeleteApi(this.#responseData.id);
        }else {
          alert("권한이 없는 사용자입니다.");
        }
      }
    }
  }
}

class CommentEvent {
  static #instance = null;
  static getInstance() {
    if(this.#instance = null) {
      this.#instance = new CommentEvent();
    }
    return this.#instance;
  }

  constructor() {Z
    this.getComment();
    this.addComment();
  }

  getComment() {
    let responseData = Api.getInstance().getCommentApi();
    const comments = document.querySelector(".comments");
    comments.innerHTML = "";

    responseData.forEach(comment => {
      comments.innerHTML += `
        <div class="comment-box">
          <div class="comment-username">${comment.userName}</div>
          <div class="comment-text">${comment.comment}</div>
          <div class="comment-date">${comment.updateDate}</div>
        </div>
      `;
    });
    
  }

  addComment() {
    const addCommentBtn = document.querySelector(".add-btn");
    let responseData = Api.getInstance().getMusicApi();
    let principalDtlData = PrincipalDtl.getInstance().getResponseData();
    addCommentBtn.onclick = () => {
      const comment = document.querySelector(".comment").value;
      if (principalDtlData == "") {
        alert("로그인 후 이용 가능합니다.");
//        localStorage.preUrl = location.pathname;
        location.href = "/login";
      } else if (comment == "") {
        alert("내용을 입력하세요.");
      } else {
        let commentData = {
          "comment" : comment,
          "musicId" : responseData.id,
          "userName" : principalDtlData.user.username
        }
        console.log(commentData);
        Api.getInstance().addCommentApi(commentData);
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

  check() {
    if(this.#principal != ""){
      if(this.#principal.username == this.#responseData.username){
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
    new MusicDtl();
    new CommentEvent();
}