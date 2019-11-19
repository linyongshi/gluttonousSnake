/* 
    这个文件用来创建场景（墙，地板）
 */

var ground=new Ground(positionX,positionY,td*squareWidth,tr*squareWidth);
ground.init=function(){ //初始化整个游戏的场景
    //第一步：添加场景的大方块
    this.viewContent.style.position='absolute';
    this.viewContent.style.width=this.width+'px';
    this.viewContent.style.height=this.height+'px';
    this.viewContent.style.left=this.x+'px';
    this.viewContent.style.top=this.y+'px';
    this.viewContent.style.backgroundColor='#0ff';

    document.body.appendChild(this.viewContent);    //把大方块添加到页面当中

    //第二步：添加墙以及地板的方块

    this.SquareTable=[];    //这个数组用来存储所有的小方块。这个数组是一个二维数组，为了能让div与行和列一一对应

    for(var y=0;y<tr;y++){  //外层循环的是行数（对应的是y轴的坐标）
        this.SquareTable[y]=new Array(td);  //走一次创建一个行，一个行里有td个列
        for(var x=0;x<td;x++){  //里层循环的是列数
            if(x==0 || x==td-1 || y==0 || y==tr-1){
                //这个条件成立说明，现在走到的是第一行或者最后一行，或者第一列，或者最后一列。这时候要创建的是墙
                var newSquare=SquareFactory.create('Wall',x,y,'black');
            }else{
                //走到这的时候要创建的是地板
                var newSquare=SquareFactory.create('Floor',x,y,'orange');   //{}    div
            }
           
           this.viewContent.appendChild(newSquare.viewContent); //把创建好的小方块都添加到gournd里面
           this.SquareTable[y][x]=newSquare;    //把所有的小方块添加到数组当中
        }
    }
    //var abc=SquareFactory.create('Wall',1,1,'red'); //通过工厂模式创建方块
}

//添加一个数据
ground.append=function(square){ //参数为方块对象
    this.viewContent.appendChild(square.viewContent);
    this.SquareTable[square.y][square.x]=square;
}
//删除一个数据
ground.remove=function(x,y){ //参数为坐标
    var curSquare=this.SquareTable[y][x];   //通过坐标找到要删除的那个小方块
    this.viewContent.removeChild(curSquare.viewContent);
    this.SquareTable[y][x]=null;
}

