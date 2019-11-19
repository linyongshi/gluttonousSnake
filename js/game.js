/* 
这个文件主要用来处理游戏玩法的逻辑
 */
var game=new Game();
game.timer=null;
game.score=0;
game.init=function(){
	ground.init();
	snake.init();

	createFood();	//创建食物

	document.onkeydown=function(ev){
		if(ev.which==37 && snake.dirction!=directionNum.right){	//蛇在往右边走的时候，不允许按下左键
			snake.dirction=directionNum.left;
		}else if(ev.which==38 && snake.dirction!=directionNum.bottom){
			snake.dirction=directionNum.top;
		}else if(ev.which==39 && snake.dirction!=directionNum.left){
			snake.dirction=directionNum.right;
		}else if(ev.which==40 && snake.dirction!=directionNum.top){
			snake.dirction=directionNum.bottom;
		}
	}

	var btn=document.querySelector('button');
	btn.onclick=function(){
		game.start();
	};
};
game.start=function(){
	this.timer=setInterval(function(){
		snake.getCollidSquare();
	}, intervalTime);
}
game.over=function(){
	clearInterval(this.timer);
	alert(this.score);
}
game.init();


function createFood(){
	var x,y;

	var flag=true;	//循环跳出的条件
	while(flag){
		//不能出现在墙上
		//Math.round(Math.random()*(y-x)+x)	x~y的随机数
		x=Math.round(Math.random()*(td-3)+1);
		y=Math.round(Math.random()*(tr-3)+1);

		//不能出现在蛇的身上
		var ok=true;	//for循环的跳出条件
		for(var node=snake.head;node;node=node.next){
			//循环蛇身上的方块，顺序为从蛇头到蛇尾。第二个参数意思是。如果这个方块存在，循环就会一直走。第三句话的意思为，走一次让节点变成前一个节点为
			if(x==node.x && y==node.y){
				//这个条件成立说明，现在随机生成的坐标与蛇身上方块的坐标一样了
				ok=false;
				break;
			}
		}

		if(ok){
			flag=false;
		}
	}

	//创建食物
	var food=SquareFactory.create('Food',x,y,'red');
	ground.remove(food.x,food.y);
	ground.append(food);
}

