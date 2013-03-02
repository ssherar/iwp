(function($) {
	var canvasElement, canvas, CANVAS_HEIGHT, CANVAS_WIDTH, FPS = 60, timeOut, enemies = [], game = null, bullet, bullets = [], enemy_types = [];
	gameMechanics = function(canvasArea) {
		var self = this;
		canvasElement = canvasArea;
		CANVAS_HEIGHT = canvasElement.height();
		CANVAS_WIDTH = canvasElement.width();
		canvas = canvasElement.get(0).getContext("2d");

		this.start = function() {
			timeOut = setInterval(function() {
				update();
				draw();
			}, 1000/FPS);
		}

		this.stop = function() {
			clearInterval(timeOut);
			self.drawPause();
			timeOut = null;
		}

		this.drawPause = function() {
			canvas.fillStyle = "rgba(0,0,0,0.5)";
			canvas.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		}


		function update() {
			canvas.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
			checkCollisions();
			for(i = 0; i < pressed_keys.length; i++) {
				valid_keys[pressed_keys[i]].call();
			}
			bullets.forEach(function(bullet) {
			  	bullet.update();
				if(!bullet.active) {
					bullets.remove(bullet);
				}
			});
			enemies.forEach(function(enemy) {
				enemy.update();
				if(!enemy.active) {
					enemies.remove(enemy);
				}
			});
			if(Math.random() < 0.05) {
				tmp_enemy = $.extend(true, {}, enemy_types[0]);
				enemies.push(new enemy(tmp_enemy));
			}

		}

		function draw() {
			player.draw();
			bullets.forEach(function(bullet) {
			 	 bullet.draw();
			});
			enemies.forEach(function(enemy) {
			  	enemy.draw();
			});
		}

		var pressed_keys = [];
		var valid_keys = {
			32 : player.fire, 
			37 : player.moveLeft, 
			38 : player.moveUp, 
			39 : player.moveRight, 
			40 : player.moveDown
		};

		$(window).keydown(function(event) {
			if(event.which in valid_keys) {
				if($.inArray(event.which, pressed_keys) == -1) {
					pressed_keys.push(event.which);
				}
			}
		});

		$(window).keyup(function(event) {
			if($.inArray(event.which, pressed_keys) > -1) {
				pressed_keys.remove(event.which);
			}
		});

		$(window).keypress(function(event) {
			switch(event.which) {
				case 112:
					if(timeOut != null) {
						self.stop();
					} else self.start();
					break;
			}
		});
	}

	checkCollisions = function() {
		enemies.forEach(function(enemy) {
			var hit = false;
			bullets.forEach(function(bullet) {
				if(collided(enemy, bullet)) {
					bullets.remove(bullet);
					hit = true
					return;
				}
			});

			if(collided(enemy, player)) {
				//TODO loose a life
				hit = true;
			}

			if(hit) enemies.remove(enemy);
		});

	}

	collided = function(enemy, object) {
		return (enemy.x < (object.x + object.width))
			&& ((enemy.x + enemy.width) > object.x)
			&& (enemy.y < (object.y + object.height))
			&& ((enemy.y + enemy.height) > object.y);
	}

	player = {
		
		color: "#00A",
		 x: 270,
		 y: 270,
		 width:32,
		 height:32,
		 draw: function() {
			 canvas.fillStyle = this.color;
			 canvas.fillRect(this.x, this.y, this.width, this.height);
		 },
		 moveLeft: function() {
			 player.x = (player.x - 5).clamp(0, CANVAS_WIDTH);
		 },
		 moveRight: function() {
			 player.x = (player.x + 5).clamp(0, CANVAS_WIDTH - player.width);
		 },
		 moveUp: function() {
			player.y = (player.y - 5).clamp(0, CANVAS_HEIGHT);	 
		 }, moveDown: function() {
			 player.y = (player.y + 5).clamp(0, CANVAS_HEIGHT - player.height);
		 }, fire: function() {
			 if(bullets.length < 30) {
				pos = player.midpoint();
				var tmpBullet = new bullet(
					{x: pos.x, y: pos.y}
				);
				bullets.push(tmpBullet);
			 }

		 },
		 midpoint: function() {
			return {x: player.x + player.width/2, y: player.y};
		 }
	};

	bullet = function(b) {
	  	b.active = true;
		b.color = "#000";
		b.width = 3;
		b.height = 3;
		b.speed = -6;
		b.draw = function() {
		 	canvas.fillStyle = this.color;
			canvas.fillRect(this.x, this.y, this.width, this.height);
		}
		b.update = function() {
		  	this.y += this.speed;
			this.inBounds();
		}

		b.inBounds = function() {
			this.active = (this.y > 0);
		}
		return b;
	};

	enemy = function(e) {
	  	e = e || {};
	  	e.active = true;
		e.color = e.color || "#F00";
		e.width = e.width || 12;
		e.height = e.height || 12;
		e.x = e.x || Math.random()* (CANVAS_WIDTH - e.width);
		e.y = e.y || 0;
		e.speed = e.speed || 2;

		e.draw = function() {
		  	canvas.fillStyle = this.color;
			canvas.fillRect(this.x, this.y, this.width, this.height);
		}

		e.update = function() {
			this.y += this.speed;
			this.inBounds();
		}

		e.inBounds = function() {
			this.active = (this.y < CANVAS_HEIGHT);
		}

		return e;
	}

	$.fn.run = function() {
		$.getJSON('mobs.json', function(data) {
			console.log(data.Enemy1);
			enemy_types.push(data.Enemy1);
		});

		game = new gameMechanics($(this));
		game.start();

	}

	$.fn.createHUD = function() {
		$('#stop').click(function() {
			if(game == null) return;
			if(timeOut != null) {
				game.stop();
			} else {
			       game.start();
			}	       
		});
	}
})(jQuery);
