setup:
	docker-compose run --rm web bin/setup

start:
	docker-compose run --rm --service-ports web

backend-test:
	docker-compose run --rm web bundle exec rake

backend-install-deps:
	docker-compose run --rm web bundle install

backend-db-migrate:
	docker-compose run --rm web bundle exec rake db:migrate

backend-bootstrap-db:
	docker-compose run --rm web bundle exec rails db:setup

frontend-install-deps:
	docker-compose run --rm web /bin/sh -c "cd client && yarn install"

frontend-test:
	docker-compose run --rm web /bin/sh -c "cd client && yarn test"

frontend-test-coverage:
	docker-compose run --rm web /bin/sh -c "cd client && yarn test --coverage"

heroku-push:
	heroku container:push --recursive

heroku-release:
	heroku container:release web

build:
	docker-compose build

install-deps:
	docker-compose run --rm web /bin/sh -c "bundle install && cd client && yarn install"

up:
	docker-compose up

bash:
	docker-compose run --rm web bash
