
// ����� ���
var zones = new Array("#000000", "#b05555", "#a06666", "#997777", "#884444");

// ����, ����������� �������� �����������
var addColor = '#082008';

// ���������� �����������
var dirs = new Object();
dirs.source = './source';
dirs.img = dirs.source+'/img';
//dirs.js = dirs.source+'/js';

/*
// ��������� �����������
var settings = new Object();
settings.showEnemy = 0; // ���������� ��������� ����������
settings.showCoords = 0; // ���������� ������������� ����������
settings.showZones = 0; // �������� ���� �� ����������� �������
*/



// imgSrc - ������ ������ �� ����������� ����
// 0 - ���� �������
// 1 - �������� ��� ������������ �����
// 2 - �������������� ���
// 3, 4 - ���������� ��� � ����� � ������� ���������
// 5 - �������� ���������
var imgSrc = [
dirs.img+'/drone.gif',
dirs.img+'/blank32x32.png',
dirs.img+'/transparent_white.png',
dirs.img+'/select32x32.png',
dirs.img+'/selected32x32.png',
dirs.img+'/enemy.png',
];

// imgHTML - �������� ����������� ��� ����� �����
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