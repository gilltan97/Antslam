#!/bin/bash

if [[ -z "$(heroku addons -a antslam-backend | grep MONGO)" ]]; then
  echo "mongolab add-on does not exist, adding it..."
  heroku addons:create -a antslam-backend mongolab:sandbox
fi

heroku config:set -a antslam-frontend API_ROOT_URL=https://antslam-backend.herokuapp.com/api/
git push antslam-heroku-backend dev:master
git push antslam-heroku-frontend dev:master