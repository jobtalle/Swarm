function View(width, height) {
	this.width = width;
	this.height = height;
}

View.prototype = {
	apply(context) {
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, this.width, this.height);
	}
}