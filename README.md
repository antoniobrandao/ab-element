# ab-element

DOM Element prototype addons.

### methods
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

### properties
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

	var my_el = addChildToBody('DIV');
	my_el.activateSuperPowers();
	my_el.animated = true;
	my_el.x = 50;
	my_el.y = 50;
	my_el.width = 50;
	my_el.height = 50;
	my_el.bgColor = 'red';
	my_el.hasClass('some-class');
	my_el.addClass('some-class');
	my_el.removeClass('some-class');
	my_el.toggleClass('some-class');
	my_el.rotation = 45;
	my_el.scale = 3;
	my_el.changeElementType('IMG');
	my_el.loadImage('http://lorempixel.com/400/200/', function(){ console.log('image loaded')}, true );
	my_el.onTap(function(){ test.rotation = Math.random() * 360; });

## License

MIT
