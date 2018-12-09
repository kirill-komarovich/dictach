echo "========DEPLOIMSA========"
yarn install
echo "Client built!"
bundle exec rake db:migrate
echo "========ZA DEPLOILIS========"
