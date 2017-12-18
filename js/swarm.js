function SwarmSim(canvas) {
	this.context = canvas.getContext("2d");
	this.width = canvas.width;
	this.height = canvas.height;
	this.view = new View(this.width, this.height);
	this.agents = [
		new Agent(50, 100),
		new Agent(100, 150)
	];
	this.lastDate = new Date();
	
	this.outerRadius = 64;
	this.innerRadius = 32;
}

SwarmSim.prototype = {
	start() {
		this.animate();
	},
	
	getTimeStep() {
		var date = new Date();
		var timeStep = (date - this.lastDate) / 1000;
		
		if(timeStep < 0)
			timeStep += 1;
		
		this.lastDate = date;
		
		return timeStep;
	},
	
	animate() {
		requestAnimationFrame(this.animate.bind(this));
		
		this.view.fit(this.agents);
		this.view.apply(this.context);
		this.update(this.context, this.getTimeStep());
	},
	
	update(context, timeStep) {
		for(var i = 0; i < this.agents.length; ++i)
			this.agents[i].update(context, timeStep);
	}
}