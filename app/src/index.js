function newTriangle() {
	return new GraphicObject(
		renderTriangle({
			fillStyle: 'hsl(200,30%,80%)'
		}),
		'tri'
	);
}

var currentFrame = null;
function createDopesheet(animations) {
	var dopesheetColumns = $('#dopesheetColumns');
	dopesheetColumns.html('');

	var currentCell = null;

	var column = null;

	for (var f = -1; f <= Animation.MAX_FRAMES; f++) {
		column = $(document.createElement('div'));
		column.addClass('DopeColumn');
		dopesheetColumns.append(column);

		if (f === -1) {
			column.append('<div class="DopeNull"></div>');

			animations.forEach(function(animation) {
				var object = animation.object;

				var cell = $(document.createElement('div'));
				cell.addClass('DopeNull');
				cell.html(object.name);
				column.append(cell);
			})

			continue;
		}

		var frameCell = $(document.createElement('div'));
		frameCell.addClass('DopeNull');
		frameCell.html(f);

		column.append(frameCell);

		animations.forEach(function(animation) {
			var object = animation.object;

			var cell = $(document.createElement('div'));
			cell.addClass('DopeCell');
			if (animation.frames[f])
				cell.html('&diams;');
			else
				cell.html('');

			var config = {
				_create: function() {
					cell.html('&diams;');
					currentFrame = animation.frames[frameNumber];
				},
				_remove: function() {
					cell.html('');
					currentFrame = null;
				}
			};

			if (f === 0) {
				currentCell = cell;
				currentCell.addClass('SelectedCell');
				currentFrame = animation.frames[0];
				animation.updateFrame(0, config);
				if (currentFrame)
					currentFrame._remove = config._remove;
				currentFrame.draw();
			}

			cell.bind('click', (function(frameNumber) {
				return function(event) {
					if (currentCell)
						currentCell.removeClass("SelectedCell");

					cell.addClass("SelectedCell");
					currentCell = cell;

					animation.updateFrame(frameNumber, config);

					currentFrame = animation.frames[frameNumber];
					if (currentFrame)
						currentFrame._remove = config._remove;
				};
			})(f));
			
			column.append(cell);
		});
	}
}

$('#removeFrame').bind('click', function() {
	if (currentFrame)
		currentFrame.remove();
});

var t = newTriangle();
t.move(200,0);

var toggleDopesheet = $('#toggleDopesheet');
toggleDopesheet.bind('click', function() {
	var willHide = $('#dopesheet').css('display') !== 'none';
	if (willHide)
		$('#toggleDopesheet').html('&Delta;'); // Up symbol
	else
		$('#toggleDopesheet').html('&nabla;'); // Down symbol

	$('#dopesheet').toggle();
});

var sample = '[{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[99, -100, 0]","origin":"[-102, 98, 0]","angle":0,"xScale":100,"yScale":45},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[94, -113, 0]","origin":"[-102, 98, 0]","angle":-1.8476102659947131,"xScale":100,"yScale":45},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[90, -99, 0]","origin":"[-102, 98, 0]","angle":0,"xScale":94,"yScale":43},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[99, -99, 0]","origin":"[-102, 98, 0]","angle":0,"xScale":100,"yScale":6},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[233, -183, 0]","origin":"[-102, 98, 0]","angle":-8.365886124032546,"xScale":94,"yScale":40},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[268, -230, 0]","origin":"[-102, 98, 0]","angle":-62.74467162505693,"xScale":55,"yScale":40},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[252, -251, 0]","origin":"[-102, 98, 0]","angle":-160.01689347810003,"xScale":53,"yScale":40},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[221, -202, 0]","origin":"[-102, 98, 0]","angle":129.17365797044425,"xScale":51,"yScale":30},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[201, -194, 0]","origin":"[-102, 98, 0]","angle":65.09523119190482,"xScale":43,"yScale":30},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[170, -189, 0]","origin":"[-102, 98, 0]","angle":27.645975363738668,"xScale":2,"yScale":36},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[154, -140, 0]","origin":"[-102, 98, 0]","angle":-79.21570213243741,"xScale":4,"yScale":43},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[281, -205, 0]","origin":"[-102, 98, 0]","angle":106.26020470831196,"xScale":49,"yScale":9},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[373, -224, 0]","origin":"[-102, 98, 0]","angle":135,"xScale":72,"yScale":55},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[440, -250, 0]","origin":"[-102, 98, 0]","angle":142.30575953331083,"xScale":66,"yScale":60},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[527, -267, 0]","origin":"[-102, 98, 0]","angle":144.68878656036682,"xScale":83,"yScale":77},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[532, -255, 0]","origin":"[-102, 98, 0]","angle":124.69515353123398,"xScale":83,"yScale":77},null,null,{"rotation":"matrix(1.000000, 0.000000, 0.000000, 1.000000, 0.000000, 0.000000)","position":"[526, -247, 0]","origin":"[-102, 98, 0]","angle":118.73979529168805,"xScale":83,"yScale":77}]';
var animations = [new Animation(t).parse(sample)];
createDopesheet(animations);

var playing = false;
var frameNumber = 0;
var intervalHandle = null;
var timeoutHandle = null;
function _playAnimation() {
	$('#togglePlay').html('Frame ' + frameNumber + '');

	animations.forEach(function(animation) {
		animation.play(frameNumber);
	});

	frameNumber++;

	if (frameNumber > Animation.MAX_FRAMES) {
		clearInterval(intervalHandle);
		intervalHandle = null;

		playing = false;
		$('#togglePlay').html('Play @ 24 FPS');

		if (timeoutHandle)
			clearTimeout(timeoutHandle);

		timeoutHandle = setTimeout(function() {
			animations.forEach(function(animation) {
				animation.stop();
				console.info(animation.stringify());
			});

			if (currentFrame)
				currentFrame.draw();

		}, 700);

		return;
	}
}

$('#togglePlay').bind('click', function() {
	animations.forEach(function(animation) {
		animation.stop();
	});

	frameNumber = 0;
	if (intervalHandle) {
		clearInterval(intervalHandle);
		intervalHandle = null;
	}
	if (timeoutHandle)
		clearTimeout(timeoutHandle);

	playing = !playing;
	if (!playing) {
		$('#togglePlay').html('Play @ 24 FPS');
		return;
	}

	intervalHandle = setInterval(_playAnimation, 1000 / Animation.FPS);
});


