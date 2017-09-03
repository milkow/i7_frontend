#!/usr/bin/env bash

# If args are queal to "deploy" we need
# two enviroment variables to be present. They are:
# - AWS_ACCESS_KEY_ID
# - AWS_SECRET_ACCESS_KEY

if [ "$@" = "deploy" ]; then
    python -m awscli s3 sync /src/dist s3://i7.jroslaniec.com
    exit 0
fi

exec "$@"
