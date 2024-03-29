env_tree_ignore="^[0-9]_*|[0-9][0-9]_*|config.json$|^\.$|directories|^content.md$|^index.html$|^style.css$|^index.js$|^images$|^lessons$"
main_dir=/home/runner/work/helloworld/helloworld/bash_test_dir/donb
work_dir=/home/runner/work/helloworld/helloworld/.github/workflows

cd $main_dir


################     ファイル名の間違いチェック    ##################
treeError=$(tree -i --noreport | grep -vE $env_tree_ignore)
if [ -n "$treeError" ] ; then
  echo 数字から始まらないファイルが存在します
  echo $treeError
fi

################     ファイル名の変更一部抽出&Json化    ##################

# git config --local core.quotepath false
# git diff remotes/get-diff-action/master --diff-filter=d --name-only | grep -o "/[0-9]_.*/lessons/" | uniq > $work_dir/gitDiff.txt
# # gitの変更履歴で1_front or 2_backを選択する
# workdir='1_front'
cd $main_dir/1_front
node $work_dir/workingDir/makeJson.js $(pwd) > config.json
cat config.json
cd $main_dir/2_back
node $work_dir/workingDir/makeJson.js $(pwd) > config.json
cat config.json
pwd

cd $main_dir
tree

# # 対象のディレクトリに移動
# cd $workdir/lessons
# while read line
# do
#   cd $main_dir/$line
#   cd ../
#   node $work_dir/workingDir/makeJson.js $(pwd) > config.json
# done < $work_dir/gitDiff.txt


# 1_frontをedit.txtに入れる
# echo var workdir = "$workdir" >> edit.txt

# # gitの変更履歴の部分で「1_html/cssを学ぼう」の部分を選択する
# editFile=1_html／cssを学ぼう

# # 編集したディレクトリの配下をJsonとしてedit.txtに保存
# tree -JP "[0-9]_*" $editFile  --noreport >>  edit.txt

# # edit.txtの中身をmakeJson.jsの先頭に追加する
# sed -i 'edit.txt' ../../makeJson.js

# # makeJson.jsを実行し、config.jsに保存する
# # node ../../makeJson.js >> ../config.json

# # 作業ディレクトリに戻る
# # cd ../../
