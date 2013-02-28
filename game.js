(function($) {
	game = function(canvasArea) {
		var canvasElement = canvasArea;
		var CANVAS_HEIGHT = canvasElement.height();
		var CANVAS_WIDTH = canvasElement.width();
		var timeOut;
		var canvas = canvasElement.get(0).getContext("2d");
		var FPS = 30;

		function start() {
			timeOut = setInterval(function() {
				update();
				draw();
			}, 1000/FPS);
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
				 this.x = clamp(this.x - 10, 0, CANVAS_WIDTH);
			 },
			 moveRight: function() {
				 this.x = clamp(this.x + 10, 0, CANVAS_WIDTH - this.width);
			 },
			 moveUp: function() {
				this.y = clamp(this.y - 10, 0, CANVAS_HEIGHT);	 
			 }, moveDown: function() {
				 this.y = clamp(this.y + 10, 0, CANVAS_HEIGHT - this.height);
			 }, fire: function() {
				 console.log("PEW PEW MOTHERFUCKER!");
			 }
		};

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

		var clamp = function(x, min, max) {
			return (x < min ? min : (x > max ? max : x ));
		}

		Array.prototype.remove = function(ele) {
			var where;
			if((where = this.indexOf(ele)) > -1) {
				this.splice(where, 1);
			}
			return this;
		}

		start();
	}

	$.fn.run = function() {
		game($(this));
	}
})(jQuery);
