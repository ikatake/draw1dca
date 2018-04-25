/*
 * Project	:1dca
 * Version	:1.0.0
 * Written	:ikatake(ikatake@gmail.com)
 */
/*
 * Version Up History
 * V.1.0.0 一応完成
 */
window.addEventListener("load", main, false);
//
var cl;
var intvl = false;
var me;
var rule;
var szCl;
var color;
var maxGene;

function main() {
	var canvas = document.getElementById('myCanvas');
	/* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
	if ( ! canvas || ! canvas.getContext ) {
		return false;
	}
	//初期画面を表示
	draw(canvas);
	document.getElementById('btnDraw').addEventListener(
		"click", function(){
			draw(canvas);
		}, false);
}

function getValues() {
	rule = parseInt(document.getElementById('txtRule').value, 10);
	maxGene = parseInt(document.getElementById('txtGene').value, 10);
	szCl = parseInt(document.getElementById('txtSzCl').value, 10);
	color = document.getElementById('txtColor').value;
}

function draw(canvas) {
	getValues();
	var width = maxGene * 2 + 1;
	var cells = [];
	var i;
	initCells(cells, width);
	initCanvas(canvas, width * szCl, (maxGene+1) * szCl);
	for(i = 0; i < maxGene; i++) {
		drawCells(canvas, cells, i, color, szCl);
		getNextStates(rule, cells);
	}
	drawCells(canvas, cells, i, color);
}

function initCells(cells, width) {
	var i;
	for(i = 0; i < width; i++){
		cells[i] = 0;
	}
	cells[(width - 1) / 2] = 1;
}

function initCanvas(canvas, width, height){
	canvas.width = width;
	canvas.height = height;
}

function getNextStates(rule, cells) {
	var width = cells.length
	var nextCells = new Array(width);
	var i = 0;
	var right = 0;
	var left = 0;
	var center = 0;
	for(i = 0; i < width; i++) {
		left = cells[ ( i - 1 ) % width ];
		center = cells[ i ];
		right = cells[ ( i + 1 ) % width ];
		nextCells[i] = getNextState(rule, left, center, right);
	}
	for(i = 0; i < cells.length; i++) {
		cells[i] = nextCells[i]
	}
}

function getNextState(rule, l, c, r) {
	var num = 0;
	num = ( l * 4 ) + ( c * 2) + r;
	return ( rule >> num ) % 2;
}

function drawCells(canvas, cells, y, color, szCl) {
	var l = cells.length;
	var x;
	var ctx = canvas.getContext("2d");
	var px;
	var py = y * szCl;
	ctx.fillStyle = color;
	for(x = 0; x < l; x++) {
		if( cells[x] == 1 ) {
			px = x * szCl;
			ctx.fillRect(px, py, szCl, szCl);
		}
	}
}
