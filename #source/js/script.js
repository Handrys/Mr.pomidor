//
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
if (isMobile.any() || isMobile.iOS()) {
	document.body.classList.add('_touch')
} else {
	document.body.classList.add('_pc');
}
/* new WOW().init(); */



//==================== Таймер ======================
//let minutes = pomMinutesOpt;
let seconds = '0';

//===== (Проверка цифры) ======

function checkNumber(){
	if (currentRound == 'pomodoro') timerNum = pomMinutesOpt;
	if (currentRound == 'smallBreak') timerNum = smallBreakOpt;
	if (currentRound == 'bigBreak') timerNum = bigBreakOpt;
	template(timerNum)
}

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
	let minutes = options -1;
	seconds = '59';
	let minutes_interval = setInterval(minutesTimer, 60000);
	let seconds_interval = setInterval(secondsTimer, 1000);

	function minutesTimer(){
		//template(minutes);
		minutes = minutes -1;
	}
	function secondsTimer(){
		template(minutes);
		seconds = seconds -1;
		if (seconds <= 0) {
			if (minutes <= 0){
				clearInterval(minutes_interval);
				clearInterval(seconds_interval);
				timerOffSound();
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
	if (totalRounds < roundsOpt * 2 - 2){  // ОШИБКА - Неправильно работает при изменении настроек
		if (currentRound == 'pomodoro'){
			currentRound = 'smallBreak';
			document.querySelector('.content-timer__window').style.background = bckgBlue;
			document.querySelector('.timer-data__info').innerHTML = '[перерыв]';
			checkNumber()
		} else{ 
			currentRound = 'pomodoro';
			document.querySelector('.content-timer__window').style.background = bckgRed;
			document.querySelector('.timer-data__info').innerHTML = '[помидорка]';
			checkNumber()
		}	
		totalRounds++;
	} else {
		currentRound = 'bigBreak';
		document.querySelector('.content-timer__window').style.background = bckgBlue;
		document.querySelector('.timer-data__info').innerHTML = '[большой перерыв]';
		totalRounds = 0;
		checkNumber()
	}
}

function timerOffSound(){
	var audio = new Audio('../sounds/timer-off.mp3');
	if(soundOpt) audio.play();
}

function timerStartSound(){
	var audio = new Audio('../sounds/timer-start.mp3');
	if(soundOpt) audio.play();
}

checkNumber()


//========= События на кнопки ==============

document.querySelector('.timer-start').addEventListener('click', () => {
	if (currentRound == 'pomodoro') start(pomMinutesOpt);
	if (currentRound == 'smallBreak') start(smallBreakOpt);
	if (currentRound == 'bigBreak') start(bigBreakOpt);
	timerStartSound();
});

document.querySelector('.timer-stop').addEventListener('click', () => {
	window.location.reload();
});

document.querySelector('.timer-header__skip').addEventListener('click', () => {
	seconds = 0;
	checkRound();
});








//============================  ЗАДАЧИ  ===============================================================

let editTasks = function () {
	let editBtn = document.querySelectorAll('.tasks-button-edit');
	let editEnterBtn = document.querySelector('.tasks-edit__add');
	let tasksEdit = document.querySelector('.tasks-edit');
	let tasksNew = document.querySelector('.tasks-new');
	let tasksBlockActive = 'tasks-head-active';//tasks-add

	let currentItem;
	let taskName = '';
	let taskDescription = '';
	let inputTaskName = document.querySelector('.tasks-edit__name');
	let inputTaskDescription = document.querySelector('.tasks-edit__description');

	editBtn.forEach(item => {
		item.addEventListener('click', () => {
			showEdit();
			taskLoad(item);
		});
	});

	editEnterBtn.addEventListener('click', () => {
		showNew();
		taskSave();
	})

	function showEdit() {
		if (tasksNew.classList.contains(tasksBlockActive)){
			tasksEdit.classList.add(tasksBlockActive);
			tasksNew.classList.remove(tasksBlockActive);
		}
	}

	function showNew() {
		if (tasksEdit.classList.contains(tasksBlockActive)){
			tasksNew.classList.add(tasksBlockActive);
			tasksEdit.classList.remove(tasksBlockActive);
		}
	}

	function taskLoad(item){
		inputTaskName.value = item.parentNode.parentNode.querySelector('.tasks-list-elem__name').innerHTML;
		inputTaskDescription.value = item.parentNode.parentNode.querySelector('.tasks-list-elem__desription').innerHTML;
		currentItem = item;
	}

	function taskSave(){
		currentItem.parentNode.parentNode.querySelector('.tasks-list-elem__name').innerHTML = inputTaskName.value;
		currentItem.parentNode.parentNode.querySelector('.tasks-list-elem__desription').innerHTML = inputTaskDescription.value;
	}
}


editTasks();


let addTasks = function () {
	let addTask = document.querySelector('.tasks-new__add');
	let inputTaskName = document.querySelector('.tasks-new__name');
	let inputTaskDescription = document.querySelector('.tasks-new__description');

	addTask.addEventListener('click', () => {
		createTask();
	})

	function createTask() {
		let date = new Date();
		var articleDiv = document.querySelector(".tasks-list__elem");
		var newArticleDiv = articleDiv.cloneNode(true);

		newArticleDiv.classList.add('tasks-list-elem');
		newArticleDiv.querySelector(".tasks-list-elem__name")
		newArticleDiv.querySelector(".tasks-list-elem__desription")

		newArticleDiv.querySelector(".tasks-list-elem__name").innerHTML = inputTaskName.value;
		newArticleDiv.querySelector(".tasks-list-elem__desription").innerHTML = inputTaskDescription.value;
		newArticleDiv.querySelector(".tasks-list-elem__time").innerHTML = date.getHours() + ':' +  date.getMinutes();
		document.querySelector('.tasks-block__list').appendChild(newArticleDiv);
	}
}

addTasks();



//==================================================

