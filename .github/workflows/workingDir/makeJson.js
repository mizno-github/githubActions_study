// ^[0-9]_*|[0-9][0-9]_*
// js実行までに行う事
// dirの代入
var initDir = process.argv[2];
if(initDir.indexOf('/1_front/') === -1){
  var dir = '1_front';
}else if(initDir.indexOf('/2_back/') === -1){
  var dir = '2_back';
} else {
	console.log('ディレクトリが違います');
	process.exit(1)
}
// var dir = '1_front/'; // gitの差分から指定
var fs = require("fs")
var path = require("path")

// var work = 0;

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
				// console.log(fs.readdirSync(file, { withFileTypes: true }));
				// console.log(idx);
				// process.exit(1);

				// if (work == res.length) {
        //   results.push({ courseName: file.replace('/lessons', ''), lessonInfo: res }); //子ディレクトリをchildrenインデックス配下に保存
        //   results.push({ courseName: file.replace('/lessons', ''), lessonInfo: res }); //子ディレクトリをchildrenインデックス配下に保存
        // } else {
        //   work++;
		  		results.push({lessonName:path.basename(file), chapterName:res}); //子ディレクトリをchildrenインデックス配下に保存
		  	// 	results.push({lessonName:path.basename(file), chapterName:res}); //子ディレクトリをchildrenインデックス配下に保存
        // }
				if (!--pending) callback(null, results);
			});
      return fs.statSync(file).isFile();
    }).forEach(function (file) { //ファイル名を保存
      // if (path.basename(file).match(/^[0-9]_*|^[0-9][0-9]_*/g)) {
      //   results.push(path.basename(file));
      // }
			if (!--pending) callback(null, results);
		});

	});
}

walk(initDir, function(err, results) {
	if (err) throw err;

	// ディレクトリの一番上のkey名を変更
	results[0].courseName = results[0].lessonName
	results[0].courseName = dir;
	delete results[0].lessonName
	results[0].lessonInfo = results[0].chapterName
	delete results[0].chapterName

	// chapterを配列に変換
	results[0].lessonInfo.forEach(function (item) {
		var chapters = [];
		item.chapterName.forEach(function (chapter) {
			chapters.push(chapter.lessonName);
			console.log(chapter.lessonName);
		});
		item.chapterName = chapters;
	});
	data = results[0];
	console.log(JSON.stringify(data)); //一覧出力
});
