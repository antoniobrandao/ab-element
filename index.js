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

SVGElement.prototype.hasClass = function (className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(this.getAttribute('class'));
};

SVGElement.prototype.addClass = function (className) {
    if (!this.hasClass(className)) {
        this.setAttribute('class', this.getAttribute('class') + ' ' + className);
    }
};

SVGElement.prototype.removeClass = function (className) {
    var removedClass = this.getAttribute('class').replace(new RegExp('(\\s|^)' + className + '(\\s|$)', 'g'), '$2');
    if (this.hasClass(className)) {
        this.setAttribute('class', removedClass);
    }
};

SVGElement.prototype.toggleClass = function (className) {
    if (this.hasClass(className)) {
        this.removeClass(className);
    } else {
        this.addClass(className);
    }
};

Element.prototype.toggleVisibility = function () {
    var visibility = this.getStyle('visibility');
    console.log('visibility:');
    console.dir(visibility);

    if (visibility === 'visible') {
        console.log('111');
        this.style.visibility = 'hidden';
    }
    else {
        console.log('222');
        this.style.visibility = 'visible';
    }
};

Element.prototype.setChildOf = function( newParent ) {
    newParent.appendChild(this);
};

window.addChildToBody = function(tagName)
{
    var newElement = document.createElement('DIV');
    document.body.appendChild(newElement);
    return newElement;
}

Element.prototype.onTap = function( tapCallBack, tolerance, disableClickFallBack, preventDefault, stopPropagation )
{
    console.log('onTap');

    if (!tolerance) { tolerance = 10 };

    this.tapCallBack = tapCallBack;

    var self = this;
    this.addedListeners = false;

    if ('ontouchstart' in window) {
        var start_x,
        start_y,
        diff_x,
        diff_y,
        current_x,
        current_y;
        this.touch_running = false;
        
        var _ontouchStart = function(e)
        {
            if (!self.touch_running) {
                self.touch_running = true;
                if (preventDefault)  { e.preventDefault(); };
                if (stopPropagation) { e.stopPropagation(); };
                diff_x  = 0;
                diff_y  = 0;
                start_x = e.targetTouches[0].clientX;
                start_y = e.targetTouches[0].clientY;
            };
        }
        var _ontouchMove = function(e) {
            if (preventDefault)  { e.preventDefault(); };
            if (stopPropagation) { e.stopPropagation(); };
            current_x   = e.targetTouches[0].clientX;
            current_y   = e.targetTouches[0].clientY;
            diff_x      = -(start_x - current_x);
            diff_y      = -(start_y - current_y);
        }
        var _ontouchEnd = function(e) {
            if (stopPropagation) { e.stopPropagation(); };
            var half_tolerance = (tolerance/2);
            var moved_x_axis   = (diff_x > -half_tolerance && diff_x < half_tolerance);
            var moved_y_axis   = (diff_y > -half_tolerance && diff_y < half_tolerance);

            if (moved_x_axis && moved_y_axis) {
                self.tapCallBack(e);
            }
            self.touch_running = false;
        }

        this.addEventListener('touchstart', _ontouchStart,    false);
        this.addEventListener('touchmove',  _ontouchMove,     false);
        this.addEventListener('touchend',   _ontouchEnd,      false);

    }
    else if (disableClickFallBack) {
        this.addEventListener('click', function(e) {
            if (preventDefault)  { e.preventDefault(); };
            if (stopPropagation) { e.stopPropagation(); };
            this.tapCallBack(e);
        }, false);
    }
};

Element.prototype.updateDragStartCoordinates = function updateDragStartCoordinates(coordinates) 
{
    this.current_position_x = coordinates.x;
    this.current_position_y = coordinates.y;
}

