#!/bin/sh
# db 실행 될 때까지 10초 sleep
sleep 10

mongoimport --jsonArray --db it-news-trend --collection newspapers --file ./js/insert.json