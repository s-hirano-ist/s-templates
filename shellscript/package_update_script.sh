#!/bin/bash

# run this script when [pyhton-defi](https://gitlab.com/n652/python-defi.git) is updated.
# if a new lambda function is added, the following array has to be updated.

# only uncomment if running on local and use .env file for managing envs.
# source ./.env

apk add curl
apk add bash
apk add git


git config --global user.name "s-hirano-ist"
git config --global user.email "solucky0725@icloud.com"
git remote set-url origin https://oauth2:${GITLAB_TOKEN}@${CI_REPOSITORY_URL##*@}

pip install pipenv

export LATEST_SHA=$(git show -s --format=%h)
git checkout -b chore-${LATEST_SHA}

# cd src/lambdas
# echo "GITLAB_TOKEN=$GITLAB_TOKEN" > .env
rm Pipfile.lock

# echo "generating Pipfile.lock"
pipenv install # pipenvは./.envファイルに記述された環境変数をpipenv環境に渡せる
# rm .env

# for functionName in ${functionNames[@]}; do
#   echo "$functionName"
#   cp -f Pipfile.lock $functionName/Pipfile.lock
#   git add $functionName/Pipfile.lock
# done
git add Pipfile.lock

# cd ../..

git commit -m "update Pipfile.lock"
echo "YYY"
git push -u origin chore-${LATEST_SHA}
echo "SSS"

CI_COMMIT_REF_NAME=chore-${LATEST_SHA} ./create_merge_request.sh
