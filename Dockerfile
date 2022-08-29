FROM node:18

WORKDIR /usr/src/app

COPY ./package*.json ./

# RUN npx npm-check-updates -u
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]