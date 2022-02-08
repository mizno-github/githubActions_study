var afterJson = {};
for(var i = 0;i <beforeJson.length-1;i++){
    afterJson.courseName = beforeJson[i]['name'];
    var lessonInfos = beforeJson[i]['contents'];
    for(var n=0;n < lessonInfos.length; n++){
        afterJson.lessonInfo.lessonName = lessonInfos[n]['name'];
        var chapters = lessonInfos[i]['contents'];
        for(var c = 0; c < chapters.length; c++){
            afterjson.lessonInfo.chapter[] = chapters[c]
        }
    }
}


