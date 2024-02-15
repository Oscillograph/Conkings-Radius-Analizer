// Обработчики событий (для Drag-N-Drop-механизма)
var unit = 0; // какой юнит тащим? 1 - дрон; 2 - условный противник; 0 - никакой не тащим
var dragging = 0; // 0 - не тащим. 1 - тащим.

// Начать тащить
function droneMouseDown(){
	if (!unit){
		unit = 1;
		dragging = 1;
		selectTDs();
	}
}

function enemyMouseDown(){
	if (!unit){
		unit = 2;
		dragging = 1;
		selectTDs();
	}
}

// прекратили тащить
function cellMouseDown(obj){
	m = obj.parentNode.getAttribute('m');
	n = obj.parentNode.getAttribute('n');
	
	if (dragging){
		switch (unit){
			case 1:
				DroneN = n;
				DroneM = m;
				break;
			case 2:
				EnemyN = n;
				EnemyM = m;
				break;
		}

		formsubmit(mainform);
		dragging = 0;
		unit = 0;
	}

	unit = 0;

}

function selectTDs(){

	// строки
	n = 0;
	while(n <= mainform.rows.value){
		// столбцы
		m = 0;
		while (m <= mainform.cols.value){
			if ((m == 0) && (n != 0)){
				newCell.innerHTML = (n-1);
			}
			if ((n == 0) && (m != 0)){
				newCell.innerHTML = (m-1);
			}
			if ((m != 0) && (n != 0)){
				flyMapArray[n][m].innerHTML = imgHTML[3];
			}
			if ((m == DroneM) && (n == DroneN)){
				flyMapArray[n][m].innerHTML = imgHTML[0];
			}

			if ((m == EnemyM) && (n == EnemyN)){
				flyMapArray[n][m].innerHTML = imgHTML[4];
			}

			m = m + 1;
		}
		n = n + 1;
	}
}