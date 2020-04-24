# proj-ANTSLAM


## Getting started

### Option 1: Docker (recommended)

#### Dependencies 
- docker
- yarn

Run the following commands to start the frontend and backend server

```bash
# clone the the project locally 
> git clone https://github.com/csc302-fall-2019/proj-ANTSLAM.git
> cd proj-ANTSLAM

# Run both the backend and fronend server
> ./ANTSLAM start 

```

### Option 2: Manual
Run the following commands to start the frontend and backend server

#### Dependencies 
- yarn
- mongodb

```bash
# clone the the project locally 
> git clone https://github.com/csc302-fall-2019/proj-ANTSLAM.git
> cd proj-ANTSLAM

# Open a new terminal window and start monogdb
> mongod 

# Start the backend application 
> cd /backend 
> yarn install
> yarn run start

# Start the frontend application 
> cd ../frontend
> yarn install
> yarn run start

```

The frontend app should now be running on [http://localhost:5000](http://localhost:5000)

The backend app should now be running on [http://localhost:3000](http://localhost:3000)

## Testing

### Frontend

- Only Once : `npm install pm2 -g` , this is for running cypress tests.

`cd frontend`

start the react appwith `pm2 start node_modules/react-scripts/scripts/start.js --name "myapp"`

then run cypress tests with `yarn cy:run`
