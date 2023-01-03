#!/usr/bin/env bash

trap "exit" INT TERM ERR
trap "kill 0" EXIT

npm install

wait
