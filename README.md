# Antslam
The reposetory code is a copy of the project code for CSC302 which can be found [here](https://github.com/csc302-fall-2019/proj-ANTSLAM).

The is a proof-of-concept built based on the requirements provided by [Cancer Care Ontario](https://www.cancercareontario.ca/en). This application lets the radiologists create digital medical records and stores those medical records as a JSON object. 



## Dependencies 
- docker
- yarn

## Installation
1. Clone the the project locally 
```bash
> git clone https://github.com/csc302-fall-2019/proj-ANTSLAM.git
> cd proj-ANTSLAM
```
2. Run both the backend and fronend server
```bash 
> ./ANTSLAM start 
```

## Usage
- The frontend app should now be running on [http://localhost:5000](http://localhost:5000)
- The backend app should now be running on [http://localhost:3000](http://localhost:3000)

## Testing

### Frontend

- Only Once : `npm install pm2 -g` , this is for running cypress tests.

`cd frontend`

start the react appwith `pm2 start node_modules/react-scripts/scripts/start.js --name "myapp"`

then run cypress tests with `yarn cy:run`
