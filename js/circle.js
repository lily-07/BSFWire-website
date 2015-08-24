var canvas,
	ctx,
	width,
	height,
	xGravity,
	yGravity,
	friction,
	dots,
	palettes,
	paletteCount,
	paletteCurrent,
	colorCount,
	tick,
	mx,
	my,
	PI,
	TWOPI;

function rand( min, max ) {
	return Math.random() * ( max - min ) + min;
}

function randInt( min, max ) {
	return Math.floor( min + Math.random() * ( max - min + 1 ) );
};

function Dot() {
	this.x = width / 2;
	this.y = height - 120;
	this.vx = rand( -2, 2 );
	this.vy = rand( -2, 2 );
	this.radius = rand( 5, 35 );
	this.color = randInt( 1, colorCount - 1 );
}

Dot.prototype.step = function( i ) {
	this.x += this.vx;
	this.y += this.vy;
		
	if( this.vx > 0 && this.x + this.radius >= width ) {
		this.vx *= -0.6;
	}
	
	if( this.vx < 0 && this.x - this.radius <= 0 ) {
		this.vx *= -0.6;
	}
	
	if( this.vy > 0 && this.y + this.radius >= height ) {
		this.vy *= -0.6;
	}
	
	if( this.vy < 0 && this.y - this.radius <= 0 ) {
		this.vy *= -0.6;
	}
	
	if( this.x + this.radius > width ) {
		this.x = width - this.radius;
		this.vy *= friction;
	}
	
	if( this.x - this.radius < 0 ) {
		this.x = this.radius;
		this.vy *= friction;
	}
	
	if( this.y + this.radius > height ) {
		this.y = height - this.radius;
		this.vx *= friction;
	}
	
	if( this.y - this.radius < 0 ) {
		this.y = this.radius;
		this.vx *= friction;
	}
	
	// handle gravity	
	this.vx += xGravity;
	this.vy += yGravity;
};

Dot.prototype.collide = function( otherDot ) {
	var dx = otherDot.x - this.x,
		dy = otherDot.y - this.y,
		dist = Math.sqrt( dx * dx + dy * dy ),
		minDist = this.radius + otherDot.radius;
	if( dist < minDist ) {
		var tx = this.x + dx / dist * minDist,
			ty = this.y + dy / dist * minDist,
			ax = ( tx - otherDot.x ) * 0.6,
			ay = ( ty - otherDot.y ) * 0.6;
		this.vx -= ax;
		this.vy -= ay;      
		otherDot.vx += ax;
		otherDot.vy += ay;
		this.vx *= friction * 0.9;
		this.vy *= friction * 0.9;
		otherDot.vx *= friction * 0.9;
		otherDot.vy *= friction * 0.9;
	}
};

Dot.prototype.draw = function() {
	ctx.beginPath();
	ctx.arc( this.x, this.y, this.radius, 0, TWOPI );
	ctx.lineWidth = 2;
	ctx.strokeStyle = palettes[paletteCurrent][this.color];
	ctx.stroke();

};

function circle() {
	canvas = document.getElementById( 'canvas' );
	ctx = canvas.getContext( '2d' );
	xGravity = 0;
	yGravity = 1;
	friction = 0.99;
	dots = [];

	palettes = [
		[
			'#979797',
			'#FA6900',
			'#32B1E8',
			'#35DB6D'
		]
	];
	paletteCount = palettes.length;
	paletteCurrent = 0;	
	colorCount = palettes[ 0 ].length;
	PI = Math.PI;
	TWOPI = PI * 2;
	
	reset();
	loop();
}

function reset() {
	width = window.innerWidth;
	height = window.innerHeight;

	width = document.getElementById('canvas').offsetWidth;;
	height = document.getElementById('canvas').offsetHeight;

	dots.length = 0;
	tick = 0;
	mx = 500;
	my = 500;
	
	canvas.width = width;
	canvas.height = height;
}

function create() {
	if( tick && dots.length < 50 ) {
		dots.push( new Dot() );	
	}
}

function step() {
	var i = dots.length;
	while( i-- ) {
		dots[ i ].step( i );	
	}
	
	i = dots.length;
	while( i-- ) {
		dot = dots[ i ];
		var j = i;
		if( j > 0 ) {
			while( j-- ) {
				dot.collide( dots[ j ] );
			}
		}
	}
}

function draw() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, width, height );
	
	var i = dots.length;
	while( i-- ) {
		dots[ i ].draw();	
	}
}

function loop() {
	requestAnimationFrame( loop );
	create();
	step();
	draw();
	tick++;
}

function onmousemove( e ) {
	mx = e.pageX;
	my = e.pageY;
	
	xGravity = ( mx - width / 2 ) / ( width / 1 );
}

window.addEventListener( 'resize', reset );
window.addEventListener( 'mousemove', onmousemove );

/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */
(function ($) {
    function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ( (mode || !$.support.boxModel) ) { // IE, Gecko
            height = (mode == 'CSS1Compat') ?
            document.documentElement.clientHeight : // Standards
            document.body.clientHeight; // Quirks
        }

        return height;
    }

    $(window).scroll(function () {
        var vpH = getViewportHeight(),
            scrolltop = (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop),
            elems = [];
        
        // naughty, but this is how it knows which elements to check for
        $.each($.cache, function () {
            if (this.events && this.events.inview) {
                elems.push(this.handle.elem);
            }
        });

        if (elems.length) {
            $(elems).each(function () {
                var $el = $(this),
                    top = $el.offset().top,
                    height = $el.height(),
                    inview = $el.data('inview') || false;

                if (scrolltop > (top + height) || scrolltop + vpH < top) {
                    if (inview) {
                        $el.data('inview', false);
                        $el.trigger('inview', [ false ]);                        
                    }
                } else if (scrolltop < (top + height)) {
                    if (!inview) {
                        $el.data('inview', true);
                        $el.trigger('inview', [ true ]);
                    }
                }
            });
        }
    });
    
    // kick the event to pick up any elements already in view.
    // note however, this only works if the plugin is included after the elements are bound to 'inview'
    $(function () {
        $(window).scroll();
    });
})(jQuery);


var set = false;
$('#canvas').bind('inview', function (event, visible) {
  if (visible == true && !set) {
    set = true;
    circle();
  }
});












