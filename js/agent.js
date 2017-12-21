function Agent(
	position = new Vector(0, 0),
	velocity = Vector.prototype.fromAngle(Math.random() * Math.PI * 2),
	baseSpeed = 32,
	viewAngle = Math.PI * 1.3) {
	this.position = position;
	this.velocity = velocity;
	this.baseSpeed = 32;
	this.viewAngle = viewAngle;
	this.neighborsRepulsion = [];
	this.neighborsAlignment = [];
	this.neighborsAttraction = [];
}

Agent.prototype = {	
	RADIUS_REPULSION: 32,
	RADIUS_ALIGNMENT: 48,
	RADIUS_ATTRACTION: 100,
	INFLUENCE_REPULSION: 0.16,
	INFLUENCE_ALIGNMENT: 0.16,
	INFLUENCE_ATTRACTION: 0.16,
	COLOR_FILL: "#6666ff",
	COLOR_BORDER: "#333333",
	COLOR_REGION: "#aaaaaa",
	LENGTH: 24,
	WIDTH: 20,
	
	process(agents) {
		for(var firstIndex = 0; firstIndex < agents.length; ++firstIndex) {
			var first = agents[firstIndex];
			
			for(var secondIndex = firstIndex + 1; secondIndex < agents.length; ++secondIndex) {
				var second = agents[secondIndex];
				var delta = second.position.subtract(first.position);
				var squaredDistance = delta.dot(delta);
				
				if(squaredDistance < this.RADIUS_ATTRACTION * this.RADIUS_ATTRACTION) {
					if(squaredDistance < this.RADIUS_REPULSION * this.RADIUS_REPULSION) {
						var position = second.position.subtract(first.position);
						
						first.neighborsRepulsion.push(position);
						second.neighborsRepulsion.push(position.negate());
					}
					else if(squaredDistance < this.RADIUS_ALIGNMENT * this.RADIUS_ALIGNMENT) {
						first.neighborsAlignment.push(second.velocity);
						second.neighborsAlignment.push(first.velocity);
					}
					else {
						var position = second.position.subtract(first.position);
						
						first.neighborsAttraction.push(position);
						second.neighborsAttraction.push(position.negate());
					}
				}
			}
			
			first.react();
		}
	},
	
	applyRepulsion() {
		if(this.neighborsRepulsion.length == 0)
			return;
		
		var repulsion = new Vector();
		
		while(this.neighborsRepulsion.length > 0) {
			var neighbor = this.neighborsRepulsion.pop();
			
			repulsion = repulsion.add(neighbor.normalize());
		}
		
		this.velocity = this.velocity.subtract(repulsion.multiply(4));
	},
	
	applyAlignment() {
		if(this.neighborsAlignment.length == 0)
			return;
		
		var alignment = new Vector();
		
		while(this.neighborsAlignment.length > 0) {
			var neighbor = this.neighborsAlignment.pop();
			
			alignment = alignment.add(neighbor.normalize());
		}
		
		this.velocity = this.velocity.add(alignment.multiply(1));
	},
	
	applyAttraction() {
		if(this.neighborsAttraction.length == 0)
			return;
		
		var attraction = new Vector();
		
		while(this.neighborsAttraction.length > 0) {
			var neighbor = this.neighborsAttraction.pop();
			
			attraction = attraction.add(neighbor.normalize());
		}
		
		this.velocity = this.velocity.add(attraction.multiply(1));
	},
	
	react() {
		this.velocity = this.velocity.normalize().multiply(this.baseSpeed);
		
		this.applyRepulsion();
		this.applyAlignment();
		this.applyAttraction();
	},
	
	update(context, timeStep, others) {
		this.move(timeStep, others);
		this.draw(context);
	},
	
	draw(context) {
		context.save();
		context.translate(this.position.x, this.position.y);
		context.rotate(this.velocity.angle());
		
		context.strokeStyle = this.COLOR_REGION;
		
		context.beginPath();
		context.arc(0, 0, this.RADIUS_REPULSION, 0, Math.PI * 2);
		context.stroke();
		
		context.beginPath();
		context.arc(0, 0, this.RADIUS_ALIGNMENT, 0, Math.PI * 2);
		context.stroke();
		
		context.beginPath();
		context.moveTo(0, 0);
		context.arc(0, 0, this.RADIUS_ATTRACTION, -this.viewAngle * 0.5, this.viewAngle * 0.5);
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
		
		this.position = this.position.add(this.velocity.multiply(timeStep));
		
		this.x += Math.cos(this.angle) * stepSize;
		this.y += Math.sin(this.angle) * stepSize;
	}
}