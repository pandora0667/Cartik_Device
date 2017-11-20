// HTML5 AUDIO CODE WITH FALLBACK

// PLAYER VARIABLES


var mp3snd 	= "../mp3/front.mp3";	// MP3 FILE

var loopsong	= "no"			// LOOP MUSIC | yes | no |
var autostarts	= "yes"			// AUTO START MUSIC | yes | no |

var centerp	= "no"			// CENTER PLAYER | yes | no |


// -----------------------------------------------
// Created by: Allwebco Design Corporation
// No License is included. This script can be freely copied, distributed or sold
// YOU DO NOT NEED TO EDIT BELOW THIS LINE

if (loopsong == "yes") {
    var looping5="loop";
    var loopingE="true";
}
else{
    var looping5="";
    var loopingE="false";
}
if (autostarts == "yes") {
    var h5auto="autoplay";
    var h4auto="1";
}
else{
    var h5auto="";
    var h4auto="0";
}
if (centerp == "yes") {
    var centerply="auto";
}
else{
    var centerply="0";
}
if (centerp == "yes") {
    document.write('<center>');
}

document.write('<audio autoplay = "autoplay"> ');
document.write('<source src="'+mp3snd+'" type="audio/mpeg">');

document.write('<bgsound src="'+mp3snd+'" loop="false">');

document.write('</audio>');
if (centerp == "yes") {
    document.write('</center>');
}
