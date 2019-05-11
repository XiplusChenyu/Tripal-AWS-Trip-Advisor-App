import json


def flightsearch(date, departure ,arrival):

    departure_code = departure
    arrival_code = arrival
    with open('airports.json', 'r') as f:
        d = json.load(f)
        for i in range(len(d)):
            if departure.lower() == d.values()[i]["city"].lower() and "International".lower() in d.values()[i]["name"].lower():
                departure_code = d.values()[i]["iata"]
            if arrival.lower() == d.values()[i]["city"].lower() and "International".lower() in d.values()[i]["name"].lower():
                arrival_code = d.values()[i]["iata"]

    link = 'https://www.kayak.com/flights/'

    link += departure_code

    link += '-'

    link += arrival_code

    link += '/'

    link += date

    link += '/'

    link += 'sort=bestflight_a'

    return link

print(flightsearch(departure="san diego", arrival="Seattle", date =  '2019-06-12'))