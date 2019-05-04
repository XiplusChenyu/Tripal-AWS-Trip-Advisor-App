import json
import random


def flightsearch(date, departure = 'NYC' ,arrival ='BOS' ):
    aplis = []
    with open('/Users/jiliangma/Desktop/proj/airports.json', 'r') as f:
        d = json.load(f)
        for i in range(len(d)):
            aplis.append(d[i]['iata'])


    # print(json.dumps(aplis, indent = 2))
    link = 'https://www.kayak.com/flights/'

    link += departure
    # link += aplis[random.randint(0,len(aplis))]


    link += '-'

    link += arrival
    # link += aplis[random.randint(0,len(aplis))]


    link += '/'

    link += date

    link += '/'

    link += 'sort=bestflight_a'

    return link

print(flightsearch( date =  '2019-06-12'))

# https://www.kayak.com/flights/NYC-JFK/2019-05-10?sort=bestflight_a
