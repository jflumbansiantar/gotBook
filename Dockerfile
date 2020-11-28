FROM node:12
WORKDIR /usr/src/path

COPY package.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]