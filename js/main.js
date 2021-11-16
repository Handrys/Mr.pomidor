
//
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
if (isMobile.any() || isMobile.iOS()) {
	document.body.classList.add('_touch')
} else {
	document.body.classList.add('_pc');
}
/* new WOW().init(); */

/* ============================МЕНЮ-БУРГЕР=========================================== */
let iconMenu = document.querySelector(".menu-header__icon");
let body = document.querySelector("body");
let menuBody = document.querySelector(".menu-header__menu");
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		iconMenu.classList.toggle("_active");
		body.classList.toggle("lock");
		menuBody.classList.toggle("_active");
		//console.log('click');
	});
}


//==================== Настройки таймера ======================
let currentRound = 'pomodoro';  // {pomodoro, smallBreak, bigBreak}
let pomMinutesOpt = '25';  //Длительность помидора (в мин)
//let secondsOptions; 
let smallBreakOpt = '1'; //Маленький перерыв (в мин)
let bigBreakOpt = '15'; //Большой перерыв (в мин)
let roundsOpt = 5; //Кол-во раундов до большого перерыва (5)
let soundOpt; //True/False

let totalRounds = 0; //Пройдено раундов (в начале игры - 0)

let bckgRed = 'linear-gradient(45deg, rgba(114, 3, 3, 0.822) 2%, rgb(199, 49, 35) 90%)';
let bckgBlue = 'linear-gradient(45deg, rgba(46, 3, 114, 0.822) 2%, rgb(35, 133, 199) 90%)';

//==================== Таймер ======================
let minutes = pomMinutesOpt;
let seconds = '0';

//===== (отрисовка на странице) ======
function template(value){
	if(value < 10 && value.toString().split('').length == 1){
		value = '0' + value;
	}
	if(seconds < 10 && seconds.toString().split('').length == 1){
		seconds = '0' + seconds;
	}
	document.querySelector('.timer-data__number-minutes').innerHTML = value;
	document.querySelector('.timer-data__number-seconds').innerHTML = seconds;
}

//====== Сам таймер (запускается на кнопку "Старт") ======
function start(options){
	minutes = options - 1;
	seconds = '60';
	console.log(minutes)
	let minutes_interval = setInterval(minutesTimer, 60000);
	let seconds_interval = setInterval(secondsTimer, 1000);

	function minutesTimer(){
		template(minutes);
		minutes = minutes -1;
	}
	function secondsTimer(){
		seconds = seconds -1;
		template(minutes);
		if (seconds <= 0) {
			if (minutes <= 0){
				clearInterval(minutes_interval);
				clearInterval(seconds_interval);
				checkRound();
			}
			seconds = 60;
		}
	}

	document.querySelector('.timer-header__skip').addEventListener('click', () => {
		clearInterval(minutes_interval);
		clearInterval(seconds_interval);
	});
}


//===== Смена раундов (помидор, перерыв) =====
function checkRound(){
	if (totalRounds < roundsOpt +3){
		if (currentRound == 'pomodoro'){
			currentRound = 'smallBreak';
			document.querySelector('.content-timer__window').style.background = bckgBlue;
			document.querySelector('.timer-data__info').innerHTML = '[перерыв]';
			template(smallBreakOpt);
		} else{ 
			currentRound = 'pomodoro';
			document.querySelector('.content-timer__window').style.background = bckgRed;
			document.querySelector('.timer-data__info').innerHTML = '[помидорка]';
			template(pomMinutesOpt);
		}	
		totalRounds++;
	} else {
		currentRound = 'bigBreak';
		document.querySelector('.content-timer__window').style.background = bckgBlue;
		document.querySelector('.timer-data__info').innerHTML = '[большой перерыв]';
		totalRounds = 0;
		template(bigBreakOpt);
	}
}

template(minutes);


//========= События на кнопки ==============

document.querySelector('.timer-start').addEventListener('click', () => {
	if (currentRound == 'pomodoro') start(pomMinutesOpt);
	if (currentRound == 'smallBreak') start(smallBreakOpt);
	if (currentRound == 'bigBreak') start(bigBreakOpt);

});

document.querySelector('.timer-stop').addEventListener('click', () => {
	window.location.reload();
});

document.querySelector('.timer-header__skip').addEventListener('click', () => {
	seconds = 0;
	checkRound();
});
//=============================================================================================================

const popupLinks = document.querySelectorAll('.popup-link');
//const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++){
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++){
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    })
  }
}


function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    } 
      currentPopup.classList.add('open');
      currentPopup.addEventListener("click", function (e) {
        if (!e.target.closest('.popup-content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
}

function popupClose(popupActive, doUnlock = true){
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock){
      bodyUnLock();
    }
  }
}

function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
  if (lockPadding.length > 0){
    for (let index = 0; index < lockPadding.length; index++){
      const el = lockPadding[index];
      el.getElementsByClassName.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function() {
    unlock = true;
  }, timeout);
}

function bodyUnLock(){
  setTimeout(function () {
    if (lockPadding.length > 0){
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0 px';
      }
    }
    body.style.paddingRight = '0 px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout)
}


