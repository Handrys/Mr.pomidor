

//=========== Какие-то скрипты =====================


document.querySelector('.menu-header__link-settings').style.display = 'none';




//======================================================
/* ============================МЕНЮ-БУРГЕР=========================================== */
let iconMenu = document.querySelector(".menu-header__icon");
let body = document.querySelector("body");
let menuBody = document.querySelector(".menu-header__menu");
let menuLink = document.querySelector(".menu-header__link");
if (iconMenu) {
	iconMenu.addEventListener("click", function (e) {
		iconMenu.classList.toggle("_active");
		body.classList.toggle("lock");
		menuBody.classList.toggle("_active");
	});
}
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
    let iconMenu = document.querySelector(".menu-header__icon");
    let menuBody = document.querySelector(".menu-header__menu");
  /*   if (iconMenu.contains('_active')){
      console.log('есть')
    } */
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






