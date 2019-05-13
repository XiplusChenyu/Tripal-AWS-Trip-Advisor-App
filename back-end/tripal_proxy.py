from __future__ import print_function # Python 2/3
import json
import boto3
import os


def lambda_handler(event, context):
    # TODO implement
    text = event["messages"][0]['unstructured']['text']
    responseMessages = dict()
    responseMessages["Intent"] = "Null"

    if "%&%" in text:
        # handle the book hotel request
        lat, lng = text.split("%&%lat:")[1].split(", lng:")
        hotel_event = {
            "longitude": lng,
            "latitude": lat
        }
        lambda_client = boto3.client('lambda')
        lambda_response = lambda_client.invoke(
            FunctionName = "tripal_hotel",
            Payload = json.dumps(hotel_event)
        )
        lambda_response = lambda_response["Payload"].read()
        lambda_response = lambda_response.decode('utf-8')
        lambda_response = json.loads(lambda_response)

        responseMessages['Intent'] = "Hotel"
        responseMessages['Hotel'] = lambda_response
        responseMessages['message'] = "Here are some hotel message for you. Click me to view more."

    else:
        client = boto3.client("lex-runtime")
        response = client.post_text(
            botName=os.environ['BOT_NAME'],
            botAlias=os.environ['BOT_ALIAS'],
            userId=event["messages"][0]["unstructured"]['id'],
            inputText=text
        )

        fufillment = False

        if "slots" in response:
            fufillment = True
            for key, value in response['slots'].items():
                if value == None:
                    fufillment = False
                    break

        if "intentName" in response:
            if response["intentName"] == "Greeting":
                responseMessages["message"] = response["message"]

        if fufillment:
            # handle the attraction request
            if response['intentName'] == "Attraction":
                attraction_event = {
                    "city": response['slots']["Location"]
                }
                lambda_client = boto3.client('lambda')
                lambda_response = lambda_client.invoke(
                    FunctionName = "tripal_attraction",
                    Payload = json.dumps(attraction_event)
                )
                lambda_response = json.loads(lambda_response["Payload"].read().decode('utf-8'))

                for attraction in lambda_response["attractions"][0:10]:
                    attraction_detail = {
                        "placeid": attraction["place_id"]
                    }

                    lambda_response2 = lambda_client.invoke(
                    FunctionName = "tripal_attraction_detail",
                    Payload = json.dumps(attraction_detail)
                    )
                    lambda_response2 = json.loads(lambda_response2["Payload"].read().decode('utf-8'))
                    print(lambda_response2)
                    lambda_response2 = lambda_response2['detail']
                    if "website" in lambda_response2:
                        attraction["website"] = lambda_response2["website"]
                    else:
                        attraction["website"] = "no"
                    if "typical_review" in lambda_response2:
                        attraction["typical_review"] = lambda_response2["typical_review"]
                    else:
                        attraction["typical_review"] = "no"


                responseMessages["Intent"] = "Attraction"
                responseMessages['Attraction'] = lambda_response["attractions"][0:10]
                responseMessages['message'] = "Here are some attractions of " + response['slots']['Location'] + ". Click me to view more."



            # handle the flight request
            if response["intentName"] == "Flight":
                flight_event = {
                    "depart": response['slots']['Departure'],
                    "arrival": response['slots']['Destination'],
                    "depart_date": response['slots']['goTime'],
                    "back_date": response['slots']['backTime']
                }
                lambda_client = boto3.client('lambda')
                lambda_response = lambda_client.invoke(
                    FunctionName = "tripal_flight",
                    Payload = json.dumps(flight_event)
                )

                lambda_response = lambda_response["Payload"].read()
                lambda_response = lambda_response.decode('utf-8')
                lambda_response = json.loads(lambda_response)

                responseMessages['Intent'] = "Flight"
                responseMessages['Flight'] = lambda_response["flights"]
                responseMessages["message"] = response["message"] + " Click me to view more."
        else:
            responseMessages["Intent"] = "Null"
            responseMessages["message"] = response["message"]

    return {
        'statusCode': 200,
        'body': responseMessages
    }
