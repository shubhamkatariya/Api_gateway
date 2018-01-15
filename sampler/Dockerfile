FROM node:carbon
# Create app directory
WORKDIR /src

COPY . /src

RUN cd /src; npm install

EXPOSE 8000
CMD [ "node", "/src/app.js" ]
