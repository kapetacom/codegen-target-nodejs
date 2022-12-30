#!/usr/bin/env bash

echo "Building docker image";
docker build . -t blockware/users || exit 1

echo "Done. Image ready: blockware/users";
