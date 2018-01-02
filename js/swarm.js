function SwarmSim(canvas) {
	this.context = canvas.getContext("2d");
	this.width = canvas.width;
	this.height = canvas.height;
	this.view = new View(this.width, this.height);
	this.agents = [];
	
	for(var i = 0; i < 32; ++i)
		this.agents.push(new Agent(new Vector(this.width / 2, this.height / 2)));
	
	this.lastDate = new Date();
}

SwarmSim.prototype = {
	start() {
		this.animate();
	},
	
	getTimeStep() {
		var date = new Date();
		var timeStep = (date - this.lastDate) * 0.001;
		
		if(timeStep < 0)
			timeStep += 1;
		
		this.lastDate = date;
		
		return timeStep;
	},
	
	animate() {
		requestAnimationFrame(this.animate.bind(this));
		
		this.view.apply(this.context);
		this.update(this.context, this.getTimeStep());
	},
	
	update(context, timeStep) {
		Agent.prototype.process(this.agents);
		
		for(var i = 0; i < this.agents.length; ++i)
			this.agents[i].update(context, timeStep, this.width, this.height);
	}
}