FROM node:8
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
# CMD mongodb_url=mongodb://mongo:27017/ npm start
CMD [ "npm", "start" ]
EXPOSE 8080 