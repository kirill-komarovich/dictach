FROM ruby:2.5.3

ARG uid
RUN useradd -mr -u $uid user
RUN adduser user sudo

ENV APP_ROOT="/home/user/dictach"
ENV BUNDLE_PATH="$APP_ROOT/vendor/bundle"
ENV PORT=3000
ENV NODE_VERSION=v10.13.0
ENV NODE_DIST_FILENAME=node-$NODE_VERSION-linux-x64.tar.xz

WORKDIR $APP_ROOT

RUN chown -R user ${APP_ROOT}
RUN chown -R user /dev/null
RUN chown -R user /usr/local
USER user

RUN wget -q https://nodejs.org/dist/$NODE_VERSION/$NODE_DIST_FILENAME
RUN tar -C /usr/local --strip-components 1 -xJvf $NODE_DIST_FILENAME > /dev/null
RUN rm $NODE_DIST_FILENAME
RUN npm i -g yarn

COPY --chown=user Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install --path $BUNDLE_PATH --jobs 4

COPY --chown=user package.json yarn.lock ./
RUN yarn install

COPY --chown=user . .

RUN bin/webpack -p

EXPOSE $PORT
