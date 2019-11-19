/* 
	这个文件用来存储一些全局性的东西
		1、常用的变量
		2、创建一个方块的构造函数
		3、根据方块的构造函数，创建各个元素（蛇、蛇头、食物、墙。。。）
		4、
 */

 //游戏区域的大小
var td=30;  //列数
var tr=30;  //行数

//方块的宽度
var squareWidth=20;

//游戏区域一开始的坐标
var positionX=200;
var positionY=100;

//蛇的移动间隔时间
var intervalTime=300;

//定义方块构造函数
function Square(x,y,width,height,dom){
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.viewContent=dom||document.createElement('div');    //如果用户没有传，那我就给它创建一个div
}
Square.prototype.collied=function(){
	console.log('collied method');
};
Square.prototype.upDate=function(x,y){	//这个方法是用来更新单例对象身上的属性
	this.x=x;
	this.y=y;

	this.viewContent.style.left=x*squareWidth+'px';
	this.viewContent.style.top=y*squareWidth+'px';
};


//创建元素对应的构造函数
var Ground=tool.single(Square);     //整个游戏的场景，它是包含（从结构上看）其它所有元素
var Floor=tool.extends(Square);     //地板，是由好多个小方块而组成
var Wall=tool.extends(Square);     //围墙

var SnakeHead=tool.single(Square);   //蛇头
var SnakeBody=tool.extends(Square); //蛇身，它由很多个小方块组成
var Snake=tool.single();     		//蛇
var Food=tool.single(Square);     	//食物

var Game=tool.single();


//蛇头与其它方块碰撞后的返回值（是类型）
var snakeColliedResult={
	move:'move',
	eat:'eat',
	die:'die'
}