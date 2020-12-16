FROM node
LABEL name="blog-server-koa2"
LABEL version="1.0.3"
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD npm run prd
