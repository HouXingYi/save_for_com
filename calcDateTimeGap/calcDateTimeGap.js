
function calcDateTimeGap(time) {  
    if (time == null || time.length == 0) {  
        return '';  
    }  
    var now = new Date();  
    var dateTime = time.split(" ");  
    if (dateTime && dateTime.length < 2) {  
        return dateTime[0];  
    }  
    var date = dateTime[0].split('-');  
    var time = dateTime[1].split(':');  
    if (date.length < 3 || time.length < 3) {  
        return dateTime[0];  
    }  
    var add = new Date(date[0],parseInt(date[1]-1),date[2],time[0],time[1],time[2]);  
    var str = '';  
    var timeSpan = add - now;
    return timeSpan;  
} 
//越大越晚，当前为0
var gap1 = calcDateTimeGap("2017-09-15 00:00:00"); //date1 开始时间
var gap2 = calcDateTimeGap("2017-09-15 00:00:00"); //date2 结束时间
// console.log(gap1);
// console.log(gap2);




function calcDateGapMonth(time) {  
    if (time == null || time.length == 0) {  
        return '';  
    }  
    var now = new Date();  
    var dateTime = time.split(" ");  
    if (dateTime && dateTime.length < 2) {  
        return dateTime[0];  
    }  
    var date = dateTime[0].split('-');  
    var time = dateTime[1].split(':');  
    if (date.length < 3 || time.length < 3) {  
        return dateTime[0];  
    }  
    var add = new Date(date[0],parseInt(date[1]-1),date[2],time[0],time[1],time[2]);  
    var timeSpan = add - now;
    return timeSpan;  
} 

calcDateGapMonth("2017-09-15 00:00:00");







