FROM node:8.12

RUN apt-get update && apt-get install -y \
    python \
    python-dev \
    python-pip

RUN pip install awscli
RUN npm install -g yarn

WORKDIR /src

ADD ./package.json /src/package.json
ADD ./yarn.lock /src/yarn.lock

RUN yarn

ADD ./docker-entrypoint.sh /sbin/docker-entrypoint.sh
RUN chmod +x /sbin/docker-entrypoint.sh
ENTRYPOINT ["/sbin/docker-entrypoint.sh"]

ADD . /src/

RUN yarn build --configuration=development
