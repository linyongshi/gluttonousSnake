/* 
	这个文件用来处理蛇相关的逻辑
 */
var snake=new Snake();
snake.head=null;    //蛇头，用来记录蛇头的相关信息
snake.tail=null;    //蛇尾，用来记录蛇头的相关信息

var directionNum={	//处理蛇走的方向
	left:{
		x:-1,
		y:0
	},
	right:{
		x:1,
		y:0
	},
	top:{
		x:0,
		y:-1
	},
	bottom:{
		x:0,
		y:1
	}
};


snake.init=function(){
	//首先要创建一些蛇的组成部分（蛇头、蛇身）
	var snakeHead=SquareFactory.create('SnakeHead',3,1,'deeppink');
	var snakeBody1=SquareFactory.create('SnakeBody',2,1,'green');
	var snakeBody2=SquareFactory.create('SnakeBody',1,1,'green');

	//把snake.head与snake.tail的值记录一下
	snake.head=snakeHead;    //蛇头
	snake.tail=snakeBody2;   //蛇尾

	//把元素添加到页面当中
	ground.remove(snakeHead.x,snakeHead.y);
	ground.append(snakeHead);

	ground.remove(snakeBody1.x,snakeBody1.y);
	ground.append(snakeBody1);

	ground.remove(snakeBody2.x,snakeBody2.y);
	ground.append(snakeBody2);


	//需要把三个元素关联起来，是因不动的时候要让它们整体动，而不是一个一个动
	//链表
	snakeHead.next=snakeBody1;
	snakeHead.last=null;

	snakeBody1.next=snakeBody2;
	snakeBody1.last=snakeHead;
	
	snakeBody2.next=null;
	snakeBody2.last=snakeBody1;

	this.dirction=directionNum.right;	//这条属性用来存储蛇要走的方向，在一上来我默认让它往右走
}


//用了方向处理信息后，根据当前蛇接下来要走的方向去获取到要碰撞的那个方块
snake.getCollidSquare=function(){
	//要碰撞的方块是需要根据蛇头来算的，蛇头走一次的那个方块就是碰撞的方块，所以用蛇头的坐标+走一次的坐标=碰撞方块的坐标
	var square=ground.SquareTable[this.head.y+this.dirction.y][this.head.x+this.dirction.x];
	//console.log(square);

	snake.strategies[square.collied()](square);
}

//这个对象里放的就是碰撞后不同类型的处理方式
snake.strategies={
	move:function(square,fromat){
		//console.log('move')
		//以旧蛇头的坐标创建一个新身体
		var newBody=SquareFactory.create('SnakeBody',snake.head.x,snake.head.y,'green');
		//更新链表的关系。由于这里面没有body1，只有head与新方块。所以body1需要通过head去找到
		newBody.next=snake.head.next;	//把新方块的next(左边)变成body1
		newBody.next.last=newBody;		//把蛇头的位置改成新方块（通过body1去改的）
		newBody.last=null;	//新蛇头在下面去更新

		ground.remove(snake.head.x,snake.head.y);
		ground.append(newBody);

		

		//以碰撞方块的位置去创建一个新蛇头
		var newHead=SquareFactory.create('SnakeHead',square.x,square.y,'deeppink');
		newHead.next=newBody;
		newHead.last=null;
		newBody.last=newHead;	//新创建的蛇头在这里重新赋值

		ground.remove(square.x,square.y);
		ground.append(newHead);

		snake.head=newHead;	//更新信息


		//删除最后一个身体（蛇尾）
		if(!fromat){	//如果用户传了fromat参数就表示现在要吃，吃的话，就不能删除了
			var newFloor=SquareFactory.create('Floor',snake.tail.x,snake.tail.y,'orange');
			ground.remove(snake.tail.x,snake.tail.y);
			ground.append(newFloor);
			snake.tail=snake.tail.last;	//更新信息
		}
		
	},
	eat:function(square){
		//console.log('eat')
		this.move(square,true);
		createFood();
		game.score++;
	},
	die:function(){
		//console.log('die')
		game.over();

	}
}