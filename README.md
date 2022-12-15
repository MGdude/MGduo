# <img src="https://user-images.githubusercontent.com/80939341/207855694-b9b071d7-e3df-4423-a07e-ff989fe3e04b.svg" width="30" height="30"/> MGduo <img src="https://user-images.githubusercontent.com/80939341/207855694-b9b071d7-e3df-4423-a07e-ff989fe3e04b.svg" width="30" height="30"/>

### 1. 프로젝트 소개
- 기간 : 2022.11.14 ~ 2022.12.07 
- 설명 : 사용자가 좋아하는 노래에 대해서 음악 등록을 하고, 자신이 등록한 음악은 물론, 다른 사용자가 등록한 음악에 대해서도 자유롭게 이야기할 수 있는 웹 페이지.  
- 배포 : http://43.200.204.242:8000
---

### 2. 개발 환경
- <img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/Java Script-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"><br>
- <img src="https://img.shields.io/badge/Spring boot-6DB33F?style=for-the-badge&logo=Spring boot&logoColor=white"> <img src="https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=Spring Security&logoColor=white"> <img src="https://img.shields.io/badge/Thymeleaf-005F0F?style=for-the-badge&logo=Thymeleaf&logoColor=white"> <br> 
- <img src="https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=MariaDB&logoColor=white">

---

### 3. 화면 및 기능 설명
- 메인 화면

![main](https://user-images.githubusercontent.com/80939341/207866106-841b319a-5ffc-456f-acf2-a4b0fbb9d3c6.PNG)
웹 사이트의 메인 화면에 해당됩니다.

![mainfilter](https://user-images.githubusercontent.com/80939341/207866121-3e5f650b-dee1-4c9a-bed4-1f0a8c1bac35.PNG)
화면의 사이드의 각 분류를 필터링하여 전체 음악 리스트 중 필터링된 음악 리스트만 출력합니다.

- 회원가입 및 로그인

![register](https://user-images.githubusercontent.com/80939341/207866115-17db931f-816c-4197-acb8-0c9427a0e4c0.PNG)
해당 사이트는 간단한 회원가입을 구현했습니다.

![login](https://user-images.githubusercontent.com/80939341/207866118-427bba74-9220-4ca6-9a6e-5395d71e483d.PNG)
회원가입하면 로그인 페이지로 오게 됩니다.

![main(login)](https://user-images.githubusercontent.com/80939341/207866120-8457447b-ddd6-4d09-beee-b3802aff0e20.PNG)
로그인을 하면 상단의 메뉴가 사용자님 환영합니다. 로그아웃, 음악 등록 순으로 변경됩니다. 

- 유저페이지
![userpage](https://user-images.githubusercontent.com/80939341/207866124-f95d40f5-f35e-4885-b6cf-43959f0b2c38.PNG)
상단에서 사용자님 환영합니다.를 클릭하면 해당 유저페이지가 나옵니다.  
여기서는 유저가 등록한 음악, 좋아요한 음악 리스트를 볼 수 있습니다.

- 음악 등록
![musicadd](https://user-images.githubusercontent.com/80939341/207866467-fbc0b0ca-a615-4388-a9c0-cceb8700c1ea.PNG)
상단에서 음악 등록을 클릭하면 해당 페이지가 나옵니다. 

- 음악 게시물
![post](https://user-images.githubusercontent.com/80939341/207866788-d204bb1b-7a80-4960-a0f3-60244ac183d2.PNG)
메인 페이지의 음악을 클릭하면 게시물 페이지가 나옵니다.  
좋아요 버튼을 클릭 시 좋아요, 한 번 더 클릭 시 좋아요 취소가 됩니다. 댓글과 대댓글 기능을 구현하였습니다.  
또한, 게시물 등록자와 사용자가 일치 또는 댓글 작성자와 사용자가 일치한다면 항목에 맞게 수정 및 삭제가 가능합니다.
