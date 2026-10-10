#!/usr/bin/env bash
set -euo pipefail

if docker container inspect broken-app >/dev/null 2>&1; then
  docker rm -f broken-app
fi

docker run -d --name broken-app -p 8080:5000 devops-node-app:v1

printf '\nTry opening http://localhost:8080\n'
printf 'If it does not open, inspect the container and read its logs.\n'
