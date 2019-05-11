import sys
sys.path.append('./packages')
import unirest
import json
import boto3


def lambda_handler(event, context):

    departure = event["depart"]
    arrival = event["arrival"]
    departure_date = event["depart_date"]
    back_date = event["back_date"]
    
    
    
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

    link += departure_date

    link += '/'

    link += 'sort=bestflight_a'

    # return link



    api_link = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/"

    api_link += departure_code + "/" + arrival_code + "/"+ departure_date + "/" + back_date

    print(api_link)

    # # response = unirest.get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/SFO/JFK/2019-05-20/2019-09-12",
    response = unirest.get(api_link,
      headers={
        "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "4db5077f80msh474ba85a6bff987p1816a6jsna75506094f1d"
      }
    )
    
    temp = response.body
    # print(temp)
    # currency_symbol = ''
    # departure = ''
    # arrival = ''
    
    route = []
    
    carrier_dic = {}
    for i in range(len(temp["Carriers"])):
        carrier_dic.update({temp["Carriers"][i]["CarrierId"]:temp["Carriers"][i]["Name"]})
    
    
    for i in range(len(temp["Quotes"])):
        route += [{"price":temp["Quotes"][i]["MinPrice"],"carrier":carrier_dic[temp["Quotes"][i]["OutboundLeg"]["CarrierIds"][0]],"departure_date":temp["Quotes"][i]["OutboundLeg"]["DepartureDate"][:10],"back_date":temp["Quotes"][i]["InboundLeg"]["DepartureDate"][:10]}]

    
    route += [{"kayak_link":link}]
    
    return route