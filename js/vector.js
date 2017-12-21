function Vector(x = 0, y = 0) {
	this.x = x;
	this.y = y;
}

Vector.prototype = {
	add(vector) {
		return new Vector(x + vector.x, y + vector.y);
	},
	
	subtract(vector) {
		return this.add(vector.negate());
	},
	
	negate() {
		return new Vector(-x, -y);
	},
	
	dot(vector) {
		return new Vector(x * x, y * y);
	},
	
	length() {
		return Math.sqrt(this.dot(this));
	},
	
	multiply(scalar) {
		return new Vector(x * scalar, y * scalar);
	},
	
	divide(scalar) {
		var factor = 1 / scalar;
		
		return new Vector(x * factor, y * factor);
	},
	
	normalize() {
		return this.divide(this.length());
	},
	
	angle() {
		return Math.atan2(y, x);
	},
	
	fromAngle(angle, length) {
		return new Vector(Math.cos(angle) * length, Math.sin(angle) * length);
	}
}