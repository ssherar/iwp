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
		//player.x += 10 * inverse;
		//player.y += 10 * inverse;
		//if(inverse == 1 && player.x > (CANVAS_WIDTH - margin)) {
		//	inverse = -1;
		//} else if(inverse == -1 && player.x < (0 + margin)) {
		//	inverse = 1;
		//}
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
			 this.x = ((this.x - 10) < 0) ? 0 : this.x - 10;
		 },
		 moveRight: function() {
			 this.x = ((this.x + 10) > CANVAS_WIDTH-this.width) ? CANVAS_WIDTH - this.width : this.x + 10;
		 }
	};

	$(window).keydown(function(event) {
		switch(event.which) {
			case 37:
				player.moveLeft();
				break;
			case 39:
				player.moveRight();
				break;
		}
	});

});
