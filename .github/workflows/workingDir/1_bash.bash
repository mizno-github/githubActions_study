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
cd $main_dir/1_front
node $work_dir/workingDir/makeJson.js $(pwd) > config.json
cat config.json
cd $main_dir/2_back
node $work_dir/workingDir/makeJson.js $(pwd) > config.json

################     md内の文言チェック    ##################
