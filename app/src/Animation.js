function Animation(object) {
	this.object = object;
	this.frames = [];
	this.createFrame(0);
	this.currentFrame = 0;
}

Animation.FPS = 24;
Animation.MAX_FRAMES = 48;

Animation.prototype.play = function(f) {
	$(this.object.wheelContainer).hide();
	$(this.object.positionElement).hide();
	$(this.object.originElement).hide();
	$(this.object.xScaleElement).hide();
	$(this.object.yScaleElement).hide();

	if (this.currentFrame > Animation.MAX_FRAMES)
		return;

	var previousFrame = this.currentFrame;
	for (; !this.frames[this.currentFrame] && this.currentFrame <= Animation.MAX_FRAMES; this.currentFrame++);

	var frame = this.frames[this.currentFrame];

	if (!frame)
		return;

	var duration = ((this.currentFrame - previousFrame) * (1000 / Animation.FPS)) / 1000;
	frame.play(duration);

	if (this.currentFrame >= f)
		return;

	this.currentFrame++;
};

Animation.prototype.stop = function() {
	$(this.object.wheelContainer).show();
	$(this.object.positionElement).show();
	$(this.object.originElement).show();
	$(this.object.xScaleElement).show();
	$(this.object.yScaleElement).show();

	this.currentFrame = 0;
	$(this.object.objectElement).css('-webkit-transition', '-webkit-transform 0s linear');
	$(this.object.graphicElement).css('-webkit-transition', '-webkit-transform 0s linear');
};

Animation.prototype.createFrame = function(f, config) {
	config = config || {};

	var frame = this.frames[f] = new Frame(this, this.object);
	frame._remove = config._remove || null;

	if (config._create)
		config._create();

	this.updateTransformHandler(f, config);

	return frame;
};

Animation.prototype.updateFrame = function(f, config) {
	config = config || {};
	var self = this;

	var frame = this.frames[f];
	if (frame) {
		frame.draw();
	}

	this.updateTransformHandler(f, config);
};

Animation.prototype.updateTransformHandler = function(f, config) {
	config = config || {};
	var self = this;

	function _setTransform() {
		self._setTransform(f, config);
	}

	this.object._move = _setTransform;
	this.object._rotate = _setTransform;
	this.object._slide = _setTransform;
};

Animation.prototype._setTransform = function(f, config) {
	config = config || {};

	var frame = this.frames[f] || this.createFrame(f, config);
	frame._remove = config._remove || null;

	frame.setTransform();
};

Animation.prototype.stringify= function() {
	var self = this;

	var frames = [];
	var frame = null;
	for (var f = 0; f <= Animation.MAX_FRAMES; f++) {
		frame = this.frames[f];
		if (!frame) {
			frames.push(null);
			continue;
		}

		F = {
			rotation: frame.rotation.toString(),
			position: frame.position.inspect(),
			origin: frame.origin.inspect(),
			angle: frame.angle,
			xScale: frame.xScale,
			yScale: frame.yScale
		};

		frames.push(F);
	}

	return JSON.stringify(frames);
};

Animation.prototype.parse = function(json) {
	var self = this;

	var frames = JSON.parse(json);
	var F = null;
	for (var f = 0; f <= Animation.MAX_FRAMES; f++) {
		F = frames[f];
		if (!F)
			continue;

		var frame = self.createFrame(f);

		frame.position = Vector.create(JSON.parse(F.position));

		frame.origin = Vector.create(JSON.parse(F.origin));

		frame.rotation = new WebKitCSSMatrix();
		frame.rotation.setMatrixValue(F.rotation);
		
		frame.angle = F.angle;

		frame.xScale = F.xScale;

		frame.yScale = F.yScale;
	}

	return this;
};
