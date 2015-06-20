# ab-element

DOM Element prototype addons.

- - methods
- Element.prototype.hasClass
- Element.prototype.addClass
- Element.prototype.removeClass
- Element.prototype.toggleClass
- Element.prototype.setChildOf
- Element.prototype.preloadImagesAndCallBack (preloads all IMGs inside element and calls a given callBack)
- Element.prototype.activateSuperPowers (activates x, y, z, width, height, rotation, scale, animated, opacity)

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

	var test = document.createElement('DIV');
	test.setChildOf(document.body);
	test.activateSuperPowers();
	test.animated = true;
	test.x = 50;
	test.y = 50;
	test.width = 50;
	test.height = 50;
	test.hasClass('some-class');
	test.addClass('some-class');
	test.removeClass('some-class');
	test.toggleClass('some-class');
	test.bgColor = 'red';
	test.scale = 3;
	test.rotation = 45;

## License

MIT
