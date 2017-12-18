function Agent(x, y) {
	this.x = x;
	this.y = y;
	this.angle = 0.4;
	this.speed = 64;
}

Agent.prototype = {
	COLOR_FILL: "#6666ff",
	COLOR_BORDER: "#333333",
	LENGTH: 24,
	WIDTH: 20,
	
	update(context, timeStep) {
		this.move(timeStep);
		this.draw(context);
	},
	
	draw(context) {
		context.save();
		context.translate(this.x, this.y);
		context.rotate(this.angle);
		
		context.fillStyle = this.COLOR_FILL;
		context.strokeStyle = this.COLOR_BORDER;
		
		context.beginPath();
		context.moveTo(this.LENGTH * 0.5, 0);
		context.lineTo(-this.LENGTH * 0.5, -this.WIDTH * 0.5);
		context.lineTo(0, 0);
		context.lineTo(-this.LENGTH * 0.5, this.WIDTH * 0.5);
		context.lineTo(this.LENGTH * 0.5, 0);
		context.fill();
		context.stroke();
		
		context.restore();
	},
	
	move(timeStep) {
		var stepSize = timeStep * this.speed;
		
		this.x += Math.cos(this.angle) * stepSize;
		this.y += Math.sin(this.angle) * stepSize;
	}
}