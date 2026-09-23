FROM node:16.20.2-bullseye-slim

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node app.js ./

USER node

EXPOSE 8080

CMD ["node", "app.js"]
