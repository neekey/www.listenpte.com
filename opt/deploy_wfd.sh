#!/usr/bin/env bash

bucket="s3://voice.listenpte.com/wfd"
region="ap-southeast-2"
local_path="data/wfd"

echo "+++ Upload to S3 bucket"
flags="--region $region --acl public-read"
aws s3 sync $local_path $bucket $flags --cache-control "public, max-age=31536000"
