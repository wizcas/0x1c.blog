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
COPY --from=BUILD_IMAGE /output/package.json ./
COPY --from=BUILD_IMAGE /output/src ./src
COPY --from=BUILD_IMAGE /output/config ./config
COPY --from=BUILD_IMAGE /output/public ./public
COPY --from=BUILD_IMAGE /output/database ./database
ENV NODE_ENV=production
EXPOSE 3080
CMD ["yarn", "start"]
