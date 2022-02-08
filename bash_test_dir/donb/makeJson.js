var afterJson = {
  "courseName": "",
  "lessonInfo": [
  {
    "lessonName": "",
    "chapterName": []
  }
  ]
}

for(var i = 0;i <beforeJson.length-1;i++){
    afterJson.courseName = beforeJson[i]['name'];
    var lessonInfos = beforeJson[i]['contents'];
    for(var n=0;n < lessonInfos.length; n++){
        afterJson.lessonInfo[i].lessonName = lessonInfos[n]['name'];
        var chapters = lessonInfos[n]['contents'];
        if(chapters){
            for(var c = 0; c < chapters.length; c++){
                afterJson.lessonInfo[i].chapterName.push(chapters[c]);
            }
        }
    }
}

