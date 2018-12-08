FROM node:11.3

ENV APP_ROOT='/dictach_client'
# ENV PORT=3000
ENV NODE_PATH='$APP_ROOT/node_modules'
ENV PATH=$PATH:/node_modules/.bin

ADD yarn.lock /yarn.lock
ADD package.json /package.json

RUN npm install yarn
RUN yarn add create-react-app
WORKDIR $APP_ROOT
COPY . .

# EXPOSE $PORT
CMD ["yarn", "build"]
