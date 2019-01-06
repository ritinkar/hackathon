import faust
import redis
#import paho.mqtt.client as mqtt


# def on_connect(client, userdata, flags, rc):
#     print("Connected with result code "+str(rc))

#     # Subscribing in on_connect() means that if we lose the connection and
#     # reconnect then subscriptions will be renewed.
#     # client.subscribe("$SYS/#")


# def on_publish(client, userdata, result):  # create function for callback
#     print("data published \n")


# client = mqtt.Client()
# client.on_connect = on_connect
# client.on_publish = on_publish


#client.connect("localhost", 1883, 60)

# Blocking call that processes network traffic, dispatches callbacks and
# handles reconnecting.
# Other loop*() functions are available that give a threaded interface and a
# manual interface.

app = faust.App(
    'hello-world',
    broker='kafka://localhost:9092',
)

r = redis.Redis(
    host='localhost',
    port=6379,
)

bids_topic = app.topic('bids')
max_bids = app.Table('max_bids')


@app.agent(bids_topic)
async def max_bid_checker(bids):
    async for bid in bids:

        if bid["auction"] in max_bids.keys():
            print(max_bids[bid["auction"]]["amount"])
            if int(max_bids[bid["auction"]]["amount"]) < int(bid["amount"]):
                print("in bids")
                print(max_bids)
                max_bids[bid["auction"]] = bid
                #ret = client.publish("/"+bid["auction"]+"/", str(bid))
                r.set(bid["auction"], str(bid))
        else:
            print("here")
            max_bids[bid["auction"]] = bid
            #ret = client.publish("/"+bid["auction"]+"/", str(bid))
            r.set(bid["auction"], str(bid))
        #max_bids[bid["auction"]] += bid
