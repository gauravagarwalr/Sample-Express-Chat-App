#! /usr/bin/env bash

if [ $# -eq 0 ]; then
  INSTALL=false
else
  INSTALL=$1
fi

if [ $INSTALL != false ]; then
  npm install
fi

mkdir -p log pids

NODE_PATH=./config:./app/controllers node server.js > log/server.log 2>&1 &
echo $! > pids/server.pid

node react-server.js > log/react-js.log 2>&1 &
echo $! > pids/react-js.pid

tail -f log/*
