var fs = require("fs")
var path = require("path")

let reg = /^[0-9]{1,3}_/;
var initDir = process.argv[2];

// front, backディレクトリ判定
if (initDir.indexOf('/1_front/') === -1) {
  var dir = '1_front';
}else if(initDir.indexOf('/2_back/') === -1){
  var dir = '2_back';
} else {
	console.log('ディレクトリが違います');
	process.exit(1)
}


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

					fs.rename(dir + fileName, dir + afterFileName, err => {
						if (err) throw console.log('renameでエラーが起きました¥n' + err);
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
	var jsons = results[0];

	// ディレクトリの一番上のkey名を変更
	jsonChangeKeyName(jsons)

	// chapterをオブジェクトから配列に変換
	jsonTransform(jsons);

	// 並べ替え
	jsonSort(jsons);

	// リネーム処理
	jsonRename(jsons);

	console.log(JSON.stringify(jsons, null, 1)); //一覧出力
});

function jsonChangeKeyName(jsons) {
	// 正しいKey名に変更
	jsons.courseName = jsons.lessonName
	jsons.courseName = dir;
	jsons.lessonInfo = jsons.chapterName;

	// 不要なので削除
	delete jsons.lessonName;
	delete jsons.chapterName;
}

function jsonTransform(jsons) {
	jsons.lessonInfo.forEach(function (item) {
		var chapters = [];

		item.chapterName.forEach(function (chapter) {
				chapters.push(chapter.lessonName);
		});
		item.chapterName = chapters;
	});
}

function jsonSort(jsons) {
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
}

// 数字が無い状態にリネーム(courseName, lessonName, chapterName)
function jsonRename() {
	jsons.courseName = jsons.courseName.replace(reg, '');

	jsons.lessonInfo.forEach(function (item) {
		item.lessonName = item.lessonName.replace(reg, '');
		chapterNameRename(item);
	})

	function chapterNameRename() {
		for (var i = 0; item.chapterName.length > i; i++) {
			item.chapterName[i] = item.chapterName[i].replace(reg, '');
		}
	}
}
