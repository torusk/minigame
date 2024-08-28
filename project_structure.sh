#!/bin/bash

tree -L 3 -I 'node_modules|dist|.git' --charset=ascii -P '*.ts|*.tsx|*.js|*.jsx' -T "Project Structure" -C

echo -e "\nFile Contents:"

for file in $(find . -maxdepth 3 -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -not -path "./node_modules/*" -not -path "./dist/*" -not -path "./.git/*"); do
    echo -e "\n--- $file ---"
    head -n 20 "$file"
    echo "..."
done