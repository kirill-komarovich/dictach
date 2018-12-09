echo "========DEPLOIMSA========"
yarn install
echo "Client built!"
bundle exec rails db:migrate
echo "========ZA DEPLOILIS========"
