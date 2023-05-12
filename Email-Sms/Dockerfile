FROM node:18.0.0
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
COPY . .
RUN apt-get update
RUN npm install
RUN npm run tsc
CMD [ "node", "./dist/index.js" ]