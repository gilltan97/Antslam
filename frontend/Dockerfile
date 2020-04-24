FROM node:12

# Set the working directory to /backend
WORKDIR /frontend

# Copy the package.json file to the work directory
COPY package.json /frontend

# Install the dependencies
RUN yarn install

RUN if [ "$NODE_ENV" = "production" ]; \
	then yarn run build;  \
	fi

# Copy the rest of our application
# to the working directory 
COPY . /frontend

# Start the server
CMD ["node", "server.js"]