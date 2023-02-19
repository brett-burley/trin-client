#! /bin/bash

if [ $1 = 'dev' ]
then
  echo "running in DEV MODE"
  API_URL="http://192.168.1.113:8080/" expo start
elif [ $1 = 'prod' ]
then
  echo "running in PROD MODE"
  API_URL="https://trinity-api-nb7bzfogfa-uw.a.run.app/" expo start
elif [ $1 = 'local' ]
then
  echo "running in LOCAL MODE"
  API_URL="http://localhost:8080/" expo start
else
  echo "running on $1"
  API_URL="$1" expo start --lan
fi
