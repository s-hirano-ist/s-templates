#!/usr/bin/env bash

# only uncomment if running on local and use .env file for managing envs.
# source ./.env

#REF: https://about.gitlab.com/blog/2017/09/05/how-to-automatically-create-a-new-mr-on-gitlab-with-gitlab-ci/

echo $CI_PROJECT_ID
HOST=https://gitlab.com/api/v4/projects/${CI_PROJECT_ID}/merge_requests?private_token=${GITLAB_TOKEN}
TARGET_BRANCH="develop"
MR_TITLE="chore: update lockfile for library update"

curl -X POST \
    $HOST \
    --header "Content-Type: application/json"\
    --data '{"id":"'"${CI_PROJECT_ID}"'", "source_branch":"'"${CI_COMMIT_REF_NAME}"'", "target_branch":"'"${TARGET_BRANCH}"'", "remove_source_branch":true, "title":"'"${MR_TITLE}"'"}'
exit;
