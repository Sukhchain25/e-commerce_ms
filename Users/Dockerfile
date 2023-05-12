FROM node:18.0.0
WORKDIR /app
# ENV MONGO_URI=mongodb://0.0.0.0:27017/e-commerce_user
COPY ["package.json", "package-lock.json*", "./"]
COPY . .
RUN apt-get update
RUN npm install
RUN npm run tsc
CMD [ "node", "./dist/index.js" ]
