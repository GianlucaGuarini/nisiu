-include .env

ROLLUP=node_modules/.bin/rollup
ESLINT=node_modules/.bin/eslint
MOCHA=node_modules/.bin/mocha

lint:
	@ $(ESLINT) src

build:
	@ $(ROLLUP) -c rollup.config.js
	@ node build-sw

watch:
	@ $(ROLLUP) -c rollup.config.js --watch

test: lint build
	@ $(MOCHA) test/index.js --recursive test/*.specs.js

.PHONY: lint build watch test