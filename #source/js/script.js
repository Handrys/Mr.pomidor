
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

let minutesOptions = '25';  //Всего минут
//let secondsOptions; 
let smallBreakOptions; //Маленький перерыв (в сек)
let bigBreakOptions; //Большой перерыв (в сек)
let roundsOptions; //Кол-во раундов
let soundOptions; //True/False


//==================== Таймер ======================
let minutes = minutesOptions;
let seconds = '0';

function template() {
	if(minutes < 10 && minutes.toString().split('').length == 1){
		minutes = '0' + minutes;
	}
	if(seconds < 10 && seconds.toString().split('').length == 1){
		seconds = '0' + seconds;
	}
	document.querySelector('.timer-data__number-minutes').innerHTML = minutes;
	document.querySelector('.timer-data__number-seconds').innerHTML = seconds;
}

function start(){
	minutes = minutesOptions -1;
	seconds = '59';

	template();

	let minutes_interval = setInterval(minutesTimer, 60000);
	let seconds_interval = setInterval(secondsTimer, 1000);

	function minutesTimer(){
		minutes = minutes -1;
		template();
	}
	function secondsTimer(){
		seconds = seconds -1;
		template();
		if (seconds <= 0) {
			if (minutes <= 0){
				clearInterval(minutes_interval);
				clearInterval(seconds_interval)
			}
			seconds = 60;
		}
	}
}

template();

document.querySelector('.timer-start').addEventListener('click',start);
//==========================================================================
