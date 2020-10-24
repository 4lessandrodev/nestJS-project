FROM node:12
WORKDIR /usr/src/task_management_api
COPY package.json .
RUN npm install --only=prod
COPY ./dist ./dist
#EXPOSE 3000