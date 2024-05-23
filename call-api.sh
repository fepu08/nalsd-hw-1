#!/bin/bash

ENDPOINT="http://localhost:8080/"
NUM_CALLS=100

if [ -n "$1" ] && [[ "$1" =~ ^[0-9]+$ ]]; then
  NUM_CALLS=$1
fi

if [ -n "$2" ]; then
  ENDPOINT="$2"
fi

seq $NUM_CALLS | xargs -n1 -P10 curl -s "$ENDPOINT" > /dev/null

