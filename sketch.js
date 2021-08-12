var Airballoon,balloonImage1,balloonImage2;
var database;
var height;
var heiref;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("HotAirBallon01.png");
   balloonImage2=loadAnimation("HotAirBallon01.png","HotAirBallon01.png",
   "HotAirBallon01.png","HotAirBallon02.png","HotAirBallon02.png",
   "HotAirBallon02.png","HotAirBallon03.png","HotAirBallon03.png","HotAirBallon03.png");
  }

//Function to set initial environment
function setup() {

   database=firebase.database();

  createCanvas(1500,700);

  Airballoon=createSprite(250,650,150,150);
  Airballoon.addAnimation("hotAirBalloon",balloonImage1);
  Airballoon.scale=0.5;

 
  

  heiref=database.ref('balloon/height')

  heiref.on("value",function(data)
  {
    height=data.val();
    Airballoon.x=height.x;
    Airballoon.y=height.y;
  })

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    Airballoon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    Airballoon.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    Airballoon.addAnimation("hotAirBalloon",balloonImage2);
    Airballoon.scale=Airballoon.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    Airballoon.addAnimation("hotAirBalloon",balloonImage2);
    Airballoon.scale=Airballoon.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}


function updateHeight(x,y)
{
  database.ref("balloon/height").update({
    x:height.x+x,
    y:height.y+y
  })
}



function showError(){
  console.log("Error in writing to the database");
}
