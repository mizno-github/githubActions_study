env_tree_ignore="^[0-9]_*|[0-9][0-9]_*|config.json$|^\.$|directories"
# configファイル
# カレントディレクトリ(.のみ)
# 結果テキスト（「0 directories, 2 files」）を除外

# yum -y install tree

# 多分ここは必要ない
# export LANG=en_US.UTF-8
pws
ls
# cd bash_test_dir/donb/
# # ０から９から始まらないファイルを抽出
# treeError=$(tree -i | grep -vE $env_tree_ignore)



# MESSAGE="ここがプルリクのタイトルになる

# ## これ以降が説明欄の文章になる
# * テスト
# * test
# markdown で書ける。
# if [ -n "$treeError" ] ; then
#   数字から始まらないファイルが存在します
#   $treeError
# fi
# "
# hub pull-request -m "$MESSAGE" -b main -h dev
