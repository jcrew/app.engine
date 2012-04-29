/*
  Copyright 2011 JAEYOON LEE (http://twitter.jaeyoon.org)
  
  TITLE: UZZUZZU
  FILE: uzzuzzu.css
  DISCRIPTION: twitter client
*/

var username = 'jaeyoon_org';
var numPosts = 100;


// jTwitter extension for jquery
// http://plugins.jquery.com/project/jtwitter
(function( $ ){
        $.extend( {
                jTwitter: function( username, numPosts, fnk ) {
                        var info = {};

                        // If no arguments are sent or only username is set
                        if( username == 'undefined' || numPosts == 'undefined' ) {
                                return;
                        } else if( $.isFunction( numPosts ) ) {
                                // If only username and callback function is set
                                fnk = numPosts;
                                numPosts = 5;
                        }

                        var url = "http://twitter.com/status/user_timeline/"
                                + username + ".json?count="+numPosts+"&callback=?";

                        $.getJSON( url, function( data ){
                                if( $.isFunction( fnk ) ) {
                                        fnk.call( this, data );
                                }
                        });
                }
        });
})( jQuery );


$(document).ready(function(){
	$('#header').empty();
	$('#header').append(username);

    $.jTwitter(username, numPosts, function(data){
        $('#container').empty();
        $.each(data, function(i, post){
            $('#container').append(
                  '<div class="posts">'
                //+ '    <div class="avatar"><img src="' + data[0].profile_image_url + '" /></div>'
                + '    <div class="mention">' + post.text + '</div>'
                + '    <div class="timeline">' + post.created_at + '</div>'
                + '</div>'
            );
        });
    });
});