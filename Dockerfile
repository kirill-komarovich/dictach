FROM ruby:2.5.3

ENV APP_ROOT='/dictach'
ENV BUNDLE_PATH=${APP_ROOT}/vendor/bundle
ENV PORT=3000
ENV NODE_VERSION=v10.13.0
ENV NODE_DIST_FILENAME=node-$NODE_VERSION-linux-x64.tar.xz
ENV NODE_PATH=${APP_ROOT}/client/node_modules
ENV PATH=$PATH:/node_modules/.bin

WORKDIR ${APP_ROOT}

# Get nodejs
RUN wget -q https://nodejs.org/dist/$NODE_VERSION/$NODE_DIST_FILENAME
RUN tar -C /usr/local --strip-components 1 -xJvf $NODE_DIST_FILENAME > /dev/null
RUN rm $NODE_DIST_FILENAME
RUN npm i -g yarn

# Install ruby dependencies
COPY Gemfile Gemfile.lock ./
RUN gem install bundler
# Without this line raises exception connected with nokogiri build
RUN bundle config build.nokogiri --use-system-libraries
RUN bundle install --path $BUNDLE_PATH --jobs 4

COPY . .

# Install node dependencies
RUN cd client && yarn add create-react-app && yarn install

RUN ls
RUN ls ${APP_ROOT}/client

EXPOSE $PORT
