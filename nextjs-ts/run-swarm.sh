#!/bin/sh

IMAGE_PATH=localhost:45435/nextjs_ts
TAG=latest

docker build -t nextjs_ts .
docker tag nextjs_ts $IMAGE_PATH:$TAG
docker push $IMAGE_PATH:$TAG
docker stack deploy -c docker-compose.yml --with-registry-auth nextjs_ts