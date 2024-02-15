

// ���������� ��� ��������� ������� �� ��������
var flyMapTable = document.getElementById('flymap');
var flyMapArray = new Array();
var mainform = document.getElementsByTagName('form')[0];
var debug = mainform.debug;

// ���������� ���������� � ��������� ����������
var DroneN = Math.floor(mainform.rows.value / 2);
var DroneM = Math.floor(mainform.cols.value / 2) - 1;

var EnemyN = Math.floor(mainform.rows.value / 2);
var EnemyM = Math.floor(mainform.cols.value / 2) + 1;

// ��������/��������� ��������� ����������
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



// ������� ������� �����
function clearFlyMap(){
	flyMapTable.innerHTML = '';
}



// ������� ��������� �����
function drawFlyMap(rows, cols){

	flyMapTable.style.height = (Math.floor(rows*32)+1)+'px';
	flyMapTable.style.width = (Math.floor(cols*32)+1)+'px';

	// ������
	n = 0;
	while(n <= rows){
		newRow = flyMapTable.insertRow(n);
		flyMapArray[n] = new Array();
		// �������
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



// ������� ���������� ������� �������� � �������� �����
function analizeMap(rows, cols){

	//����������� �� �������, ���������� ������ ������ n, � ������ - m
	var speedDxDy = 0;
	var speedExEy = 0;

	Dspeed = mainform.Dspeed.value;
	Espeed = mainform.Espeed.value;


	n = 1;

	while (n <= rows){

		m = 1;

		while(m <= cols){

			// ������������� ���������� ���������� ������ � �������������
			dy = -(n - DroneN);
			dx = m - DroneM;

			ey = -(n - EnemyN);
			ex = m - EnemyM;

			//��������, ����������� ��� ������ � �������
			speedDxDy = Math.sqrt(dx*dx + dy*dy);
			speedExEy = Math.sqrt(ex*ex + ey*ey);

			// ���� ���� �������� ����, ��������� �������, ��� ��������� ��� �����������
			if (speedDxDy <= Dspeed){

				// �������� ��� � ����������� �� ���������� ���������
				if (mainform.zoneschkbox.checked){
					switch (mainform.param.value){
					case '1': //��������
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
					case '2': //������ ������
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
					case '3': // ������ �����
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

					case '4': // ������ �������������
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

				//������ ��������
				//flyMapArray[n][m].style.backgroundColor='#904444';

				//�������� �������� (����� �������� � ��������)
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



// ���������� �����
function formsubmit(form){

	// �������� �����
	clearFlyMap();
	// ���������� �����
	drawFlyMap(form.rows.value, form.cols.value);
	// ��������� ������ ��������
	analizeMap(form.rows.value, form.cols.value);

	return false;
}

// ���������� ������ �����
drawFlyMap(mainform.rows.value, mainform.cols.value);
