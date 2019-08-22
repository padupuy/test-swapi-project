APP_DIR    ?= $(shell pwd -P)
REPOSITORY ?= padupuy/test-swapi-project
BUILD_ID   ?= 1
VERSION    ?= $(shell git describe --abbrev=1 --tags --always)
IMAGE      ?= $(REPOSITORY):$(VERSION)-$(BUILD_ID)
APP_PORT   ?= 8080

## hardcode the path because cygwin transorm the path to /cygdrive/c
uname_O := $(shell sh -c 'uname -o 2>/dev/null || echo not')
ifeq ($(uname_O),Cygwin)
	APP_DIR = C:\test-swapi-project
endif

default: app

app: run-tests ## Run the app
	yarn start

build: run-tests ## Build a docker image
	docker build --pull --no-cache --build-arg APP_VERSION=$(VERSION) -t $(IMAGE) .

test-interface: ## Run the end to end tests
	docker pull cypress/included:3.2.0
	docker run -it \
		-v $(APP_DIR):/e2e -w /e2e \
    	cypress/included:3.2.0

run-tests: ## Run tests
	CI=true	yarn test

run: ## Run the docker image
	@echo "Run docker image $(IMAGE) at port $(APP_PORT)"
	docker run -p $(APP_PORT):80 $(IMAGE)

help: ## This help.
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: app build run run-tests test-interface help
