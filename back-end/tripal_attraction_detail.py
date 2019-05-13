import json
from botocore.vendored import requests

def lambda_handler(event, context):
    # TODO implement
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps('Hello from Lambda!')
    # }



    API_KEY = "AIzaSyAx_aaPjCjgx6wzc3BOlK55Qp1OoHFA5bA"

    # placeid = 'ChIJoxqn-kD2wokRLvhOLfAneU8'
    placeid = event['placeid']


    # https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJ9U1mz_5YwokRosza1aAk0jM
    #     &fields=name,rating,price_level,website,opening_hours,formatted_phone_number,review
    #     &key=AIzaSyAx_aaPjCjgx6wzc3BOlK55Qp1OoHFA5bA



    link =  "https://maps.googleapis.com/maps/api/place/details/json?placeid="

    link += placeid + '&fields=name,rating,price_level,website,opening_hours,formatted_phone_number,review'+'&key=' +API_KEY


    # temp = ('+'.join(city.upper().split(' ')))
    # link +=  temp + '+point+of+interest&language=en&key=' + API_KEY
    r = requests.get(link)
    temp = json.loads(r.text)

    # open_now = temp["result"]["opening_hours"]["open_now"]
    # open_time = temp["result"]["opening_hours"]["weekday_text"]
    # phone_number = temp["result"]["formatted_phone_number"]
    # price_level = temp["result"]["price_level"]
    # if price_level == 0:
    #     price = 'Free'
    # elif price_level == 1:
    #     price = 'Inexpensive'
    # elif price_level == 2:
    #     price = 'Moderate'
    # elif price_level == 3:
    #     price = 'Expensive'
    # elif price_level == 4:
    #     price = 'Very Expansive'

    # rating = temp["result"]["rating"]
    if "reviews" in temp["result"]:
        typical_review = [temp["result"]["reviews"][i]["text"] for i in range(3)]
    else:
        typical_review = ["no review"]

    if "website" in temp["result"]:
        website = temp["result"]["website"]
    else:
        website = "no"

    res = {"website":website, "typical_review":typical_review}

    # print(json.dumps(res,indent =2))
    return {
        "detail": res
    }
