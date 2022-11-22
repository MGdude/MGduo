class ErrorName {
  static #instance = null;
  static getInstance() {
    if(this.#instance == null) {
      this.#instance = new ErrorName();
    }
    return this.#instance;
  }

  getErrors() {
    const url = location.href;
    const errors = url.substring(url.lastIndexOf("=") + 1);

    if(errors == "auth") {
      alert("아이디 또는 비밀번호 오류");
    }else if(errors == "passwordExpired") {
      alert("비밀번호가 5회 이상 틀립니다.");
    }else if(errors == "error") {
      alert("오류");
    }
  }

  alreadyLogin() {
    let test = PrincipalDtl.getInstance().getPrincipalData();
    console.log(test);

    if(test != "") {
      location.replace("/");
    }
  }
}





window.onload = () => {
  ErrorName.getInstance().getErrors();
  ErrorName.getInstance().alreadyLogin();
  PrincipalDtl.getInstance().changeBtn();
}