FROM node:14-alpine
WORKDIR /code
COPY . .
ENV NODE_ENV=production
RUN yarn install
RUN yarn build
CMD ["yarn", "start"]
