FROM node:18

WORKDIR /backend

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

RUN npm install -g typescript

COPY . .

CMD [ "npm" , "run",  "dev" ]