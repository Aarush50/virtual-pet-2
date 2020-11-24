//Create variables here
var dog,dogSad,dogHappy,foodStock,foodS,database;
var fedTime,lastFed;
var Foodobj;
var feedpet,addfood;
function preload()
{
  dogSad=loadImage("dogImg.png");
  dogHappy=loadImage("dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000, 400);
  
  Foodobj=new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStocks);

  dog=createSprite(800,200,150,150);
  dog.addImage(dogSad);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87);
Foodobj.display();

fedTime=database.ref('FeedTime');
fedTime.on("value",function(data) {
   lastFed=data.val();
});

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+lastFed%12+"PM",350,30);
}
else if(lastFed==0){
  text("Last Feed:12 AM",350,30);
}
else{
  text("Last Feed:"+lastFed+"AM",350,30)
}

  drawSprites();
  //add styles here

}
function readStocks(data){
  foodS=data.val();
  Foodobj.updatefoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogHappy);

  foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodobj.getFoodStock(),
    fedTime:hour()
  })
}
function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}


