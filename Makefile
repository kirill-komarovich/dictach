setup:
	docker-compose run --rm web bin/setup

backend:
	docker-compose run --rm --service-ports server

backend-test:
	docker-compose run --rm server bundle exec rake

backend-install-deps:
	docker-compose run --rm server bundle install

backend-db-migrate:
	docker-compose run --rm server bundle exec rake db:migrate

backend-bootstrap-db:
	docker-compose run --rm server bundle exec rails db:setup

backend-bash:
	docker-compose run --rm server bash

frontend:
	docker-compose run --rm --service-ports client

build:
	docker-compose build

up:
	docker-compose up
