

// переменные для навигации скрипта по странице
var flyMapTable = document.getElementById('flymap');
var flyMapArray = new Array();
var mainform = document.getElementsByTagName('form')[0];
var debug = mainform.debug;

// Координаты разведчика и условного противника
var DroneN = Math.floor(mainform.rows.value / 2);
var DroneM = Math.floor(mainform.cols.value / 2) - 1;

var EnemyN = Math.floor(mainform.rows.value / 2);
var EnemyM = Math.floor(mainform.cols.value / 2) + 1;

// включить/выключить условного противника
function enemyOnOff(chkbox){
	if (chkbox.checked){
		if (EnemyN < 0){
			EnemyN = Math.floor(mainform.rows.value / 2);
			EnemyM = Math.floor(mainform.cols.value / 2) + 1;
		}
		//flyMapArray[EnemyN][EnemyM].innerHTML = imgHTML[4];
		document.getElementById('enemySettings1').style.display='table-row';
		document.getElementById('enemySettings2').style.display='table-row';
	}
	if (!chkbox.checked){
		if (EnemyN >= 0){
			//flyMapArray[EnemyN][EnemyM].innerHTML = imgHTML[1];
			document.getElementById('enemySettings1').style.display='none';
			document.getElementById('enemySettings2').style.display='none';
		}
		EnemyN = -30;
		EnemyM = -30;
	}
}



// Функция очистки карты
function clearFlyMap(){
	flyMapTable.innerHTML = '';
}



// Функция рисования карты
function drawFlyMap(rows, cols){

	flyMapTable.style.height = (Math.floor(rows*32)+1)+'px';
	flyMapTable.style.width = (Math.floor(cols*32)+1)+'px';

	// строки
	n = 0;
	while(n <= rows){
		newRow = flyMapTable.insertRow(n);
		flyMapArray[n] = new Array();
		// столбцы
		m = 0;
		while (m <= cols){
			newCell = newRow.insertCell(m);
			flyMapArray[n][m] = newCell;

			if ((m == 0) && (n != 0)){
				newCell.innerHTML = (n-1);
			}
			if ((n == 0) && (m != 0)){
				newCell.innerHTML = (m-1);
			}
			if ((m != 0) && (n != 0)){
				newCell.innerHTML = imgHTML[1];
				newCell.setAttribute('n',n);
				newCell.setAttribute('m',m);
			}
			if ((m == DroneM) && (n == DroneN)){
				newCell.innerHTML = imgHTML[0];
			}

			if ((m == EnemyM) && (n == EnemyN) && (mainform.enemychkbox.checked)){
				newCell.innerHTML = imgHTML[4];
			}

			m = m + 1;
		}
		n = n + 1;
	}
	enemyOnOff(mainform.enemychkbox);
}



// Функция собственно анализа радиусов и закраски карты
function analizeMap(rows, cols){

	//пробежаться по таблице, присваивая строке индекс n, а ячейке - m
	var speedDxDy = 0;
	var speedExEy = 0;

	Dspeed = mainform.Dspeed.value;
	Espeed = mainform.Espeed.value;


	n = 1;

	while (n <= rows){

		m = 1;

		while(m <= cols){

			// пересчитываем абсолютные координаты ячейки в относительные
			dy = -(n - DroneN);
			dx = m - DroneM;

			ey = -(n - EnemyN);
			ex = m - EnemyM;

			//скорость, необходимая для прилёта в квадрат
			speedDxDy = Math.sqrt(dx*dx + dy*dy);
			speedExEy = Math.sqrt(ex*ex + ey*ey);

			// если наша скорость выше, закрасить квадрат, как доступный для перемещения
			if (speedDxDy <= Dspeed){

				// закраска зон в зависимости от выбранного параметра
				if (mainform.zoneschkbox.checked){
					switch (mainform.param.value){
					case '1': //скорость
						if (speedDxDy > KOST[1][0]){
							flyMapArray[n][m].style.backgroundColor=zones[1];
						}
						if (speedDxDy <= KOST[1][0]){
							flyMapArray[n][m].style.backgroundColor=zones[2];
						}
						if (speedDxDy <= KOST[1][1]){
							flyMapArray[n][m].style.backgroundColor=zones[3];
						}
						break;
					case '2': //радиус обзора
						if (speedDxDy <= KOST[2][0]){
							flyMapArray[n][m].style.backgroundColor=zones[1];
						}
						if (speedDxDy < KOST[2][1]){
							flyMapArray[n][m].style.backgroundColor=zones[2];
						}
						if (speedDxDy < KOST[2][2]){
							flyMapArray[n][m].style.backgroundColor=zones[3];
						}
						break;
					case '3': // радиус атаки
						if (speedDxDy >= KOST[3][0]){
							flyMapArray[n][m].style.backgroundColor=zones[1];
						}
						if (speedDxDy < KOST[3][0]){
							flyMapArray[n][m].style.backgroundColor=zones[2];
						}
						if (speedDxDy < KOST[3][1]){
							flyMapArray[n][m].style.backgroundColor=zones[3];
						}
						if (speedDxDy <= KOST[3][2]){
							flyMapArray[n][m].style.backgroundColor=zones[4];
						}
						break;

					case '4': // радиус бомбардировки
						if (speedDxDy >= KOST[4][0]){
							flyMapArray[n][m].style.backgroundColor=zones[1];
						}
						if (speedDxDy < KOST[4][0]){
							flyMapArray[n][m].style.backgroundColor=zones[2];
						}
						if (speedDxDy < KOST[4][1]){
							flyMapArray[n][m].style.backgroundColor=zones[3];
						}
						break;
					}
				} else {
					flyMapArray[n][m].style.backgroundColor=zones[1];
				}

				//старая закраска
				//flyMapArray[n][m].style.backgroundColor='#904444';

				//красивая закраска (можно играться с формулой)
				//flyMapArray[n][m].style.backgroundColor='#90'+Math.abs(60-(2*(Math.abs(x)+Math.abs(y))))+''+Math.abs(60-(2*(Math.abs(x)+Math.abs(y))))+'';

				if(mainform.coords.checked){
					if(!((dx==0)&&(dy==0))){
						flyMapArray[n][m].innerHTML = dx+';'+dy;
						if ((n==EnemyN)&&(m==EnemyM)){
							flyMapArray[n][m].innerHTML = imgHTML[4];
						}
					}
				}
			}

			if (speedExEy <= Espeed){
				if(!flyMapArray[n][m].style.backgroundColor.length){
					RGB1 = ['100', '100', '100'];
				} else {
					RGB1 = rgb2dec(flyMapArray[n][m].style.backgroundColor);
				}

				RGB2 = addColor.replace("#","").match(/.{2}/g);
				R = Math.floor(RGB1[0]*1 + ('0x'+RGB2[0])*1);
				G = Math.floor(RGB1[1]*1 + ('0x'+RGB2[1])*1);
				B = Math.floor(RGB1[2]*1 + ('0x'+RGB2[2])*1);
				flyMapArray[n][m].style.backgroundColor = "#"+dec2hex(R)+dec2hex(G)+dec2hex(B);

				//flyMapArray[n][m].innerHTML = imgHTML[2];
			}

			m = m + 1;
		}

		n = n + 1;
	}
}



// Обработчик формы
function formsubmit(form){

	// очистить карту
	clearFlyMap();
	// нарисовать новую
	drawFlyMap(form.rows.value, form.cols.value);
	// закрасить нужные квадраты
	analizeMap(form.rows.value, form.cols.value);

	return false;
}

// нарисовать пустую карту
drawFlyMap(mainform.rows.value, mainform.cols.value);
