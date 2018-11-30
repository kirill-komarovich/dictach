setup:
	CURRENT_UID=$(shell id -u) docker-compose run --rm web bin/setup

start:
	CURRENT_UID=$(shell id -u) docker-compose run --rm --service-ports web

test:
	CURRENT_UID=$(shell id -u) docker-compose run --rm web bundle exec rake

install-deps:
	CURRENT_UID=$(shell id -u) docker-compose run --rm web bundle install

db-migrate:
	CURRENT_UID=$(shell id -u) docker-compose run --rm web bundle exec rake db:migrate

bootstrap-db:
	CURRENT_UID=$(shell id -u) docker-compose run --rm web bundle exec rails db:setup

bash:
	CURRENT_UID=$(shell id -u) docker-compose run --rm web bash

build:
	USER=$(shell whoami) docker-compose build
