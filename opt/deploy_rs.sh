#!/usr/bin/env bash

bucket="s3://voice.listenpte.com/rs"
region="ap-southeast-2"
local_path="data/rs"

echo "+++ Upload to S3 bucket"
flags="--region $region --acl public-read"
aws s3 sync $local_path $bucket $flags --cache-control "public, max-age=31536000"
