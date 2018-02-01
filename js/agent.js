 function Agent(
	position,
	velocity = Vector.prototype.fromAngle(Math.random() * Math.PI * 2)) {
	this.position = position;
    this.center = new Vector(position.x, position.y);
	this.velocity = velocity;
	this.neighborsRepulsion = [];
	this.neighborsAlignment = [];
	this.neighborsAttraction = [];
}

Agent.prototype = {
	COLOR_FILL: "#6666ff",
	COLOR_BORDER: "#333333",
	COLOR_REGION: "#aaaaaa",
	LENGTH: 12,
	WIDTH: 10,
	WRAP_RADIUS: 12,
	
	process(agents, configuration) {
		for(var firstIndex = 0; firstIndex < agents.length; ++firstIndex) {
			for(var secondIndex = firstIndex + 1; secondIndex < agents.length; ++secondIndex)
				Agent.prototype.interact(agents[firstIndex], agents[secondIndex], configuration);
			
			agents[firstIndex].react(configuration);
		}
	},
	
	interact(first, second, configuration) {
		var delta = second.position.subtract(first.position);
		var squaredDistance = delta.dot(delta);
        
		if(squaredDistance < configuration.radiusAttraction * configuration.radiusAttraction) {
			if(squaredDistance < configuration.radiusRepulsion * configuration.radiusRepulsion) {
				var strength = 1 - Math.sqrt(squaredDistance) / configuration.radiusRepulsion;
				var repulsion = delta.normalize().multiply(strength);
				
				first.neighborsRepulsion.push(repulsion);
				second.neighborsRepulsion.push(repulsion.negate());
			}
			else if(squaredDistance < configuration.radiusAlignment * configuration.radiusAlignment) {
				var strength = (Math.sqrt(squaredDistance) - configuration.radiusRepulsion) / (configuration.radiusAlignment - configuration.radiusRepulsion);
				
				first.neighborsAlignment.push(second.velocity.normalize().multiply(strength));
				second.neighborsAlignment.push(first.velocity.normalize().multiply(strength));
			}
			else {
				var normalizedDelta = delta.normalize();
                var strength = 1 - ((Math.sqrt(squaredDistance) - configuration.radiusAlignment) / (configuration.radiusAttraction - configuration.radiusAlignment));
				var attraction = normalizedDelta.multiply(strength);
				
                if(Math.acos(first.velocity.normalize().dot(normalizedDelta)) < configuration.angleAttraction)
				    first.neighborsAttraction.push(attraction);
                
                if(Math.acos(second.velocity.normalize().dot(normalizedDelta.negate())) < configuration.angleAttraction)
				    second.neighborsAttraction.push(attraction.negate());
			}
		}
	},
	
	applyRepulsion(configuration) {
		if(this.neighborsRepulsion.length == 0)
			return;
		
		var repulsion = new Vector();
		
		while(this.neighborsRepulsion.length > 0) {
			var neighbor = this.neighborsRepulsion.pop();
			
			repulsion = repulsion.add(neighbor);
		}
		
		this.velocity = this.velocity.subtract(repulsion.multiply(configuration.strengthRepulsion));
	},
	
	applyAlignment(configuration) {
		if(this.neighborsAlignment.length == 0)
			return;
		
		var alignment = new Vector();
		
		while(this.neighborsAlignment.length > 0) {
			var neighbor = this.neighborsAlignment.pop();
			
			alignment = alignment.add(neighbor);
		}
		
		this.velocity = this.velocity.add(alignment.multiply(configuration.strengthAlignment));
	},
	
	applyAttraction(configuration) {
		if(this.neighborsAttraction.length == 0)
			return;
		
		var attraction = new Vector();
		
		while(this.neighborsAttraction.length > 0) {
			var neighbor = this.neighborsAttraction.pop();
			
			attraction = attraction.add(neighbor);
		}
		
		this.velocity = this.velocity.add(attraction.multiply(configuration.strengthAttraction));
	},
	
	applyGravity(configuration) {
		this.velocity = this.velocity.add(this.position.subtract(this.center).normalize().negate().multiply(configuration.strengthGravitation));
	},
	
	react(configuration) {
		this.velocity = this.velocity.normalize().multiply(configuration.agentSpeed);
		
		this.applyRepulsion(configuration);
		this.applyAlignment(configuration);
		this.applyAttraction(configuration);
		this.applyGravity(configuration);
	},
	
	update(context, timeStep, width, height) {
		this.move(timeStep, width, height);
		this.draw(context);
	},
	
	draw(context) {
		context.save();
		context.translate(this.position.x, this.position.y);
		context.rotate(this.velocity.angle());
		/*
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
		*/
		context.fillStyle = this.COLOR_FILL;
		context.strokeStyle = this.COLOR_BORDER;
		
		context.beginPath();
		context.moveTo(this.LENGTH * 0.5, 0);
		context.lineTo(-this.LENGTH * 0.5, -this.WIDTH * 0.5);
		context.lineTo(0, 0);
		context.lineTo(-this.LENGTH * 0.5, this.WIDTH * 0.5);
		context.lineTo(this.LENGTH * 0.5, 0);
		context.stroke();
		context.fill();
		
		context.restore();
	},
	
	move(timeStep, width, height) {
		var stepSize = timeStep * this.speed;
		
		this.position = this.position.add(this.velocity.multiply(timeStep));
		
		if(this.position.x < -this.WRAP_RADIUS)
			this.position.x += width + 2 * this.WRAP_RADIUS;
		if(this.position.y < -this.WRAP_RADIUS)
			this.position.y += height + 2 * this.WRAP_RADIUS;
		if(this.position.x > width + this.WRAP_RADIUS)
			this.position.x -= width + 2 * this.WRAP_RADIUS;
		if(this.position.y > height + this.WRAP_RADIUS)
			this.position.y -= height + 2 * this.WRAP_RADIUS;
	}
}