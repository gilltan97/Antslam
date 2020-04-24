## Requirements 
+ [docker](https://docs.docker.com/docker-for-windows/install/) 
+ [docker-compose](https://docs.docker.com/compose/)
+ [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) 

## Getting started 

Run the following commands to build the container and start the server
  ``` bash 
  > cd proj-ANTSLAM/backend 
  > yarn run run-container 
  ```
 
 ### Additional steps for cleanup
Run the these commands to stop and remove the container
  ```bash
  > cd proj-ANTSLAM/backend 
  > yarn run stop-container 
  > yarn run remove-container
  ```
