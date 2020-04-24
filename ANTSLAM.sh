#!/bin/bash

usage="usage: ANTSLAM [start | clean]" 

if [ "$#" -ge 1 ]; then
	if [ $1 == "start" ]; then 
		docker-compose -f docker-compose.yml up --build

    # Stop and Remove all the existing containers 
    elif [ $1 == "clean" ]; then
    	docker rm $(docker stop $(docker ps -a -q --filter ancestor=proj-antslam_frontend --format="{{.ID}}"))
    	docker rm $(docker stop $(docker ps -a -q --filter ancestor=proj-antslam_backend --format="{{.ID}}"))
    	docker rm $(docker stop $(docker ps -a -q --filter ancestor=mongo --format="{{.ID}}"))
    else echo $usage
    fi 
else echo $usage
fi
