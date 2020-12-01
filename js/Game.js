class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car1.addImage(car1Img);
    car2 = createSprite(300,200);
    car2.addImage(car2Img);
    car3 = createSprite(500,200);
    car3.addImage(car3Img);
    car4 = createSprite(700,200);
    car4.addImage(car4Img);
    cars = [car1,car2,car3,car4];
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //var display_position = 130;
      background("blue");
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      var index = 0;
      var x = 185;
      var y;
      for(var plr in allPlayers){
        index = index+1;
            x = x+230
            y = displayHeight - allPlayers[plr].distance;
            cars[index-1].x = x;
            cars[index-1].y = displayHeight - allPlayers[plr].distance;;
        if(index === player.index){
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
          fill("red");
          ellipse(x,y+70,30,30);
        }

        //display_position+=20;
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(player.distance>4150){
         gameState = 2;
    }
    drawSprites();
  }
  end(){
    console.log("Game Over");
  }
}
