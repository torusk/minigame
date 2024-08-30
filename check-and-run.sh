#!/bin/bash

# 色の定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# ログファイルの設定
LOG_FILE="build_error.log"

# ブラウザを開く関数
open_browser() {
    sleep 1  # 開発サーバーが起動するのを少し待つ
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open http://localhost:3000
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        xdg-open http://localhost:3000
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        start http://localhost:3000
    else
        echo -e "${YELLOW}ブラウザを自動で開けませんでした。http://localhost:3000 にアクセスしてください。${NC}"
    fi
}

echo "ビルドを開始します..."

# ビルドを実行し、出力とエラーの両方をキャプチャ
if npm run build > >(tee build_output.txt) 2> >(tee build_error.txt >&2); then
    echo -e "${GREEN}ビルドが成功しました。開発サーバーを起動します...${NC}"
    open_browser &  # バックグラウンドでブラウザを開く
    npm run dev
else
    echo -e "${RED}ビルドに失敗しました。エラーを修正してから再度試してください。${NC}"
    echo -e "${YELLOW}エラーの詳細:${NC}"
    cat build_error.txt
    echo -e "${YELLOW}エラーログは ${LOG_FILE} に保存されました。${NC}"
    cat build_error.txt > "$LOG_FILE"
    exit 1
fi

# 一時ファイルの削除
rm -f build_output.txt build_error.txt