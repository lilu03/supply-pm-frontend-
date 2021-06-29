FROM nginx:1.19-alpine
# author
MAINTAINER inmobi.cn

# env
ENV BASE_DIR "/usr/share/nginx/html"


# make docker container dir
RUN mkdir -p $BASE_DIR/static
COPY dist/static $BASE_DIR/static
COPY dist/index.html $BASE_DIR/
COPY dist/favicon.ico $BASE_DIR/
COPY nginx/default.conf /etc/nginx/conf.d/
