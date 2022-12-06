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

  getMusicLikeStateApi(musicId, username) {
    let responseData = null;

    $.ajax({
      async: false,
      type: "get",
      url: "/api/music/like/state",
      dataType: "json",
      data: {
        "musicId" : musicId,
        "username" : username
      },
      success: (response) => {
        responseData = response.data;
      },
      error: (error) => {
        console.log(error)
      }
    });
    return responseData;
  }

  getMusicLikeCountApi(musicId) {
    let responseData = null;

    $.ajax({
      async: false,
      type: "get",
      url: "/api/music/like/count/" + musicId,
      dataType: "json",
      success: (response) => {
        responseData = response.data;
      },
      error: (error) => {
        console.log(error)
      }
    });
    return responseData;
  }
  
  musicLikeApi(musicId, username) {
    let responseData = null;

    $.ajax({
      async: false,
      type: "post",
      url: "/api/music/like",
      dataType: "json",
      data: {
        "musicId" : musicId,
        "username" : username
      },
      success: (response) => {
        responseData = response.data;
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
        location.href = "/music/" + response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateCommentApi(updateCommentData) {
    $.ajax({
      async: false,
      type: "put",
      url: "/api/comment/update",
      contentType: "application/json",
      data: JSON.stringify(updateCommentData),
      success: (response) => {
        location.href = "/music/" + response.data;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteCommentApi(deleteCommentData) {
    $.ajax({
      async: false,
      type: "delete",
      url: "/api/comment/delete",
      contentType: "application/json",
      data: JSON.stringify(deleteCommentData),
      success: (response) => {
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
  #userRoleCheck;
  #principal;
  constructor() {
    this.#responseData = Api.getInstance().getMusicApi();
    this.#userCheck = UserCheckService.getInstance().musicUserCheck();
    this.#userRoleCheck = UserCheckService.getInstance().userRoleCheck();
    this.#principal = PrincipalDtl.getInstance().getResponseData();
    this.getMusicDtl();
  }

  getMusicDtl() {
    const content = document.querySelector(".content");
    if(this.#responseData != null) {
      content.innerHTML += `
         <div class="video-size">
          <iframe class="video" src="https://www.youtube.com/embed/${this.#responseData.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="music-info">
          <div class="like-box"><p class="like-number"></p></div>
          <p class="writer">작성자 : ${this.#responseData.username}</p>
          <p class="song-name">${this.#responseData.title}</p>
          <p class="singer">${this.#responseData.singer}</p>
          <p class="song-info">곡 설명 : ${this.#responseData.info}</p>
          <p class="youtube-link">유튜브 링크 : <a href="https://www.youtube.com/watch?v=${this.#responseData.url}">https://www.youtube.com/watch?v=${this.#responseData.url}</a></p>
          <div class="modify-btn">

          </div>
        </div>
      `;
      this.getMusicLikeEvent();
      this.getMusicButton();
    }
  }
  
  getMusicLikeEvent() {
    const likeBox = document.querySelector(".like-box");
    const likeNumber = document.querySelector(".like-number");
    if(this.#principal != "") {
      const likeState = Api.getInstance().getMusicLikeStateApi(this.#responseData.id,this.#principal.username);
      if(likeState == 0) {
        likeBox.classList.add("dislike-img");
      }else {
        likeBox.classList.add("like-img");
      }
    }else {
      likeBox.classList.add("dislike-img");
    }

    const likeCount = Api.getInstance().getMusicLikeCountApi(this.#responseData.id);
    likeNumber.innerHTML = `${likeCount}`;
    this.musicLikeButton();
  }

  musicLikeButton() {
    const likeBox = document.querySelector(".like-box");
    const likeNumber = document.querySelector(".like-number");
    likeBox.onclick = () => {
      if(!this.#userRoleCheck){
        if(confirm("로그인 시 이용가능한 서비스입니다. \n 로그인 페이지로 이동하시겠습니까?")){
          location.href = "/login";
        }
      }else {
        const likeState = Api.getInstance().musicLikeApi(this.#responseData.id,this.#principal.username);
        likeNumber.innerHTML = "";
        likeNumber.innerHTML = `${likeState}`;
        if(likeBox.classList.contains("dislike-img")) {
          likeBox.classList.remove("dislike-img");
          likeBox.classList.add("like-img");
        }else {
          likeBox.classList.add("dislike-img");
          likeBox.classList.remove("like-img");
        }
      }
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
  #userRoleCheck;
  constructor() {
    this.#userRoleCheck = UserCheckService.getInstance().userRoleCheck();
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
                <input class="comment-id" value="${comment.id}" readonly/>
                <div class="comment-info">
                  <div class="comment-username">${comment.userName}</div>
                  <div class="comment-date">(${comment.updateDate})</div>
                </div>
                <div class="comment-service service-invisible">
                  <button class="comment-update-evnet-btn" type="button">수정</button>
                  <button class="comment-delete-btn" type="button">삭제</button>
                </div>
              </div>
              <div class="comment-text">${comment.comment}</div>
              <div class="comment-update-text invisible">
                <input type="text" class="update-text" value="${comment.comment}">
                <div class="comment-update-btn" type="button">수정</div>
              </div>
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
      if (!this.#userRoleCheck) {
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
  #userRoleCheck;
  #comment;
  constructor() {
    this.#userRoleCheck = UserCheckService.getInstance().userRoleCheck();
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
                <input class="comment-id" value="${reply.id}" readonly/>
                <div class="comment-info">
                  <div class="comment-username">${reply.userName}</div>
                  <div class="comment-date">(${reply.updateDate})</div>
                </div>
                <div class="comment-service service-invisible">
                  <button class="comment-update-evnet-btn" type="button">수정</button>
                  <button class="comment-delete-btn" type="button">삭제</button>
                </div>
              </div>
              <div class="comment-text">${reply.comment}</div>
              <div class="comment-update-text invisible">
                <input type="text" class="update-text" value="${reply.comment}">
                <div class="comment-update-btn" type="button">수정</div>
              </div>
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
        if (!this.#userRoleCheck) {
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

class CommentService {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new CommentService();
    }
    return this.#instance;
  }
  #principal;
  #userName;
  #responseData;
  constructor() {
    this.#principal = PrincipalDtl.getInstance().getResponseData();
    this.#userName = PrincipalDtl.getInstance().getResponseData().username;
    this.#responseData = Api.getInstance().getMusicApi();
    this.btnVisibleEvent();
    this.updateBtnEvent();
    this.updateBtn();
    this.deletebtn();
  }

  btnVisibleEvent() {
    const commentBtnService = document.querySelectorAll(".comment-service");
    const commentuserName = document.querySelectorAll(".comment-username");
    commentBtnService.forEach((data,index) => {
      if(this.#userName == commentuserName[index].innerHTML) {
        commentBtnService[index].classList.remove("service-invisible");
      }
    });
  }

  updateBtnEvent() {
    const commentUpdateEvent = document.querySelectorAll(".comment-update-evnet-btn");
    const commentText = document.querySelectorAll(".comment-text");
    const commentUpdateText = document.querySelectorAll(".comment-update-text");
    commentUpdateEvent.forEach((button, index) => {
      button.onclick = () => {
        commentText[index].classList.toggle("invisible");
        commentUpdateText[index].classList.toggle("invisible");  
      }
    })
  }

  updateBtn() {
    const commentUpdateBtn = document.querySelectorAll(".comment-update-btn");
    const commentId = document.querySelectorAll(".comment-id");
    const updateText = document.querySelectorAll(".update-text");
    commentUpdateBtn.forEach((button, index) => {
      button.onclick = () => {
        const updateCommentData = {
          "id" : commentId[index].value,
          "musicId" : this.#responseData.id,
          "userName" : this.#principal.username,
          "comment" : updateText[index].value
        }
        console.log(updateCommentData);
        Api.getInstance().updateCommentApi(updateCommentData);
      }
    }) 
  }

  deletebtn() {
    const commentDeleteBtn = document.querySelectorAll(".comment-delete-btn");
    const commentId = document.querySelectorAll(".comment-id");
    const commentUsername = document.querySelectorAll(".comment-username");
    commentDeleteBtn.forEach((button, index) => {
      button.onclick = () => {
        if(confirm("댓글을 삭제하시겠습니까?")){
          if(this.#principal.user.username == commentUsername[index].innerHTML) {
            const deleteCommentData = {
              "id" : commentId[index].value,
              "musicId" : this.#responseData.id,
              "userName" : this.#principal.username
              }
            console.log(deleteCommentData);
            Api.getInstance().deleteCommentApi(deleteCommentData);
            }else {
            alert("권한이 없는 사용자입니다.");
          }
        }
      }
    }) 
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

  userRoleCheck() {
    if(this.#principal != ""){
        return true;
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
  new CommentService();
}