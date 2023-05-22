#!/bin/sh

IMAGE_PATH=localhost:5000/xxx
TAG=1

docker build -t xxx . && \
docker tag xxx $IMAGE_PATH:$TAG && \
docker push $IMAGE_PATH:$TAG && \
docker stack deploy -c docker-compose.yml --with-registry-auth xxx && \


# docker exec -it -u root registry registry garbage-collect --delete-untagged /etc/docker/registry/config.yml && \
docker image rm xxx
# docker container rm $(docker ps -a -q -f name=xxx -f status=exited)

