$(function() {
	var CANVAS_HEIGHT = 400;
	var CANVAS_WIDTH = 420;
	var textx = 50, texty = 50;
	var inverse = 1;
	var margin = 50;
	var timeOut;

	var canvasElement = $("<canvas id='game' width='" + CANVAS_WIDTH + "' height='" + CANVAS_HEIGHT + "'></canvas>");

	var canvas = canvasElement.get(0).getContext("2d");
	canvasElement.appendTo('body');

	var FPS = 100;

	function start() {
		timeOut = setInterval(function() {
			update();
			draw();
		}, 1000/FPS);
	}


	function update() {
		canvas.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
	}

	function draw() {
		player.draw();
	}

	start();

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

});
