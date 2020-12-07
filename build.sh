#!/usr/bin/env bash

npm run build:firefox
npx web-ext build -s ./extension/firefox -a ./dist --overwrite-dest
npx web-ext sign -s extension/firefox/
