FROM node:14-alpine AS BUILD_IMAGE
WORKDIR /output
ENV NODE_ENV=production
COPY . .
RUN yarn install --production=true
RUN yarn build

FROM node:14-alpine
WORKDIR /code
COPY --from=BUILD_IMAGE /output/build ./build
COPY --from=BUILD_IMAGE /output/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3080
CMD ["yarn", "start"]
