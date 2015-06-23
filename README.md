# ab-element

DOM Element prototype addons.

- - methods
- Element.prototype.hasClass // same as jQuery equivalent
- Element.prototype.addClass // same as jQuery equivalent
- Element.prototype.removeClass // same as jQuery equivalent
- Element.prototype.toggleClass // same as jQuery equivalent
- Element.prototype.setChildOf // moves element to a new parent
- Element.prototype.preloadImagesAndCallBack // preloads all IMGs inside element and calls a given callBack
- Element.prototype.activateSuperPowers // activates x, y, z, width, height, rotation, scale, animated, opacity
- Element.prototype.loadImageInside //creates an IMG element inside with given src, provides two on-load options: callback and fade in
- Element.prototype.loadImage // assumes element is IMG, applies src and provides two on-load options: callback and fade in
- Element.prototype.changeElementType // creates a new element of desired tagName, replaces it with current element and move in HTML contents
- Element.prototype.getStyle // cross-browser helper to get style values
- Element.prototype.onTap // sets up a touch "tap" handler, with distance tolerance (in px) and a click fallback in non-touch devices
- Element.prototype.activateCSSTransitions // sets up CSS transitions, accepts property value (can be 'all') and transition duration. Major vendor prefixes included
- Element.prototype.deactivateCSSTransitions // removes CSS transitions

- - properties
- x
- y
- z
- width
- height
- rotation
- scale
- animated

## Install

With [npm](http://npmjs.org) do:

```bash
$ npm install ab-element --save-dev
```

## Usage
	
	require('ab-element');

	var test = addChildToBody('DIV');
	test.activateSuperPowers();
	test.animated = true;
	test.x = 50;
	test.y = 50;
	test.width = 50;
	test.height = 50;
	test.bgColor = 'red';
	test.hasClass('some-class');
	test.addClass('some-class');
	test.removeClass('some-class');
	test.toggleClass('some-class');
	test.rotation = 45;
	test.scale = 3;
	test.changeElementType('IMG');
	test.loadImage('http://lorempixel.com/400/200/', function(){ console.log('image loaded')}, true );
	test.onTap(function(){ test.rotation = Math.random() * 360; });

## License

MIT
