function SwarmSim(canvas) {
	this.context = canvas.getContext("2d");
	this.width = canvas.width;
	this.height = canvas.height;
	this.view = new View(this.width, this.height);
	this.agents = [];
	
	this.configure();
}

SwarmSim.prototype = {
    MAX_DT: 0.1,
    
	configure() {
		this.configuration = new Configuration(this.updateConfiguration.bind(this));
        this.updateConfiguration();
	},
    
    updateConfiguration() {
        this.updateAgentCount();
    },
    
    updateAgentCount() {
        while(this.agents.length < this.configuration.agentCount)
            this.agents.push(new Agent(new Vector(this.width / 2, this.height / 2)));
        
        while(this.agents.length > this.configuration.agentCount)
            this.agents.pop();
    },
	
	start() {
		this.lastDate = new Date();
		this.animate();
	},
    
    scatter() {
        for(var i = 0; i < this.agents.length; ++i)
            this.agents[i].scatter(this.width, this.height);
    },
	
	getTimeStep() {
		var date = new Date();
		var timeStep = (date - this.lastDate) * 0.001;
		
		if(timeStep < 0)
			timeStep += 1;
        else if(timeStep > this.MAX_DT)
            timeStep = this.MAX_DT;
		
		this.lastDate = date;
		
		return timeStep;
	},
	
	animate() {
		requestAnimationFrame(this.animate.bind(this));
		
		this.view.apply(this.context);
		this.update(this.context, this.getTimeStep());
	},
	
	update(context, timeStep) {
		Agent.prototype.process(this.agents, this.configuration);
        
		context.fillStyle = Agent.prototype.COLOR_FILL;
		context.strokeStyle = Agent.prototype.COLOR_BORDER;
        
		for(var i = 0; i < this.agents.length; ++i)
			this.agents[i].update(context, timeStep, this.width, this.height);
	}
}