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

// ファイル名を変更したりjson作成したりする部分（jsonの加工はcallback参照）
var walk = function(p, callback){
	var jsonArray = [];
	fs.readdir(p, function (err, files) {
		if (err) throw err;

		var fileLen = files.length; // 処理の回数無くなった段階でcallback
		if (!fileLen) return callback(jsonArray);

		files.map(function (file) {
			return path.join(p, file);
		}).filter(function (file) {
			if (fs.statSync(file).isDirectory()) walk(file, function (err, res) {
				// num_で始まるディレクトリ名を変更する
				if (path.basename(file).match(reg)) changeFileName(file);

				// リファクタリング対象。全てのディレクトリ名に対しlessonNameをつけて後半の処理でリネームしている
				jsonArray.push({lessonName:path.basename(file), chapterName:res});

				if (!--fileLen) callback(jsonArray);
			});
      return fs.statSync(file).isFile();
    }).forEach(function (file) {
			if (!--fileLen) callback(jsonArray);
		});

	});
}


walk(initDir, function(jsonArray) {
	var jsons = jsonArray[0];

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

/////////////// ファイルに関する処理 ////////////////////
function changeFileName() {
	// 旧ファイル名から新ファイル名を作成する
	var fileName = path.basename(file);
	var dir = path.dirname(file) + '/';
	afterFileName = fileName.replace(/_.*/, '');

	fs.rename(dir + fileName, dir + afterFileName, err => {
		if (err) throw console.log('renameでエラーが起きました¥n' + err);
	});
}

/////////////// jsonに関する処理 ////////////////////
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
function jsonRename(jsons) {
	jsons.courseName = jsons.courseName.replace(reg, '');

	jsons.lessonInfo.forEach(function (item) {
		item.lessonName = item.lessonName.replace(reg, '');
		chapterNameRename(item);
	})

	function chapterNameRename(item) {
		for (var i = 0; item.chapterName.length > i; i++) {
			item.chapterName[i] = item.chapterName[i].replace(reg, '');
		}
	}
}
