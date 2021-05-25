# README

**서비스명** : **RUS**(러스) - a**R**e yo**U** **S**leep?

**비서명** : **Johnny**(쟈니)



모델 다운로드 url

https://drive.google.com/drive/u/0/folders/1LgkEJiu0MPgQ9oCXMuU5hbs9EWe2Oj2G



## 팀소개

- **팀명** : 제잘제잘(제발 잘하자 제대로 잘하자)
- **참여자**
  - 팀장 : 이동훈
  - 팀원 : 구진범, 노천명, 박승범, 조우리
- **역할 분담**
  - **Frontend** : 노천명, 조우리
  - **Backend & AI model** : 구진범, 박승범, 이동훈
  - **UCC** : 박승범



## 주제

> 사용자 학습 밸런스 관리

- **개인의 학습 의지를 돕기 위한 서비스**



## 주요 기능

- 사용자의 학습 진행 동안 졸음 등 상황 발생을 체크
- 만약 발생했다면 사용자에게 경고 알림 전송 + 로그 누적
- 사용자의 학습 시간 대비 효율 그래프 표시
- 과거 수집한 데이터 바탕으로 사용자에게 효율적인 학습 시간대 추천



## 개발 환경

|   분류   |        정보        |
| :------: | :----------------: |
| 운영체제 |     Windows 10     |
| 개발 툴  | Visual Studio Code |



## 기술 스택

|    분류    |                       기술                        |
| :--------: | :-----------------------------------------------: |
| 프론트엔드 |                   Vue.js, Vuex                    |
|   백엔드   |                      Django                       |
|   DevOps   | Jira, mattermost <br /> GitLab <br /> Docker, AWS |



## 개발 규칙

- git 협업은 다음 페이지를 참고한다.

  - https://gmlwjd9405.github.io/2018/05/12/how-to-collaborate-on-GitHub-3.html

  - 원격 저장소의 default branch는 `develop`

  - 원격 저장소의 `develop` branch와 연결된 새로운 `develop` branch를 로컬 저장소에 생성

    ```bash
    $ git checkout -b develop origin/develop
    ```

  - 이후 기능 작업은 로컬 저장소의 `develop` branch에서 따와야 한다. (`master`에서 따지 않도록 주의)

    ```bash
    $ git checkout -b [branch name] develop
    ```

    - 예시

      ```bash
      $ git checkout -b feature/fe_login develop
      ```

  - 기능 작업 완료 후 원격 저장소에 push (add, commit 부분은 생략했어요)

    ```bash
    $ git push origin feature/fe_login
    ```

  - 이후 원격 저장소에서 `develop` branch에 merge하기

  - 이후 자신의 로컬 저장소에서 `develop` branch로 이동한 후, 원격 저장소에 반영된 `develop` 동기화

    ```bash
    $ git checkout develop
    $ git pull origin develop
    ```

  - 로컬 저장소에서 완성한 이전 작업 브랜치 삭제 방법

    ```bash
    $ git branch -d [branch name]
    ```



- **개발 컨벤션**

  - 기능 브랜치명

    - front와 back 작업 branch를 오른쪽 예시와 같이 구별한다. (ex. feature/be_login, feature/fe_login)

  - 커밋 메시지

    - **commit type**

      ```bash
      feat : 코드나 테스트를 추가했을 때 + 라이브러리 추가하는 경우 
      fix : 버그를 수정했을 때
      add : 파일을 추가할 때
      merge : 병합 할때
      docs : 문서를 수정했을 때
      style : 코드 포맷팅에 대한 부분 변경, CSS 등
      
      (혹시 더 필요하다면)
      remove : 코드를 제거했을 때
      update : 코드를 수정하는 경우
      rename : 이름을 변경했을 때
      move : 코드를 이동할 때
      refac : 기능 변화 없이 코드 내부 구조 변경하는 경우
      ```

    - **메시지 컨벤션**

      ```bash
      [타입] 설명
      예시 : [docs] update README.md (커밋 메세지 규칙 수정)
      ```

      