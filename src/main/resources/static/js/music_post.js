class MusicPostApi {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new MusicPostApi();
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

  addCommentApi(commentData) {
    
    $.ajax({
      async: false,
      type: "post",
      url: "/api/music/addComment",
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
    let responseData = MusicPostApi.getInstance().getMusicApi();
    const content = document.querySelector(".content");
    console.log(responseData);

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
    this.addComment();
  }

  addComment() {
    const addCommentBtn = document.querySelector(".add-btn");
    let responseData = MusicPostApi.getInstance().getMusicApi();

    addCommentBtn.onclick = () => {
      let commentData = {
        "comment" : document.querySelector(".comment").value,
        "musicId" : responseData.id,
        "userName" : responseData.username,
      }
      console.log(commentData);
      MusicPostApi.getInstance().addCommentApi(commentData);
    }
  }
}




window.onload = () => {
    PrincipalDtl.getInstance();
    HeaderEvent.getInstance();
    new MusicDtl();
    new CommentEvent();
}