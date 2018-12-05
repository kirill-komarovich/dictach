FROM ruby:2.5.3

ENV APP_ROOT="/dictach"
ENV BUNDLE_PATH="$APP_ROOT/vendor/bundle"
ENV PORT=3000
ENV NODE_VERSION=v10.13.0
ENV NODE_DIST_FILENAME=node-$NODE_VERSION-linux-x64.tar.xz

WORKDIR $APP_ROOT

RUN wget -q https://nodejs.org/dist/$NODE_VERSION/$NODE_DIST_FILENAME
RUN tar -C /usr/local --strip-components 1 -xJvf $NODE_DIST_FILENAME > /dev/null
RUN rm $NODE_DIST_FILENAME
RUN npm i -g yarn

COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install --path $BUNDLE_PATH --jobs 4

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN bin/webpack -p

EXPOSE $PORT
