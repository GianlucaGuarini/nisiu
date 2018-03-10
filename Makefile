-include .env

ROLLUP=node_modules/.bin/rollup
ESLINT=node_modules/.bin/eslint

lint:
	@ $(ESLINT) src

build:
	@ $(ROLLUP) -c rollup.config.js

watch:
	@ $(ROLLUP) -c rollup.config.js --watch

test:
	echo "hello"

.PHONY: lint build watch test