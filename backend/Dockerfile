FROM node:lts-gallium
  WORKDIR /backend/

  COPY . .

  RUN yarn set version berry && yarn
  RUN yarn build

  ENV NODE_ENV=production

  CMD ["yarn", "start:prod"]

  EXPOSE 3000