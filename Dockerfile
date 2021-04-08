FROM node:lts-alpine3.13

WORKDIR /trpg/trpg-fe
COPY /trpg-fe/package*.json ./
RUN npm install

WORKDIR /trpg/
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
RUN mv ./dist/index.ejs ./views

EXPOSE 2100
CMD [ "node", "app.js" ]

