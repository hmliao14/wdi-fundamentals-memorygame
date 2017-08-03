/*
Copyright (c) 2010-2015 Giulia Alfonsi <electric.g@gmail.com>
Modified work Copyright 2017 Andy Woods

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/

var stopwatch = function(my_element_id) {
	var $time = document.getElementById(my_element_id)
	if(!$time) return

	var api = {}
	var duration = 50
	var time = 0
	var clocktimer
	var h, m, s, ms

	function pad(num, size) {
	    var s = "0000" + String(num)
	    return s.substr(s.length - size)
	}

	function formatTime() {
	    time += duration
	    h = Math.floor( time / (60 * 60 * 1000) )
	    m = Math.floor( time / (60 * 1000) % 60)
	    s = Math.floor(  time / 1000 % 60 )
	    ms = time % 1000 / 10
	    return pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2) + ':' + pad(ms, 2)
	}

	function update() {
	    $time.innerHTML = formatTime()
	}

	api.currentTime = function() {
		return time;
	}

	api.start = function() {
	    clocktimer = setInterval(update, duration)
	}

	api.stop = function() {
	    clearInterval(clocktimer)
	}

	api.reset = function() {
	  this.stop()
	  duration = 0;
	  time = 0;
	  $time.innerHTML = formatTime()
	  duration = 50;
	}

	api.formatTime = formatTime

	return api
}