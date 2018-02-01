function Configuration(onChange) {
	this.getValues();
    this.onChange = onChange;
}

Configuration.prototype = {
	getSliderValue(name) {
		var value = document.getElementById("input-" + name).value;		
		document.getElementById("value-" + name).value = value;
		
		return value;
	},
	
	getInfluenceValues() {
		this.radiusRepulsion = Number(this.getSliderValue("zone-repulsion"));
		this.radiusAlignment = Number(this.getSliderValue("zone-alignment")) + this.radiusRepulsion;
		this.radiusAttraction = Number(this.getSliderValue("zone-attraction")) + this.radiusAlignment;
	},
	
	getValues() {
		this.agentCount = this.getSliderValue("agent-count");
		this.agentSpeed = this.getSliderValue("agent-speed");
		this.strengthRepulsion = this.getSliderValue("strength-repulsion");
		this.strengthAlignment = this.getSliderValue("strength-alignment");
		this.strengthAttraction = this.getSliderValue("strength-attraction");
		this.strengthGravitation = this.getSliderValue("strength-gravitation");
        this.angleAttraction = (Number(this.getSliderValue("angle-attraction")) / 360) * Math.PI;
		
		this.getInfluenceValues();
        
        if(this.onChange != undefined)
            this.onChange();
	}
}