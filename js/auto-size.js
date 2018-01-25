/**
 * Created by lovo_bdk on 15-12-17.
 */
!(function(win, doc){
    function setFontSize() {
        // 获取window 宽度
        // zepto实现 $(window).width()就是这么干的
        var winWidth =  window.innerWidth;
        doc.documentElement.style.fontSize = (winWidth / 640) * 100 + 'px' ;

    }

    var evt = 'onorientationchange' in win ? 'orientationchange' : 'resize';

    var timer = null;

    win.addEventListener(evt, function () {
        clearTimeout(timer);

        timer = setTimeout(setFontSize, 300);
    }, false);

    win.addEventListener("pageshow", function(e) {
        if (e.persisted) {
            clearTimeout(timer);

            timer = setTimeout(setFontSize, 300);
        }
    }, false);

    //初始化
    setFontSize();

}(window, document));

// var iScale = 1 / window.devicePixelRatio;
// document.write('<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=' + iScale + ', maximum-scale=' + iScale + ', minimum-scale=' + iScale + '" />');
// document.documentElement.style.fontSize = document.documentElement.clientWidth/6.4 + "px";
