COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
EXPOSE 3001
CMD [ "node", "app.js" ]

