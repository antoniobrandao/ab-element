'use strict';

Element.prototype.hasClass = function (className) {
    return new RegExp(' ' + className + ' ').test(' ' + this.className + ' ');
};

Element.prototype.addClass = function (className) {
    if (!this.hasClass(className)) {
        this.className += ' ' + className;
    }
};

Element.prototype.removeClass = function (className) {
    var newClass = ' ' + this.className.replace(/[\t\r\n]/g, ' ') + ' '
    if (this.hasClass(className)) {
        while (newClass.indexOf( ' ' + className + ' ') >= 0) {
            newClass = newClass.replace(' ' + className + ' ', ' ');
        }
        this.className = newClass.replace(/^\s+|\s+$/g, ' ');
    }
};

Element.prototype.toggleClass = function (className) {
    var newClass = ' ' + this.className.replace(/[\t\r\n]/g, " ") + ' ';
    if (this.hasClass(className)) {
        while (newClass.indexOf(" " + className + " ") >= 0) {
            newClass = newClass.replace(" " + className + " ", " ");
        }
        this.className = newClass.replace(/^\s+|\s+$/g, ' ');
    } else {
        this.className += ' ' + className;
    }
};

Element.prototype.preloadImagesAndCallBack = function (callBack) {
    var num_imgs = this.childNodes.length;
    var count = 0;
    var loop = function() {
        count = count + 1;
        if (count === num_imgs) {
            callBack(); 
        }
    }
    for (var i = 0; i <= num_imgs - 1; i++) {
        if (this.childNodes[i].tagName === 'IMG') {
            this.childNodes[i].onload = loop;
        }
    }
};

Element.prototype.activateSuperPowers = function() {
    this.transform = {
        translate: {
            x: 0,
            y: 0,
            z: 0,
        },
        scale: 1,
        angle: 0,
        animated: false,
        animation_duration: 0.5,
    };

    this.updateElementTransform();  
};

Element.prototype.updateElementTransform = function()
{
    var value = [
        'translate3d(' + this.transform.translate.x + 'px, ' + this.transform.translate.y + 'px, 0)',
        'scale(' + this.transform.scale + ', ' + this.transform.scale + ')',
        'rotateZ(' + this.transform.rotation + 'deg)'
        // 'rotate3d('+ this.transform.rx +','+ this.transform.ry +','+ this.transform.rz +','+  this.transform.rotation + 'deg)'
    ];
    value = value.join(" ");
    this.style.webkitTransform = value;
    this.style.transform = value;
}

Element.prototype.updateElementAnimation = function()
{
    if (this.transform.animated) { 
        this.style.webkitTransition   = 'all ' + this.animation_duration + 's';
        this.style.mozTransition      = 'all ' + this.animation_duration + 's';
        this.style.msTransition       = 'all ' + this.animation_duration + 's';
        this.style.oTransition        = 'all ' + this.animation_duration + 's';
    } else {
        this.style.webkitTransition   = 'none';
        this.style.mozTransition      = 'none';
        this.style.msTransition       = 'none';
        this.style.oTransition        = 'none';
    }; 
}

Element.prototype.setChildOf = function( parent ) {
    parent.appendChild(this);
};

Object.defineProperty(Element.prototype, 'animated', {
    get: function() { return this.transform.animated; },
    set: function(value) {  this.transform.animated = value; this.updateElementAnimation(); },
});

Object.defineProperty(Element.prototype, 'animation_duration', {
    get: function() { return this.transform.animation_duration; },
    set: function(value) {  this.transform.animation_duration = value; this.updateElementAnimation(); },
});

Object.defineProperty(Element.prototype, 'bgColor', {
    get: function() { return this.style.backgroundColor; },
    set: function(value) { this.style.backgroundColor = value; },
});

Object.defineProperty(Element.prototype, 'x', {
    get: function() { return this.transform.translate.x },
    set: function(value) { this.transform.translate.x = value; this.updateElementTransform(); },
});

Object.defineProperty(Element.prototype, 'y', {
    get: function() { return this.transform.translate.y; },
    set: function(value) { this.transform.translate.y = value; this.updateElementTransform(); },
});

Object.defineProperty(Element.prototype, 'z', {
    get: function() { return this.transform.translate.z },
    set: function(value) { this.transform.translate.z = value; this.updateElementTransform(); },
});

Object.defineProperty(Element.prototype, 'scale', {
    get: function() { return this.transform.scale },
    set: function(value) { this.transform.scale = value; this.updateElementTransform(); },
});

Object.defineProperty(Element.prototype, 'rotation', {
    get: function() { return this.transform.rotation },
    set: function(value) { this.transform.rotation = value; this.updateElementTransform(); },
});

Object.defineProperty(Element.prototype, 'width', {
    get: function() { return this.clientWidth },
    set: function(value) { this.style.width = value + 'px'; }
});

Object.defineProperty(Element.prototype, 'height', {
    get: function() { return this.clientHeight },
    set: function(value) { this.style.height = value + 'px'; }
});

Object.defineProperty(Element.prototype, 'opacity', {
    get: function() { return this.style.opacity; },
    set: function(value) { this.style.opacity = value; }
});
