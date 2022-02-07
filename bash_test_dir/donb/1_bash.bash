env_tree_ignore="^config.json$|^\.$|directories|^bash_test_dir/donb/$"
# configファイル
# カレントディレクトリ(.のみ)
# 結果テキスト（「0 directories, 2 files」）を除外

# yum -y install tree

# 多分ここは必要ない
# export LANG=en_US.UTF-8

# ０から９から始まらないファイルを抽出
treeError=$(tree -Ii "[0-9]_*|[0-9][0-9]_*" ./bash_test_dir/donb/ | grep -vE $env_tree_ignore)

if [ -n "$treeError" ] ; then
  echo '数字から始まらないファイルが存在します'
  echo "$treeError "
fi
