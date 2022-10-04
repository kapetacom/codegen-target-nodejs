#!/usr/bin/env bash

echo "Building docker image";
docker build . -t todo || exit 1

echo "Done. Image ready: todo";
