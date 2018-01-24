/*
* Author:Neo 
* Contact:leeneo@xingzhihen.com
* Site:xingzhihen.com
*/

/**
 *获取单个cookie函数
 *tips：由于本函数使用('cookie name'+'=')分隔cookie字符串，所有不适用于cookie value 中有‘’的应用场景
 * @param {string} ckName:cookie name;想要获取的cookie Name.
 * @returns {string} cok:cookie value;将返回的cookie value.
 */
var getCookie=function (ckName) {
	var cookies = document.cookie;
	var arrcoks = cookies.split(";");
	//array.forEach(function(currentValue, index, arr), thisValue)；currentValue 当前元素，必需；
	var cok = "";
	arrcoks.forEach(function (item) {
		var arr = item.split(ckName + "=");
		if (arr.length === 2) {
			cok = arr[1];
		}
	});
	console.log(cok);
	return cok;
}

