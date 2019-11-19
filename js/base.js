var tool={
    //继承
    inherit:function(target,origin){    //目标对象，源对象
        var F=function(){}; //中间层
        F.prototype=origin.prototype;
        target.prototype=new F();
        target.prototype.constructor=target;    //修正一下构造函数
    },
    //扩展
    extends:function(origin){
        var target=function(){
            //私有属性的继承
            origin.apply(this,arguments);
            return this;
        }

        this.inherit(target,origin);
        return target;  //需要返回一个函数，因为需要生成实例，需要用new生成
    },

    //单例模式
    single:function(origin){
        var singleResult=(function(){
            var intance;

            return function(){
                if(typeof intance == 'object'){ //看一下是不是第二次进来
                    return intance;
                }

                //下面是第一次进来
                origin && origin.apply(this,arguments);
                intance=this;
            }
        })();

        origin && this.inherit(singleResult,origin);
        return singleResult;
    }
};
/* 
function Square(x,y,width,height){
    this.x=x;
    this.y=y;
    this.width=width;
    this.height=height;
}
Square.prototype.collied=function(){
    console.log('collied method');
};


var SnakeHead=tool.single(Square);
var s1=new SnakeHead(10,10,100,100);
var s2=new SnakeHead(20,20,300,400);
console.log(s1===s2); */


