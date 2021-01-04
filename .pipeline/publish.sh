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
echo PULUMI_ACCESS_TOKEN
npm install && pulumi preview -s dev