# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.6.0'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.2'
# Use postgresql as the database for Active Record
gem 'pg', '>= 0.18', '< 2.0'
# Use Puma as the app server
gem 'puma', '~> 3.11'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem 'rack-cors', '~> 1.0.2', require: 'rack/cors'

group :test do
  gem 'rails-controller-testing', '~> 1.0'
  gem 'shoulda-matchers', '4.0.0.rc1'
  gem 'simplecov', '~> 0.16'
end

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'factory_bot', '~> 4.11'
  gem 'ffaker', '~> 2.2'
  gem 'rspec-rails', '~> 3.8'
  gem 'rubocop', '~> 0.61'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'devise-doorkeeper', '~> 1.1'
gem 'doorkeeper-i18n', '~> 5.0'
gem 'dotenv-rails', '~> 2.5'
gem 'foreman', '~> 0.82'
gem 'tzinfo-data', platforms: %i[mingw mswin x64_mingw jruby]
