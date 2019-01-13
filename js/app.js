// Character class:
// Base for main game Player and Enemy classes.
// -- Constructor sets default x and y coordinates.
// -- Render method draws sprites at a given (x, y) location.

class Character {
	constructor(x = 202, y = 415) {					// column 3, row 6
		this.x = x;
		this.y = y;
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

// Enemy class, subclass of Character class:
// -- Constructor sets x and y coordinates, speed (at which Enemies move across the screen), and Enemy image.
// -- Update method moves Enemies across the screen. 
//    -- Enemies begin left of column 1 and continue past column 6, after which they loop around to the beginning.

class Enemy extends Character {
	constructor(x, y, speed) {
		super(x, y, speed);
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.sprite = 'images/enemy-bug.png';
	}

	update(dt) {
		if(this.x < 505) {							// column 6
			this.x = this.x + (this.speed * dt);
		} else {
			this.x = -101;
		}
	}
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// Player class, subclass of Character class:
// -- Constructor sets Player image and win condition.
// -- Update method compares Enemy locations against Player location.
//    -- If Player location conflicts with any Enemy location, reset Player back to original position.
//       -- Enemy safety areas (30, top and bottom; 80 left and right) extend enemy reach for a better presentation.
//    -- If Player reaches other side without collisions, Player wins. 
//       -- First win: Player sees "Winner" modal. Score and Win Condition are incremented by 1.
//       -- Subsequent wins: Continue game and move Player back to original position. Score is incremented by 1.
// -- handleInput method controls Player movement. Player movement is contained within game boundary.

class Player extends Character {
	constructor() {
		super();
		this.score = 0;
		this.sprite = 'images/char-boy.png';
		this.win = 0;
	}

	update() {
		let overlay = document.getElementById('overlay');
		let scoreID = document.getElementById('score');

		for(let enemy of allEnemies) {
			if(this.y < (enemy.y + 30) && this.y > (enemy.y - 30) && this.x < (enemy.x + 80) && this.x > (enemy.x - 80)) {
				this.y = 415;
			} else if(this.y < 83) {
				this.score = this.score + 1;		// increment score
				scoreID.innerHTML = this.score;
				if(this.win > 0) {					// subsequent wins
					this.y = 415;
				} else {							// first win
					this.y = 415;
					this.win = this.win + 1;
					overlay.classList.add('show');
				}
			} else {}
		}
	}

	handleInput(input) {
		if(this.win > 0 && this.win < 2) {
			this.win = this.win + 1;				// increase win condition counter so winning message isn't shown for subsequent wins
			overlay.classList.remove('show');
		} else {
			if(input === 'left') {
				if(this.x < 101) {					// column 1
					this.x = this.x;
				} else {
					this.x = this.x - 101;
				}
			} else if(input === 'up') {
				if(this.y < 83) {					// row 1
					this.y = this.y;
				} else {
					this.y = this.y - 83;
				}
			} else if(input === 'right') {
				if(this.x > 303) {					// column 5
					this.x = this.x;
				} else {
					this.x = this.x + 101;
				}
			} else if(input === 'down') {
				if(this.y > 332) {					// row 6
					this.y = this.y;
				} else {
					this.y = this.y + 83;
				}
			} else {}
		}
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const bug1 = new Enemy(-101, 144, 25);
const bug2 = new Enemy(-101, 144, 125);
const bug3 = new Enemy(-101, 60, 325);
const bug4 = new Enemy(-101, 228, 200);
const bug5 = new Enemy(-101, 228, 75);
const allEnemies = [bug1, bug2, bug3, bug4, bug5];
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});