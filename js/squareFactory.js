/* 
	这个文件是通过工厂模式去创建所有的小方块
 */

function SquareFactory(){

}

//创建对象的接口。这里面其实是要让子工厂继承父工厂
SquareFactory.create=function(type,x,y,color){  //这个type用来决定使用哪个子工厂去创建对应的方块
	//1、检测用户传的type是否正确
	if(typeof SquareFactory.prototype[type] == 'undefined'){
		throw 'no this type 傻X';
	}

	//2、继承
	if(SquareFactory.prototype[type].prototype.__proto__!=SquareFactory.prototype){
		SquareFactory.prototype[type].prototype=new SquareFactory();
	}


	//3、通过子工厂创建对应的方块
   var newSquare=new SquareFactory.prototype[type](x,y,color);
   return newSquare;
}

SquareFactory.prototype.init=function(square,color,ms){
	//由于每个子工厂都需要渲染，所以把渲染单独提出来，做为一个函数，放到构造函数身上，然后实例继承后就都能用了

   square.viewContent.style.position='absolute';
   square.viewContent.style.width=square.width+'px';
   square.viewContent.style.height=square.height+'px';
   square.viewContent.style.left=square.x*squareWidth+'px';
   square.viewContent.style.top=square.y*squareWidth+'px';
   square.viewContent.style.backgroundColor=color;

   square.collied=function(){	//在生产的时候需要给每一个方块身上添加一个方法，这个方法用来返回一个方类型。但是这个类型是由子工厂主动传递进来
	   return ms;
   }
}

//定义子工厂，把方法放到SquareFactory的原型身上
SquareFactory.prototype.Floor=function(x,y,color){
	var floor=new Floor(x,y,squareWidth,squareWidth);   //还是通过自己对应的构造函数创建实例
	this.init(floor,color,snakeColliedResult.move);
	return floor;
}

SquareFactory.prototype.Wall=function(x,y,color){
	var wall=new Wall(x,y,squareWidth,squareWidth);   //还是通过自己对应的构造函数创建实例
	this.init(wall,color,snakeColliedResult.die);
	return wall;
}

//蛇头的子工厂
SquareFactory.prototype.SnakeHead=function(x,y,color){
	var snakeHead=new SnakeHead(x,y,squareWidth,squareWidth);   //还是通过自己对应的构造函数创建实例
	this.init(snakeHead,color,snakeColliedResult.die);
	snakeHead.upDate(x,y);  //创建的时候记得更新一下它身上的信息哦~
	return snakeHead;
}
//蛇身的子工厂
SquareFactory.prototype.SnakeBody=function(x,y,color){
	var snakeBody=new SnakeBody(x,y,squareWidth,squareWidth);   //还是通过自己对应的构造函数创建实例
	this.init(snakeBody,color,snakeColliedResult.die);
	return snakeBody;
}
//食物的子工厂
SquareFactory.prototype.Food=function(x,y,color){
	var food=new Food(x,y,squareWidth,squareWidth);   //还是通过自己对应的构造函数创建实例
	this.init(food,color,snakeColliedResult.eat);
	food.upDate(x,y);  //创建的时候记得更新一下它身上的信息哦~
	return food;
}

