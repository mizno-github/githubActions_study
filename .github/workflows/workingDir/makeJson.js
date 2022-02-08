// ^[0-9]_*|[0-9][0-9]_*
// js実行までに行う事
// dirの代入
var initDir = __dirname;
if(initDir.indexOf('1_front/') === 0){
  var dir = '1_front/';
}else if(initDir.indexOf('2_back/') === 0){
  var dir = '2_back/';
} else {
	console.log('ディレクトリが違います');
	process.exit(1)
}
var dir = '1_front/'; // gitの差分から指定
var fs = require("fs")
var path = require("path")

var work = 0;

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
        if (work == res.length) {
          results.push({ courseName: file.replace('/lessons', ''), lessonInfo: res }); //子ディレクトリをchildrenインデックス配下に保存
        } else {
          work++;
		  		results.push({lessonName:path.basename(file), chapterName:res}); //子ディレクトリをchildrenインデックス配下に保存
        }
				if (!--pending) callback(null, results);
			});
      return fs.statSync(file).isFile();
    }).forEach(function (file) { //ファイル名を保存
      if (path.basename(file).match(/^[0-9]_*|^[0-9][0-9]_*/g)) {
        results.push(path.basename(file));
      }
			if (!--pending) callback(null, results);
		});

	});
}

walk(dir, function(err, results) {
	if (err) throw err;
	var data = results[0];
	console.log(JSON.stringify(data)); //一覧出力
});