Element.prototype.setupDragging = function setupDragging(options) 
{
    this.drag_activated = true;

    if (!options) 
    {
        options = {
            init_x: 0,
            init_y: 0
        }
    }
    else
    {
        if (!options.init_x ) { options.init_x = 0; };
        if (!options.init_y ) { options.init_y = 0; };
    }

    var element = this;

    // var t3d = this.getStyle('transform');
    // var getStringBetweenParentheses = /\(([^)]+)\)/;
    // var matches = getStringBetweenParentheses.exec(String(t3d))[1];
    // matches = matches.split(',');
    // matches = [parseInt(matches[matches.length-2]), parseInt(matches[matches.length-1])];
    // console.log('matches:');
    // console.dir(matches);

    var start_position_x;
    var diff_position_x;
    var start_value_x       = options.init_x;
    this.current_position_x = options.init_x;
    var start_position_y;
    var diff_position_y;
    var start_value_y       = options.init_y;
    this.current_position_y = options.init_y;

    var processTick = function()
    {
        element.style.transform = 'translate3d(' + self.current_position_x + 'px, ' + self.current_position_y + 'px, 0px)';
        element.style.webkitTransform = 'translate3d(' + self.current_position_x + 'px, ' + self.current_position_y + 'px, 0px)';
    }

    var touchStart = function(e)
    {
        // console.log('touchStart');
        // if (self.settings.preventDefault) { e.preventDefault(); };
        // if (self.settings.stopPropagation) { e.stopPropagation(); };
        
        diff_position_x  = 0;
        diff_position_y  = 0;
        start_position_x = e.targetTouches[0].clientX;
        start_position_y = e.targetTouches[0].clientY;
        self.dragTickInterval = setInterval(processTick, 100);
    }
    var touchMove = function(e)
    {
        // console.log('touchMove');
        // if (self.settings.preventDefault) { e.preventDefault(); };
        // if (self.settings.stopPropagation) { e.stopPropagation(); };
        
        self.current_position_x = e.targetTouches[0].clientX;
        self.current_position_y = e.targetTouches[0].clientY;
        diff_position_x = -(start_position_x - self.current_position_x);
        diff_position_y = -(start_position_y - self.current_position_y);

        // if (self.invert_direction) {
        //     diff_position_x = diff_position_x * -1;
        // };
        var new_x = start_value_x + diff_position_x;
        var new_y = start_value_y + diff_position_y;

        // if (new_y > self.settings.drag_distance_limit) {
        //     new_y = self.settings.drag_distance_limit
        // };
        // if (new_y < -scroll_height_diff-self.settings.drag_distance_limit) {
        //     new_y = -scroll_height_diff-self.settings.drag_distance_limit
        // };

        self.current_position_x = new_x;
        self.current_position_y = new_y;
    }
    var touchEnd = function(e)
    {
        // console.log('touchEnd');
        // if (self.settings.preventDefault) { e.preventDefault(); };
        // if (self.settings.stopPropagation) { e.stopPropagation(); };
        
        // if (diff_position_x > -5 && diff_position_x < 5) { /* equivalent to tap */ };

        // limit drag
        // if (self.current_position_x > 0) {
        //     self.current_position_x = 0
        // };
        // if (self.current_position_x < -scroll_height_diff) {
        //     self.current_position_x = -scroll_height_diff
        // };

        processTick();

        clearInterval(self.dragTickInterval);
        start_value_x = self.current_position_x;
        start_value_y = self.current_position_y;
    }

    element.addEventListener('touchstart', touchStart,    false);
    element.addEventListener('touchmove',  touchMove,     false);
    element.addEventListener('touchend',   touchEnd,      false);
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

Element.prototype.activateCSSTransitions = function (property, transitionDuration, transitionCurve, transitionDelay) {
    if (!property)              { property = 'all'; };
    if (!transitionDuration)    { transitionDuration = 0.5; };
    if (!transitionCurve)       { transitionCurve = 'ease-out'; };
    if (!transitionDelay)       { transitionDelay = 0; };
    var new_transition_value = 'all ' + transitionDuration + 's ' + transitionCurve + ' ' + transitionDelay + 's';
    this.style.webkitTransition   = new_transition_value;
    this.style.mozTransition      = new_transition_value;
    this.style.msTransition       = new_transition_value;
    this.style.oTransition        = new_transition_value;
};

Element.prototype.deactivateCSSTransitions = function () {
    this.style.webkitTransition   = 'none';
    this.style.mozTransition      = 'none';
    this.style.msTransition       = 'none';
    this.style.oTransition        = 'none';
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
    if (this.currentStyle)
        var _style = this.currentStyle[styleProp];
    else if (window.getComputedStyle)
        var _style = document.defaultView.getComputedStyle(this,null).getPropertyValue(styleProp);
    return _style;
}

Object.defineProperty(Element.prototype, 'width', {
    set: function(value) { this.style.width = value + 'px'; },
    get: function() {
        return this.clientWidth;
        // TODO: Compare with clientWidth / offsetWidth
        // if (!this.parentNode) { var temporary = true; document.body.appendChild(this); }
        // var bounds = this.getBoundingClientRect();
        // var width  = (bounds.width|0);
        // if (temporary) { document.body.removeChild(this); }
        // return width;
    },
});

Object.defineProperty(Element.prototype, 'height', {
    set: function(value) { this.style.height = value + 'px'; },
    get: function() {
        // TODO: Compare with clientHeight / offsetHeight
        return this.clientHeight;
        // if (!this.parentNode) { var temporary = true; document.body.appendChild(this); }
        // var bounds = this.getBoundingClientRect();
        // var height = (bounds.height|0);
        // if (temporary) { document.body.removeChild(this); }
        // return height;
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



// //////   ######  ##     ## ########  ######## ########     ########   #######  ##      ## ######## ########   ######  
// //////  ##    ## ##     ## ##     ## ##       ##     ##    ##     ## ##     ## ##  ##  ## ##       ##     ## ##    ## 
// //////  ##       ##     ## ##     ## ##       ##     ##    ##     ## ##     ## ##  ##  ## ##       ##     ## ##       
// //////   ######  ##     ## ########  ######   ########     ########  ##     ## ##  ##  ## ######   ########   ######  
// //////        ## ##     ## ##        ##       ##   ##      ##        ##     ## ##  ##  ## ##       ##   ##         ## 
// //////  ##    ## ##     ## ##        ##       ##    ##     ##        ##     ## ##  ##  ## ##       ##    ##  ##    ## 
// //////   ######   #######  ##        ######## ##     ##    ##         #######   ###  ###  ######## ##     ##  ######  



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

Object.defineProperty(Element.prototype, 'scaleXY', {
    get: function() { this.checkPA(); return this.transform.scale },
    set: function(value) { this.transform.scale = value; this.updateElementTransform(); },
});

Object.defineProperty(Element.prototype, 'rotation', {
    get: function() { this.checkPA(); return this.transform.rotation },
    set: function(value) { this.transform.rotation = value; this.updateElementTransform(); },
});