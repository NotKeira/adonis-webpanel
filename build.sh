#!/bin/bash

for i in "$@"
do
case $i in
    -id=*)
    ID="${i#*=}"
    shift
    ;;
    *)

    ;;
esac
done

if [ -z "$ID" ]
then
  echo "Error: ID is not provided. Usage: ./build.sh -id=<id>"
  exit 1
fi

docker ps -q --filter name=adonis | xargs -r docker stop

docker build -t adonis:$ID .

docker container prune -f

docker run --name adonis -d -p 30422:30422 adonis:$ID