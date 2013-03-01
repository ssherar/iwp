(function($) {
	var canvasElement, canvas, CANVAS_HEIGHT, CANVAS_WIDTH, FPS = 30, timeOut, game = null, player;
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
			for(i = 0; i < pressed_keys.length; i++) {
				valid_keys[pressed_keys[i]].call();
			}
			
		}

		function draw() {
			player.draw();
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
			 player.x = (player.x - 10).clamp(0, CANVAS_WIDTH);
		 },
		 moveRight: function() {
			 player.x = (player.x + 10).clamp(0, CANVAS_WIDTH - player.width);
		 },
		 moveUp: function() {
			player.y = (player.y - 10).clamp(0, CANVAS_HEIGHT);	 
		 }, moveDown: function() {
			 player.y = (player.y + 10).clamp(0, CANVAS_HEIGHT - player.height);
		 }, fire: function() {
			 console.log("PEW PEW MOTHERFUCKER!");
		 }
	};

	Number.prototype.clamp = function(min, max) {
		return (this < min ? min : (this > max ? max : this ));
	}

	Array.prototype.remove = function(ele) {
		var where;
		if((where = this.indexOf(ele)) > -1) {
			this.splice(where, 1);
		}
		return this;
	}



	$.fn.run = function() {
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
