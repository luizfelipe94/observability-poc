FROM node:alpine
COPY . /app
WORKDIR /app
RUN npm install 
COPY . .
CMD [ "npm", "start" ]