FROM node:12

WORKDIR /trpg/trpg-fe
COPY /trpg-fe/package*.json ./
RUN npm install

WORKDIR /trpg/
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
COPY /trpg/dist/index.ejs /trpg/views

EXPOSE 2100
CMD [ "node", "app.js" ]

