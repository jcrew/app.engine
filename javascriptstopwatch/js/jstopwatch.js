// Copyright 2011 JAEYOON LEE (http://sw.jaeyoon.org)
//
// TITLE: Javascript Stop Watch
// FILE: jstopwatch.js
// DISCRIPTION: JStopWatch class
//

function JStopWatch(display, sec) {
	this.display = display;
    this.sec = sec;
	this.current = null;
    this.elapsed = null;
    this.runtime = null;
    this.id = null;
    this.eventType = null;
}

JStopWatch.prototype.init = function() {
	switch(this.sec) {
		case 10: 
			this.display.innerHTML = "00:00:00.00";
			break;
			
		case 100:
			this.display.innerHTML = "00:00:00.0";
			break;
			
		case 1000:
			this.display.innerHTML = "00:00:00";
			break;
			
		default:
			this.display.innerHTML = "00:00:00";
	}
	
    this.eventType = "START";
    
    // Closure...
    var that = this;
    this.display.onclick = function() { that.event(); };
}

JStopWatch.prototype.start = function() {
    this.runtime = new Date();
    this.update();
}

JStopWatch.prototype.stop = function() {
	//console.log("stop(): " + this.id);
    clearTimeout(this.id);
}

JStopWatch.prototype.event = function() {
	switch(this.eventType) {
		case "START":
			this.start();
			this.eventType = "STOP";
			break;
			
		case "STOP":
			this.stop();
			this.eventType = "INIT";
			break;
		
		case "INIT":
			//console.log("status()->this.id: " + this.id + " is cleared"); 
			clearTimeout(this.id);
			this.init();
			break;
	}
}

JStopWatch.prototype.update = function() {
	this.current = new Date();
	
	this.elapsed = this.current.getTime() - this.runtime.getTime();
	this.display.innerHTML = this.simplify();

	// Removing previous id from recursion
	if(this.id) {
		clearTimeout(this.id);
		//console.log("update()->this.id: " + this.id + " is cleared!");
	}
		
    // Recursion
    var that = this;
    this.id = setTimeout( function() { that.update(); }, this.sec);
    //console.log("update()->this.id: " + this.id + " is set");
}

// TODO: clarify this function
JStopWatch.prototype.simplify = function() {
	var d = Math.floor(this.elapsed / this.sec);
	var s = Math.floor(this.elapsed / 1000);
	var h = Math.floor( s /3600);
	var m = Math.floor( s / 60);
	
	d -= Math.floor(d * this.sec / 1000) * Math.floor(1000 / this.sec);
	s -= h*3600;
	s -= m * 60;

	var timeStamp = ((h < 10) ? "0" : "") + h;
	timeStamp += ((m < 10) ? ":0" : ":") + m;
	timeStamp += ((s < 10) ? ":0" : ":") + s;

	if (this.sec == 1)
		timeStamp += ((d < 100) ? ((d < 10) ? ".00" : ".0") : ".") + d;
	if (this.sec == 10) 
		timeStamp += ((d < 10) ? ".0" : ".") + d;
	if (this.sec == 100) 
		timeStamp += "." + d;

	return timeStamp;
}

document.addEventListener('DOMContentLoaded', function(){
	var display = document.getElementById('display');
	var stopwatch = new JStopWatch(display, 100);

	stopwatch.init();
}, false);
