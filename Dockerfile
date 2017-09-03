FROM node:8.4

RUN apt-get update && apt-get install -y \
    python \
    python-dev \
    python-pip

RUN pip install awscli
RUN npm install -g yarn

WORKDIR /src

ADD ./package.json /src/package.json

RUN yarn

ADD ./docker-entrypoint.sh /sbin/docker-entrypoint.sh
RUN chmod +x /sbin/docker-entrypoint.sh
ENTRYPOINT ["/sbin/docker-entrypoint.sh"]

ADD . /src/

RUN yarn build
