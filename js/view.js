function View(width, height) {
	this.width = width;
	this.height = height;
	this.x = 0;
	this.y = 0;
	this.scale = 1;
}

View
.prototype = {
	FIT_MARGIN: 80,
	
	apply(context) {
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, this.width, this.height);
		
		context.translate(this.width * 0.5, this.height * 0.5);
		context.scale(this.scale, this.scale);
		context.translate(-this.x, -this.y);
	},
	
	fit(agents) {
		var xMin = undefined;
		var yMin = undefined;
		var xMax = undefined;
		var yMax = undefined;
		
		for(var i = 0; i < agents.length; ++i) {
			var agent = agents[i];
			
			if(xMin == undefined || agent.x < xMin)
				xMin = agent.x;
			if(yMin == undefined || agent.y < yMin)
				yMin = agent.y;
			if(xMax == undefined || agent.x > xMax)
				xMax = agent.x;
			if(yMax == undefined || agent.y > yMax)
				yMax = agent.y;
			
			this.x = xMin + (xMax - xMin) * 0.5;
			this.y = yMin + (yMax - yMin) * 0.5;
		}
	}
}