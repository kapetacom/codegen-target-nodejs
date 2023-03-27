#!/usr/bin/env bash

echo "Building docker image";
docker build . -t kapeta/todo || exit 1

echo "Done. Image ready: kapeta/todo";
