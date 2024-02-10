// 랜덤번호 지정    
// 유저가 번호를 입력한다 그리고 go라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면 → 맞췄습니다.
// 랜덤번호가 < 유저번호 → down
// 랜덤번호가 > 유저번호 → up
// Reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다 (버튼 비활성화)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다.

let computerNum = 0;
let playButton = document.getElementById("playButton")
let userInput = document.getElementById("userInput")
let result = document.getElementById("result")
let reset = document.getElementById("reset")
let chance = 5;
let gameOver = false
let chanceArea = document.getElementById("chance-area")
let history = [];

playButton.addEventListener("click", play)
reset.addEventListener("click", resetGame)
userInput.addEventListener("focus",function(){userInput.value=""})


function pickRandomNum () {
   computerNum = Math.floor(Math.random()*100)+1;
   // Math.random() = 0~1 사이의 랜덤 소숫점 반환
   // Math.floor() = 소숫점 이하 버리기
//    console.log(computerNum);
}

function play() {
    let userValue = userInput.value;

    if(userValue < 1 || userValue >100) {
        result.textContent = "1에서 100사이 숫자만 입력해주세요!"
       return;
      // return 해줘야 함수 종료되고 밑에 찬스 줄어드는 코드가 실행 안됨
    }

    if(history.includes(userValue)) {
        result.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요!"
        return;
    }


    chance --;
    chanceArea.textContent = `남은 기회는 ${chance}회`

    // console.log("chance",chance);

    if(userValue < computerNum) {
        result.textContent = "Up!!!"
        // result의 변수에 텍스트 넣기
    } else if (userValue > computerNum) {
        result.textContent = "Down!!!"
    } 
    else {
        result.textContent = "정답입니다!"
        gameOver=true
    }

    history.push(userValue)
    // userValue를 history 변수 배열에 저장


    if (chance == 0) {
         gameOver = true;
    }

    if (gameOver == true) {
        playButton.disabled = true;
    }
}

function resetGame() {

    // user input창이 깨끗하게 정리되고
    userInput.value = ""

    // 새로운 번호가 생성되고
    pickRandomNum();

    // 멘트 변경
    result.textContent = "결과 확인"
    

    gameOver = false;

    // 버튼 활성화 하기
    playButton.disabled = false;

    // 찬스 5회로 다시 늘리기
    chance = 5;

    // 히스토리 배열 비우기
    history = [];
 
}

pickRandomNum();




