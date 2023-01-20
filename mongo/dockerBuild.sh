docker build . -f Dockerfile -t mongo-commu-trend:1.0
docker run -itd --name mongo-it-news-trend -e ME_CONFIG_MONGODB_ADMINUSERNAME=it-news-trend -e ME_CONFIG_MONGODB_ADMINPASSWORD=it-news-trend -p 27017:27017 mongo-it-news-trend:1.0 
docker exec -it mongo-commu-trend sh /src/init.sh