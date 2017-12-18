function Agent(
	x,
	y,
	angle,
	radiusRepulsion = 32,
	radiusAlignment = 48,
	radiusAttraction = 80,
	viewAngle = Math.PI * 1.3) {
	this.x = x;
	this.y = y;
	this.angle = angle;
	this.speed = 64;
	this.radiusRepulsion = radiusRepulsion;
	this.radiusAlignment = radiusAlignment;
	this.radiusAttraction = radiusAttraction;
	this.viewAngle = viewAngle;
}

Agent.prototype = {
	COLOR_FILL: "#6666ff",
	COLOR_BORDER: "#333333",
	COLOR_REGION: "#AAAAAA",
	LENGTH: 24,
	WIDTH: 20,
	
	update(context, timeStep, others) {
		this.move(timeStep, others);
		this.draw(context);
	},
	
	draw(context) {
		context.save();
		context.translate(this.x, this.y);
		context.rotate(this.angle);
		
		context.strokeStyle = this.COLOR_REGION;
		
		context.beginPath();
		context.arc(0, 0, this.radiusRepulsion, 0, Math.PI * 2);
		context.stroke();
		
		context.beginPath();
		context.arc(0, 0, this.radiusAlignment, 0, Math.PI * 2);
		context.stroke();
		
		context.beginPath();
		context.moveTo(0, 0);
		context.arc(0, 0, this.radiusAttraction, -this.viewAngle * 0.5, this.viewAngle * 0.5);
		context.lineTo(0, 0);
		context.stroke();
		
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
	
	move(timeStep, agents) {
		var stepSize = timeStep * this.speed;
		
		this.x += Math.cos(this.angle) * stepSize;
		this.y += Math.sin(this.angle) * stepSize;
	}
}