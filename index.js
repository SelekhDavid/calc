var newTableOfNums=document.createElement('table');
var newTableOfOptions=document.createElement('table');
var arrOfCells = [];
var input1Row = 0;
var input2Row = 0;
var command = '';
var switcher = true;
var swOfClear = true;
var ourValue, a, b, count, result, operandArea;
var counterOfDecimals = 1;

(function createNumbers() {
	count = 13;
	for (var i = 0; i < 4; i++) {
		var newRow = newTableOfNums.insertRow(0);
  		for (var j = 0; j < 3; j++) {
  			count--;
  			var newCell = newRow.insertCell(0);
    		newCell.setAttribute('width', '44');
    		newCell.setAttribute('height', '44');
    		newCell.setAttribute('style', 'border: 4px solid #353535');
    		newCell.setAttribute('id', '' + count);
    		newCell.setAttribute('onclick', 'showNum(this)');
        newCell.setAttribute('onchange', 'showNum(this)');
    		newCell.innerHTML = '' + count;
  		}
	}
document.getElementById('nums').appendChild(newTableOfNums)})()

document.getElementById('10').setAttribute('colspan', '3');
document.getElementById('10').setAttribute('id', '0');
document.getElementById('0').innerHTML = '0';
document.getElementById('11').parentNode.removeChild(document.getElementById('11'));
document.getElementById('12').parentNode.removeChild(document.getElementById('12'));

(function createOptions() {
  for (var i = 0; i < 3; i++) {
    var newRow = newTableOfOptions.insertRow(0);
    arrOfCells[i] = [];
    for (var j = 0; j < 2; j++) {
      var newCell = newRow.insertCell(0);
      arrOfCells[i][j] = newCell;
      newCell.setAttribute('width', '44');
      newCell.setAttribute('height', '44');
      newCell.setAttribute('style', 'border: 4px solid #353535');
    }
  }
  document.getElementById('options').appendChild(newTableOfOptions)})()

function clean() {
  document.getElementById('textarea').value = '';
  a = 0;
  b = 0;
  result = 0;
  operandArea = '';
  input1Row = 0;
  input2Row = 0;
}

arrOfCells[2][1].setAttribute('id', 'plus');
arrOfCells[2][1].setAttribute('onclick', 'Command(this)');
arrOfCells[2][1].innerHTML = '+';
arrOfCells[1][0].setAttribute('id', 'minus');
arrOfCells[1][0].setAttribute('onclick', 'Command(this)');
arrOfCells[1][0].innerHTML = '-';
arrOfCells[2][0].setAttribute('id', 'multiply');
arrOfCells[2][0].setAttribute('onclick', 'Command(this)');
arrOfCells[2][0].innerHTML = '*';
arrOfCells[1][1].setAttribute('id', 'division');
arrOfCells[1][1].setAttribute('onclick', 'Command(this)');
arrOfCells[1][1].innerHTML = '/';
arrOfCells[0][1].setAttribute('id', 'equal');
arrOfCells[0][1].setAttribute('onclick', 'calculate()');
arrOfCells[0][1].innerHTML = '=';
arrOfCells[0][0].setAttribute('id', 'point');
arrOfCells[0][0].setAttribute('onclick', 'point()');
arrOfCells[0][0].innerHTML = '.';

function point() {
  document.getElementById('textarea').value += '.';
}

function Command(ourCommand) {
  command = ourCommand.id;
  switcher = false;
  ourValue = document.getElementById('textarea').value + '\n';
  document.getElementById('command').innerHTML = '<h3>' + ourCommand.innerHTML + '</h3>';
}

function showNum(ourCell) {
  if (swOfClear) {clean()};
  swOfClear = false;
  if (switcher == true) {
    var value =  parseInt(ourCell.id, 10);
    if (document.getElementById('textarea').value.indexOf('.', 0) > -1) {
      for (var i = 0; i < counterOfDecimals; i++) {
      value = value / 10;
      }
    input1Row = input1Row + value;
    input1Row.toFixed(counterOfDecimals);
    counterOfDecimals++;
    }
    else {input1Row = input1Row * 10 + value};
    console.log(input1Row);
    document.getElementById('textarea').value = input1Row;

  }
  else {
    var value = parseInt(ourCell.id, 10);
    if (document.getElementById('textarea').value.split('\n')[1].indexOf('.', 0) > -1) {
      for (var i = 0; i < counterOfDecimals; i++) {
      value = value / 10;
      }
    input2Row = input2Row + value;
    counterOfDecimals++;
    }
    else {input2Row = input2Row * 10 + value};
    console.log(input2Row);
    document.getElementById('textarea').value = ourValue + input2Row;
  }
}

function calculate() {
    operandArea = document.getElementById('textarea').value;
    var strings = operandArea.split('\n');
  a = parseFloat(strings[0], 10);
  b = parseFloat(strings[1], 10);
  switch (command) {
    case 'plus':
      result = a + b;
      break;

    case 'minus':
      result = a - b;
      break;

    case 'multiply':
      result = a * b;
      break;

    case 'division':
      result = a / b;
      break;

    default:
      if (a) {result = a;};
      if (b) {result = b;};
  }

 document.getElementById('textarea').value = operandArea + '\n' + result;
  switcher = true;
  swOfClear = true;
}