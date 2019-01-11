#!/usr/bin/env bash

# If args are equal to "deploy" we need
# two enviroment variables to be present. They are:
# - AWS_ACCESS_KEY_ID
# - AWS_SECRET_ACCESS_KEY

if [ "$1" = "deploy" ]; then
    python -m awscli s3 sync /src/dist "s3://${2}"
    exit 0
fi

exec "$@"
