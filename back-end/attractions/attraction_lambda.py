import requests
import json

city = 'new york'
API_KEY = 

link =  'https://maps.googleapis.com/maps/api/place/textsearch/json?query='


temp = ('+'.join(city.upper().split(' ')))
link += temp + '+point+of+interest&language=en&key=' + API_KEY

r = requests.get(link)


res = json.loads(r.text)
ans = res["results"]
names = []
geometrics = []
prices = []
rating = []
addresses = []
photo_url = []
temp = []


for i in ans:
    addresses = addresses + [i['formatted_address']]
    names = names + [i['name']]
    rating = rating +[i['rating']]
    geometrics = geometrics + [i['geometry']]
    if 'price_level' not in i:
        prices = prices + ['null']
    else:
        if i['price_level'] == 0:
            prices  = prices + ['Free']
        elif i['price_level'] == 1:
            prices = prices + ['Inexpensive']
        elif i['price_level'] == 2:
            prices = prices + ['Moderate']
        elif i['price_level'] == 3:
            prices = prices + ['Expensive']
        elif i['price_level'] == 4:
            prices = prices + ['Very Expensive']
    photo_url = photo_url + ["https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" + i["photos"][0]["photo_reference"] +"&key=" + API_KEY]

lis = []
for i in range(len(names)):
    lis = lis + [{"name": names[i], "formatted_address": addresses[i], "rating": rating[i], "price_level": prices[i],
                  "photo_url": photo_url[i], "geometry": geometrics[i]}]

print(json.dumps(lis, indent=2))
