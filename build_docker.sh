#!/usr/bin/env bash

container_id=`docker ps -a | grep supply-frontend-pm | awk  '{print $1}'`


if [ -n "$container_id" ]; then
    echo "rm container $container_id"
    docker stop $container_id && docker rm $container_id
fi

echo "rm images"
docker images | grep supply-frontend-pm |awk '{print $1}' |xargs docker rmi

echo "build new supply-frontend-pm"
docker build -t supply-frontend-pm .

echo "docker run"
docker run --privileged=true -d --name=supply-frontend-pm  -p 9000:9000 supply-frontend-pm /usr/sbin/init




