// 랜덤번호 지정    
// 유저가 번호를 입력한다 그리고 go라는 버튼을 누름
// 만약에 유저가 랜덤번호를 맞추면 → 맞췄습니다.
// 랜덤번호가 < 유저번호 → down
// 랜덤번호가 > 유저번호 → up
// Reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다쓰면 게임이 끝난다 (버튼 비활성화)
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다. 기회를 깍지 않는다.

// variables(변수들)

// 1. 우선 컴퓨터 랜덤번호에 0 저장
let computerNum = 0;

// 2. 유저 input 가지고 오기
let userInput = document.getElementById('userNum')

// 3. Go 버튼 누르는 행위 가지고 오기
let guess = document.querySelector('#goButton')

// 4. result 내용 가지고 오기
let result = document.querySelector('#result')

// 5. chance 변수 저장 및 기본 수 설정
let chance = 5;
// 6. chance 보여주는 행위 가지고 오기
let chanceArea = document.getElementById('chanceArea')

// 7. 게임오버 변수 저장
// 7-1 정답을 맞추거나, 찬스가 0이 되면 gameOver 트루가 되고 
// 7-2 gameOver가 트루가 되면 go 버튼 비활성화 됨
let gameOver = false;

// 8 restart "재시작" 버튼 누르는 행위 가지고 오기
let restart = document.querySelector('#restart')

// 9 중복값 확인을 위해 user input을 배열에 넣기

let inputArray = [];

// 10. 실패 시 fail 그림 팝업
let fail = document.querySelector('.fail')

// 11. 성공 시 success 그림 팝업 
let success = document.querySelector('.success')


// 이벤트리스너

// 1. 숫자 입력 후 go button 누르기
guess.addEventListener("click", play)

// 2. "restart (재시작)" 버튼 누르면 원상복귀
restart.addEventListener("click", reset)

// 3. "focus"시 입력 창 지워짐
userInput.addEventListener("focus", function(){
  userInput.value = "";
})


// functions (함수들)

// 1. 컴퓨터 랜덤번호 pick
function randomNum() {
  computerNum = Math.floor(Math.random()*100)+1
  console.log(computerNum)
}
randomNum()

// 2. go 버튼 누르면 게임 play 하기

function play() {
   // user 인풋 console에 찍히는지 확인
   // console.log(userInput.value)

   let userInputValue = userInput.value;
   // user 인풋 값을 변수로 저장하여 활용하기 쉽게하기

   if (userInputValue == "") {
    result.textContent = "숫자를 입력하세요."
    return
   }
   // 인풋에 입력을 하지 않고 'go' 버튼 누를 시 
   // "숫자를 입력하세요 반환 후 기회는 차감되지 않음"

   if(userInputValue > 100 || userInputValue < 0) {
    result.textContent = "1에서 100사이 숫자만 입력하세요."
    return
   }
   if(inputArray.includes(userInputValue)) {
    result.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력하세요!"
    return
   }

   chance = chance - 1; 
   chanceArea.textContent = `남은 기회는 ${chance}회`;

   if(userInputValue > computerNum) {
    result.textContent = "Down 입니다"

   } else if (userInputValue < computerNum) {
    result.textContent = "Up 입니다"
   }
   else {
    result.textContent = "정답입니다!!!!"
    gameOver = true;
    success.style.display = "block";
   }

   // 찬스가 0이면 gameOver 가 true
   if(chance == 0) {
    gameOver = true;
    fail.style.display = "block";
   }

   // gameOver가 true이면 버튼 비활성화

   if (gameOver == true) {
    guess.disabled = true;
   }

   inputArray.push(userInputValue);
   // 유저 input 값을 inputArray에 저장!!!
   
}

// 3. "restart (재시작)" 버튼 누르면 원상복귀 함수 (동작들)

function reset() {
  
   // 리셋버튼을 누르면
   
   // 1) 유저 입력창이 지워져야 한다
    userInput.value = "";

   // 2) 컴퓨터 넘버가 재설정 되어야 한다
   randomNum();

   // 3) 결과 창(up down 가르쳐주는) & 남은기회 창 원복되어야함
   chance = 5;
   chanceArea.textContent = "남은 기회는 5회";
   result.textContent = "Up일까요 Down일까요?";

   // go 재활성화 및 gameOver false
   gameOver = false;
   guess.disabled = false;

   // 입력한 숫자 초기화
   inputArray = [];

   // fail 그림 사라지게 하기
   fail.style.display = "none";

   // success 그림 사라지게 하기
   success.style.display = "none";

}

randomNum()