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

Element.prototype.setChildOf = function( newParent ) {
    newParent.appendChild(this);
};

Element.prototype.onTap = function( tapCallBack, tolerance, disableClickFallBack )
{   
    if (!tolerance) { tolerance = 10 };

    this.tapCallBack = tapCallBack;

    var self = this;

    if ('ontouchstart' in window) {
        var start_x,
        start_y,
        diff_x,
        diff_y,
        current_x,
        current_y;
        this._ontouchStart = function(e) {
            diff_x  = 0;
            diff_y  = 0;
            start_x = e.targetTouches[0].clientX;
            start_y = e.targetTouches[0].clientY;
        }
        this._ontouchMove = function(e) {
            current_x   = e.targetTouches[0].clientX;
            current_y   = e.targetTouches[0].clientY;
            diff_x      = -(start_x - current_x);
            diff_y      = -(start_y - current_y);
        }
        this._ontouchEnd = function(e) {
            var half_tolerance = (tolerance/2);
            var moved_x_axis   = (diff_x > -half_tolerance && diff_x < half_tolerance);
            var moved_y_axis   = (diff_y > -half_tolerance && diff_y < half_tolerance);
            if (moved_x_axis || moved_y_axis) {
                self.tapCallBack();
            }
        }

        this.addEventListener('touchstart', this._ontouchStart,    false);
        this.addEventListener('touchmove',  this._ontouchMove,     false);
        this.addEventListener('touchend',   this._ontouchEnd,      false);
    }
    else if (disableClickFallBack) {
        this.addEventListener('click', this.tapCallBack, false);
    }
};

