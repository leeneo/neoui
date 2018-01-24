/*
* Author:Neo 
* Contact:leeneo@xingzhihen.com
* Site:xingzhihen.com
*/

// !!!waring:	here canot use window.onload
// window.onload = function () {
// }

var iScale = 1 / window.devicePixelRatio;
document.write('<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=' + iScale + ', maximum-scale=' + iScale + ', minimum-scale=' + iScale + '" />');
document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + "px";