FROM node:12

# Set the working directory to /backend
WORKDIR /backend

# Copy the package.json file to the work directory
COPY package.json /backend

# Install the dependencies
RUN yarn install

# Copy the rest of our application
# to the working directory 
COPY . /backend

ENV MONGODB_URI=mongodb://mongo:27017/antslam

# Start the server
CMD ["yarn", "start"]