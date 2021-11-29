

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