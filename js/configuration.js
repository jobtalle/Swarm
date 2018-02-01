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
		this.radiusRepulsion = this.getSliderValue("zone-repulsion");
		this.radiusAlignment = this.getSliderValue("zone-alignment") + this.radiusRepulsion;
		this.radiusAttraction = this.getSliderValue("zone-attraction") + this.radiusAlignment;
	},
	
	getValues() {
		this.agentCount = this.getSliderValue("agent-count");
		this.agentSpeed = this.getSliderValue("agent-speed");
		this.strengthRepulsion = this.getSliderValue("strength-repulsion");
		this.strengthAlignment = this.getSliderValue("strength-alignment");
		this.strengthAttraction = this.getSliderValue("strength-attraction");
		this.strengthGravitation = this.getSliderValue("strength-gravitation");
		
		this.getInfluenceValues();
        
        if(this.onChange != undefined)
            this.onChange();
	}
}