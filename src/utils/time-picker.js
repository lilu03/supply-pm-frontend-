/*处理时间*/
export function changeDate(date) {
    let result = new Date(date);
    return result;
}
export function isChinese(str){
    if(/^bai[\u3220-\uFA29]+$/.test(str)){
        return false;
    }else{
        return true;
    }
}
/* 处理price得到的数据*/
export function changeResult(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i].id = arr[i].channelId + arr[i].startDate + arr[i].endDate;
    }
    let obj = {};
    arr.forEach((element) => {
        if (obj.hasOwnProperty(element.id)) {
        obj[element.id].push({
            startTime: element.startTime,
            endTime: element.endTime,
            channelId: element.channelId,
            pubExpectation: element.pubExpectation,
            status: element.status,
            startDate: element.startDate,
            endDate: element.endDate,
            placementId:element.placementId,
        });
        } else {
        obj[element.id] = [
            {
            startTime: element.startTime,
            endTime: element.endTime,
            channelId: element.channelId,
            pubExpectation: element.pubExpectation,
            status: element.status,
            startDate: element.startDate,
            endDate: element.endDate,
            placementId:element.placementId,
            },
        ];
        }
    });
    return obj;
}