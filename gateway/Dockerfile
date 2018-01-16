# Set the base image to Ubuntu
FROM ubuntu

# File Author / Maintainer
MAINTAINER Shubham Choubey

# Install Nginx

# Update the repository
RUN apt-get update

# Install necessary tools
RUN apt-get install -y nano wget dialog net-tools

# Download and Install Nginx
RUN apt-get install -y nginx

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf

# Copy a configuration file from the current directory
ADD nginx.conf /etc/nginx/

# Append "daemon off;" to the configuration file
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Expose ports
EXPOSE 80

# Set the default command to execute when creating a new container
CMD service nginx start

#FROM node:carbon
#install node
RUN apt-get update && \
   apt-get -y install curl && \
   curl -sL https://deb.nodesource.com/setup | sudo bash - && \
   apt-get -y install python build-essential nodejs

#install npm
#RUN apt-get install -g -y npm

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
