setup:
	docker-compose run --rm web bin/setup

start:
	docker-compose run --rm --service-ports web

test:
	docker-compose run --rm web bundle exec rake

install-deps:
	docker-compose run --rm web bundle install

db-migrate:
	docker-compose run --rm web bundle exec rake db:migrate

bootstrap-db:
	docker-compose run --rm web bundle exec rails db:setup

bash:
	docker-compose run --rm web bash

build:
	docker-compose build
