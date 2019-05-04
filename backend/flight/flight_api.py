import unirest
import json

response = unirest.get("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/JFK-sky/LAX-sky/2019-07-05",
  headers={
    "X-RapidAPI-Host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
    "X-RapidAPI-Key": "4db5077f80msh474ba85a6bff987p1816a6jsna75506094f1d"
  }
)
a = json.dumps(response.body, indent = 2)
print(a)