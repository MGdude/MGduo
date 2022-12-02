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
  
  getCommentReplyApi(commentId){
    let responseData = null;

    const url = location.href;
    const musicId = url.substring(url.lastIndexOf("/") + 1);
    
    $.ajax({
      async: false,
      type: "get",
      url: "/api/comment/reply/" + musicId + "/" + commentId ,
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

  addReplyApi(replyData) {
    $.ajax({
      async: false,
      type: "post",
      url: "/api/reply/add",
      contentType: "application/json",
      data: JSON.stringify(replyData),
      success: (response) => {
        console.log(response);
        location.href = "/music/" + response.data;
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
  #comment;
  #userCheck;
  constructor() {
    this.#userCheck = UserCheckService.getInstance().check();
    this.#comment = Api.getInstance().getCommentApi();
    this.getCommentCount();
    this.getComment();
    this.addComment();
  }

  getCommentCount() {
    const commentCount = document.querySelector(".comments-content");
    commentCount.innerHTML = "";
    commentCount.innerHTML += `        
      <p>댓글 (${this.#comment.length}개)</p>
      <div class="comments-input">
        <input class="comment" type="text" placeholder="댓글을 입력해주세요 :)">
        <button class="btn add-btn" type="button">작성</button>
      </div>
      <div class="comments">
      </div>
    `;
  }

  getComment() {
    const comments = document.querySelector(".comments");
    comments.innerHTML = "";
    if (this.#comment.length > 0){
      this.#comment.forEach(comment => {
          comments.innerHTML += `
            <div class="comment-box">
              <div class="comment-data">
                <input class="comment-id" value="${comment.id}"/>
                <div class="comment-username">${comment.userName}</div>
                <div class="comment-date">(${comment.updateDate})</div>
              </div>
              <div class="comment-text">${comment.comment}</div>
              <div>
                <button class="reply-btn" type="button">답글</button>
                <input class="reply-input invisible" type="text" placeholder="답글을 입력해주세요 :)">
                <button class="reply-input-btn invisible" type="button">작성</button>
              </div>
            </div>
            <div class="reply-box invisible">
            </div>
          `;
      });
    }
  }

  addComment() {
    const addCommentBtn = document.querySelector(".add-btn");
    addCommentBtn.onclick = () => {
      let responseData = Api.getInstance().getMusicApi();
      const comment = document.querySelector(".comment").value;
      if (!this.#userCheck) {
//        localStorage.preUrl = location.pathname;
        location.href = "/login";
      }else if (comment == "") {
        alert("내용을 입력하세요.");
      }else {
        let commentData = {
          "comment" : comment,
          "musicId" : responseData.id,
          "userName" : PrincipalDtl.getInstance().getResponseData().username,
          "parentsId" : 0
        }
        console.log(commentData);
        Api.getInstance().addCommentApi(commentData);
      }
    }
  }
}

class ReplyEvent {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new ReplyEvent();
    }
    return this.#instance;
  }
  #userCheck;
  #comment;
  constructor() {
    this.#userCheck = UserCheckService.getInstance().check();
    this.#comment = Api.getInstance().getCommentApi();
    this.getReply();
    this.getReplyButton();
    this.addReply();
  }

  getReply() {
    this.#comment.forEach((comment, index) => {
      const replyData = Api.getInstance().getCommentReplyApi(comment.id);
      const replyBox = document.querySelectorAll(".reply-box")[index];
      console.log(comment);
      console.log(replyData);
      if (replyData.length > 0) {
        replyData.forEach(reply => {
          replyBox.innerHTML += `
            <div class="comment-box">
              <div class="comment-data">
              <div class="comment-username">${reply.userName}</div>
              <div class="comment-date">(${reply.updateDate})</div>
              </div>
              <div class="comment-text">${reply.comment}</div>
            </div>
        `;
        });
      }else {
        replyBox.classList.add("size-invisible");
      }
    })
  }

  getReplyButton() {
    this.#comment.forEach((data,index) => {
      console.log(data);
      console.log(index);
      
      const replyBtn = document.querySelectorAll(".reply-btn")[index];
      const replyInputClass = document.querySelectorAll(".reply-input")[index];
      const replyInputBtnClass = document.querySelectorAll(".reply-input-btn")[index];
      const replyBoxClass = document.querySelectorAll(".reply-box")[index];
      replyBtn.onclick = () => {
        replyInputClass.classList.toggle("invisible");
        replyInputBtnClass.classList.toggle("invisible");
        replyBoxClass.classList.toggle("invisible");
      }
    });
  }

  addReply() {
    const commentId = document.querySelectorAll(".comment-id");
    const replyBtn = document.querySelectorAll(".reply-input-btn");
    const replyInput = document.querySelectorAll(".reply-input");
    replyBtn.forEach((btn, index) => {
      btn.onclick = () => {
        let responseData = Api.getInstance().getMusicApi();
        if (!this.#userCheck) {
          location.href = "/login";
        }else if (replyInput[index].value == "") {
          alert("내용을 입력하세요.");
        }else {
          let commentData = {
            "comment" : replyInput[index].value,
            "musicId" : responseData.id,
            "userName" : PrincipalDtl.getInstance().getResponseData().username,
            "parentsId" : commentId[index].value
          }
          console.log(commentData);
          Api.getInstance().addCommentApi(commentData);
        }
      }
    });
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
  new ReplyEvent();
}