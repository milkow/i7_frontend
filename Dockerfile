FROM node:8.12

RUN apt-get update && apt-get install -y \
    python \
    python-dev \
    python-pip

RUN pip install awscli

WORKDIR /src

ADD ./package.json /src/package.json

RUN npm install -g @angular/cli
RUN npm i

ADD ./docker-entrypoint.sh /sbin/docker-entrypoint.sh
RUN chmod +x /sbin/docker-entrypoint.sh
ENTRYPOINT ["/sbin/docker-entrypoint.sh"]

ADD . /src/
RUN touch /src/src/environments/environment.ts

RUN ng build --configuration=development
