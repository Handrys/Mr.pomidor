//==================== Настройки таймера ======================
let currentRound = 'pomodoro';  // {pomodoro, smallBreak, bigBreak}
let pomMinutesOpt = '25';  //Длительность помидора (в мин)
//let secondsOptions; 
let smallBreakOpt = '2'; //Маленький перерыв (в мин)
let bigBreakOpt = '15'; //Большой перерыв (в мин)
let roundsOpt = 5; //Кол-во раундов до большого перерыва (5)
let soundOpt = true; //True/False

let timerNum;

let totalRounds = 0; //Пройдено раундов (в начале игры - 0)

let bckgRed = 'linear-gradient(45deg, rgba(114, 3, 3, 0.822) 2%, rgb(199, 49, 35) 90%)';
let bckgBlue = 'linear-gradient(45deg, rgba(46, 3, 114, 0.822) 2%, rgb(35, 133, 199) 90%)';



let pomMinutes_input = document.querySelector('.input-pom-minutes');
let bigBreak_input = document.querySelector('.input-big-break'); 
let smallBreak_input = document.querySelector('.input-small-break') 
let rounds_input = document.querySelector('.input-rounds'); 
let soundOpt_input = document.querySelector('.input-checkbox-sound'); 
let enter_input = document.querySelector('.input-enter'); 
let close_popup = document.querySelector('.close-popup'); 


pomMinutes_input.value = pomMinutesOpt;
bigBreak_input.value = bigBreakOpt;
smallBreak_input.value = smallBreakOpt;
rounds_input.value = roundsOpt;
soundOpt_input.checked = soundOpt;

close_popup.addEventListener('click', () => {
	pomMinutesOpt = pomMinutes_input.value;
	bigBreakOpt = bigBreak_input.value;
	smallBreakOpt = smallBreak_input.value;
	roundsOpt = rounds_input.value;
	soundOpt = soundOpt_input.checked;
	
	checkNumber();
})