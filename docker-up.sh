#!/bin/bash

if [ "$1" == "build" ]; then
	docker compose --env-file .env.dev up --build -d
else
	docker compose --env-file .env.dev up -d
fi