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
}


class MusicDtl {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new MusicDtl();
    }
    return this.#instance;
  }

  constructor() {
    this.getMusicDtl();
  }

  getMusicDtl() {
    let responseData = Api.getInstance().getMusicApi();
    const content = document.querySelector(".content");
    if(responseData != null) {
      content.innerHTML += `
         <div class="video-size">
          <iframe class="video" width="783" height="440" src="https://www.youtube.com/embed/${responseData.url}" title="[MV] IU(아이유)_LILAC(라일락)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="music-info">
          <p class="writer">작성자 : ${responseData.username}</p>
          <p class="song-name">${responseData.title}</p>
          <p class="singer">${responseData.singer}</p>
          <p class="song-info">곡 설명 : ${responseData.info}</p>
          <p class="youtube-link">유튜브 링크 : <a href="https://www.youtube.com/watch?v=${responseData.url}">https://www.youtube.com/watch?v=${responseData.url}</a></p>
          <!-- <div class="modify-btn">
            <button class="btn">수정</button>
            <button class="btn">삭제</button>
          </div> -->
        </div>
      `;
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

  constructor() {
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
        localStorage.preUrl = location.pathname;
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




window.onload = () => {
    PrincipalDtl.getInstance();
    HeaderEvent.getInstance();
    new MusicDtl();
    new CommentEvent();
}