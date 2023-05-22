#!/bin/sh

NAME=xxx
IMAGE_PATH=localhost:45435/xxx
TAG=1

docker build -t $NAME .
docker tag $NAME $IMAGE_PATH:$TAG
docker push $IMAGE_PATH:$TAG
docker stack deploy -c docker-compose.yml --with-registry-auth $NAME