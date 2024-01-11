FROM node:latest

ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install --production

RUN npm install pm2 -g

ENTRYPOINT ["pm2-runtime", "index.js"]