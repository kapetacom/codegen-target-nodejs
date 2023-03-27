#!/usr/bin/env bash

echo "Building docker image";
docker build . -t kapeta/users || exit 1

echo "Done. Image ready: kapeta/users";
