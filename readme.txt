## Architecture

+-------------------------------------------------------------------------------------------------------------------------+
|                                                                                                                         |
|                send all valid bids                                                                                      |
|                to /bids on kafka.                                                                                       |
|                don't send bids if auction time                                                                          |
|                is up             +----------------------------------+    +--------------------------------+             |
|                          +------^+                                  |    |                                |             |
|                          |       |      kafka (message streamer)    +----> faust (stream processor)       |             |
|                          |       |                                  |    |                                |             |
|     +---------+          |       +----------------------------------+    +---------+----------------------+             |
|     |         |      +---+-----+                                                   |                                    |
|     |         +------>strapi   |                                                   | store winning bid for each         |
|     |mongodb  |      |rest api <-----------------------------------------------+   | auction                            |
|     |         |      |         |                     update the winning        |   |                                    |
|     |         |      |         |<-------+            bids of the auctions    +-+---v----+                               |
|     |         |      |         |        |            (not implemented)       |          |                               |
|     +---------+      +-+-----+-+        |make a bid                          | redis    |                               |
|                        ^     |          |                                    |          |                               |
|                        |     |          |                                    +-+--------+                               |
|        +-------+       |     |          |                                      |                                        |
|        |       |       |     |          |                                      |                                        |
|        |admin  |       |     |          +--------------------+                 |                                        |
|        |       +-------+     |          |                    |                 |                                        |
|        |panel  |             +---------->   bidding app      |                 |                                        |
|        |       |              get all   |                    +^----------------+                                        |
|        |       |              live      |                    |           subscribe over websockets                      |
|        +-------+              auctions  |                    |           to retrieve current max_bid                    |
|                                         |                    |           for each auction (not implemented)             |
|                                         +--------------------+                                                          |
|                                                                                                                         |
+-------------------------------------------------------------------------------------------------------------------------+








##infra requirements (all ports are default)

run kafka and zookeeper
create a topic called bids with 8 partitions
run mongodb
run redis

## to run the stream processor

$pipenv install
$pipenv shell
\$faust -A hello_world worker -l info

## to run the rest api

$yarn
$yarn start

the admin panel opens at localhost:1337

go to roles and permissions (left hand side under roles & permissions )
then go to public
and select all and save (this allows all the api endpoints to be accesible as I haven't implemented jwt authentication yet)

Now you can create cars, users and auctions from the content types on the left.
All times are in unix epoch (milliseconds)

## to run the frontend

it's very rudimentary. Built for test purposes only

$yarn
$yarn start
will open at localhost:3000

please note first you'll have to create a user to login
also it only lists those auctions which are currently live

## redis websocket

although I left it there it has bugs and doesn't work
