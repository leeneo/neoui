function dayForward(startDate, num) {

	var dayTime = 1 * 24 * 60 * 60 * 1000; //一天的毫秒数
	//console.log("一天的毫秒数：" + dayTime);
	// var oneday = new Date(dayTime);
	// console.log(oneday.toLocaleDateString());    //为什么是1970/1/2
	var fd = new Date(startDate);
	var resDay = new Date(fd.getTime() + dayTime * num).toLocaleDateString();
	//console.log(resDay);
	return resDay;
}
