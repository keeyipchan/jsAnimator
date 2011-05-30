function GraphicObject(shape, name) {
	var self = this;

	this.name = name || 'obj';

	this.origin = Vector.create([0,0,0]);
	this.angle = 0;
	this.xScale = 100;
	this.yScale = 100;

	this.position = Vector.create([0,0,0]);
	this.rotation = new WebKitCSSMatrix();

	this.objectElement = document.createElement('div');
	$(this.objectElement).addClass('Object');
	$('#objects').append(this.objectElement);

	this.graphicElement = shape;
	$(this.graphicElement).addClass('GraphicObject_Graphic');
	$(this.objectElement).append(this.graphicElement);

	this.wheelContainer = document.createElement('div');
	$(this.wheelContainer).addClass('GraphicObject_WheelContainer');
	$(this.objectElement).append(this.wheelContainer);

	this.wheel = new UIWheel({
		container: this.wheelContainer,
		pivotRadius: 30,
		handleRadius: 6,
		pivotFillStyle: 'hsla(0,0%,0%,0)',
		_change: function(angle) {
			self.rotate(angle);
		}
	});

	this.xScaleElement = document.createElement('div');
	this.xScaleElement = $(this.xScaleElement);
	this.xScaleElement.addClass('GraphicObject_XScale');
	$(this.objectElement).append(this.xScaleElement);
	this.xScaleElement.slider({
		min: 0,
		max: 200,
		value: 100,
		slide: function(event, ui) {
			self.xScale = ui.value;
			self.draw();

			if (self._slide) {
				self._slide();
			}
		}
	});

	this.yScaleElement = document.createElement('div');
	this.yScaleElement = $(this.yScaleElement);
	this.yScaleElement.addClass('GraphicObject_YScale');
	$(this.objectElement).append(this.yScaleElement);
	this.yScaleElement.slider({
		min: 0,
		max: 200,
		value: 100,
		orientation: 'vertical',
		slide: function(event, ui) {
			self.yScale = ui.value;
			self.draw();

			if (self._slide) {
				self._slide();
			}
		}
	});

	this.positionElement = document.createElement('canvas');
	this.positionElement.width = 20;
	this.positionElement.height = 20;
	renderCross(this.positionElement);
	this.positionElement = $(this.positionElement);
	this.positionElement.addClass('GraphicObject_Position');
	$(this.objectElement).append(this.positionElement);
	this.lastPosition = null;
	function resetLastPosition() {
		self.resetLastPosition();
	}
	$(this.positionElement).draggable({
		create: resetLastPosition,
		stop: resetLastPosition,
		drag: function(event, ui) {
			self.move(ui.position.left - self.lastPosition.left, ui.position.top - self.lastPosition.top);
			self.draw();
			
			self.lastPosition = {left: ui.position.left, top: ui.position.top};
			ui.position.left = self.origin.e(1);
			ui.position.top = self.origin.e(2);
		}
	});

	this.originElement = document.createElement('canvas');
	this.originElement.width = 20;
	this.originElement.height = 20;
	renderCross(this.originElement);
	this.originElement = $(this.originElement);
	this.originElement.addClass('GraphicObject_Origin');
	$(this.objectElement).append(this.originElement);
	$(this.originElement).draggable({
		drag: function(event, ui) {
			var P = new WebKitCSSMatrix();
			P = P.translate(self.origin.e(1) + self.graphicElement.width/2, self.origin.e(2) + self.graphicElement.height/2, self.origin.e(3));
			var inverseP = P.inverse();
			self.rotation = P.multiply(new WebKitCSSMatrix().rotate(0,0,self.angle).multiply(inverseP).multiply(self.rotation));

			self.origin = Vector.create([ui.position.left, ui.position.top, 0]);

			self.wheel.angle = 0;
			self.wheel.draw();

			self.xScale = 100;
			self.yScale = 100;
			self.xScaleElement.slider('value', 100);
			self.yScaleElement.slider('value', 100);

			self.rotate(self.wheel.angle);

			if (self._rotate) {
				self._rotate(true);
			}

			resetLastPosition();
			self.draw();
		}
	});

	this.draw();
}

GraphicObject.prototype.resetLastPosition = function() {
	$(this.positionElement).css('left', this.origin.e(1));
	$(this.positionElement).css('top', this.origin.e(2));
	$(this.xScaleElement).css('left', this.origin.e(1));
	$(this.xScaleElement).css('top', this.origin.e(2));
	$(this.yScaleElement).css('left', this.origin.e(1));
	$(this.yScaleElement).css('top', this.origin.e(2));

	this.lastPosition = {
		left: this.origin.e(1),
		top: this.origin.e(2)
	};
};

GraphicObject.prototype.rotate = function(angle) {
	this.angle = -angle * 180 / Math.PI;
	if (this._rotate) {
		this._rotate();
	}
	this.draw();
};

GraphicObject.prototype.move = function(x,y) {
	var D = Vector.create([x,y,0]);
	this.position = this.position.add(D);
	if (this._move) {
		this._move();
	}
	this.draw();
};

GraphicObject.prototype.draw = function() {
	var O = new WebKitCSSMatrix();
	O = O.translate(this.origin.e(1), this.origin.e(2), this.origin.e(3));

	$(this.wheelContainer).css('-webkit-transform', O);
	$(this.originElement).css('left', this.origin.e(1));
	$(this.originElement).css('top', this.origin.e(2));

	var ox = this.origin.e(1) + this.graphicElement.width/2;
	var oy = this.origin.e(2) + this.graphicElement.height/2;
	var sx = this.xScale / 100;
	var sy = this.yScale / 100;
	var T = new WebKitCSSMatrix().rotate(0,0,this.angle).scale(sx, sy, 1);
	var P = new WebKitCSSMatrix();
	P = P.translate(this.position.e(1), this.position.e(2), this.position.e(3));

	$(this.graphicElement).css('-webkit-transform-origin', ox + 'px ' + oy + 'px');
	$(this.graphicElement).css('-webkit-transform', T);
	$(this.objectElement).css('-webkit-transform', P);
};
