var player,
    laserNo = 0,
    spaceShip, laser,
    spaceShipNo = 0,
    spaceShipDown = 0,
    spaceShipGroup, laserGroup, weponGroup, gameState = "play"


function preload() {
    alienShip = loadImage("/images/alien.png")
    spaceCraftImg = loadImage("/images/player.png")
}


function setup() {
    var canvas = createCanvas(500, 500)

    player = createSprite(width / 2, height - 40, 10, 10)
    player.addImage(spaceCraftImg)
    player.scale = 0.15;
    player.debug = false
    player.setCollider("rectangle", 0, 0, 450, 450)

    borderLeft = createSprite(0, height / 2, 5, height)
    borderRight = createSprite(width, height / 2, 5, height)

    spaceShipGroup = new Group()
    laserGroup = new Group()
    weponGroup = new Group()

}

function draw() {
    background(0)

    fill("silver")
    textSize(20)
    text("Target Destroy :" + spaceShipDown + "/30",10,20)

    laserGroup.setVelocityYEach(-10)

    if (laserGroup.isTouching(spaceShipGroup)) {
        spaceShipGroup.setLifetimeEach(0)
        laserGroup.setLifetimeEach(0)
        spaceShipDown += 1
        spaceShipNo = 30 - spaceShipDown
    }
    if (weponGroup.isTouching(player)) {
        gameState = "end";
    }

    if(spaceShipDown === 30){
        gameState ="win"
    }
    
    spaceShipGroup.bounceOff(borderLeft)
    spaceShipGroup.bounceOff(borderRight)
   
    Game_End()
    Game_Win()

    if (gameState === "play") {
        spawnspaceShips()
        laserMaking()
        playermechanics()
        drawSprites()
    }



}


function playermechanics() {

    if (keyDown(RIGHT_ARROW)) {
        player.x += 5
    }

    if (keyDown(LEFT_ARROW)) {
        player.x -= 5
    }

    player.bounceOff(borderLeft)
    player.bounceOff(borderRight)

}


function spawnspaceShips() {
    if (spaceShipNo !== 30) {
        if (frameCount % 40 === 0) {
            spaceShipNo += 1

            var x = random(20, 480)
            var y = Math.round(random(10, 350))

            var spaceShip = createSprite(x, y, 40, 10);
            spaceShip.addImage(alienShip)
            spaceShip.scale = 0.15;
            spaceShip.velocityX = -5;

            spaceShip.setCollider("rectangle", 0, -20, 300, 400)
            spaceShip.debug = false

            spaceShip.lifetime = 800;

            spaceShipGroup.add(spaceShip);
        }

        if (frameCount % 40 === 0) {
            var laser = createSprite(x, y, 5, 10);
            laser.shapeColor = "red"
            laser.lifetime = 600;
            laser.velocityY = 10

            weponGroup.add(laser);

            var laser1 = createSprite(x, y - 20, 5, 10);
            laser1.shapeColor = "red"
            laser1.lifetime = 600;
            laser1.velocityY = 10

            weponGroup.add(laser1);
        }

    }
}
function laserMaking() {
    if (keyWentDown("space")) {
        laser += 1
        var wepon = createSprite(player.x, player.y-20, 5, 10);
        wepon.shapeColor = "red"

        wepon.lifetime = 200;

        laserGroup.add(wepon);
    }
}

function Game_End() {
    if (gameState === "end") {
        fill("white")
        textSize(30)
        text("Game Over", width / 2 - 100, height / 2)
    }
}
function Game_Win() {
    if (gameState === "win") {
        fill("white")
        textSize(30)
        text("You Won!!!", width / 2 - 100, height / 2)
    }
}