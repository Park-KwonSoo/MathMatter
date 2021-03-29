# MathMatter
## Mathmatter

## Project Overview

> 시험을 대비할 때 실제 문제들을 난이도 별, 유형 별, 시험 유형 별로 문제를 추천해 줍니다.

> 기존의 문제 추천 서비스는 배우지 않은 개념을 구분하지 못해 상위 개념 문제를 추천해주기도 하지만, 문제 타입을 세분화하여 문제를 추천해주게 됩니다. 따라서 보다 효율적으로 문제를 추천해 줄 수가 있습니다.

> 또한 게시판 기능을 통해 기존에 풀고 있는 문제의 어려운 개념의 해설을 요청 하거나, 다른 사용자들의 문제를 풀어줌으로써 복습이 가능합니다.

![https://user-images.githubusercontent.com/72953899/112805580-baf20880-90b0-11eb-980b-c29f6414a194.png](https://user-images.githubusercontent.com/72953899/112805580-baf20880-90b0-11eb-980b-c29f6414a194.png)

![https://user-images.githubusercontent.com/72953899/112805600-c2191680-90b0-11eb-81ad-71f0023443b4.png](https://user-images.githubusercontent.com/72953899/112805600-c2191680-90b0-11eb-81ad-71f0023443b4.png)

![https://user-images.githubusercontent.com/72953899/112805604-c3e2da00-90b0-11eb-93d1-a6c7e6742c2f.png](https://user-images.githubusercontent.com/72953899/112805604-c3e2da00-90b0-11eb-93d1-a6c7e6742c2f.png)

![https://user-images.githubusercontent.com/72953899/112805607-c47b7080-90b0-11eb-824b-7ca9cd79c023.png](https://user-images.githubusercontent.com/72953899/112805607-c47b7080-90b0-11eb-824b-7ca9cd79c023.png)

![https://user-images.githubusercontent.com/72953899/112805609-c5140700-90b0-11eb-8878-1dec4fefef87.png](https://user-images.githubusercontent.com/72953899/112805609-c5140700-90b0-11eb-8878-1dec4fefef87.png)

![https://user-images.githubusercontent.com/72953899/112805611-c5ac9d80-90b0-11eb-81de-fe56682af1e8.png](https://user-images.githubusercontent.com/72953899/112805611-c5ac9d80-90b0-11eb-81de-fe56682af1e8.png)

![https://user-images.githubusercontent.com/72953899/112805614-c5ac9d80-90b0-11eb-8f5f-529824f5b8e1.png](https://user-images.githubusercontent.com/72953899/112805614-c5ac9d80-90b0-11eb-8f5f-529824f5b8e1.png)

---

## Features

- 시험 유형별  문제 생성
- 수능형 문제 생성
- 문제 유형별 문제 생성
- 게시판 기능

---

## Upcoming Features

- 게시판 수식 작성 기능 업데이트
- 게시판 이미지 업로드 가능
- 출력 프린트 UI 수정

---

## Usage

1. 회원가입을 합니다.
2. 프로필을 설정합니다(필수).
3. 문제를 출력할 수 있습니다.
    - 내신형 문제 : 학기(1 또는 2)와 시험 유형(중간고사 또는 기말고사), 문제수와 난이도를 입력합니다.
    - 수능형 문제 : 모의고사의 월 수를 입력합니다.
    - 유형별 문제 : 문제 수와 문제 유형을 선택합니다. 상위 개념을 포함할 지 말지를 선택할 수 있고 난이도를 설정합니다.
4. 게시판에서 글을 작성할 수 있습니다.
    - 글을 작성할 수 있고 댓글을 작성할 수 있습니다.
    - 글을 수정할 수 있습니다.

---

## Getting Started

1. clone

    ```markdown
    git clone git@github.com:Park-KwonSoo/MathMatter.git
    ```

2. install(Mac OS X)

    ```markdown
    ---HomeBrew Install---
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```

    ```markdown
    ---MongoDB Install---
    brew tap mongodb/brew
    brew install mongodb-community@4.4
    ```

    ```markdown
    ---Server---
    cd Mathmatter_Server
    npm install
    ```

    ```markdown
    ---Client---
    cd mathmatter-client
    npm install
    ```

3. set env

    ```markdown
    cd Mathmatter_Server
    touch .env
    ---TYPE THIS IN .env FILE---
    SERVER_PORT = ###
    MONGO_URL = ###
    JWT_SECRET = ###
    ```

4. start db(Mac OS X)

    ```markdown
    brew services start mongodb-community

    ---Make Datafile.json and COPY To---
    /usr/local/etc/mongod.conf

    ---Terminal---
    mongoimport -d "databaseName" -c "collectionName" --file Datafile.json
    ```

5. server

    ```markdown
    cd Mathmatter_Server
    npm start
    ```

6. client

    ```markdown
    cd mathmatter-client
    npm start
    ```

    ---

    ## License
