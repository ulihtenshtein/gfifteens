// ---------constant ---------------------
var CHECKED_COLOR = 'green';
var FIFTEEN_COLOR = 'red';
var EMPTY_COLOR = 'blue';
var ROWS = 4;
var COLUMS = 4;
// -------class Cell ---------------------
function Cell (color) {
  this.color = color;
  this.checked = false;
  this.check = function () {
    this.setColor(CHECKED_COLOR);
    this.checked = true;
  };
  this.uncheck = function () {
    this.setColor();
    this.checked = false;
  };
  this.setColor = function (color) {
     this.style.backgroundColor = color || this.color;
  };
};
//---------end class Cell-----------------
//---------functions----------------------
function mix (dst, src) {
	var o = {};
        for( var key in src ) {
           if ((typeof o[key] == 'undefined') || !dst[key]  ) dst[key] = src[key]; 
	};
        return dst;
};
function swap ( cell1, cell2) {
     var a = cell1.color;
     cell1.color = cell2.color;
     cell2.color = a;
     a = cell1.innerHTML;
     cell1.innerHTML = cell2.innerHTML;
     cell2.innerHTML = a;
};
function isNear(cell1, cell2) {
                  // alert(this.cellIndex);
                   //alert(this.parentNode.rowIndex);
      var cell1Index = cell1.cellIndex;
      var cell2Index = cell2.cellIndex;
      var row1Index = cell1.parentNode.rowIndex;
      var row2Index = cell2.parentNode.rowIndex;

      switch( row1Index - row2Index ) {
          case 0: if (Math.abs(cell1Index - cell2Index) == 1 ) return true;
                  break;
          case 1:
          case -1: if ( cell1Index == cell2Index ) return true;
                   break;
      };
     return false;
};
function getArray(length) {
    var arr = [];
    for ( var i = 0; i < length; i++) arr[i] = i + 1;
    return arr;
};
function getRandomNumberArray(length) {
     var arr = getArray(length);
     arr.sort(function(){return Math.random() - 0.5;});
     return arr;
};
//----------------------------------------

var table = document.createElement('table');
table.caption = document.createElement('caption');
table.caption.innerHTML = 'Fifteens';

table.style.border = '1px solid black';
table.rules = 'all';
table.style.fontSize = '50px';
table.style.margin = 'auto';
table.style.textAlign = 'center';
table.checked = [];

setTable(table, ROWS, COLUMS);

document.body.appendChild(table);

function setTable(table, rows, colums) {
   var t = table;
   var arr = getRandomNumberArray(rows*colums);

   for (var i = 0; i < rows; i++) {
      var tr = t.insertRow(-1);
      for (var j = 0; j < colums; j++) {
          var td = tr.insertCell(-1);
                    
          
           if ( arr[i * colums + j] <  ROWS * COLUMS ) {
               td.innerHTML  =  arr[i * colums + j]; 
               var cell = new Cell(FIFTEEN_COLOR);     
           } else { cell = new Cell(EMPTY_COLOR);};
          (td = mix( td, cell)).setColor();
	   td.onclick = function () {
               if( t.checked.length == 0 ){
                   t.checked.push(this);
                   this.check();
                   return;
               };
               if ( this.checked ) {
                   this.uncheck();
                   return;
               };
               var  cell = t.checked[0];
               if( cell.color != this.color && isNear(cell, this)){
                  swap(cell, this);
               };
               cell.uncheck();
               cell.setColor();
               this.setColor();
               t.checked.pop();
          };
	  
	  td.style.width = '100px';
	  td.style.height = '100px';
      };
   };
   return t;
};
