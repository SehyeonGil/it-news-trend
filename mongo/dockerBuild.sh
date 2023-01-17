docker build . -f Dockerfile -t mongo-commu-trend:1.0
docker run -itd --name mongo-commu-trend -e ME_CONFIG_MONGODB_ADMINUSERNAME=commu-trend -e ME_CONFIG_MONGODB_ADMINPASSWORD=commu-trend -p 27017:27017 mongo-commu-trend:1.0 
docker exec -it mongo-commu-trend sh /src/init.sh