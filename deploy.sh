commitMsg="${1:-fix}"

git add .
git commit -m "${commitMsg}"
git push

echo "INFO: Ready to deploy..."

rm -rf dist
mkdir dist

rsync -av \
--exclude='dist' \
--exclude='node_modules' \
--exclude='.gitignore' \
--exclude='.git' \
--exclude='gulpfile.js' \
--exclude='*.json' \
--exclude='*.sh' \
./ dist/

if [[ ! -d "node_modules" ]]; then
    echo "ERROR: You don't have `node_modules` yet, please do `npm i` first."
    return
fi

node_modules/.bin/gulp deploy