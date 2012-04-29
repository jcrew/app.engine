// Copyright 2011 JAEYOON LEE (http://sw.jaeyoon.org)
//
// TITLE: testing class for closure verification
// FILE: test.js
// DISCRIPTION: test class
//

function test(display) {
	this.display = display;
	this.output = "THIS IS OUTPUT";
	
	var that = this;
	
	this.display.onclick = function() { that.start(); };
}

test.prototype.init = function() {
	console.log("init(): " + this.output);
}

test.prototype.update = function() {
	console.log("update(): " + this.output);
	//Recursion
    var that = this;
    this.id = setTimeout( function() { that.update(); }, 1000);
}

test.prototype.start = function() {
    console.log("start(): " + this.output);
    
    this.update();
}

document.addEventListener('DOMContentLoaded', function(){
	var display = document.getElementById('display');
	var testing = new test(display);

	testing.init();
}, false);
