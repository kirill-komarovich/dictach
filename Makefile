setup:
	docker-compose run --rm web bin/setup

server:
	docker-compose run --rm --service-ports server

server-test:
	docker-compose run --rm server bundle exec rake

server-install-deps:
	docker-compose run --rm server bundle install

server-db-migrate:
	docker-compose run --rm server bundle exec rake db:migrate

server-bootstrap-db:
	docker-compose run --rm server bundle exec rails db:setup

server-bash:
	docker-compose run --rm server bash

app-client:
	docker-compose run --rm --service-ports client

build:
	docker-compose build
