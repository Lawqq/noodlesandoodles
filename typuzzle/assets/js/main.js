/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		'xlarge-to-max': '(min-width: 1681px)',
		'small-to-xlarge': '(min-width: 481px) and (max-width: 1680px)'
	});

	$(function() {

		var	$window = $(window),
			$head = $('head'),
			$body = $('body');

		// Disable animations/transitions ...

			// ... until the page has loaded.
				$body.addClass('is-loading');

				$window.on('load', function() {
					setTimeout(function() {
						$body.removeClass('is-loading');
					}, 100);
				});

			// ... when resizing.
				var resizeTimeout;

				$window.on('resize', function() {

					// Mark as resizing.
						$body.addClass('is-resizing');

					// Unmark after delay.
						clearTimeout(resizeTimeout);

						resizeTimeout = setTimeout(function() {
							$body.removeClass('is-resizing');
						}, 100);

				});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Fixes.

			// Object fit images.
				if (!skel.canUse('object-fit')
				||	skel.vars.browser == 'safari')
					$('.image.object').each(function() {

						var $this = $(this),
							$img = $this.children('img');

						// Hide original image.
							$img.css('opacity', '0');

						// Set background.
							$this
								.css('background-image', 'url("' + $img.attr('src') + '")')
								.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
								.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

					});

		// Sidebar.
			var $sidebar = $('#sidebar'),
				$sidebar_inner = $sidebar.children('.inner');

			// Inactive by default on <= large.
				skel
					.on('+large', function() {
						$sidebar.addClass('inactive');
					})
					.on('-large !large', function() {
						$sidebar.removeClass('inactive');
					});

			// Hack: Workaround for Chrome/Android scrollbar position bug.
				if (skel.vars.os == 'android'
				&&	skel.vars.browser == 'chrome')
					$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
						.appendTo($head);

			// Toggle.
				if (skel.vars.IEVersion > 9) {

					$('<a href="#sidebar" class="toggle">Toggle</a>')
						.appendTo($sidebar)
						.on('click', function(event) {

							// Prevent default.
								event.preventDefault();
								event.stopPropagation();

							// Toggle.
								$sidebar.toggleClass('inactive');

						});

				}

			// Events.

				// Link clicks.
					$sidebar.on('click', 'a', function(event) {

						// >large? Bail.
							if (!skel.breakpoint('large').active)
								return;

						// Vars.
							var $a = $(this),
								href = $a.attr('href'),
								target = $a.attr('target');

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Check URL.
							if (!href || href == '#' || href == '')
								return;

						// Hide sidebar.
							$sidebar.addClass('inactive');

						// Redirect to href.
							setTimeout(function() {

								if (target == '_blank')
									window.open(href);
								else
									window.location.href = href;

							}, 500);

					});

				// Prevent certain events inside the panel from bubbling.
					$sidebar.on('click touchend touchstart touchmove', function(event) {

						// >large? Bail.
							if (!skel.breakpoint('large').active)
								return;

						// Prevent propagation.
							event.stopPropagation();

					});

				// Hide panel on body click/tap.
					$body.on('click touchend', function(event) {

						// >large? Bail.
							if (!skel.breakpoint('large').active)
								return;

						// Deactivate.
							$sidebar.addClass('inactive');

					});

			// Scroll lock.
			// Note: If you do anything to change the height of the sidebar's content, be sure to
			// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

				$window.on('load.sidebar-lock', function() {

					var sh, wh, st;

					// Reset scroll position to 0 if it's 1.
						if ($window.scrollTop() == 1)
							$window.scrollTop(0);

					$window
						.on('scroll.sidebar-lock', function() {

							var x, y;

							// IE<10? Bail.
								if (skel.vars.IEVersion < 10)
									return;

							// <=large? Bail.
								if (skel.breakpoint('large').active) {

									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');

									return;

								}

							// Calculate positions.
								x = Math.max(sh - wh, 0);
								y = Math.max(0, $window.scrollTop() - x);

							// Lock/unlock.
								if ($sidebar_inner.data('locked') == 1) {

									if (y <= 0)
										$sidebar_inner
											.data('locked', 0)
											.css('position', '')
											.css('top', '');
									else
										$sidebar_inner
											.css('top', -1 * x);

								}
								else {

									if (y > 0)
										$sidebar_inner
											.data('locked', 1)
											.css('position', 'fixed')
											.css('top', -1 * x);

								}

						})
						.on('resize.sidebar-lock', function() {

							// Calculate heights.
								wh = $window.height();
								sh = $sidebar_inner.outerHeight() + 30;

							// Trigger scroll.
								$window.trigger('scroll.sidebar-lock');

						})
						.trigger('resize.sidebar-lock');

					});

		// Menu.
			var $menu = $('#menu'),
				$menu_openers = $menu.children('ul').find('.opener');

			// Openers.
				$menu_openers.each(function() {

					var $this = $(this);

					$this.on('click', function(event) {

						// Prevent default.
							event.preventDefault();

						// Toggle.
							$menu_openers.not($this).removeClass('active');
							$this.toggleClass('active');

						// Trigger resize (sidebar lock).
							$window.triggerHandler('resize.sidebar-lock');

					});

				});


	var imagePart = (function() {
    return function(x, y, rows, columns, img, special) {
        var _x = x, _y = y;
        var _posX = x, _posY = y;
        var _offsetX, _offsetY;
        var _rows = rows, _columns = columns;
        var _special = special;
        var _img = img;

        this.changePosition = function(posX, posY) {
            _posX = posX;
            _posY = posY;
            this.refresh();
        }

        this.posX = function() { return _posX; }
        this.posY = function() { return _posY; }
        this.special = function() { return _special; }

        this.id = function () {
            return '#' + _posY + _posX;
        }

        this.onDatPlace = function() {
            return _posX == _x && _posY == _y;
        }

        this.refresh = function() {
            var ctx = $(this.id())[0].getContext('2d');
            _offsetX = -_x*(_img.width/_columns);
            _offsetY = -_y*(_img.height/_rows);
            if(!_special) {
                ctx.drawImage(_img, _offsetX, _offsetY);
                if(displayHelp) {
                    ctx.font = "12pt Arial";
                    ctx.fillStyle = "rgb(255,255,255)";
                    ctx.strokeStyle = "rgb(255,255,255)";
                    ctx.globalAlpha = 0.5;
                    ctx.strokeText("#"+_x+_y, 5, _img.height/_rows - 5);
                    ctx.globalAlpha = 1.0;
                }
            } else {
                ctx.fillStyle = '#000';
                ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
            }
        }
    }
})();

var imageParts = [];
var clicks = 0;
var displayHelp = false;

function setImage(url, rows, columns) {
    var img = new Image;
    img.onload = function() {   
        for(var i = 0; i < rows; ++i) {
            for(var j = 0; j < columns; ++j) {
                var ctx = $('#'+i+j)[0].getContext('2d');
                var imgPart;
                ctx.canvas.height = img.height/rows; 
                ctx.canvas.width = img.width/columns;

                if(i == rows - 1 && j == columns - 1) 
                    imgPart = new imagePart(j,i,rows,columns,img,true);
                else 
                    imgPart = new imagePart(j,i,rows,columns,img,false);

                imgPart.refresh();
                imageParts.push(imgPart);
            }
        }
    };  
    img.src = url;
}

function createTable(rows,columns) {
    $('#canvasTable').remove();
    var table = $('<table></table>')
        .attr({
            id : 'canvasTable',
            border : 0,
            cellspacing : 0,
            cellpadding : 0
        });
    for(var i = 0; i < rows; ++i) {
        var tr = $('<tr></tr>');
        for(var j = 0; j < columns; ++j) {
            var td = $('<td></td>')
                .append($('<canvas></canvas>')
                        .addClass('imagePart')
                        .attr({id : ''+i+j}))
                .addClass('tableCell');
            $(tr).append(td);
        }
        $(table).append(tr);
    }
    $('#puzzle').append(table);
}

function getImgPart(x,y) {
    for(var i in imageParts) {
        if(imageParts[i].posX() == x && imageParts[i].posY() == y) {
            return imageParts[i];
        }
    }
}

function getImgPartById(id) {
    for(var i in imageParts) {
        if(imageParts[i].id() == '#' + id) {
            return imageParts[i];
        }
    }
}

function switchParts(x1, y1, x2, y2) {
    var imgPart1 = getImgPart(x1,y1);
    var imgPart2 = getImgPart(x2,y2);

    if(imgPart1 !== imgPart2) {
        imgPart1.changePosition(x2,y2);
        imgPart2.changePosition(x1,y1);
    }
}

function clickOn(id) {
    var imgPart = getImgPartById(id);
    var special;

    for(var i in imageParts) {
        if(imageParts[i].special()) 
            special = imageParts[i];
    }

    if(special === imgPart) 
        return false;

    if(special.posX() == imgPart.posX() || special.posY() == imgPart.posY()) {
        var diffX = special.posX() - imgPart.posX();
        var diffY = special.posY() - imgPart.posY();
        var signX = diffX < 0 ? -1 : 1;
        var signY = diffY < 0 ? -1 : 1;
      
        for(var i = 0; i < Math.max(Math.abs(diffX), Math.abs(diffY)); ++i) {
            switchParts(special.posX(), special.posY(), 
                    diffX != 0 ? special.posX() - signX : special.posX(), 
                    diffY != 0 ? special.posY() - signY : special.posY());
        }
        return true;
    }   
    return false;
}

function randomize(rows, columns, iteration) {
     i = 0;
     interval = setInterval(function() {
         var rand1 = Math.floor(Math.random() * rows);
         var rand2 = Math.floor(Math.random() * columns);
         if(clickOn("" + rand1 + rand2)) i++;
         if(iteration == i) clearInterval(interval);
     }, 7);
}

function setClicks(clicks_) {
    clicks = clicks_;
    $('#clicks').text(clicks);
}

function load(rows, columns, url) {
    if(url == "" || rows == 0 || columns == 0)
        return;

    imageParts = [];
    createTable(rows,columns);
    setImage(url, rows, columns);

    $('.imagePart').click( function() {
        if(clickOn(this.id)) {
            setClicks(clicks+1);
            if(checkWin(rows, columns)) {
                alert('done right');
                setClicks(0);
            }
        }
    });
}

function checkWin(rows, columns) {
    var win = true;
    for(var obj in imageParts) {
        win &= imageParts[obj].onDatPlace();
    }
    return win;
}

$(document).ready(function() {
    var rows = 4, columns = 4;
    load(rows,columns,"http://c300221.r21.cf1.rackcdn.com/ren-magritte-memory-of-a-voyage-1952-1355064662_b.jpg");
    randomize(rows, columns, 100);

    $('#displayHelp').change( function() {
        displayHelp = !displayHelp;
        for(var i in imageParts) {
            imageParts[i].refresh();
        }
    });
  
    $('#randomize').click( function() {
        setClicks(0);
        randomize(rows, columns, 100);
    });
});

	});

})(jQuery);