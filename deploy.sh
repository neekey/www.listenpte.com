#!/usr/bin/env bash

set -eo pipefail


base_sha=$(git rev-parse HEAD)
bucket="s3://listenpte.com"
region="ap-southeast-2"

# make a copy of index.html
cp dist/index.html dist/index."$base_sha".html


echo "+++ Upload to S3 bucket"
flags="--region $region --acl public-read"
aws s3 sync dist $bucket $flags --cache-control "public, max-age=31536000"
aws s3api put-object --bucket listenpte.com --key index.html --cache-control "public, must-revalidate, proxy-revalidate, max-age=0" --content-type text/html --body dist/index.html
