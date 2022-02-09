// ^[0-9]_*|[0-9][0-9]_*
// process.exit(1);
let reg = /^[0-9]{1,3}_/;
var initDir = process.argv[2];
if(initDir.indexOf('/1_front/') === -1){
  var dir = '1_front';
}else if(initDir.indexOf('/2_back/') === -1){
  var dir = '2_back';
} else {
	console.log('ディレクトリが違います');
	process.exit(1)
}

var fs = require("fs")
var path = require("path")


var walk = function(p, callback){
	var results = [];
	fs.readdir(p, function (err, files) {
		if (err) throw err;

		var pending = files.length;
		if (!pending) return callback(null, results); //全てのファイル取得が終わったらコールバックを呼び出す

		files.map(function (file) { //リスト取得
			return path.join(p, file);
		}).filter(function (file) {
			if (fs.statSync(file).isDirectory()) walk(file, function (err, res) { //ディレクトリだったら再帰
				// ファイル名を変更する
				if (path.basename(file).match(reg)) {
					// 旧ファイル名から新ファイル名を作成する
					var fileName = path.basename(file);
					var dir = path.dirname(file) + '/';
					afterFileName = fileName.replace(/_.*/, '');
					console.log(fileName, afterFileName);

					fs.rename(dir + fileName, dir + afterFileName, err => {
						if (err) throw err;
						console.log(fileName + "-->" + afterFileName);
					});

				}
				results.push({lessonName:path.basename(file), chapterName:res}); //子ディレクトリをchildrenインデックス配下に保存


				if (!--pending) callback(null, results);
			});
      return fs.statSync(file).isFile();
    }).forEach(function (file) {
			if (!--pending) callback(null, results);
		});

	});
}

walk(initDir, function(err, results) {
	if (err) throw err;

	// ディレクトリの一番上のkey名を変更
	var jsons = results[0];
	jsons.courseName = jsons.lessonName
	jsons.courseName = dir;
	delete jsons.lessonName;
	jsons.lessonInfo = jsons.chapterName;
	delete jsons.chapterName;

	// chapterを配列に変換
	jsons.lessonInfo.forEach(function (item) {
		var chapters = [];
		item.chapterName.forEach(function (chapter) {
			chapters.push(chapter.lessonName);
		});
		item.chapterName = chapters;
	});

	// lessonsInfoの中身を並び替え
	jsons.lessonInfo.sort((a, b) => {
		if (a.lessonName < b.lessonName) {
			return -1;
		}
		if (a.lessonName > b.lessonName) {
			return 1;
		}
		return 0;
	})

	// chapterNameの中身を並び替え
	jsons.lessonInfo.forEach(function (lesson) {
		lesson.chapterName.sort();
	})

	// リネーム処理
	jsons.courseName = jsons.courseName.replace(reg, '');
	jsons.lessonInfo.forEach(function (item) {
		item.lessonName = item.lessonName.replace(reg, '');
		for (var i = 0; item.chapterName.length > i; i++) {
			item.chapterName[i] = item.chapterName[i].replace(reg, '');
		}
	})


	data = jsons;
	console.log(JSON.stringify(data, null, 1)); //一覧出力
});
