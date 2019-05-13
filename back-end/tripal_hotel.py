import json
import amadeus
import requests

def lambda_handler(event, context):
    lon = event['longitude']
    lat = event['latitude']
    # Initialize using parameters
    from amadeus import Client, ResponseError
    amadeus = Client(client_id='NMMFvsmmdcPE9rUtSLAfnic58AftCseF', client_secret='9Vj03JodL6c8NR7z')
    # response = amadeus.shopping.hotel_offers.get(cityCode='PAR')
    response = amadeus.shopping.hotel_offers.get(longitude=lon, latitude=lat)

    # print(response.result) #=> The body parsed as JSON, if the result was parsable
    # response1 = amadeus.next(response) #=> returns a new response for the next page
    # print(json.dumps(response.result, indent = 2))
    res = response.result
    res1 = res["data"]

    names = []
    rating = []
    hotelDistance = []
    address = []
    contact = []
    prices = []

    for i in res1:
        names = names + [i["hotel"]["name"]]
        rating = rating + [i["hotel"]["rating"]]
        hotelDistance = hotelDistance + [i["hotel"]["hotelDistance"]]
        address = address + [i["hotel"]["address"]]
        contact = contact + [i["hotel"]["contact"]]
        prices = prices + [i["offers"][0]["price"]["total"]]

    res = []
    for i in range(len(names)):
        res = res + [{"name": names[i], "rating": rating[i], "hotelDistance": hotelDistance[i], "address": address[i], "contact": contact[i], "price": prices[i]}]

    # print(json.dumps(res, indent = 2))
    return res
    
