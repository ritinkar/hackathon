docker run --hostname=hellokafka -p 2181:2181 -p 9092:9092 --env ADVERTISED_HOST=hellokafka --env ADVERTISED_PORT=9092 spotify/kafka
export KAFKA=hellokafka:9092
export ZOOKEEPER=hellokafka:2181

// bids
bin/kafka-topics.sh --create \
    --zookeeper localhost:2181 \
    --replication-factor 1 \
    --partitions 1 \
    --topic bids

//max_bids
bin/kafka-topics.sh --create \
    --zookeeper localhost:2181 \
    --replication-factor 1 \
    --partitions 1 \
    --topic max_bids \
    --config cleanup.policy=compact

//create kafka app
mvn archetype:generate \
    -DarchetypeGroupId=org.apache.kafka \
    -DarchetypeArtifactId=streams-quickstart-java \
    -DarchetypeVersion=2.1.0 \
    -DgroupId=streams.examples \
    -DartifactId=streams.examples \
    -Dversion=0.1 \
    -Dpackage=myapps