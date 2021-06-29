#!/usr/bin/env bash


pwd=$1   

echo 'login ali repository'   

docker login --username=inmobi_sy@1810587715285417  acr-prod-registry.cn-beijing.cr.aliyuncs.com -p supply@inmobi.com 


#make docker   

gitCommit=$(git rev-parse --short HEAD)   

REPOSTORY_TAG=$(date +%Y%m%d%H%M)-${gitCommit}   

   

REPOSITORY_NAME=acr-prod-registry.cn-beijing.cr.aliyuncs.com/inmobi_sy/supply-frontend-report 

REPOSITORY_WITHTAG=$REPOSITORY_NAME:$REPOSTORY_TAG   

docker build . -t $REPOSITORY_WITHTAG   

   

   

#push   

docker push $REPOSITORY_WITHTAG   



