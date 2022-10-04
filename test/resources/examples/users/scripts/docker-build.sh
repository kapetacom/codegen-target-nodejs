#!/usr/bin/env bash

echo "Building docker image";
docker build . -t users || exit 1

echo "Done. Image ready: users";
