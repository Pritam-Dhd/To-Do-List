FROM node:20-alpine3.17

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 5000

CMD ["npx", "nodemon", "index.js"]