Element.prototype.removeOnTap = function( )
{   
    if ('ontouchstart' in window) {
        this.removeEventListener('touchstart', this._ontouchStart,    false);
        this.removeEventListener('touchmove',  this._ontouchMove,     false);
        this.removeEventListener('touchend',   this._ontouchEnd,      false);
        this.tapCallBack = null;
    }
    else if (disableClickFallBack) {
        this.removeEventListener('click', this.tapCallBack, false);
        this.tapCallBack = null;
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

Element.prototype.loadImageInside = function (src, onLoadCallBack, fadeIn, fadeInDuration) {
    var img = document.createElement('IMG');
    if (fadeIn) { img.style.opacity = 0; };
    if (fadeIn || onLoadCallBack) {
        img.onload = function() {
            if (fadeIn) { 
                img.style.webkitTransition   = 'all ' + fadeInDuration + 's';
                img.style.mozTransition      = 'all ' + fadeInDuration + 's';
                img.style.msTransition       = 'all ' + fadeInDuration + 's';
                img.style.oTransition        = 'all ' + fadeInDuration + 's';
                img.style.opacity            = 1;
             };
            if (onLoadCallBack) { onLoadCallBack(); };
        }
    }
    img.setAttribute('src', src)
    this.appendChild(img);
};

Element.prototype.loadImage = function(src, onLoadCallBack, fadeIn, fadeInDuration) {
    var img = this;
    if (fadeIn) { img.style.opacity = 0; };
    if (fadeIn || onLoadCallBack) {
        img.onload = function() {
            if (fadeIn) { 
                if (!fadeInDuration) { fadeInDuration = 0.5; };
                img.style.webkitTransition   = 'all ' + fadeInDuration + 's';
                img.style.mozTransition      = 'all ' + fadeInDuration + 's';
                img.style.msTransition       = 'all ' + fadeInDuration + 's';
                img.style.oTransition        = 'all ' + fadeInDuration + 's';
                img.style.opacity            = 1;
             };
            if (onLoadCallBack) { onLoadCallBack(); };
        }
    }
    img.setAttribute('src', src);
};

Element.prototype.changeElementType = function(newElementType) {
    var e = this;
    if (this.tagName !== newElementType) {
        var d = document.createElement(newElementType);
        d.innerHTML = e.innerHTML;
        e.parentNode.insertBefore(d, e);
        e.parentNode.removeChild(e);
    };
};

Element.prototype.getStyle = function(styleProp)
{
    var x = document.getElementById(el);
    if (this.currentStyle)
        var _style = this.currentStyle[styleProp];
    else if (window.getComputedStyle)
        var _style = document.defaultView.getComputedStyle(this,null).getPropertyValue(styleProp);
    return _style;
}

Object.defineProperty(Element.prototype, 'width', {
    set: function(value) { this.style.width = value + 'px'; }
    get: function() {
        // TODO: Compare with clientWidth / offsetWidth
        if (!this.parentNode) { var temporary = true; document.body.appendChild(this); }
        var bounds = this.getBoundingClientRect();
        var width  = (bounds.width|0);
        if (temporary) { document.body.removeChild(this); }
        return width;
    },
});

Object.defineProperty(Element.prototype, 'height', {
    set: function(value) { this.style.height = value + 'px'; },
    get: function() {
        // TODO: Compare with clientHeight / offsetHeight
        if (!this.parentNode) { var temporary = true; document.body.appendChild(this); }
        var bounds = this.getBoundingClientRect();
        var height = (bounds.height|0);
        if (temporary) { document.body.removeChild(this); }
        return height;
    },
});

Object.defineProperty(Element.prototype, 'opacity', {
    get: function() { return this.getStyle('opacity'); },
    set: function(value) { this.style.opacity = value; }
});

Object.defineProperty(Element.prototype, 'bgColor', {
    get: function() { this.checkPA(); return this.getStyle('background-color'); },
    set: function(value) { this.style.backgroundColor = value; },
});



//////   ######  ##     ## ########  ######## ########     ########   #######  ##      ## ######## ########   ######  
//////  ##    ## ##     ## ##     ## ##       ##     ##    ##     ## ##     ## ##  ##  ## ##       ##     ## ##    ## 
//////  ##       ##     ## ##     ## ##       ##     ##    ##     ## ##     ## ##  ##  ## ##       ##     ## ##       
//////   ######  ##     ## ########  ######   ########     ########  ##     ## ##  ##  ## ######   ########   ######  
//////        ## ##     ## ##        ##       ##   ##      ##        ##     ## ##  ##  ## ##       ##   ##         ## 
//////  ##    ## ##     ## ##        ##       ##    ##     ##        ##     ## ##  ##  ## ##       ##    ##  ##    ## 
//////   ######   #######  ##        ######## ##     ##    ##         #######   ###  ###  ######## ##     ##  ######  



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
    this.powersActivated = true;
    this.updateElementTransform();  
};

Element.prototype.checkPA = function() {
    if (!this.powersActivated) { 
        this.activateSuperPowers(); 
        this.updateElementTransform();
    };
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


Object.defineProperty(Element.prototype, 'animated', {
    get: function() { this.checkPA(); return this.transform.animated; },
    set: function(value) {  this.transform.animated = value; this.updateElementAnimation(); },
});

Object.defineProperty(Element.prototype, 'animation_duration', {
    get: function() { this.checkPA(); return this.transform.animation_duration; },
    set: function(value) {  this.transform.animation_duration = value; this.updateElementAnimation(); },
});

Object.defineProperty(Element.prototype, 'x', {
    get: function() { this.checkPA(); return this.transform.translate.x },
    set: function(value) { this.transform.translate.x = value; this.updateElementTransform(); },
});

Object.defineProperty(Element.prototype, 'y', {
    get: function() { this.checkPA(); return this.transform.translate.y; },
    set: function(value) { this.transform.translate.y = value; this.updateElementTransform(); },
});

Object.defineProperty(Element.prototype, 'z', {
    get: function() { this.checkPA(); return this.transform.translate.z },
    set: function(value) { this.transform.translate.z = value; this.updateElementTransform(); },
});

Object.defineProperty(Element.prototype, 'scale', {
    get: function() { this.checkPA(); return this.transform.scale },
    set: function(value) { this.transform.scale = value; this.updateElementTransform(); },
});

Object.defineProperty(Element.prototype, 'rotation', {
    get: function() { this.checkPA(); return this.transform.rotation },
    set: function(value) { this.transform.rotation = value; this.updateElementTransform(); },
});