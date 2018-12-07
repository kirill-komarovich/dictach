FROM ruby:2.5.3

ENV APP_ROOT='/dictach'
ENV BUNDLE_PATH="$APP_ROOT/vendor/bundle"
ENV PORT=3000

WORKDIR $APP_ROOT

COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install --path $BUNDLE_PATH --jobs 4

COPY . .

EXPOSE $PORT
