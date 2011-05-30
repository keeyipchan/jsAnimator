function Frame(animation, object) {
	this.animation = animation;
	this.object = object;
	this.setTransform();
}

Frame.prototype.setTransform = function() {
	this.position = this.object.position;
	this.origin = this.object.origin;
	this.rotation = this.object.rotation;
	this.angle = this.object.angle;
	this.xScale = this.object.xScale;
	this.yScale = this.object.yScale;
	
};

Frame.prototype.play = function(duration) {
	this.object.position = this.position;
	this.object.origin = this.origin;
	this.object.rotation = this.rotation;
	this.object.angle = this.angle;
	this.object.xScale = this.xScale;
	this.object.yScale = this.yScale;
	this.object.draw();
	$(this.object.objectElement).css('-webkit-transition', '-webkit-transform ' + duration + 's linear');
	$(this.object.graphicElement).css('-webkit-transition', '-webkit-transform ' + duration + 's linear');

	this.object.wheel.angle = -this.angle * Math.PI / 180;
	this.object.wheel.draw();

	this.object.resetLastPosition();
};

Frame.prototype.draw = function() {
	this.object.position = this.position;
	this.object.origin = this.origin;
	this.object.rotation = this.rotation;
	this.object.angle = this.angle;
	this.object.xScale = this.xScale;
	this.object.yScale = this.yScale;
	this.object.draw();

	this.object.wheel.angle = -this.angle * Math.PI / 180;
	this.object.wheel.draw();

	this.object.xScaleElement.slider('value', this.xScale);
	this.object.yScaleElement.slider('value', this.yScale);

	this.object.resetLastPosition();
};

Frame.prototype.remove = function() {
	this.animation.frames[this.animation.frames.indexOf(this)] = null;
	if (this._remove)
		this._remove();
};
