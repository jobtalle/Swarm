function Vector(x = 0, y = 0) {
	this.x = x;
	this.y = y;
}

Vector.prototype = {
	toString() {
		return "(" + this.x + ", " + this.y + ")";
	},
	
	add(vector) {
		return new Vector(this.x + vector.x, this.y + vector.y);
	},
	
	subtract(vector) {
		return this.add(vector.negate());
	},
	
	negate() {
		return new Vector(-this.x, -this.y);
	},
	
	dot(vector) {
		return this.x * vector.x + this.y * vector.y;
	},
	
	length() {
		return Math.sqrt(this.dot(this));
	},
	
	multiply(scalar) {
		return new Vector(this.x * scalar, this.y * scalar);
	},
	
	divide(scalar) {
		if(scalar == 0)
			return new Vector(0, 0);
		else
			return this.multiply(1 / scalar);
	},
	
	normalize() {
		return this.divide(this.length());
	},
	
	angle() {
		return Math.atan2(this.y, this.x);
	},
	
	fromAngle(angle, length = 1) {
		return new Vector(Math.cos(angle) * length, Math.sin(angle) * length);
	}
}