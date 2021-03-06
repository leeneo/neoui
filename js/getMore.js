/*
 *Author:Leeneo
 *Contact:leeneo@xingzhihen.com
 *Words:写Javascrtip很爽的地方就在于，看似很复杂的功能其实也就几行代码而已。
 *Useage: getMoreInit(ulClassName, listClassName, num, btnClassName);
 *tips:需要引入jq
 */

function getMoreInit(uClass, lClass, iniNum, btnClass) {

    // 在此初始化要加载的元素集合，index为界面默认显示的条数
    var $items = $(uClass + ' ' + lClass); //要循环显示的元素
    var $click = $(btnClass); //将此类名放在点击按钮的低级元素上
    var index = iniNum;
    var n = 1;
    console.log("条目总数：" + $items.length + ";初始条数：" + index);

    // 初始化，首次加载条数为index.
    $items.slice(index).hide();

    //  处理是否显示查看更多按钮
    if ($items.length <= index)
        $click.hide();

    // 加载后续未显示条目
    function getMore(index, obj) {      
        if (index * n < $items.length) {
            n++;
            console.log("n++:" + n);
            $items.slice(index, index * n).fadeIn(500);
        }
        if (index * n >= $items.length) {
            $(obj).html('显示完毕');
            //console.log(obj);
        }
    }

    // 查看更多点击事件
    $click.children().click(function () {
        getMore(index, this);
    });
}