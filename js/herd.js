window.onload = function() {

	var game = new Phaser.Game(960, 600, Phaser.AUTO, 'test', { preload: preload, create: create, update: update, render: render });

	function preload() {

		game.load.image('titleScreen', 'assets/title-screen.png');
	    game.load.image('starfield', 'assets/grass.jpg');
	    game.load.image('fence', 'assets/fence.png');
	    game.load.spritesheet('car', 'assets/dog.png', 80, 29);
    	game.load.image('tinycar', 'assets/sheep.png');

    	//game.load.physics('physicsData', 'assets/sprites.json');
	}

	var timeText;
	var introText;
	var checkedSheep = new Array();
	var fenceArea;
	var sheepInFence = 0;
	var gameState = "intro";
	var startTime = 0;
	var startButton;
	var stopButton;

	var currentSpeed = 0;
	var doorTween;
	var gameRunning = true;
	var fenceDoor;

	var s;

	function create() {

		//game.debug = true;
		s = game.add.tileSprite(0, 0, 960, 600, 'starfield');

		game.physics.startSystem(Phaser.Physics.P2JS);

		//  Create our collision groups. One for the player, one for the pandas
	    var dogCollisionGroup = game.physics.p2.createCollisionGroup();
	    var fencesCollisionGroup = game.physics.p2.createCollisionGroup();
	    var sheepCollisionGroup = game.physics.p2.createCollisionGroup();
	    game.physics.p2.updateBoundsCollisionGroup();

	    sheeps = game.add.group();
	    //sheeps.physicsBodyType = Phaser.Physics.ARCADE;
	    //sheeps.enableBody = true;
	    sheeps.checkWorldBounds = true;
	    for (var i = 0; i < 3; i++) {
	        var sheep = sheeps.create(game.rnd.integerInRange(200, 600), game.rnd.integerInRange(100, 300), 'tinycar');
	        //game.physics.p2.enable(sheep,false);
	        sheep.anchor.setTo(0.5, 0.5);
	        //game.physics.enable(sheep, Phaser.Physics.ARCADE);
	        //sheep.enableBody = true;
	        
	        game.physics.p2.enable(sheep);
	        sheep.name = "sheep"+i;
	        sheep.rotation = game.rnd.integerInRange(0, 360);
	        //sheep.body.debug = true;
			sheep.body.collideWorldBounds = true;
	        //  Tell the panda to use the pandaCollisionGroup 
	        sheep.body.setCollisionGroup(sheepCollisionGroup);

	        //  Pandas will collide against themselves and the player
	        //  If you don't set this they'll not collide with anything.
	        //  The first parameter is either an array or a single collision group.
	        //sheep.body.collides([sheepCollisionGroup, dogCollisionGroup]);
	        sheep.body.collides([sheepCollisionGroup, fencesCollisionGroup, dogCollisionGroup]);
	        
	        //sheep.body.velocity.x = 100;
			//sheep.body.velocity.y = 100;
			//sheep.body.velocity.x = game.rnd.integerInRange(-100, 100);
			//sheep.body.velocity.y = game.rnd.integerInRange(-100, 100);
			//game.physics.arcade.collide(sheep, sheeps, sheepHitSheep, null, this);
	    }
/*
	    sheeps.setAll('body.collideWorldBounds', true);
		sheeps.setAll('body.minBounceVelocity', 0);
*/
	    cursors = game.input.keyboard.createCursorKeys();
	    fences = game.add.group();
	    fences.enableBody = true;
	    fences.physicsBodyType = Phaser.Physics.P2JS;
	    
	    
	    var fence = fences.create(300, 400, 'fence');
	    fence.body.angle = 90;
	    //fence.body.debug = true;
	    fence.body.static = true;
	    fence.body.setRectangle(90, 10);
	    fence.body.setCollisionGroup(fencesCollisionGroup);
	    fence.body.collides([dogCollisionGroup, sheepCollisionGroup]);
		
		fence = fences.create(300, 480, 'fence');
		fence.body.angle = 90;
	    //fence.body.debug = true;
	    fence.body.static = true;
	    fence.body.setRectangle(90, 10);
	    fence.body.setCollisionGroup(fencesCollisionGroup);
	    fence.body.collides([dogCollisionGroup, sheepCollisionGroup]);
		
		fence = fences.create(340, 520, 'fence');
		fence.body.angle = 0;
		//fence.body.debug = true;
	    fence.body.static = true;
	    fence.body.setRectangle(90, 10);
	    fence.body.setCollisionGroup(fencesCollisionGroup);
	    fence.body.collides([dogCollisionGroup, sheepCollisionGroup]);
		
		fence = fences.create(420, 520, 'fence');
		fence.body.angle = 0;
		//fence.body.debug = true;
	    fence.body.static = true;
	    fence.body.setRectangle(90, 10);
	    fence.body.setCollisionGroup(fencesCollisionGroup);
	    fence.body.collides([dogCollisionGroup, sheepCollisionGroup]);
	    
		fence = fences.create(460, 480, 'fence');
		fence.body.angle = 90;
		//fence.body.debug = true;
	    fence.body.static = true;
	    fence.body.setRectangle(90, 10);
	    fence.body.setCollisionGroup(fencesCollisionGroup);
	    fence.body.collides([dogCollisionGroup, sheepCollisionGroup]);
		
		fence = fences.create(460, 400, 'fence');
		fence.body.angle = 90;
		//fence.body.debug = true;
	    fence.body.static = true;
	    fence.body.setRectangle(90, 10);
	    fence.body.setCollisionGroup(fencesCollisionGroup);
	    fence.body.collides([dogCollisionGroup, sheepCollisionGroup]);
		
		fence = fences.create(420, 360, 'fence');
		fence.body.angle = 0;
		//fence.body.debug = true;
	    fence.body.static = true;
	    fence.body.setRectangle(90, 10);
	    fence.body.setCollisionGroup(fencesCollisionGroup);
	    fence.body.collides([dogCollisionGroup, sheepCollisionGroup]);

		fenceDoor = fences.create(380, 360, 'fence');
		fenceDoor.body.angle = 90;
		//fence.body.debug = true;
	    fenceDoor.body.static = true;
	    fenceDoor.body.setRectangle(90, 10, -45, 0);
	    //console.log(fence.body);
	    fenceDoor.body.setCollisionGroup(fencesCollisionGroup);
	    fenceDoor.body.collides([dogCollisionGroup, sheepCollisionGroup]);
	    fenceDoor.anchor.setTo(1, 0.5);
		

		fenceArea = new Phaser.Rectangle(300, 360, 145, 155);

		doorTween = game.add.tween(fenceDoor.body).to( { angle: 0, x: 385, y: 360  }, 2000, Phaser.Easing.Linear.None, false);

	    dog = game.add.sprite(32, game.world.height - 150, 'car');
	    dog.anchor.setTo(0.5, 0.5);
	    game.physics.p2.enable(dog);
		//dog.body.debug = true;

		dog.body.setCollisionGroup(dogCollisionGroup);
		dog.body.collides([dogCollisionGroup, sheepCollisionGroup, fencesCollisionGroup]);
		
    	dog.animations.add('left', [1], 10, true);
    	dog.animations.add('right', [2], 10, true);
    	dog.animations.add('straight', [0], 10, true);

    	title = game.add.sprite(58, 100, 'titleScreen');
    	stateText = game.add.text(game.world.centerX,390,'Jaag alle schapen zo snel mogelijk in de omheining! \n\n Bestuur de hond met de pijltjestoetsen, \n klik of druk op de spatiebalk om te beginnen \n en gebruik de escape toets om te pauzeren.', { font: '24px Arial', fill: '#333', align : 'center' });
	    stateText.anchor.setTo(0.5, 0.5);
	    stateText.visible = true;

	    var scoreString = 'Time: 00:00';
    	timeText = game.add.text(10, 10, scoreString, { font: '24px Arial', fill: '#fff' });

    	startButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	stopButton = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    	game.input.onDown.add(clickFunction, this);
	}

	function clickFunction(){
		if(gameState == "intro") {
			stateText.visible = false;
			title.visible = false;
			startTime = Math.floor(game.time.totalElapsedSeconds());
			gameRunning = true;
			gameState = 'game';
		} /*else if(gameState == 'game'){
			resetGame();
			gameState = 'intro';
		}*/ else if(gameState == "end") {
			resetGame();
			gameState = 'intro';
		}
	}

	function resetGame(){
		dog.body.x = 32
		dog.body.y = game.world.height - 150;
		dog.body.rotation = 0;
		sheeps.forEachAlive(function(sh) {
			sh.body.x = game.rnd.integerInRange(200, 600);
			sh.body.y = game.rnd.integerInRange(100, 300);
			sh.body.setZeroVelocity();
	    	sh.body.setZeroRotation();
		}, this);
		sheepInFence = 0;
		gameRunning = false;
		fenceDoor.body.x = 380
		fenceDoor.body.y = 360;
		fenceDoor.body.angle = 90;
	}

	function update () {
		
		if (stopButton.isDown && gameState == 'game') { console.log("reset!"); gameState = 'intro'; resetGame(); stateText.visible = true;  }
		if (startButton.isDown) { clickFunction(); }
		//checkedSheep = new Array();
		sheepInFence = 0;
		if(gameState == 'game') {
		    sheeps.forEachAlive(moveSheep,this);  //make sheep flee from dog
		    game.physics.arcade.collide(dog, fences);
		    game.physics.arcade.collide(sheeps, fences);
		}
	    dog.body.setZeroVelocity();
	    dog.body.setZeroRotation();
	    
	    if(gameState == 'game') {
		    //console.log(sheepInFence +"&&"+ doorTween.isRunning);
		    if(sheepInFence == sheeps.length && !doorTween.isRunning) {
		    	console.log("gameState = game, but sheep in fence, tween door");
		    	doorTween.start();
		    	/*gameRunning = false;
		    	title.visible = true;
		    	stateText.text= "Goed gedaan! \n\n Klik of druk op de spatiebalk om het opnieuw te proberen.";
	        	stateText.visible = true;*/
	        	gameState = "end";
	        	dog.body.velocity.x = 0;
	        	dog.body.velocity.y = 0;
		    }

		    if (cursors.left.isDown && gameRunning)
		    {
		        //dog.angle -= 4;
		        dog.body.rotateLeft(50);
		        dog.animations.play('left');
		        
		        
		    }
		    else if (cursors.right.isDown  && gameRunning)
		    {
		        //dog.angle += 4;
		        dog.body.rotateRight(50);
		        dog.animations.play('right');
		    } else {
		    	dog.animations.play('straight');
		    }

		    if (cursors.up.isDown  && gameRunning)
		    {
		        //  The speed we'll travel at
		        currentSpeed = 100;
		        //console.log("upKey");
		        //dog.body.moveRight(400);
		    } else if (cursors.down.isDown  && gameRunning)
		    {
		        //  The speed we'll travel at
		        currentSpeed = -20;
		        //console.log("upKey");
		        //dog.body.moveRight(400);
		    }
		    else
		    {
		        if (currentSpeed != 0)
		        {
		        	if(currentSpeed > 4) {
		            	currentSpeed -= 4;
		        	} else if(currentSpeed < -4) {
		        		currentSpeed += 4;
		        	} else {
		        		currentSpeed = 0;
		        		//dog.body.velocity.x = 0;
		        		//dog.body.velocity.y = 0;
		        	}
		        }
		    }

		    
		    if (currentSpeed != 0)
		    {
		        //game.physics.arcade.velocityFromRotation(dog.rotation, currentSpeed, dog.body.velocity);
		        //console.log((Math.cos(dog.rotation)));
		        //point.setTo((Math.cos(this.game.math.degToRad(angle)) * speed), (Math.sin(this.game.math.degToRad(angle)) * speed));
		        dog.body.moveLeft(-(Math.cos(dog.rotation)*currentSpeed));
				dog.body.moveDown(Math.sin(dog.rotation)*currentSpeed);

		    }
		    
		    
		    var time = Math.floor(game.time.totalElapsedSeconds())-startTime;
		    var mins = ~~(time / 60);
			var secs = time % 60;
			var timeString = str_pad_left(mins,'0',2)+':'+str_pad_left(secs,'0',2);
			//console.log(timeString);
			timeText.text = "Time: "+timeString;
		} else if(gameState == 'end') {
			//console.log("gameState = end, show titleScreen and doorTween == "+doorTween.isRunning);
			gameRunning = false;
			//console.log(sheepInFence + " == " + sheeps.length  + " && " + !gameRunning  + " && " + !doorTween.isRunning);
			if(!gameRunning && !doorTween.isRunning) {
				console.log("gameState = end and gate is closed, show titleScreen");
		    	title.visible = true;
		    	stateText.text= "Goed gedaan! \n\n Klik of druk op de spatiebalk om het opnieuw te proberen.";
	        	stateText.visible = true;
	        }
		}

	}

	function render() {

	 //game.debug.body(dog);
     /*
     for (var i = 0; i < fences.length; i++)
     {
        game.debug.body(fences.children[i]);
     }
     */
     for (var i = 0; i < sheeps.length; i++)
     {
        game.debug.body(sheeps.children[i]);
     }
     
}

	function collisionHandler (sheep, veg) {

	    //sheep.kill();
	    //veg.kill();
	    sheep.x -= 10;
	    veg.x += 10;
	    console.log("collision");

	}


	function moveSheep (sheep) { 
		//game.physics.arcade.collide(sheep, sheeps, collisionHandler, null, this);
		//game.physics.arcade.collide(fences, sheep);
	     //game.physics.arcade.collide(sheep, fences);
	     
	     if(fenceArea.contains(sheep.x, sheep.y)) {
	     	sheepInFence++;
	     }
	     //console.log(sheep.x);

	     /*
	    if(sheep.body.velocity.x > 0){ sheep.body.velocity.x -= 4; } else {sheep.body.velocity.x = 0;}
		if(sheep.body.velocity.y > 0){ sheep.body.velocity.y -= 4; } else {sheep.body.velocity.y = 0;}
		*/

		// Vector attempts!
		var TURN_RATE = 10;
		var fleeSpeed = 100;
		var walkSpeed = 10;
		var speed = walkSpeed;
		var maxDistance = 100;
		var sheepDistance = 30;
		var totalAngle = 0;
		var vecCount = 1;
		var borderMargin = 50;
		var badGuy = dog; //game.input.activePointer;
		if(game.physics.arcade.distanceBetween(sheep, badGuy) < maxDistance) {
			//var tempAngle = Math.atan2(sheep.y - dog.y, sheep.x - dog.x);
			var tempAngle = this.game.math.angleBetween(
		        badGuy.x, badGuy.y,
		        sheep.x, sheep.y
		    );
		    speed = fleeSpeed;
		    TURN_RATE = 50;
		    borderMargin = 40;
			totalAngle += tempAngle;
			vecCount++;
		}
		
		if(sheep.x > 0 && sheep.x < borderMargin) { // left border
			if(sheep.rotation > 0 && sheep.rotation < Math.PI*2) {
				//console.log("left1");
				totalAngle += Math.PI/2; vecCount++;
			} else {
				//console.log("left2");
				totalAngle -= Math.PI/2; vecCount++;
			}
		}
		if(sheep.y > 0 && sheep.y < borderMargin) {  // top border
			if(sheep.rotation < -(Math.PI/2) && sheep.rotation > -(Math.PI*2)) {
				//console.log("top1 " + " => " + sheep.rotation);
				totalAngle += Math.PI/2; vecCount++;
			} else {
				//console.log("top2 " + " => " + sheep.rotation);
				totalAngle += Math.PI/2; vecCount++;
			}
		}
		if(sheep.x > game.world.width-borderMargin && sheep.x < game.world.width) { // right border
			if(sheep.rotation < Math.PI && sheep.rotation > -Math.PI) {
				//console.log("right1");
				totalAngle += Math.PI/2; vecCount++;
			} else {
				//console.log("right2");
				totalAngle += Math.PI/2; vecCount++;
			}
		} 
		if(sheep.y > game.world.height-borderMargin && sheep.y < game.world.height) { // bottom border
			if(sheep.rotation > Math.PI || sheep.rotation < -Math.PI) {
				//console.log("bottom1");
				totalAngle += Math.PI/2; vecCount++;
			} else {
				//console.log("bottom2");
				totalAngle += Math.PI/2; vecCount++;
			}
		} 

		sheeps.forEachAlive(function(s){
			var tempDis = game.physics.arcade.distanceBetween(sheep, s);
			if(s !== sheep && tempDis < sheepDistance) {
				//var tempAngle = Math.atan2(sheep.y - s.y, sheep.x - s.x);
				var tempAngle = game.math.angleBetween(s.x, s.y,sheep.x, sheep.y);
				//tempAngle = Math.PI/2; // zig
            	//if (game.math.chanceRoll(50)) tempAngle *= -1; // zag
				totalAngle += tempAngle;
				vecCount++;
			}
		});
		if(vecCount == 1){
			totalAngle += Math.PI/2; // zig
            if (game.math.chanceRoll(50)) totalAngle -= Math.PI; // zag
            //if (this.game.math.chanceRoll(50)) totalAngle += Math.PI*2; // other direction
            //console.log(totalAngle);
		}
		
		if (sheep.rotation !== totalAngle) {
	        // Calculate difference between the current angle and targetAngle
	        //if(sheep.name == "sheep0"){ console.log(totalAngle+ " - "+ sheep.rotation); }
	        var delta = totalAngle - sheep.rotation;

	        // Keep it in range from -180 to 180 to make the most efficient turns.
	        //console.log(delta+" <> "+Math.PI);

	        //console.log(delta);
	        //if (delta > 3) { console.log(delta); delta -= Math.PI*1.9; console.log(" -= PI*1.9 => " + delta); } 
	        //if (delta < -3) {console.log(delta);  delta += Math.PI*2; console.log(" += PI*2 => " + delta); }
	        if (delta > Math.PI) delta -= Math.PI * 2;
    		if (delta < -Math.PI) delta += Math.PI * 2;

	        //console.log(sheep.game.math.degToRad(Math.abs(delta)));
	        if (delta > 0) {
	            // Turn clockwise
	            //sheep.angle += TURN_RATE;
	            sheep.body.rotateLeft(-TURN_RATE);
	        } else {
	            // Turn counter-clockwise
	            //sheep.angle -= TURN_RATE;
	            sheep.body.rotateLeft(TURN_RATE);
	        }

	        // Just set angle to target angle if they are close
	        if (Math.abs(delta) < sheep.game.math.degToRad(TURN_RATE)) {
	            sheep.rotation = totalAngle;
	        }
	    }

	    /*
		sheep.body.velocity.x = Math.cos(sheep.rotation) * speed;
		sheep.body.velocity.y = Math.sin(sheep.rotation) * speed;
		*/
		
		if(sheep.body.x > 775 || sheep.body.x < 25 || sheep.body.y > 575 || sheep.body.y < 25) {
			var reverse = false;
			var leftVal = 0;
			var topVal = 0;
			if(sheep.body.x > 775 && sheep.body.angle == 0) {
				
				reverse = true;
				leftVal = 20;
			} else if(sheep.body.y < 25 && (sheep.body.angle > -91 && sheep.body.angle < -89)) {
				
				reverse = true;
				topVal = 20;
			} else if(sheep.body.y > 575 && (sheep.body.angle > 89 && sheep.body.angle < 91)) {
				
				reverse = true;
				topVal = -20;
			} else if(sheep.body.x < 25 && (sheep.body.angle > -179 && sheep.body.angle < -180)) {
				reverse = true;
				topVal = 20;
			}
			if(reverse) {
				sheep.body.moveLeft(leftVal*speed);
				sheep.body.moveDown(topVal);
			} else {
				// normal conditions
				sheep.body.moveLeft(-(Math.cos(sheep.rotation)*speed));
				sheep.body.moveDown(Math.sin(sheep.rotation)*speed);
			}
		} else {
			// normal conditions
			sheep.body.moveLeft(-(Math.cos(sheep.rotation)*speed));
			sheep.body.moveDown(Math.sin(sheep.rotation)*speed);
		}
	}
}

function str_pad_left(string,pad,length){ return (new Array(length+1).join(pad)+string).slice(-length); }