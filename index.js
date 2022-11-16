let cvs= document.getElementById("canvas");
let ctx=cvs.getContext("2d");

let box=32;
let move;
let score=0;
let sound=true;

let ground=new Image();
ground.src="image/ground.png";

let food= new Image();
food.src="image/food.png";

let gameover= new Image();
gameover.src="image/over.png";

let dead=new Audio();
dead.src="image/dead.mp3";

let up=new Audio();
up.src="image/down.mp3";

let down=new Audio();
down.src="image/down.mp3";

let right=new Audio();
right.src="image/down.mp3";

let eat=new Audio();
eat.src="image/eat.mp3";

let left=new Audio();
left.src="image/down.mp3";

// snake array
let snake=[];
snake[0]=
{
    x: 4*32,
    y:7*32
};

//food object

let foodi=
{
    x:Math.floor(Math.random() *17 +1)*box,
    y:Math.floor(Math.random()*15 + 3)*box,
}

//event listener

document.addEventListener("keydown",function(event)
    {
        if(event.keyCode==37 && move!="right")
        {
            if(sound){
            right.play();}
            move="left";
        }
        else if(event.keyCode==38 && move!="down")
        {
            if(sound){
                
            up.play();}
            move="top";
        }
        else if(event.keyCode==39 && move!="left")
        {
            if(sound){
                left.play();}
            
            move="right";
        }
        else if(event.keyCode==40 && move!="top")
        {
            if(sound){
                down.play();}
            move="down";
        }
        console.log(move);
    
       
    }
)

function draw()
{
    for(let i=0;i<snake.length;i++)
    {
        ctx.fillStyle= (i==0) ? "black":"white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        ctx.strokeStyle="#000000";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    //snake old position
    
    let snakeX=snake[0].x;
    let snakeY=snake[0].y;
    
    if(move=="left")
    {
        snakeX=snakeX-box;
        
    }
    else if(move=="top")
    {
        snakeY-=box;

    }
    else if(move=="right")
    {
        snakeX+=box;
        
    }
    else if(move=="down")
    {
        snakeY+=box;
    }

    // snake new head
    let newHead=
    {
        x:snakeX,
        y:snakeY,
    }
    if(snakeX==foodi.x && snakeY==foodi.y)
    {
        eat.play();
        score+=5;
        foodi.x=Math.floor(Math.random() *17 +1)*box;
        foodi.y=Math.floor(Math.random()*15 + 3)*box;
    }
    else
    {
        snake.pop();
    }

    function collision(head,array)
    {
        for(let i=0;i<array.length;i++)
        {
            if(newHead.x==array[i].x && newHead.y==array[i].y)
            {
                return true;
            }
        }
        return false;
    }

    // gameover logic
    if(snakeX<box || snakeX> box*17 || snakeY<box*3 || snakeY>box*17 || collision(newHead,snake))
    {
        sound=false;
        dead.play();
        clearInterval(game);
        ctx.drawImage(gameover,0,0,512,371,cvs.width/2-100,cvs.height/2-120,250,250);
    }


    snake.unshift(newHead);
    ctx.fillstyle="#ffffff";
    ctx.font="40px impact";
    ctx.fillText(score,box*2.2,box*1.6);



    ctx.drawImage(food,0,0,box,box,foodi.x,foodi.y,box,box);

}
function loop()
{
    ctx.drawImage(ground,0,0,608,608,0,0,608,608);
    draw();
}
let game=setInterval(loop,80);