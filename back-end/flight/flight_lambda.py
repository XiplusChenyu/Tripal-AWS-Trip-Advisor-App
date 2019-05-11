import sys
sys.path.append('./packages')
import unirest
import json
import boto3


def lambda_handler(event, context):

    response = unirest.get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/SFO/JFK/2019-05-20/2019-09-12",
      headers={
        "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
        "X-RapidAPI-Key": "4db5077f80msh474ba85a6bff987p1816a6jsna75506094f1d"
      }
    )
    
    temp = response.body
    
    currency_symbol = ''
    departure = ''
    arrival = ''
    
    route = []
    
    carrier_dic = {}
    for i in range(len(temp["Carriers"])):
        carrier_dic.update({temp["Carriers"][i]["CarrierId"]:temp["Carriers"][i]["Name"]})
    
    currency = temp["Currencies"][0]["Code"]
    departure = temp["Places"][0]["CityName"]
    arrival = temp["Places"][1]["CityName"]
    
    for i in range(len(temp["Quotes"])):
        route += [{"price":temp["Quotes"][i]["MinPrice"],"carrier":carrier_dic[temp["Quotes"][i]["OutboundLeg"]["CarrierIds"][0]],"departure_date":temp["Quotes"][i]["OutboundLeg"]["DepartureDate"][:10],"back_date":temp["Quotes"][i]["InboundLeg"]["DepartureDate"][:10]}]
    # print(route)
    # route = json.loads(route)
    # print(json.dumps(route,indent = 2))
    return route
    
