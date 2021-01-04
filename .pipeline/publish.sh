#!/usr/bin/env bash

set -e

handle_error() {
    echo "${0##*/}: Error occurred on line $1"
    exit 1
}

trap 'handle_error $LINENO' ERR

echo "-------------------------------------------------"
echo "       Running ${0##*/}"
echo "-------------------------------------------------"



docker run -e PULUMI_ACCESS_TOKEN=$PULUMI_KEY -v "$(pwd)":/pulumi/projects $IMG /bin/bash -c "npm ci && pulumi preview -s dev"