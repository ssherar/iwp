(function($) {
	var canvasElement, canvas, CANVAS_HEIGHT, CANVAS_WIDTH, FPS = 30, timeOut, game = null;
	gameMechanics = function(canvasArea) {
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
		}


		function update() {
			canvas.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
			for(i = 0; i < pressed_keys.length; i++) {
				switch(pressed_keys[i]) {
					case 37:
						player.moveLeft();
						break;
					case 39:
						player.moveRight();
						break;
					case 38:
						player.moveUp();
						break;
					case 40:
						player.moveDown();
						break;
					case 32:
						player.fire();
						break;
				}
			}
		}

		function draw() {
			player.draw();
		}

		var pressed_keys = [];
		var valid_keys = [32, 37, 38, 39, 40];

		$(window).keydown(function(event) {
			if($.inArray(event.which, valid_keys) > -1) {
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
	}

	var player = {
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
			 this.x = (this.x - 10).clamp(0, CANVAS_WIDTH);
		 },
		 moveRight: function() {
			 this.x = (this.x + 10).clamp(0, CANVAS_WIDTH - this.width);
		 },
		 moveUp: function() {
			this.y = (this.y - 10).clamp(0, CANVAS_HEIGHT);	 
		 }, moveDown: function() {
			 this.y = (this.y + 10).clamp(0, CANVAS_HEIGHT - this.height);
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
				$('#stop').value = "Start";
				timeOut = null;
			} else {
			       game.start();
			}	       
		});

	}
})(jQuery);
