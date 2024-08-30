#!/bin/bash

# 色の定義
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# コミットメッセージの入力を求める
echo "コミットメッセージを入力してください:"
read commit_message

# Gitコマンドの実行
echo -e "${GREEN}git add . を実行中...${NC}"
git add .

echo -e "${GREEN}git commit -m \"$commit_message\" を実行中...${NC}"
git commit -m "$commit_message"

echo -e "${GREEN}git push origin typescript-migration を実行中...${NC}"
git push origin typescript-migration

# 実行結果の確認
if [ $? -eq 0 ]; then
    echo -e "${GREEN}すべてのGit操作が成功しました。${NC}"
else
    echo -e "${RED}Git操作中にエラーが発生しました。上記のエラーメッセージを確認してください。${NC}"
fi
