var addFood,feed;
var fedTime, lastFed;
let food = [];
var h;
var milk,ml;
var foods, foodStock;
var dog,happyDog;
var database;
var back;
var Dog;
var cTime;
function preload(){
  //Load images here
  happyDog = loadImage("images/dogImg.png");
  sadDog = loadImage("images/dogImg1.png");
  ml = loadImage("images/Milk.png");
  bed = loadImage("images/BedRoom.png");
  hall = loadImage("images/Hall.png");
  garden = loadImage("images/Garden.png");
}
function setup(){
    database = firebase.database();

    createCanvas(1100,700);

 //   lastFed = 1;
     var foodStock = database.ref('FoodS/food');
    foodStock.on("value",function(data){
      foods = data.val();
    }) 
    
    var pup = database.ref('dog');
    pup.on("value",function(data){
      Dog = data.val();
    }) 
 // foodObj = new Food(400,250)
//console.log(reedStock);
    feed = createButton("Feed the dog");
    feed.position(800,95);
    feed.mousePressed(feedDog);

    addFood = createButton("Add food for the dog");
    addFood.position(900,95);
    addFood.mousePressed(addFoods);

    dog = createSprite(500,250,10,10);
    dog.addImage(sadDog);
    dog.scale=0.1;
    dog.visible=true; 

    milk = createSprite(400,250);
    milk.addImage(ml);
    milk.scale=0.1
    milk.visible=false;

    //back = createSprite(250,250)
    //back.addImage(bed);
    //back.scale=1
   // back.hide()

   cTime = hour();

}

function draw(){
  
   if(Dog==='full')
      {
        if(cTime===(lastFed))
        {
          background(bed);
          dog.visible=false; 
          milk.visible=false; 
        }
        else if(cTime===(lastFed+1))
        {
          background(hall);
          dog.visible=false;
          milk.visible=false;  
        }
        else if(cTime===(lastFed+2))
        {
          background(garden);
          dog.visible=false;
          milk.visible=false; 

        }
        else if(cTime===(lastFed+3)){
          Dog='hungry';
        }
       
      }
      else
      {
      background('green');
      dog.visible=true; 

      }
 // background("green");
    textSize(13)
    fill(255,255,255)
   // text('hi',100,200)
    //text(Dog,250,250)
     fedTime = database.ref('FeedTime')
    fedTime.on("value",function(data){
      lastFed = data.val();
    }) 
      fill(0,0,0)
    textSize(25)
text ("foods:"+foods,300,40);
for ( var h = 0; h <food.length; h++)
{
food[h].display();
}
    fill(255,255,254);
    textSize(15);
    if(lastFed>=12){
      text("Last Feed : " + lastFed%12 + "PM",50,30)
    }
    else if(lastFed==0){
      text("Last Feed : 12 AM",50,30)
    }
    else{
      text("Last Feed :"+ lastFed +"AM",50,30)
    }

    if(foods==0||cTime>lastFed)
    {
    Dog = 'full';
    textSize(35)
    fill(0,0,0)
      if(lastFed>=12){
        text("Feed the dog at :"+(lastFed+4)%12+"PM",700,50)
      }
      else{
        text("Feed the dog at :"+(lastFed+4)%12+"AM",700,50)
      }
  }
      drawSprites();
}

function feedDog (){
  if(foods>0 &&  Dog==='hungry'){
    text(Dog,200,200)
    dog.addImage(happyDog)
  foods= foods-1;
  milk.visible=true;
 
  database.ref('/').update({
      FeedTime:hour()
  })
  milk.visible=true;
  }
}
function addFoods(){
  if (foods<12){
  dog.addImage(sadDog)
  foods++;
  milk.visible=false;
}
Dog = 'hungry'

     food.push(new Food)
  database.ref('/').update({
    FoodS: foods
})
}