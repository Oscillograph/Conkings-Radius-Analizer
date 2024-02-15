
// цвета зон
var zones = new Array("#000000", "#b05555", "#a06666", "#997777", "#884444");

// цвет, добавляемый условным противником
var addColor = '#082008';

// директории анализатора
var dirs = new Object();
dirs.source = './source';
dirs.img = dirs.source+'/img';
//dirs.js = dirs.source+'/js';

/*
// настройки анализатора
var settings = new Object();
settings.showEnemy = 0; // показывать условного противника
settings.showCoords = 0; // показывать относительные координаты
settings.showZones = 0; // выделять зоны на закрашенной области
*/



// imgSrc - только ссылки на изображения ниже
// 0 - свой корабль
// 1 - пустышка для выравнивания сетки
// 2 - полупрозрачный фон
// 3, 4 - прозрачный фон с белым и красным пунктиром
// 5 - условный противник
var imgSrc = [
dirs.img+'/drone.gif',
dirs.img+'/blank32x32.png',
dirs.img+'/transparent_white.png',
dirs.img+'/select32x32.png',
dirs.img+'/selected32x32.png',
dirs.img+'/enemy.png',
];

// imgHTML - разметка изображений для сетки карты
var imgHTML = [
'<img src="'+imgSrc[0]+'" border=0 onMouseDown="droneMouseDown(); return false;">',
'<img src="'+imgSrc[1]+'" border=0 onMouseDown="cellMouseDown(this); return false;">',
'<img src="'+imgSrc[2]+'" border=0>',
'<img src="'+imgSrc[3]+'" border=0 onMouseDown="cellMouseDown(this); return false;" onMouseOver="changeImg(this, imgSrc[4])" onMouseOut="changeImg(this, imgSrc[3])">',
'<img src="'+imgSrc[5]+'" border=0 onMouseDown="enemyMouseDown(); return false;">',
];


function changeImg(img, src){
	img.src = src;
}

function dec2hex (dec){
	if(dec>15){
		return dec.toString(16)
	} else{
		return "0"+dec.toString(16)
	}
}

function rgb2dec (rgb){
	rgb = rgb.match(/(\d{1,3})/g);
	return rgb;
}