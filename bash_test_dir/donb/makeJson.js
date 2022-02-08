
var afterJson = {}
afterJson.courseName = workdir;
afterJson.lessonInfo = {};
for(var n = 0; n < beforeJson.length; n++){
    afterJson.lessonInfo.chapterName = [{}]
    var beforeChapter = beforeJson[n]['contents']
    for(var i = 0; i < beforeChapter.length; i++){
        afterJson.lessonInfo.chapterName[i] = beforeChapter[i].name;
    }
}

console.log(JSON.stringify(afterJson, null, 2));
